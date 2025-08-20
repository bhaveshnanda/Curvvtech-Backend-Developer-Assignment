// src/routes/devices.routes.js
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { perUserLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { registerDeviceSchema, listDevicesQuery, updateDeviceSchema, deviceIdParam, heartbeatSchema } from '../validation/device.schema.js';
import * as DeviceController from '../controllers/device.controller.js';

const router = Router();
router.use(auth, perUserLimiter);

router.post('/', validate(registerDeviceSchema), DeviceController.registerDevice);
router.get('/', validate(listDevicesQuery), DeviceController.listDevices);
router.patch('/:id', validate(updateDeviceSchema), DeviceController.updateDevice);
router.delete('/:id', validate(deviceIdParam), DeviceController.deleteDevice);
router.post('/:id/heartbeat', validate(heartbeatSchema), DeviceController.heartbeat);

export default router;