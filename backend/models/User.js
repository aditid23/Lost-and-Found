import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  role: { type: String, enum: ['student', 'faculty', 'admin'], required: true },
  isVerified: { type: Boolean, default: false }
});

export default mongoose.model('User', userSchema);
