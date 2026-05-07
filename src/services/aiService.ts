import { products } from '../data/products';

const ENDPOINT = '/api/generate';

export class AiServiceError extends Error {}


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchWithRetry(url: string, init: RequestInit, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    let response: Response;
    try {
      response = await fetch(url, init);
    } catch {
      if (attempt === retries) {
        throw new AiServiceError('Verkkoyhteys epäonnistui. Yritä hetken päästä uudelleen.');
      }
      await delay(2000 * (attempt + 1));
      continue;
    }

    if (response.status === 429) {
      if (attempt === retries) {
        throw new AiServiceError(
          'Palvelu on hetkellisesti ruuhkainen. Odota noin minuutti ja yritä uudelleen.',
        );
      }
      // Exponential backoff: 4s, 8s
      await delay(4000 * (attempt + 1));
      continue;
    }

    return response;
  }
  throw new AiServiceError('Pyyntö epäonnistui toistuvasti.');
}

const extractIds = (raw: string): string[] => {
  // Poistaa mahdolliset koodi-ympäröinnit kuten ```json ... ```
  const cleaned = raw
    .replace(/```json\s*/gi, '')
    .replace(/```/g, '')
    .trim();

  const match = cleaned.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new AiServiceError('ÄmpäriApuri palautti virheellisen vastauksen.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    throw new AiServiceError('ÄmpäriApurin vastauksen jäsentäminen epäonnistui.');
  }

  if (!Array.isArray(parsed) || !parsed.every((x) => typeof x === 'string')) {
    throw new AiServiceError('ÄmpäriApurin vastauksen muoto oli odottamaton.');
  }

  // Suodata vain olemassa olevat tuote-id:t
  const validIds = new Set(products.map((p) => p.id));
  const filtered = (parsed as string[]).filter((id) => validIds.has(id));

  if (filtered.length === 0) {
    throw new AiServiceError('ÄmpäriApuri ei löytänyt sopivia tuotteita.');
  }

  return filtered;
};

export async function generateBucketFromPrompt(
  userMessage: string,
): Promise<string[]> {
  const response = await fetchWithRetry(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage }),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const errBody = (await response.json()) as { error?: string };
      if (errBody?.error) detail = ` — ${errBody.error}`;
    } catch {
      // ignore parse errors
    }
    throw new AiServiceError(
      `ÄmpäriApuri vastasi virheellä (${response.status})${detail}.`,
    );
  }

  const data = (await response.json()) as { text?: string };
  const text = data?.text;

  if (!text) {
    throw new AiServiceError('ÄmpäriApuri ei palauttanut vastausta.');
  }

  return extractIds(text);
}
