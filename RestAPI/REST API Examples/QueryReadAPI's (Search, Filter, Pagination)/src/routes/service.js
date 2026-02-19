const { Router } = require('express');
const { z } = require('zod');
const prisma = require('../lib/prisma');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();

const offsetSchema = z.object({
  search: z.string().trim().optional(),
  filter: z.string().trim().optional(),
  sort: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
});

const cursorSchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10)
});

function parseSort(sortValue) {
  const fallback = { field: 'createdAt', direction: 'desc' };
  if (!sortValue) {
    return fallback;
  }

  const [field, direction] = sortValue.split(':');
  const allowedFields = ['name', 'price', 'createdAt', 'category'];
  const allowedDirections = ['asc', 'desc'];

  if (!allowedFields.includes(field) || !allowedDirections.includes(direction)) {
    throw new ApiError(400, 'Invalid sort format. Use field:asc|desc', 'VALIDATION_ERROR');
  }

  return { field, direction };
}

router.get(
  '/items',
  validate(offsetSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { search, filter, sort, page, limit } = req.query;
    const { field, direction } = parseSort(sort);

    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
              { sku: { contains: search, mode: 'insensitive' } }
            ]
          }
        : {}),
      ...(filter ? { category: { equals: filter, mode: 'insensitive' } } : {})
    };

    const [items, total] = await Promise.all([
      prisma.catalogItem.findMany({
        where,
        orderBy: { [field]: direction },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.catalogItem.count({ where })
    ]);

    res.json({
      data: items,
      pagination: {
        mode: 'offset',
        page,
        limit,
        total
      }
    });
  })
);

router.get(
  '/items/cursor',
  validate(cursorSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { cursor, limit } = req.query;

    const items = await prisma.catalogItem.findMany({
      ...(cursor
        ? {
            cursor: { id: cursor },
            skip: 1
          }
        : {}),
      take: limit + 1,
      orderBy: { id: 'asc' }
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    res.json({
      data: result,
      pagination: {
        mode: 'cursor',
        limit,
        nextCursor
      }
    });
  })
);

module.exports = router;
