import { describe, it, expect } from 'vitest';
import SanitizerError from './sanitizer.error';
describe('ExistError', () => {
    it('should have the statusCode, the message and the field', () => {
        try {
            throw new SanitizerError('Some Error message');
        }
        catch (error) {
            expect(error).toEqual(expect.objectContaining({
                name: 'SanitizerError',
                message: 'Some Error message',
                statusCode: 400,
            }));
        }
    });
});
