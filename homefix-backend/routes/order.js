import express from 'express';
import { getOrdersByUser, getOrderById } from '../controllers/order.js';
import { authMiddleware } from '../utils/auth.js';
const router = express.Router();

router.get('/', authMiddleware, getOrdersByUser);
router.get('/:id', authMiddleware, getOrderById);

export default router;
