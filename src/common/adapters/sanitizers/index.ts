import SanitizerError from '@/application/errors/sanitizer.error';
import ISanitizer from '@/application/ports/sanitizer/sanitizer';
import sanitizeHtml from 'sanitize-html';

class SanitizerAdapter implements ISanitizer<unknown, string> {
  sanitize(field: string, value: unknown = ''): string {
    if (typeof value !== 'string') {
      const err = new SanitizerError(`is not a valid string`);
      err.messages.push({ field, message: value as string });
      throw err;
    }

    return sanitizeHtml(value);
  }
}

const sanitizerSingleton = new SanitizerAdapter();

export default sanitizerSingleton;
