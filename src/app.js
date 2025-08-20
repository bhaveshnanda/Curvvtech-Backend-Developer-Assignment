// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import deviceRoutes from './routes/devices.routes.js';
import logRoutes from './routes/logs.routes.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/devices', deviceRoutes);
app.use('/devices', logRoutes); // routes that depend on :id

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;