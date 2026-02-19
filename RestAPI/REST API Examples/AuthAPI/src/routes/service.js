const { Router } = require('express');
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const prisma = require('../lib/prisma');
const config = require('../config');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(120)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1)
});

function createAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, type: 'access' },
    config.jwtAccessSecret,
    { expiresIn: config.jwtAccessTtl }
  );
}

async function createRefreshToken(userId) {
  const jti = randomUUID();
  const token = jwt.sign(
    { sub: userId, type: 'refresh', jti },
    config.jwtRefreshSecret,
    { expiresIn: config.jwtRefreshTtl }
  );
  const decoded = jwt.decode(token);
  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(decoded.exp * 1000)
    }
  });
  return token;
}

async function issueTokenPair(user) {
  const accessToken = createAccessToken(user);
  const refreshToken = await createRefreshToken(user.id);
  return { accessToken, refreshToken };
}

function authGuard(req, res, next) {
  const header = req.header('authorization');
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing bearer token', 'UNAUTHORIZED'));
  }
  const token = header.substring('Bearer '.length);
  try {
    const payload = jwt.verify(token, config.jwtAccessSecret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid access token', 'UNAUTHORIZED'));
  }
}

router.post(
  '/auth/register',
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const existing = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (existing) {
      throw new ApiError(409, 'Email already registered', 'CONFLICT');
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        passwordHash
      }
    });

    const tokens = await issueTokenPair(user);

    res.status(201).json({
      data: {
        user: { id: user.id, email: user.email, name: user.name },
        ...tokens
      }
    });
  })
);

router.post(
  '/auth/login',
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (!user) {
      throw new ApiError(401, 'Invalid credentials', 'UNAUTHORIZED');
    }

    const valid = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!valid) {
      throw new ApiError(401, 'Invalid credentials', 'UNAUTHORIZED');
    }

    const tokens = await issueTokenPair(user);
    res.json({
      data: {
        user: { id: user.id, email: user.email, name: user.name },
        ...tokens
      }
    });
  })
);

router.post(
  '/auth/refresh',
  validate(refreshSchema),
  asyncHandler(async (req, res) => {
    let payload;
    try {
      payload = jwt.verify(req.body.refreshToken, config.jwtRefreshSecret);
    } catch (err) {
      throw new ApiError(401, 'Invalid refresh token', 'UNAUTHORIZED');
    }

    const existing = await prisma.refreshToken.findUnique({
      where: { token: req.body.refreshToken },
      include: { user: true }
    });

    if (!existing || existing.revokedAt || existing.expiresAt < new Date()) {
      throw new ApiError(401, 'Refresh token is expired or revoked', 'UNAUTHORIZED');
    }

    if (existing.userId !== payload.sub) {
      throw new ApiError(401, 'Refresh token user mismatch', 'UNAUTHORIZED');
    }

    await prisma.refreshToken.update({
      where: { token: req.body.refreshToken },
      data: { revokedAt: new Date() }
    });

    const accessToken = createAccessToken(existing.user);
    const refreshToken = await createRefreshToken(existing.user.id);

    res.json({ data: { accessToken, refreshToken } });
  })
);

router.post(
  '/auth/logout',
  validate(refreshSchema),
  asyncHandler(async (req, res) => {
    await prisma.refreshToken.updateMany({
      where: {
        token: req.body.refreshToken,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });
    res.status(204).send();
  })
);

router.get(
  '/me',
  authGuard,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, createdAt: true }
    });

    if (!user) {
      throw new ApiError(404, 'User not found', 'NOT_FOUND');
    }

    res.json({ data: user });
  })
);

module.exports = router;
