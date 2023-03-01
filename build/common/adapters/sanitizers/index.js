import SanitizerError from '@/application/errors/sanitizer.error';
import sanitizeHtml from 'sanitize-html';
class SanitizerAdapter {
    sanitize(value) {
        if (typeof value !== 'string') {
            throw new SanitizerError('Invalid Error');
        }
        return sanitizeHtml(value);
    }
}
const sanitizerSingleton = new SanitizerAdapter();
export default sanitizerSingleton;
