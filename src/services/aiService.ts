import { products } from '../data/products';

const ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

const SYSTEM_PROMPT = `Olet Tokmannin ämpäriasiantuntija. Sinulle annetaan lista tuotteista JSON-muodossa ja käyttäjän kuvaus haluamastaan ämpäristä.
Valitse 4-8 sopivinta tuotetta. Vastaa AINOASTAAN JSON-arrayna tuote-id:istä, esimerkiksi: ["prod_1","prod_4","prod_7"]
Älä kirjoita mitään muuta.`;

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
    throw new AiServiceError('AI palautti virheellisen vastauksen.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    throw new AiServiceError('AI:n vastauksen jäsentäminen epäonnistui.');
  }

  if (!Array.isArray(parsed) || !parsed.every((x) => typeof x === 'string')) {
    throw new AiServiceError('AI:n vastauksen muoto oli odottamaton.');
  }

  // Suodata vain olemassa olevat tuote-id:t
  const validIds = new Set(products.map((p) => p.id));
  const filtered = (parsed as string[]).filter((id) => validIds.has(id));

  if (filtered.length === 0) {
    throw new AiServiceError('AI ei löytänyt sopivia tuotteita.');
  }

  return filtered;
};

export async function generateBucketFromPrompt(
  userMessage: string,
): Promise<string[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new AiServiceError('API-avain puuttuu — tarkista .env.local.');
  }

  const productContext = products.map((p) => ({
    id: p.id,
    nimi: p.nimi,
    hinta: p.hinta,
    kategoria: p.kategoria,
    kuvaus: p.kuvaus,
  }));

  const userPrompt = `Tuotteet (JSON):\n${JSON.stringify(productContext)}\n\nKäyttäjän toive:\n${userMessage}`;

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ parts: [{ text: userPrompt }] }],
  });

  const response = await fetchWithRetry(
    `${ENDPOINT}?key=${encodeURIComponent(apiKey)}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body },
  );

  if (!response.ok) {
    throw new AiServiceError(
      `AI-palvelu vastasi virheellä (${response.status}). Yritä uudelleen.`,
    );
  }

  const data = await response.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new AiServiceError('AI ei palauttanut vastausta.');
  }

  return extractIds(text);
}
