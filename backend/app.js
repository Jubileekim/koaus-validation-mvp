import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import prisma from './db/prisma.js'
import authRouter from './routes/auth.route.js'
import commentRouter from './routes/comment.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const PgSession = connectPgSimple(session)
const sessionSecret = process.env.SESSION_SECRET
const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is required')
}

if (corsOrigins.length === 0) {
  throw new Error('CORS_ORIGIN must include at least one origin')
}

app.set('trust proxy', 1)

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(
  session({
    name: 'koaus.sid',
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      schemaName: 'private',
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
)

app.use('/api/auth', authRouter)
app.use('/api', commentRouter)

function removePasswordHash(post) {
  if (!post) return post

  const {
    passwordHash: _passwordHash,
    ...safePost
  } = post

  return safePost
}

function canEditPost(user, post) {
  if (!user || !post) return false
  if (user.role === 'ADMIN') return true
  if (post.authorUserId && post.authorUserId === user.id) {
    return true
  }
  return false
}

async function getSessionUser(req) {
  if (!req.session?.userId) {
    return null
  }

  return prisma.user.findUnique({
    where: { id: req.session.userId },
    select: {
      id: true,
      role: true,
    },
  })
}

app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'KOAUS API is running',
  })
})

app.get('/api/posts', async (req, res) => {
  try {
    const limit = Math.min(
      Number(req.query.limit) || 20,
      100,
    )
    const offset = Math.max(
      Number(req.query.offset) || 0,
      0,
    )

    const posts = await prisma.post.findMany({
      include: {
        editor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    res
      .status(200)
      .json(posts.map(removePasswordHash))
  } catch (error) {
    console.error('GET /api/posts failed:', error)
    res.status(500).json({
      message: 'Failed to load posts',
    })
  }
})

app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        editor: true,
      },
    })

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    res.status(200).json(removePasswordHash(post))
  } catch (error) {
    console.error('GET /api/posts/:id failed:', error)
    res.status(500).json({
      message: 'Failed to load post',
    })
  }
})

app.post('/api/posts', async (req, res) => {
  try {
    const currentUser = await getSessionUser(req)

    if (!currentUser) {
      return res.status(401).json({
        message: 'Authentication required',
      })
    }

    const {
      title,
      titleKo,
      content,
      contentKo,
      type = 'ARTICLE',
      imageUrl,
      videoUrl,
      editorId,
    } = req.body

    if (!title?.trim()) {
      return res.status(400).json({
        message: 'English title is required',
      })
    }

    if (!content?.trim()) {
      return res.status(400).json({
        message: 'English content is required',
      })
    }

    if (!editorId) {
      return res.status(400).json({
        message: 'Editor ID is required',
      })
    }

    if (!['ARTICLE', 'REEL'].includes(type)) {
      return res.status(400).json({
        message: 'Type must be ARTICLE or REEL',
      })
    }

    const editor = await prisma.editor.findUnique({
      where: { id: editorId },
    })

    if (!editor) {
      return res.status(404).json({
        message: 'Editor not found',
      })
    }

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        titleKo: titleKo?.trim() || null,
        contentKo: contentKo?.trim() || null,
        type,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        editorId,
        authorUserId: currentUser.id,
      },
      include: {
        editor: true,
      },
    })

    res.status(201).json(removePasswordHash(post))
  } catch (error) {
    console.error('POST /api/posts failed:', error)
    res.status(500).json({
      message: 'Failed to create post',
    })
  }
})

app.patch('/api/posts/:id', async (req, res) => {
  try {
    const currentUser = await getSessionUser(req)

    if (!currentUser) {
      return res.status(401).json({
        message: 'Authentication required',
      })
    }

    const { id } = req.params
    const {
      title,
      titleKo,
      content,
      contentKo,
      type,
      imageUrl,
      videoUrl,
    } = req.body

    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        authorUserId: true,
      },
    })

    if (!existingPost) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    if (!canEditPost(currentUser, existingPost)) {
      return res.status(403).json({
        message: 'You do not have permission to edit this post',
      })
    }

    if (type !== undefined && !['ARTICLE', 'REEL'].includes(type)) {
      return res.status(400).json({
        message: 'Type must be ARTICLE or REEL',
      })
    }

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        message: 'English title cannot be empty',
      })
    }

    if (content !== undefined && !content.trim()) {
      return res.status(400).json({
        message: 'English content cannot be empty',
      })
    }

    const updateData = {}
    if (title !== undefined) updateData.title = title.trim()
    if (titleKo !== undefined) updateData.titleKo = titleKo?.trim() || null
    if (content !== undefined) updateData.content = content.trim()
    if (contentKo !== undefined) updateData.contentKo = contentKo?.trim() || null
    if (type !== undefined) updateData.type = type
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl || null
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl || null

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        editor: true,
      },
    })

    res.status(200).json(removePasswordHash(updatedPost))
  } catch (error) {
    console.error('PATCH /api/posts/:id failed:', error)
    res.status(500).json({
      message: 'Failed to update post',
    })
  }
})

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const currentUser = await getSessionUser(req)

    if (!currentUser) {
      return res.status(401).json({
        message: 'Authentication required',
      })
    }

    if (currentUser.role !== 'ADMIN') {
      return res.status(403).json({
        message: 'Only admins can delete posts',
      })
    }

    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    await prisma.post.delete({
      where: { id },
    })

    res.status(200).json({
      message: 'Post deleted successfully',
    })
  } catch (error) {
    console.error('DELETE /api/posts/:id failed:', error)
    res.status(500).json({
      message: 'Failed to delete post',
    })
  }
})

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.status(200).json(products)
  } catch (error) {
    console.error('GET /api/products failed:', error)
    res.status(500).json({
      message: 'Failed to load products',
    })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error('GET /api/products/:id failed:', error)
    res.status(500).json({
      message: 'Failed to load product',
    })
  }
})

app.use((req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl}`,
  })
})

app.use((error, req, res, _next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({
    message: 'Unexpected server error',
  })
})

app.listen(PORT, () => {
  console.log(`KOAUS server running on http://localhost:${PORT}`)
})
