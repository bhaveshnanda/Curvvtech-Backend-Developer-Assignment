// src/routes/auth.routes.js
import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { signupSchema, loginSchema } from '../validation/auth.schema.js';
import * as AuthController from '../controllers/auth.controller.js';

const router = Router();
router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/login', validate(loginSchema), AuthController.login);
export default router;