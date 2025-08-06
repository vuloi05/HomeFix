import Chat from '../models/Chat.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export function setupSocket(io) {
  io.on('connection', (socket) => {
    // Join room by orderId
    socket.on('join', async ({ orderId, userId }) => {
      const order = await Order.findById(orderId);
      if (!order) return;
      // Only allow customer, worker, or admin
      if (order.customerId.toString() === userId || order.workerId?.toString() === userId) {
        socket.join(orderId);
        socket.emit('joined', { orderId });
      }
    });

    // Send message
    socket.on('message', async ({ orderId, senderId, type, content }) => {
      let chat = await Chat.findOne({ orderId });
      if (!chat) {
        const order = await Order.findById(orderId);
        if (!order) return;
        chat = await Chat.create({ orderId, customerId: order.customerId, workerId: order.workerId, messages: [] });
      }
      const msg = { senderId, type, content, createdAt: new Date(), read: false };
      chat.messages.push(msg);
      await chat.save();
      io.to(orderId).emit('message', { ...msg, orderId });
    });

    // Typing
    socket.on('typing', ({ orderId, userId }) => {
      socket.to(orderId).emit('typing', { userId });
    });

    // Read
    socket.on('read', async ({ orderId, userId }) => {
      const chat = await Chat.findOne({ orderId });
      if (chat) {
        chat.messages.forEach(m => {
          if (m.senderId.toString() !== userId) m.read = true;
        });
        await chat.save();
        io.to(orderId).emit('read', { orderId, userId });
      }
    });

    // Online/offline
    socket.on('online', ({ userId }) => {
      User.findByIdAndUpdate(userId, { online: true }).exec();
      io.emit('online', { userId });
    });
    socket.on('disconnect', () => {
      // Optionally handle offline status
    });
  });
}
