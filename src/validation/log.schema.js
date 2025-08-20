// src/validation/log.schema.js
import { z } from 'zod';

export const createLogSchema = {
  params: z.object({ id: z.string().length(24) }),
  body: z.object({
    event: z.string().min(1),
    value: z.number().optional()
  })
};

export const listLogsQuery = {
  params: z.object({ id: z.string().length(24) }),
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).optional().default(10)
  })
};

export const usageQuery = {
  params: z.object({ id: z.string().length(24) }),
  query: z.object({ range: z.string().regex(/^\d+(m|h|d)$/).default('24h') })
};