// src/models/Log.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  device_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true, index: true },
  event: { type: String, required: true },
  value: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

export const Log = mongoose.model('Log', logSchema);