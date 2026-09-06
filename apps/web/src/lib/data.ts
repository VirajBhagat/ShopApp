import { conditions, franchises } from '@shopapp/tokens';

export type ConditionCode = 'NM' | 'LP' | 'MP' | 'HP' | 'DMG';
export type Language = 'EN' | 'JP';

/** A printed card — the *definition*, independent of any copy we hold. */
export type Card = {
  slug: string;
  name: string;
  franchise: string;
  set: string;
  setCode: string;
  number: string;
  rarity: string;
};

/**
 * A physical copy we actually own and can sell. Condition, language and
 * grading live here, not on the Card — an NM and an MP copy of the same card
 * are different products at different prices, and stock is usually 1.
 */
export type Listing = {
  id: string;
  cardSlug: string;
  condition: ConditionCode;
  language: Language;
  graded?: { company: 'PSA' | 'BGS'; grade: number };
  price: number;
  mrp?: number;
  stock: number;
};

export type Sealed = {
  slug: string;
  name: string;
  franchise: string;
  kind: 'Booster Box' | 'Elite Trainer Box' | 'Starter Deck';
  price: number;
  mrp?: number;
  stock: number;
  preorder?: string;
};

export const CARDS: Card[] = [
  { slug: 'charizard-ex-223', name: 'Charizard ex', franchise: 'pokemon', set: 'Obsidian Flames', setCode: 'OBF', number: '223/197', rarity: 'Special Illustration Rare' },
  { slug: 'pikachu-vmax-044', name: 'Pikachu VMAX', franchise: 'pokemon', set: 'Vivid Voltage', setCode: 'VIV', number: '044/185', rarity: 'Ultra Rare' },
  { slug: 'mew-ex-205', name: 'Mew ex', franchise: 'pokemon', set: 'Paldean Fates', setCode: 'PAF', number: '205/091', rarity: 'Special Illustration Rare' },
  { slug: 'umbreon-vmax-215', name: 'Umbreon VMAX', franchise: 'pokemon', set: 'Evolving Skies', setCode: 'EVS', number: '215/203', rarity: 'Alternate Art Secret' },
  { slug: 'lugia-v-186', name: 'Lugia V', franchise: 'pokemon', set: 'Silver Tempest', setCode: 'SIT', number: '186/195', rarity: 'Alternate Art' },
  { slug: 'gengar-vmax-271', name: 'Gengar VMAX', franchise: 'pokemon', set: 'Fusion Strike', setCode: 'FST', number: '271/264', rarity: 'Alternate Art Secret' },

  { slug: 'luffy-op05-119', name: 'Monkey D. Luffy', franchise: 'one-piece', set: 'Awakening of the New Era', setCode: 'OP05', number: '119', rarity: 'Secret Rare' },
  { slug: 'zoro-op01-025', name: 'Roronoa Zoro', franchise: 'one-piece', set: 'Romance Dawn', setCode: 'OP01', number: '025', rarity: 'Super Rare' },
  { slug: 'shanks-op09-051', name: 'Shanks', franchise: 'one-piece', set: 'Emperors in the New World', setCode: 'OP09', number: '051', rarity: 'Leader Parallel' },
  { slug: 'nami-op03-040', name: 'Nami', franchise: 'one-piece', set: 'Pillars of Strength', setCode: 'OP03', number: '040', rarity: 'Super Rare' },
  { slug: 'law-op02-069', name: 'Trafalgar Law', franchise: 'one-piece', set: 'Paramount War', setCode: 'OP02', number: '069', rarity: 'Alternate Art' },

  { slug: 'goku-bt21-121', name: 'Son Goku', franchise: 'dragon-ball', set: 'Wild Resurgence', setCode: 'BT21', number: '121', rarity: 'Secret Rare' },
  { slug: 'vegeta-fb02-045', name: 'Vegeta', franchise: 'dragon-ball', set: 'Blazing Aura', setCode: 'FB02', number: '045', rarity: 'Super Rare' },
  { slug: 'frieza-bt20-138', name: 'Frieza', franchise: 'dragon-ball', set: 'Power Absorbed', setCode: 'BT20', number: '138', rarity: 'Special Rare' },
  { slug: 'gohan-bt19-091', name: 'Son Gohan', franchise: 'dragon-ball', set: 'Fighter Ambition', setCode: 'BT19', number: '091', rarity: 'Super Rare' },

  { slug: 'blue-eyes-lob-001', name: 'Blue-Eyes White Dragon', franchise: 'yu-gi-oh', set: 'Legend of Blue Eyes', setCode: 'LOB', number: '001', rarity: 'Ultra Rare' },
  { slug: 'dark-magician-lob-005', name: 'Dark Magician', franchise: 'yu-gi-oh', set: 'Legend of Blue Eyes', setCode: 'LOB', number: '005', rarity: 'Ultra Rare' },
  { slug: 'exodia-lob-124', name: 'Exodia the Forbidden One', franchise: 'yu-gi-oh', set: 'Legend of Blue Eyes', setCode: 'LOB', number: '124', rarity: 'Ultra Rare' },
];

export const LISTINGS: Listing[] = [
  { id: 'l1',  cardSlug: 'charizard-ex-223', condition: 'NM', language: 'EN', price: 18400, mrp: 21000, stock: 1 },
  { id: 'l2',  cardSlug: 'charizard-ex-223', condition: 'LP', language: 'EN', price: 14900, stock: 1 },
  { id: 'l3',  cardSlug: 'charizard-ex-223', condition: 'NM', language: 'JP', price: 11200, stock: 2 },
  { id: 'l4',  cardSlug: 'charizard-ex-223', condition: 'NM', language: 'EN', graded: { company: 'PSA', grade: 10 }, price: 46000, stock: 1 },
  { id: 'l5',  cardSlug: 'pikachu-vmax-044', condition: 'NM', language: 'EN', price: 3400, mrp: 3900, stock: 3 },
  { id: 'l6',  cardSlug: 'pikachu-vmax-044', condition: 'MP', language: 'EN', price: 2100, stock: 1 },
  { id: 'l7',  cardSlug: 'mew-ex-205', condition: 'NM', language: 'EN', price: 9800, stock: 1 },
  { id: 'l8',  cardSlug: 'umbreon-vmax-215', condition: 'NM', language: 'JP', price: 31500, stock: 1 },
  { id: 'l9',  cardSlug: 'umbreon-vmax-215', condition: 'LP', language: 'EN', price: 27800, stock: 1 },
  { id: 'l10', cardSlug: 'lugia-v-186', condition: 'NM', language: 'EN', price: 7600, stock: 2 },
  { id: 'l11', cardSlug: 'gengar-vmax-271', condition: 'NM', language: 'EN', price: 12400, mrp: 14000, stock: 1 },

  { id: 'l12', cardSlug: 'luffy-op05-119', condition: 'NM', language: 'EN', price: 8900, mrp: 10500, stock: 1 },
  { id: 'l13', cardSlug: 'luffy-op05-119', condition: 'NM', language: 'JP', price: 6400, stock: 2 },
  { id: 'l14', cardSlug: 'zoro-op01-025', condition: 'LP', language: 'EN', price: 2800, stock: 1 },
  { id: 'l15', cardSlug: 'shanks-op09-051', condition: 'NM', language: 'EN', price: 5200, stock: 4 },
  { id: 'l16', cardSlug: 'nami-op03-040', condition: 'NM', language: 'JP', price: 1950, stock: 6 },
  { id: 'l17', cardSlug: 'law-op02-069', condition: 'NM', language: 'EN', graded: { company: 'BGS', grade: 9.5 }, price: 15800, stock: 1 },

  { id: 'l18', cardSlug: 'goku-bt21-121', condition: 'NM', language: 'EN', price: 4600, mrp: 5400, stock: 2 },
  { id: 'l19', cardSlug: 'vegeta-fb02-045', condition: 'NM', language: 'EN', price: 2200, stock: 5 },
  { id: 'l20', cardSlug: 'frieza-bt20-138', condition: 'HP', language: 'EN', price: 890, stock: 1 },
  { id: 'l21', cardSlug: 'gohan-bt19-091', condition: 'NM', language: 'JP', price: 1750, stock: 3 },

  { id: 'l22', cardSlug: 'blue-eyes-lob-001', condition: 'MP', language: 'EN', price: 24000, stock: 1 },
  { id: 'l23', cardSlug: 'dark-magician-lob-005', condition: 'LP', language: 'EN', price: 16500, stock: 1 },
  { id: 'l24', cardSlug: 'exodia-lob-124', condition: 'NM', language: 'JP', graded: { company: 'PSA', grade: 9 }, price: 38000, stock: 1 },
];

export const SEALED: Sealed[] = [
  { slug: 'obf-booster-box', name: 'Obsidian Flames Booster Box', franchise: 'pokemon', kind: 'Booster Box', price: 12900, mrp: 14500, stock: 8 },
  { slug: 'paf-etb', name: 'Paldean Fates Elite Trainer Box', franchise: 'pokemon', kind: 'Elite Trainer Box', price: 6400, stock: 12 },
  { slug: 'op10-booster-box', name: 'OP-10 Royal Blood Booster Box', franchise: 'one-piece', kind: 'Booster Box', price: 9800, stock: 0, preorder: 'Ships 14 Nov' },
  { slug: 'bt22-booster-box', name: 'BT-22 Booster Box', franchise: 'dragon-ball', kind: 'Booster Box', price: 8600, stock: 4 },
];

/* ------------------------------------------------------------------ */
/* Derived views                                                       */
/* ------------------------------------------------------------------ */

export const cardBySlug = (slug: string) => CARDS.find((c) => c.slug === slug);

export const listingsForCard = (slug: string) =>
  LISTINGS.filter((l) => l.cardSlug === slug).sort((a, b) => a.price - b.price);

/** The tile shown in a grid: a card plus its cheapest available copy. */
export type Tile = { card: Card; listing: Listing; copies: number };

export function tiles(filter?: {
  franchise?: string;
  condition?: ConditionCode[];
  language?: Language[];
  inStock?: boolean;
}): Tile[] {
  const out: Tile[] = [];
  for (const card of CARDS) {
    if (filter?.franchise && card.franchise !== filter.franchise) continue;
    let ls = listingsForCard(card.slug);
    if (filter?.condition?.length) ls = ls.filter((l) => filter.condition!.includes(l.condition));
    if (filter?.language?.length) ls = ls.filter((l) => filter.language!.includes(l.language));
    if (filter?.inStock) ls = ls.filter((l) => l.stock > 0);
    if (!ls.length) continue;
    out.push({ card, listing: ls[0], copies: ls.length });
  }
  return out;
}

export const conditionMeta = (code: string) => conditions.find((c) => c.code === code)!;
export const franchiseMeta = (slug: string) => franchises.find((f) => f.slug === slug)!;

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export { conditions, franchises };
