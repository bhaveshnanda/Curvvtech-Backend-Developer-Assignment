import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const perUserLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: (req, res) => env.RATE_LIMIT_PER_MIN,
  keyGenerator: (req, res) => (req.user?._id?.toString() || req.ip),
  standardHeaders: true,
  legacyHeaders: false,
});