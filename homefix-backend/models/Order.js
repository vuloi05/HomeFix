import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  serviceType: String,
  subServices: [{ id: String, name: String }],
  address: String,
  requestedTime: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
