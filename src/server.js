// src/server.js
import { env } from './config/env.js';
import { connectDB } from './db/mongoose.js';
import app from './app.js';
import { startDeactivationJob } from './jobs/deactivateInactiveDevices.js';

const start = async () => {
  await connectDB();
  startDeactivationJob();
  app.listen(env.PORT, () => console.log(`Server listening on http://localhost:${env.PORT}`));
};

start();