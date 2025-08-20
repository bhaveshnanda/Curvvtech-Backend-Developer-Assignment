// src/routes/logs.routes.js
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { perUserLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { createLogSchema, listLogsQuery, usageQuery } from '../validation/log.schema.js';
import * as LogController from '../controllers/log.controller.js';

const router = Router();
router.use(auth, perUserLimiter);

router.post('/:id/logs', validate(createLogSchema), LogController.createLog);
router.get('/:id/logs', validate(listLogsQuery), LogController.listLogs);
router.get('/:id/usage', validate(usageQuery), LogController.aggregatedUsage);

export default router;
