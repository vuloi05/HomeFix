import Order from '../models/Order.js';

export const getOrdersByUser = async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ $or: [ { customerId: userId }, { workerId: userId } ] });
  res.json({ orders });
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  res.json({ order });
};
