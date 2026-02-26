import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem
} from '../services/itemService.js';
import {
  validateCreateItem,
  validateIdParam,
  validateUpdateItem
} from '../middlewares/validateItem.js';

const router = Router();

router.post('/items', validateCreateItem, async (req, res, next) => {
  try {
    const item = await createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.get('/items', async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/items/:id', validateIdParam, async (req, res, next) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/items/:id', validateIdParam, validateUpdateItem, async (req, res, next) => {
  try {
    const updated = await updateItem(req.params.id, req.body);
    if (!updated) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/items/:id', validateIdParam, async (req, res, next) => {
  try {
    const deleted = await deleteItem(req.params.id);
    if (!deleted) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
