import { describe, expect, it } from 'vitest';
import ExistError from './exist.error';

describe('ExistError', () => {
  it('should have the statusCode, the message and the field', () => {
    try {
      throw new ExistError('Some Error message');
    } catch (error) {
      expect(error).toEqual(
        expect.objectContaining({
          name: 'Exist Error',
          message: 'Some Error message',
          statusCode: 409,
        })
      );
    }
  });
});
