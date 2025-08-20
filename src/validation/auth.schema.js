import { z } from 'zod';

export const signupSchema = { body: z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['user', 'admin']).optional().default('user')
}) };

export const loginSchema = { body: z.object({
  email: z.string().email(),
  password: z.string().min(8)
}) };