import express from 'express';
import { getChatsByUser, getChatByOrder } from '../controllers/chat.js';
import { authMiddleware } from '../utils/auth.js';
const router = express.Router();

router.get('/', authMiddleware, getChatsByUser);
router.get('/:orderId', authMiddleware, getChatByOrder);

export default router;
