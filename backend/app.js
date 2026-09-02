import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import prisma from './db/prisma.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// API 응답에서 비밀번호 해시 제거
function removePasswordHash(post) {
  if (!post) return post

  const {
    passwordHash: _passwordHash,
    ...safePost
  } = post

  return safePost
}

// 서버 상태 확인
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'KOAUS API is running',
  })
})

// 게시글 전체 조회
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        editor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res
      .status(200)
      .json(posts.map(removePasswordHash))
  } catch (error) {
    console.error(
      'GET /api/posts failed:',
      error,
    )

    res.status(500).json({
      message: 'Failed to load posts',
    })
  }
})

// 게시글 1개 상세 조회
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        editor: true,
      },
    })

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    res
      .status(200)
      .json(removePasswordHash(post))
  } catch (error) {
    console.error(
      'GET /api/posts/:id failed:',
      error,
    )

    res.status(500).json({
      message: 'Failed to load post',
    })
  }
})

// 게시글 작성
app.post('/api/posts', async (req, res) => {
  try {
    const {
      title,
      titleKo,
      content,
      contentKo,
      type = 'ARTICLE',
      imageUrl,
      videoUrl,
      editorId,
      password,
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
        message:
          'Type must be ARTICLE or REEL',
      })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters',
      })
    }

    const editor =
      await prisma.editor.findUnique({
        where: {
          id: editorId,
        },
      })

    if (!editor) {
      return res.status(404).json({
        message: 'Editor not found',
      })
    }

    const passwordHash = await bcrypt.hash(
      password,
      10,
    )

    const post = await prisma.post.create({
      data: {
        // 영어
        title: title.trim(),
        content: content.trim(),

        // 한국어
        titleKo: titleKo?.trim() || null,
        contentKo:
          contentKo?.trim() || null,

        type,

        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,

        editorId,
        passwordHash,
      },

      include: {
        editor: true,
      },
    })

    res
      .status(201)
      .json(removePasswordHash(post))
  } catch (error) {
    console.error(
      'POST /api/posts failed:',
      error,
    )

    res.status(500).json({
      message: 'Failed to create post',
    })
  }
})

// 게시글 수정
app.patch('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      title,
      titleKo,
      content,
      contentKo,
      type,
      imageUrl,
      videoUrl,
      password,
    } = req.body

    if (!password) {
      return res.status(400).json({
        message: 'Password is required',
      })
    }

    const existingPost =
      await prisma.post.findUnique({
        where: {
          id,
        },
      })

    if (!existingPost) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    if (!existingPost.passwordHash) {
      return res.status(403).json({
        message:
          'This post cannot be edited because it has no edit password',
      })
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        existingPost.passwordHash,
      )

    if (!passwordMatches) {
      return res.status(403).json({
        message: 'Incorrect password',
      })
    }

    if (
      type !== undefined &&
      !['ARTICLE', 'REEL'].includes(type)
    ) {
      return res.status(400).json({
        message:
          'Type must be ARTICLE or REEL',
      })
    }

    if (
      title !== undefined &&
      !title.trim()
    ) {
      return res.status(400).json({
        message:
          'English title cannot be empty',
      })
    }

    if (
      content !== undefined &&
      !content.trim()
    ) {
      return res.status(400).json({
        message:
          'English content cannot be empty',
      })
    }

    const updateData = {}

    if (title !== undefined) {
      updateData.title = title.trim()
    }

    if (titleKo !== undefined) {
      updateData.titleKo =
        titleKo?.trim() || null
    }

    if (content !== undefined) {
      updateData.content =
        content.trim()
    }

    if (contentKo !== undefined) {
      updateData.contentKo =
        contentKo?.trim() || null
    }

    if (type !== undefined) {
      updateData.type = type
    }

    if (imageUrl !== undefined) {
      updateData.imageUrl =
        imageUrl || null
    }

    if (videoUrl !== undefined) {
      updateData.videoUrl =
        videoUrl || null
    }

    const updatedPost =
      await prisma.post.update({
        where: {
          id,
        },

        data: updateData,

        include: {
          editor: true,
        },
      })

    res
      .status(200)
      .json(
        removePasswordHash(updatedPost),
      )
  } catch (error) {
    console.error(
      'PATCH /api/posts/:id failed:',
      error,
    )

    res.status(500).json({
      message: 'Failed to update post',
    })
  }
})

// 게시글 삭제
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params

    const password =
      req.get('x-post-password')

    if (!password) {
      return res.status(400).json({
        message: 'Password is required',
      })
    }

    const post =
      await prisma.post.findUnique({
        where: {
          id,
        },
      })

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    if (!post.passwordHash) {
      return res.status(403).json({
        message:
          'This post was created before password protection was enabled',
      })
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        post.passwordHash,
      )

    if (!passwordMatches) {
      return res.status(403).json({
        message: 'Incorrect password',
      })
    }

    await prisma.post.delete({
      where: {
        id,
      },
    })

    res.status(200).json({
      message:
        'Post deleted successfully',
    })
  } catch (error) {
    console.error(
      'DELETE /api/posts/:id failed:',
      error,
    )

    res.status(500).json({
      message:
        error.message ||
        'Failed to delete post',
    })
  }
})

// 상품 전체 조회
app.get('/api/products', async (req, res) => {
  try {
    const products =
      await prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })

    res.status(200).json(products)
  } catch (error) {
    console.error(
      'GET /api/products failed:',
      error,
    )

    res.status(500).json({
      message:
        'Failed to load products',
    })
  }
})

// 상품 1개 상세 조회
app.get(
  '/api/products/:id',
  async (req, res) => {
    try {
      const { id } = req.params

      const product =
        await prisma.product.findUnique({
          where: {
            id,
          },
        })

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        })
      }

      res.status(200).json(product)
    } catch (error) {
      console.error(
        'GET /api/products/:id failed:',
        error,
      )

      res.status(500).json({
        message:
          'Failed to load product',
      })
    }
  },
)

app.listen(PORT, () => {
  console.log(
    `KOAUS server running on http://localhost:${PORT}`,
  )
})