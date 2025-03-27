import express from 'express';
import dotenv from 'dotenv';
import CookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import connectToDB from './database/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToDB(MONGODB_URI);
});