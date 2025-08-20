// src/controllers/device.controller.js
import * as DeviceService from '../services/device.service.js';

export const registerDevice = async (req, res) => {
  const { status, body } = await DeviceService.registerDevice(req.user._id, req.body);
  return res.status(status).json(body);
};

export const listDevices = async (req, res) => {
  const { status, body } = await DeviceService.listDevices(req.user._id, req.query);
  return res.status(status).json(body);
};

export const updateDevice = async (req, res) => {
  const { status, body } = await DeviceService.updateDevice(req.user._id, req.params.id, req.body);
  return res.status(status).json(body);
};

export const deleteDevice = async (req, res) => {
  const { status, body } = await DeviceService.deleteDevice(req.user._id, req.params.id);
  return res.status(status).json(body);
};

export const heartbeat = async (req, res) => {
  const { status, body } = await DeviceService.heartbeat(req.user._id, req.params.id, req.body);
  return res.status(status).json(body);
};