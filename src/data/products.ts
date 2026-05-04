export type Category = 'ulkoilu' | 'hygienia' | 'ruoka' | 'viihde';

export interface Product {
  id: string;
  nimi: string;
  hinta: number;
  kategoria: Category;
  ikoni: string;
  kuvaus: string;
}

export const products: Product[] = [
  // --- ULKOILU ---
  {
    id: 'u1',
    nimi: 'Aurinkorasva SPF 50',
    hinta: 4.99,
    kategoria: 'ulkoilu',
    ikoni: '🌞',
    kuvaus: 'Vedenkestävä aurinkosuoja koko perheelle.',
  },
  {
    id: 'u2',
    nimi: 'Rantapallo',
    hinta: 3.49,
    kategoria: 'ulkoilu',
    ikoni: '🏐',
    kuvaus: 'Kirkas kesäpallo rannalle ja pihalle.',
  },
  {
    id: 'u3',
    nimi: 'Frisbee',
    hinta: 2.99,
    kategoria: 'ulkoilu',
    ikoni: '🥏',
    kuvaus: 'Kevyt muovifribi, sopii kaikenikäisille.',
  },
  {
    id: 'u4',
    nimi: 'Hyönteiskarkote spray',
    hinta: 5.49,
    kategoria: 'ulkoilu',
    ikoni: '🦟',
    kuvaus: 'Tehokas hyttyssuoja 8 tunnin suoja-ajalla.',
  },
  {
    id: 'u5',
    nimi: 'Vesipistoolit 2 kpl',
    hinta: 3.99,
    kategoria: 'ulkoilu',
    ikoni: '🔫',
    kuvaus: 'Hauska vesitaistelu kahdella vesipyssyllä.',
  },
  {
    id: 'u6',
    nimi: 'Rantamatto',
    hinta: 6.99,
    kategoria: 'ulkoilu',
    ikoni: '🏖️',
    kuvaus: 'Rullaantuva EVA-vaahtomuovimatto auringonoton alle.',
  },
  {
    id: 'u7',
    nimi: 'Badminton-setti',
    hinta: 8.99,
    kategoria: 'ulkoilu',
    ikoni: '🏸',
    kuvaus: '2 mailaa + 3 sulkapalloa, sopii kaikenikäisille.',
  },
  {
    id: 'u8',
    nimi: 'Taskulamppu',
    hinta: 4.49,
    kategoria: 'ulkoilu',
    ikoni: '🔦',
    kuvaus: 'Kompakti LED-taskulamppu retkeilyyn ja festivaaleille.',
  },

  // --- HYGIENIA ---
  {
    id: 'h1',
    nimi: 'Märkäpyyhkeet 60 kpl',
    hinta: 1.99,
    kategoria: 'hygienia',
    ikoni: '🧻',
    kuvaus: 'Kosteuspyyhkeet käsien puhdistukseen reissulla.',
  },
  {
    id: 'h2',
    nimi: 'Käsidesi 200 ml',
    hinta: 1.49,
    kategoria: 'hygienia',
    ikoni: '🧴',
    kuvaus: 'Antibakteerinen käsigeeli, sopii laukkuun.',
  },
  {
    id: 'h3',
    nimi: 'Deodorantti stick',
    hinta: 2.99,
    kategoria: 'hygienia',
    ikoni: '✨',
    kuvaus: '48h suoja, raikas kesähajuste.',
  },
  {
    id: 'h4',
    nimi: 'Shampoo 250 ml',
    hinta: 1.99,
    kategoria: 'hygienia',
    ikoni: '🧼',
    kuvaus: 'Päivittäinen shampoo kaikille hiustyypeille.',
  },
  {
    id: 'h5',
    nimi: 'Hammasharja + tahna -setti',
    hinta: 3.49,
    kategoria: 'hygienia',
    ikoni: '🦷',
    kuvaus: 'Matka-setti: harja ja mintuntäyteinen tahna.',
  },
  {
    id: 'h6',
    nimi: 'Kuulosuojaimet vaahto',
    hinta: 1.49,
    kategoria: 'hygienia',
    ikoni: '🎧',
    kuvaus: 'Pehmyt vaahtokuuloke, ideaali festivaaleille.',
  },
  {
    id: 'h7',
    nimi: 'Mikrokuituliina',
    hinta: 2.49,
    kategoria: 'hygienia',
    ikoni: '🏊',
    kuvaus: 'Nopeakuivuva pikaliina uimiseen ja saunaan.',
  },
  {
    id: 'h8',
    nimi: 'Laastari-lajitelma 20 kpl',
    hinta: 1.99,
    kategoria: 'hygienia',
    ikoni: '🩹',
    kuvaus: 'Eri kokoisia laastareita ensiaputarpeisiin.',
  },

  // --- RUOKA ---
  {
    id: 'r1',
    nimi: 'Energiajuoma 0,5 l',
    hinta: 1.49,
    kategoria: 'ruoka',
    ikoni: '⚡',
    kuvaus: 'Piristävä energiajuoma pitkille festaripäiville.',
  },
  {
    id: 'r2',
    nimi: 'Popcorn mikrossa 3 kpl',
    hinta: 1.99,
    kategoria: 'ruoka',
    ikoni: '🍿',
    kuvaus: 'Voinen popcorn elokuvailtaan tai leirille.',
  },
  {
    id: 'r3',
    nimi: 'Pähkinäsekoitus 200 g',
    hinta: 2.49,
    kategoria: 'ruoka',
    ikoni: '🥜',
    kuvaus: 'Energiapitoiset pähkinät retkieväisiin.',
  },
  {
    id: 'r4',
    nimi: 'Nuotiopannu makkara',
    hinta: 3.99,
    kategoria: 'ruoka',
    ikoni: '🌭',
    kuvaus: 'Perinteinen leirinuotiomakkara, 400 g paketti.',
  },
  {
    id: 'r5',
    nimi: 'Kahvipakkaus pikakahvi',
    hinta: 2.99,
    kategoria: 'ruoka',
    ikoni: '☕',
    kuvaus: 'Pikakahvisäkit retkikahviin — vain kuumaa vettä tarvitaan.',
  },
  {
    id: 'r6',
    nimi: 'Suklaalevy 200 g',
    hinta: 1.99,
    kategoria: 'ruoka',
    ikoni: '🍫',
    kuvaus: 'Maitosuklaalevy, hyvä herkku ämpäriin.',
  },
  {
    id: 'r7',
    nimi: 'Karkkipussi sekoitus',
    hinta: 1.79,
    kategoria: 'ruoka',
    ikoni: '🍬',
    kuvaus: 'Valikoimakarkit festarimatkalle.',
  },

  // --- VIIHDE ---
  {
    id: 'v1',
    nimi: 'Pelikortti-pakka',
    hinta: 2.49,
    kategoria: 'viihde',
    ikoni: '🃏',
    kuvaus: 'Klassinen 52 kortin pakka, sopii kaikkiin pelihetkin.',
  },
  {
    id: 'v2',
    nimi: 'Noppasetti 6 kpl',
    hinta: 1.99,
    kategoria: 'viihde',
    ikoni: '🎲',
    kuvaus: '6 värikästä noppaa lautapeleihin ja drinkkileikehin.',
  },
  {
    id: 'v3',
    nimi: 'Tikkataulu magneetti',
    hinta: 7.99,
    kategoria: 'viihde',
    ikoni: '🎯',
    kuvaus: 'Turvallinen magneettitikkataulu koko perheelle.',
  },
  {
    id: 'v4',
    nimi: 'Taskuradio FM',
    hinta: 9.99,
    kategoria: 'viihde',
    ikoni: '📻',
    kuvaus: 'Pienikokoinen FM-radio, toimii paristoilla.',
  },
  {
    id: 'v5',
    nimi: 'Muistikirja A6',
    hinta: 1.99,
    kategoria: 'viihde',
    ikoni: '📓',
    kuvaus: 'Kovakantinen muistikirja päiväkirjaksi tai piirtämiseen.',
  },
  {
    id: 'v6',
    nimi: 'Värikynäsetti 12 kpl',
    hinta: 2.49,
    kategoria: 'viihde',
    ikoni: '🖍️',
    kuvaus: '12 värikynää, sopii niin lapsille kuin aikuisille.',
  },
  {
    id: 'v7',
    nimi: 'Vaahtomuoviheitto-rengas',
    hinta: 3.99,
    kategoria: 'viihde',
    ikoni: '🪃',
    kuvaus: 'Pehmeä EVA-rengas, heitetään ja naapataan — hauska pihapeli.',
  },
];

export const BONUS_PRODUCT = {
  id: 'bonus-ampari',
  nimi: 'Tokmanni-ämpäri',
  hinta: 0,
  ikoni: '🪣',
  kuvaus: 'Kampanjatuote — kuuluu jokaiseen ämpäritilauksen!',
} as const;

export const kategoriat: { id: Category; nimi: string; ikoni: string }[] = [
  { id: 'ulkoilu', nimi: 'Ulkoilu', ikoni: '⛺' },
  { id: 'hygienia', nimi: 'Hygienia', ikoni: '🧴' },
  { id: 'ruoka', nimi: 'Ruoka & juoma', ikoni: '🍉' },
  { id: 'viihde', nimi: 'Viihde', ikoni: '🎮' },
];
