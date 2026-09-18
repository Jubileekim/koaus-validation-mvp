import { Router } from 'express'
import prisma from '../db/prisma.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: req.params.postId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            role: true,
          },
        },
      },
    })

    res.status(200).json(comments)
  } catch (error) {
    console.error('GET comments failed:', error)
    res.status(500).json({
      message: 'Failed to load comments',
    })
  }
})

router.post('/posts/:postId/comments', requireAuth, async (req, res) => {
  try {
    const content = req.body.content?.trim()

    if (!content) {
      return res.status(400).json({
        message: 'Comment cannot be empty',
      })
    }

    if (content.length > 1000) {
      return res.status(400).json({
        message: 'Comment must be 1000 characters or fewer',
      })
    }

    const post = await prisma.post.findUnique({
      where: { id: req.params.postId },
      select: { id: true },
    })

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: post.id,
        userId: req.session.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            role: true,
          },
        },
      },
    })

    res.status(201).json(comment)
  } catch (error) {
    console.error('POST comment failed:', error)
    res.status(500).json({
      message: 'Failed to create comment',
    })
  }
})

router.delete('/comments/:commentId', requireAuth, async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: req.params.commentId },
    })

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found',
      })
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { role: true },
    })

    const ownsComment = comment.userId === req.session.userId
    const isAdmin = currentUser?.role === 'ADMIN'

    if (!ownsComment && !isAdmin) {
      return res.status(403).json({
        message: 'You do not have permission to delete this comment',
      })
    }

    await prisma.comment.delete({
      where: { id: comment.id },
    })

    res.status(204).end()
  } catch (error) {
    console.error('DELETE comment failed:', error)
    res.status(500).json({
      message: 'Failed to delete comment',
    })
  }
})

export default router
