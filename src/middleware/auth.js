import httpStatus from 'http-status';
import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.substring(7) : null;
    if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Missing token' });
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).select('-password');
    if (!user) return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
  }
};