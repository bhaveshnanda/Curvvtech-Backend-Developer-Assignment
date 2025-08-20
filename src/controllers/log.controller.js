// src/controllers/log.controller.js
import * as LogService from '../services/log.service.js';

export const createLog = async (req, res) => {
  const { status, body } = await LogService.createLog(req.user._id, req.params.id, req.body);
  return res.status(status).json(body);
};

export const listLogs = async (req, res) => {
  const { status, body } = await LogService.listLogs(req.user._id, req.params.id, req.query);
  return res.status(status).json(body);
};

export const aggregatedUsage = async (req, res) => {
  const { status, body } = await LogService.aggregatedUsage(req.user._id, req.params.id, req.query);
  return res.status(status).json(body);
};