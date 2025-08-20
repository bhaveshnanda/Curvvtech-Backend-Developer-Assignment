// src/validation/device.schema.js
import { z } from 'zod';

export const registerDeviceSchema = { body: z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  status: z.enum(['active', 'inactive']).optional().default('inactive')
}) };

export const deviceIdParam = { params: z.object({ id: z.string().length(24) }) };

export const listDevicesQuery = { query: z.object({
  type: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20)
}) };

export const updateDeviceSchema = {
  ...deviceIdParam,
  body: z.object({
    name: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    status: z.enum(['active', 'inactive']).optional()
  }).refine(
    (data) => Object.values(data).some((val) => val !== undefined),
    { message: 'At least one field required' }
  )
};


export const heartbeatSchema = {
  ...deviceIdParam,
  body: z.object({ status: z.enum(['active', 'inactive']).optional() })
};