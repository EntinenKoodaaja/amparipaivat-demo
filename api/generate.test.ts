import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

// Pakollinen ennen handlerin importtia, koska handler lukee process.envin moduulitasolla
declare const process: { env: { OPENCODE_API_KEY?: string } };
process.env.OPENCODE_API_KEY = 'test-key';

import handler from './generate';

const MAX_LENGTH = 500;

const makeRequest = (body: unknown) =>
  new Request('http://localhost/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('api/generate: userMessage-pituusraja', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    // Mokataan OpenCode-fetch, ettei testi tee oikeaa API-kutsua
    originalFetch = globalThis.fetch;
    fetchMock = vi.fn().mockResolvedValue(
      new Response('data: [DONE]\n\n', {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
      }),
    );
    globalThis.fetch = fetchMock as unknown as typeof globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test(`hylkää viestin joka on yli ${MAX_LENGTH} merkkiä (palauttaa 400)`, async () => {
    const tooLong = 'a'.repeat(MAX_LENGTH + 1);
    const res = await handler(makeRequest({ userMessage: tooLong }));

    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test(`hyväksyy viestin joka on tasan ${MAX_LENGTH} merkkiä`, async () => {
    const exact = 'a'.repeat(MAX_LENGTH);
    const res = await handler(makeRequest({ userMessage: exact }));

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  test('hylkää tyhjän viestin', async () => {
    const res = await handler(makeRequest({ userMessage: '   ' }));

    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
