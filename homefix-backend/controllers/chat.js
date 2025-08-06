import Chat from '../models/Chat.js';

export const getChatsByUser = async (req, res) => {
  const userId = req.user.id;
  const chats = await Chat.find({ $or: [ { customerId: userId }, { workerId: userId } ] })
    .populate('orderId')
    .populate('customerId', 'name')
    .populate('workerId', 'name');
  res.json({ chats });
};

export const getChatByOrder = async (req, res) => {
  const { orderId } = req.params;
  const chat = await Chat.findOne({ orderId })
    .populate('orderId')
    .populate('customerId', 'name')
    .populate('workerId', 'name');
  res.json({ chat });
};
