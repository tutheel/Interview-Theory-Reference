import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).send('200');
});

export default router;
