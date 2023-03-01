var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, expect, it } from 'vitest';
import GenericCreatedResponse from './generic-created.response';
describe('Generic created response', () => {
    it('should have properties statusCode and body', () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = new GenericCreatedResponse();
        const resp = yield sut.response({ hola: 'test' });
        expect(resp).toEqual({ statusCode: 201, body: { hola: 'test' } });
    }));
});
