import { products } from '../src/data/products';

export const config = { runtime: 'edge' };

declare const process: { env: { OPENCODE_API_KEY?: string } };

const ENDPOINT = 'https://opencode.ai/zen/go/v1/chat/completions';
const MODEL = 'deepseek-v4-flash';

const SYSTEM_PROMPT = `Olet ÄmpäriApuri, Tokmannin ämpäriasiantuntija. Sinulle annetaan lista tuotteista JSON-muodossa ja käyttäjän kuvaus haluamastaan ämpäristä.
Valitse 4-8 sopivinta tuotetta. Vastaa AINOASTAAN JSON-arrayna tuote-id:istä, esimerkiksi: ["prod_1","prod_4","prod_7"]
Älä kirjoita mitään muuta.`;

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const apiKey = process.env.OPENCODE_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: 'OPENCODE_API_KEY puuttuu palvelimelta.' }, 500);
  }

  let userMessage: unknown;
  try {
    const body = (await req.json()) as { userMessage?: unknown };
    userMessage = body?.userMessage;
  } catch {
    return jsonResponse({ error: 'Virheellinen pyyntörunko.' }, 400);
  }

  if (typeof userMessage !== 'string' || !userMessage.trim()) {
    return jsonResponse({ error: 'userMessage puuttuu.' }, 400);
  }

  if (userMessage.length > 500) {
    return jsonResponse(
      { error: 'userMessage on liian pitkä (max 500 merkkiä).' },
      400,
    );
  }

  // Tiivistetty tuoteconteksti — kuvaus pois, säästää tokeneita ja generointiaikaa
  const productContext = products.map((p) => ({
    id: p.id,
    nimi: p.nimi,
    hinta: p.hinta,
    kategoria: p.kategoria,
  }));

  const userPrompt = `Tuotteet (JSON):\n${JSON.stringify(productContext)}\n\nKäyttäjän toive:\n${userMessage}`;

  const upstream = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = upstream.body ? (await upstream.text()).slice(0, 300) : '';
    return jsonResponse(
      { error: `OpenCode ${upstream.status}: ${detail}` },
      upstream.status,
    );
  }

  // Putkita upstream-SSE-vastaus suoraan asiakkaalle — selain kerää delta-sisällön
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
