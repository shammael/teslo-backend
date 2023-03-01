/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { RequestValidationError } from '@/application/errors';
import { ZodError } from 'zod';
import { createProductSchema } from '../../schemas';

const createProductRequestValidatorAdapter = (productRequest: object) => {
  try {
    const result = createProductSchema.parse(productRequest);
    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      const d = new RequestValidationError('Validation error');
      error.errors.map((err) => {
        d.messages.push({
          field: err.path[1] as string,
          message: err.message,
        });
      });
      throw d;
    }
  }
};

export default createProductRequestValidatorAdapter;
