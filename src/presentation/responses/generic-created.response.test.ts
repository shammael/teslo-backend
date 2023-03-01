import { describe, expect, it } from 'vitest';
import GenericCreatedResponse from './generic-created.response';

describe('Generic created response', () => {
  it('should have properties statusCode and body', async () => {
    const sut = new GenericCreatedResponse();
    const resp = await sut.response({ hola: 'test' });
    expect(resp).toEqual({ statusCode: 201, body: { hola: 'test' } });
  });
});
