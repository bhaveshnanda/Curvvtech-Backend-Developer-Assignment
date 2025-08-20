// src/controllers/auth.controller.js
import * as AuthService from '../services/auth.service.js';

export const signup = async (req, res) => {
  const { status, body } = await AuthService.signup(req.body);
  return res.status(status).json(body);
};

export const login = async (req, res) => {
  const { status, body } = await AuthService.login(req.body);
  return res.status(status).json(body);
};
