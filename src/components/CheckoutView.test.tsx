import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckoutView from './CheckoutView';
import type { Product } from '../data/products';

const tuote = (id: string, hinta: number): Product => ({
  id,
  nimi: `Tuote ${id}`,
  hinta,
  kategoria: 'ulkoilu',
  ikoni: '📦',
  kuvaus: 'kuvaus',
});

describe('CheckoutView: loppusumma', () => {
  test('Loppusumma-laatikon näkyvät rivit summautuvat Yhteensä-arvoon (ei bonusta)', () => {
    // 3 tuotetta → ei bonusta → ämpäri maksaa 3,99 €
    const valitut: Product[] = [tuote('t1', 5), tuote('t2', 5), tuote('t3', 5)];

    render(<CheckoutView selectedProducts={valitut} bucketName="Oma ämpäri" onBack={() => {}} />);

    // Hae loppusumma-laatikko: Yhteensä-otsikon iso-iso vanhempi (motion.div).
    // Yhteensä-rivi on flex-row, sen vanhempi on koko laatikko.
    const yhteensaOtsikko = screen.getByText(/^Yhteensä$/i);
    const yhteensaRivi = yhteensaOtsikko.parentElement;
    expect(yhteensaRivi).not.toBeNull();
    const laatikko = yhteensaRivi!.parentElement;
    expect(laatikko).not.toBeNull();

    // Poimi laatikosta kaikki näkyvät euro-arvot esim. "15,00 €"
    const teksti = laatikko!.textContent ?? '';
    const euroMerkinnat = [...teksti.matchAll(/(\d+),(\d{2}) ?€/g)].map((m) =>
      parseFloat(`${m[1]}.${m[2]}`),
    );

    // Pitää löytyä vähintään 2 lukua (tuotteet + yhteensä)
    expect(euroMerkinnat.length).toBeGreaterThanOrEqual(2);

    // Viimeinen luku = Yhteensä, muut = erittelyrivit
    const yhteensa = euroMerkinnat[euroMerkinnat.length - 1];
    const erittelynSumma = euroMerkinnat
      .slice(0, -1)
      .reduce((sum, n) => sum + n, 0);

    // Mitä käyttäjä näkee, sen pitää summautua yhteensä-lukuun
    expect(erittelynSumma).toBeCloseTo(yhteensa, 2);
  });
});
