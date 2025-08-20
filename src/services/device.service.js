// src/services/device.service.js
import httpStatus from 'http-status';
import { Device } from '../models/Device.js';

export const registerDevice = async (ownerId, payload) => {
  const device = await Device.create({ ...payload, owner_id: ownerId });
  return { status: httpStatus.CREATED, body: { success: true, device: serialize(device) } };
};

export const listDevices = async (ownerId, { type, status, page = 1, limit = 20 }) => {
  const query = { owner_id: ownerId };
  if (type) query.type = type;
  if (status) query.status = status;
  const devices = await Device.find(query).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
  return { status: httpStatus.OK, body: { success: true, devices: devices.map(serialize) } };
};

export const updateDevice = async (ownerId, id, updates) => {
  console.log(id, ownerId, updates);
  const device = await Device.findOneAndUpdate({ _id: id, owner_id: ownerId }, updates, { new: true });
  if (!device) return { status: httpStatus.NOT_FOUND, body: { success: false, message: 'Device not found' } };
  return { status: httpStatus.OK, body: { success: true, device: serialize(device) } };
};

export const deleteDevice = async (ownerId, id) => {
  const device = await Device.findOneAndDelete({ _id: id, owner_id: ownerId });
  if (!device) return { status: httpStatus.NOT_FOUND, body: { success: false, message: 'Device not found' } };
  return { status: httpStatus.OK, body: { success: true, message: 'Device removed' } };
};

export const heartbeat = async (ownerId, id, { status }) => {
  const updates = { last_active_at: new Date() };
  if (status) updates.status = status;
  const device = await Device.findOneAndUpdate({ _id: id, owner_id: ownerId }, updates, { new: true });
  if (!device) return { status: httpStatus.NOT_FOUND, body: { success: false, message: 'Device not found' } };
  return {
    status: httpStatus.OK,
    body: { success: true, message: 'Device heartbeat recorded', last_active_at: device.last_active_at.toISOString() }
  };
};

export const serialize = (d) => ({
  id: d._id.toString(),
  name: d.name,
  type: d.type,
  status: d.status,
  last_active_at: d.last_active_at ? d.last_active_at.toISOString() : null,
  owner_id: d.owner_id.toString()
});