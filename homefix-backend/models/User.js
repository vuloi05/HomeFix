import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['customer', 'worker', 'admin'], required: true },
  phone: String,
  password: String, // hash
  avatar: String,
  online: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
