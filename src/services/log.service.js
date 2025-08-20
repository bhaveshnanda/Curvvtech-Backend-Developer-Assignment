// src/services/log.service.js
import httpStatus from 'http-status';
import { Log } from '../models/Log.js';
import { Device } from '../models/Device.js';

export const createLog = async (ownerId, deviceId, payload) => {
  const device = await Device.findOne({ _id: deviceId, owner_id: ownerId });
  if (!device) return { status: httpStatus.NOT_FOUND, body: { success: false, message: 'Device not found' } };
  const log = await Log.create({ device_id: deviceId, ...payload });
  return { status: httpStatus.CREATED, body: { success: true, log: serialize(log) } };
};

export const listLogs = async (ownerId, deviceId, { limit = 10 }) => {
  const device = await Device.findOne({ _id: deviceId, owner_id: ownerId });
  if (!device) return { status: httpStatus.NOT_FOUND, body: { success: false, message: 'Device not found' } };
  const logs = await Log.find({ device_id: deviceId }).sort({ timestamp: -1 }).limit(limit);
  return { status: httpStatus.OK, body: { success: true, logs: logs.map(serialize) } };
};

export const aggregatedUsage = async (ownerId, deviceId, { range = '24h' }) => {
  const device = await Device.findOne({ _id: deviceId, owner_id: ownerId });
  if (!device) return { status: httpStatus.NOT_FOUND, body: { success: false, message: 'Device not found' } };

  const now = new Date();
  const amount = parseInt(range);
  const unit = range.endsWith('m') ? 'm' : range.endsWith('h') ? 'h' : 'd';
  const ms = unit === 'm' ? amount * 60 * 1000 : unit === 'h' ? amount * 60 * 60 * 1000 : amount * 24 * 60 * 60 * 1000;
  const since = new Date(now.getTime() - ms);

  const docs = await Log.aggregate([
    { $match: { device_id: device._id, event: 'units_consumed', timestamp: { $gte: since } } },
    { $group: { _id: null, total: { $sum: '$value' } } }
  ]);

  const total = docs.length ? docs[0].total : 0;
  return { status: httpStatus.OK, body: { success: true, device_id: device._id.toString(), total_units_last_24h: total } };
};

export const serialize = (l) => ({
  id: l._id.toString(),
  event: l.event,
  value: l.value,
  timestamp: l.timestamp.toISOString()
});