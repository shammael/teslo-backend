import { describe, it, expect } from 'vitest';
import RequestValidationError from './request-validation.error';
describe('ExistError', () => {
    it('should have the statusCode, the message and the field', () => {
        try {
            throw new RequestValidationError('Some Error message');
        }
        catch (error) {
            expect(error).toEqual(expect.objectContaining({
                name: 'RequestValidationError',
                message: 'Some Error message',
                statusCode: 400,
            }));
        }
    });
});
