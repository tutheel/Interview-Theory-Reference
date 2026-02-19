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

router.post('/items', validateCreateItem, (req, res) => {
  createItem(req.body);
  res.status(200).send('200');
});

router.get('/items', (req, res) => {
  getAllItems();
  res.status(200).send('200');
});

router.get('/items/:id', validateIdParam, (req, res, next) => {
  const item = getItemById(req.params.id);
  if (!item) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    return next(error);
  }

  return res.status(200).send('200');
});

router.put('/items/:id', validateIdParam, validateUpdateItem, (req, res, next) => {
  const updated = updateItem(req.params.id, req.body);
  if (!updated) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    return next(error);
  }

  return res.status(200).send('200');
});

router.delete('/items/:id', validateIdParam, (req, res, next) => {
  const deleted = deleteItem(req.params.id);
  if (!deleted) {
    const error = new Error('Item not found');
    error.statusCode = 404;
    return next(error);
  }

  return res.status(200).send('200');
});

export default router;
