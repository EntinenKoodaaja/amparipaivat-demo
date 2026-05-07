export interface PresetBucket {
  id: string;
  nimi: string;
  kuvaus: string;
  teemaväri: string;
  tuoteIdt: string[];
}

export const presetBuckets: PresetBucket[] = [
  {
    id: 'festari',
    nimi: 'Festariämpäri',
    kuvaus:
      'Kaikki tarvittava festivaaliviikonloppuun — suojaa, energiaa ja menoa.',
    teemaväri: '#E3000F',
    tuoteIdt: ['u4', 'u8', 'h1', 'h3', 'h6', 'r1', 'r7', 'v1', 'v2'],
  },
  {
    id: 'sauna',
    nimi: 'Saunaämpäri',
    kuvaus:
      'Täydellinen saunailtasetti: peseytyminen, rauhoittuminen ja herkuttelu.',
    teemaväri: '#C0392B',
    tuoteIdt: ['h4', 'h7', 'h9', 'h10', 'r6', 'r8', 'v8'],
  },
  {
    id: 'retki',
    nimi: 'Retkiämpäri',
    kuvaus:
      'Helppo evässetti päiväretkelle tai leirille — kevyt, käytännöllinen, hauska.',
    teemaväri: '#27AE60',
    tuoteIdt: ['u6', 'u8', 'h1', 'h8', 'r3', 'r4', 'r5', 'v1', 'v7'],
  },
];
