// src/services/auth.service.js
import httpStatus from 'http-status';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';


export const signup = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) return { status: httpStatus.CONFLICT, body: { success: false, message: 'Email already registered' } };
  await User.create({ name, email, password, role });
  return { status: httpStatus.CREATED, body: { success: true, message: 'User registered successfully' } };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return { status: httpStatus.UNAUTHORIZED, body: { success: false, message: 'Invalid credentials' } };
  const ok = await user.comparePassword(password);
  if (!ok) return { status: httpStatus.UNAUTHORIZED, body: { success: false, message: 'Invalid credentials' } };
  const token = generateToken({ sub: user._id.toString(), role: user.role });
  return {
    status: httpStatus.OK,
    body: {
      success: true,
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
    }
  };
};