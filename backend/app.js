import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ✅ CORS config for frontend (adjust port if needed) app.use(cors({ origin: 'http://localhost:5173', credentials: true, }));

app.use(express.json());

// ✅ Health check route app.get('/', (req, res) => { res.send('✅ Backend is working!'); });

// ✅ Auth routes app.use('/api/auth', authRoutes);

export default app;