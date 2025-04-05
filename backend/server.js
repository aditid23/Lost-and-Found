import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';


// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // change if your frontend runs on a different port
    credentials: true,
  })
);
app.use(express.json()); // to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('✅ Backend is working and connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});