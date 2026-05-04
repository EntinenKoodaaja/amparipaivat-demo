# Ämpäri-äppi

## Konsepti
Demo-app Tokmannin kesän Ämpäripäivät-kampanjaan. Kuluttaja voi valita valmiin
teemaämpärin, generoida ämpärin AI:lla tai rakentaa oman valitsemalla tuotteet —
ja edetä kassalle.

## Tech stack
- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 — konfigurointi `src/index.css`:ssä `@import "tailwindcss"` + `@theme`-lohkossa (ei tailwind.config.js)
- `@tailwindcss/vite` plugin (ei PostCSS)
- Framer Motion v12
- Gemini API — malli `gemini-3-flash-preview`, endpoint `v1beta`

## Design
- Värit: `--color-tokmanni-red: #E3000F`, `--color-tokmanni-red-dark: #B8000C`
- Logo: `src/components/TokmanniLogo.tsx` — inline SVG, ei PNG
- Ämpäri: `src/components/TokmanniBucket.tsx` — inline SVG, käytetään kaikkialla emojin sijaan

## Ympäristömuuttujat
- `VITE_GEMINI_API_KEY` — `.env.local`-tiedostossa (gitignore'd)

## Tiedostorakenne

### Data
- `src/data/products.ts` — 30 tuotetta + `BONUS_PRODUCT` (ilmainen Tokmanni-ämpäri, aina mukana)
- `src/data/presetBuckets.ts` — 3 valmista ämpäriä (Festari, Sauna, Retki)

### Komponentit
- `src/components/Header.tsx` — sticky header, TokmanniLogo + navigaatio
- `src/components/Hero.tsx` — punainen hero, iso ämpäri-animaatio
- `src/components/PresetBuckets.tsx` — 3 valmista ämpäriä, whileInView-animaatiot
- `src/components/AiBucketGenerator.tsx` — Gemini-generointi, ladataan BucketAnimation + kutsutaan `onResult(ids)`
- `src/components/BucketBuilder.tsx` — stateless, vastaanottaa `selected/onToggle/onRemove/onClear/onCheckout` propseina
- `src/components/ProductGrid.tsx` — tuotteet kategorioittain, checkboxit
- `src/components/BucketPreview.tsx` — sticky oikea sarake, BONUS_PRODUCT aina näkyvissä
- `src/components/BucketAnimation.tsx` — lento + tärinä + konfetti, "Jatka tilaukseen" → `onCheckout()`
- `src/components/CheckoutView.tsx` — tilauksen yhteenveto, toimitustapa (nouto/kotiinkuljetus), tilausvahvistus-modal
- `src/components/TokmanniBucket.tsx` — SVG-ämpäri, props: `className`, `style`; käytä `h-{n} w-auto`
- `src/components/TokmanniLogo.tsx` — SVG-logo, punainen, ei taustaa

### Palvelu
- `src/services/aiService.ts` — `generateBucket(prompt, productIds)`, `fetchWithRetry` (2 yritystä, 429 → exp. backoff 4s/8s)

## App-tason tila (`src/App.tsx`)
- `selected: Set<string>` + `bucketName: string` — jaetaan alas
- `loadPreset(ids, name?)` — asettaa valinnat + scrollaa `#rakenna`-osioon
- `showCheckout: boolean` — vaihtaa päänäkymän ja CheckoutView'n välillä
