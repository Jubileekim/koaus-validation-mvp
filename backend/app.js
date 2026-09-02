import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import prisma from './db/prisma.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

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

    res.status(200).json(posts)
  } catch (error) {
    console.error('GET /api/posts failed:', error)

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

    res.status(200).json(post)
  } catch (error) {
    console.error('GET /api/posts/:id failed:', error)

    res.status(500).json({
      message: 'Failed to load post',
    })
  }
})

app.post('/api/posts', async (req, res) => {
  try {
    const {
      title,
      content,
      type = 'ARTICLE',
      imageUrl,
      videoUrl,
      editorId,
    } = req.body

    if (!title?.trim()) {
      return res.status(400).json({
        message: 'Title is required',
      })
    }

    if (!content?.trim()) {
      return res.status(400).json({
        message: 'Content is required',
      })
    }

    if (!editorId) {
      return res.status(400).json({
        message: 'Editor ID is required',
      })
    }

    const editor = await prisma.editor.findUnique({
      where: {
        id: editorId,
      },
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
        type,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        editorId,
      },
      include: {
        editor: true,
      },
    })

    res.status(201).json(post)
  } catch (error) {
    console.error('POST /api/posts failed:', error)

    res.status(500).json({
      message: 'Failed to create post',
    })
  }
})

// 상품 전체 조회
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

// 상품 1개 상세 조회
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
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
    console.error('GET /api/products/:id failed:', error)

    res.status(500).json({
      message: 'Failed to load product',
    })
  }
})

app.listen(PORT, () => {
  console.log(`KOAUS server running on http://localhost:${PORT}`)
})