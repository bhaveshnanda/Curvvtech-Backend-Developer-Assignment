import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive', index: true },
  last_active_at: { type: Date, default: null, index: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }
}, { timestamps: true });

export const Device = mongoose.model('Device', deviceSchema);