import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    const body = schema.body ? schema.body.parse(req.body) : undefined;
    const params = schema.params ? schema.params.parse(req.params) : undefined;
    const query = schema.query ? schema.query.parse(req.query) : undefined;
    if (body) req.body = body;
    if (params) req.params = params;
    if (query) req.query = query;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
    }
    next(err);
  }
};