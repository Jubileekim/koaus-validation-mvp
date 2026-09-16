import { Router } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../db/prisma.js'

const router = Router()

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    createdAt: user.createdAt,
  }
}

router.post('/signup', async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase()
    const password = req.body.password
    const displayName = req.body.displayName?.trim()

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        message: 'A valid email is required',
      })
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters',
      })
    }

    if (!displayName || displayName.length > 50) {
      return res.status(400).json({
        message: 'Display name is required and must be 50 characters or fewer',
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
      },
    })

    req.session.userId = user.id

    res.status(201).json({
      user: sanitizeUser(user),
    })
  } catch (error) {
    console.error('POST /api/auth/signup failed:', error)
    res.status(500).json({
      message: 'Failed to create account',
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase()
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    req.session.userId = user.id

    res.status(200).json({
      user: sanitizeUser(user),
    })
  } catch (error) {
    console.error('POST /api/auth/login failed:', error)
    res.status(500).json({
      message: 'Failed to log in',
    })
  }
})

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error)

    res.clearCookie('koaus.sid')
    res.status(204).end()
  })
})

router.get('/me', async (req, res) => {
  try {
    if (!req.session?.userId) {
      return res.status(200).json({
        user: null,
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    })

    if (!user) {
      req.session.destroy(() => {})
      return res.status(200).json({
        user: null,
      })
    }

    res.status(200).json({
      user: sanitizeUser(user),
    })
  } catch (error) {
    console.error('GET /api/auth/me failed:', error)
    res.status(500).json({
      message: 'Failed to load authentication state',
    })
  }
})

export default router
