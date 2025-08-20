// src/jobs/deactivateInactiveDevices.js
import cron from 'node-cron';
import { Device } from '../models/Device.js';

export const startDeactivationJob = () => {
  // runs every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await Device.updateMany(
      { last_active_at: { $lt: threshold } },
      { $set: { status: 'inactive' } }
    );
  });
};