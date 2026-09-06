import { conditions, franchises } from '@shopapp/tokens';

/**
 * The catalogue holds three shapes of product and they behave differently
 * enough that flattening them into one "product with options" would lie:
 *
 *   single    — one printed card. Stock is usually 1, and condition,
 *               language and grading set the price.
 *   sealed    — packs, boxes, ETBs, tins, starter decks. Ordinary retail
 *               stock, sometimes sold as a preorder before it exists.
 *   accessory — sleeves, binders, toploaders, deck boxes, playmats. Ordinary
 *               retail stock, varies by colour and pack size, and mostly has
 *               no franchise at all.
 *
 * They share a Product/Variant spine so grids, cart and search stay generic;
 * the per-kind fields below are what each detail page actually sells.
 */
export type Kind = 'single' | 'sealed' | 'accessory';

export type ConditionCode = 'NM' | 'LP' | 'MP' | 'HP' | 'DMG';
export type Language = 'EN' | 'JP';
export type SealedKind = 'Booster Pack' | 'Booster Box' | 'Elite Trainer Box' | 'Starter Deck' | 'Collector Tin' | 'Booster Bundle';
export type GearCategory = 'Sleeves' | 'Binder' | 'Toploader' | 'Deck Box' | 'Playmat';

export type Product = {
  slug: string;
  name: string;
  kind: Kind;
  /** null for franchise-agnostic gear — a Dragon Shield binder is nobody's fandom. */
  franchise: string | null;

  // single
  set?: string;
  setCode?: string;
  number?: string;
  rarity?: string;

  // sealed
  sealedKind?: SealedKind;

  // accessory
  brand?: string;
  category?: GearCategory;
  blurb?: string;
};

export type Variant = {
  id: string;
  product: string;
  price: number;
  mrp?: number;
  stock: number;

  // single
  condition?: ConditionCode;
  graded?: { company: 'PSA' | 'BGS'; grade: number };

  // single + sealed
  language?: Language;
  edition?: '1st Edition' | 'Unlimited';

  // accessory
  colour?: { name: string; hex: string };
  packSize?: string;

  /** Sealed only: sold before it exists. Stock is 0 but it is still buyable. */
  preorder?: string;
};

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export const PRODUCTS: Product[] = [
  // ---- singles -----------------------------------------------------
  { slug: 'charizard-ex-223', name: 'Charizard ex', kind: 'single', franchise: 'pokemon', set: 'Obsidian Flames', setCode: 'OBF', number: '223/197', rarity: 'Special Illustration Rare' },
  { slug: 'pikachu-vmax-044', name: 'Pikachu VMAX', kind: 'single', franchise: 'pokemon', set: 'Vivid Voltage', setCode: 'VIV', number: '044/185', rarity: 'Ultra Rare' },
  { slug: 'mew-ex-205', name: 'Mew ex', kind: 'single', franchise: 'pokemon', set: 'Paldean Fates', setCode: 'PAF', number: '205/091', rarity: 'Special Illustration Rare' },
  { slug: 'umbreon-vmax-215', name: 'Umbreon VMAX', kind: 'single', franchise: 'pokemon', set: 'Evolving Skies', setCode: 'EVS', number: '215/203', rarity: 'Alternate Art Secret' },
  { slug: 'lugia-v-186', name: 'Lugia V', kind: 'single', franchise: 'pokemon', set: 'Silver Tempest', setCode: 'SIT', number: '186/195', rarity: 'Alternate Art' },
  { slug: 'gengar-vmax-271', name: 'Gengar VMAX', kind: 'single', franchise: 'pokemon', set: 'Fusion Strike', setCode: 'FST', number: '271/264', rarity: 'Alternate Art Secret' },
  { slug: 'luffy-op05-119', name: 'Monkey D. Luffy', kind: 'single', franchise: 'one-piece', set: 'Awakening of the New Era', setCode: 'OP05', number: '119', rarity: 'Secret Rare' },
  { slug: 'zoro-op01-025', name: 'Roronoa Zoro', kind: 'single', franchise: 'one-piece', set: 'Romance Dawn', setCode: 'OP01', number: '025', rarity: 'Super Rare' },
  { slug: 'shanks-op09-051', name: 'Shanks', kind: 'single', franchise: 'one-piece', set: 'Emperors in the New World', setCode: 'OP09', number: '051', rarity: 'Leader Parallel' },
  { slug: 'nami-op03-040', name: 'Nami', kind: 'single', franchise: 'one-piece', set: 'Pillars of Strength', setCode: 'OP03', number: '040', rarity: 'Super Rare' },
  { slug: 'law-op02-069', name: 'Trafalgar Law', kind: 'single', franchise: 'one-piece', set: 'Paramount War', setCode: 'OP02', number: '069', rarity: 'Alternate Art' },
  { slug: 'goku-bt21-121', name: 'Son Goku', kind: 'single', franchise: 'dragon-ball', set: 'Wild Resurgence', setCode: 'BT21', number: '121', rarity: 'Secret Rare' },
  { slug: 'vegeta-fb02-045', name: 'Vegeta', kind: 'single', franchise: 'dragon-ball', set: 'Blazing Aura', setCode: 'FB02', number: '045', rarity: 'Super Rare' },
  { slug: 'frieza-bt20-138', name: 'Frieza', kind: 'single', franchise: 'dragon-ball', set: 'Power Absorbed', setCode: 'BT20', number: '138', rarity: 'Special Rare' },
  { slug: 'gohan-bt19-091', name: 'Son Gohan', kind: 'single', franchise: 'dragon-ball', set: 'Fighter Ambition', setCode: 'BT19', number: '091', rarity: 'Super Rare' },
  { slug: 'blue-eyes-lob-001', name: 'Blue-Eyes White Dragon', kind: 'single', franchise: 'yu-gi-oh', set: 'Legend of Blue Eyes', setCode: 'LOB', number: '001', rarity: 'Ultra Rare' },
  { slug: 'dark-magician-lob-005', name: 'Dark Magician', kind: 'single', franchise: 'yu-gi-oh', set: 'Legend of Blue Eyes', setCode: 'LOB', number: '005', rarity: 'Ultra Rare' },
  { slug: 'exodia-lob-124', name: 'Exodia the Forbidden One', kind: 'single', franchise: 'yu-gi-oh', set: 'Legend of Blue Eyes', setCode: 'LOB', number: '124', rarity: 'Ultra Rare' },

  // ---- sealed ------------------------------------------------------
  { slug: 'obf-booster-box', name: 'Obsidian Flames Booster Box', kind: 'sealed', franchise: 'pokemon', sealedKind: 'Booster Box', set: 'Obsidian Flames', setCode: 'OBF', blurb: '36 packs · 10 cards per pack' },
  { slug: 'obf-booster-pack', name: 'Obsidian Flames Booster Pack', kind: 'sealed', franchise: 'pokemon', sealedKind: 'Booster Pack', set: 'Obsidian Flames', setCode: 'OBF', blurb: '10 cards · random art' },
  { slug: 'paf-etb', name: 'Paldean Fates Elite Trainer Box', kind: 'sealed', franchise: 'pokemon', sealedKind: 'Elite Trainer Box', set: 'Paldean Fates', setCode: 'PAF', blurb: '9 packs, sleeves, dice and a storage box' },
  { slug: 'surging-bundle', name: 'Surging Sparks Booster Bundle', kind: 'sealed', franchise: 'pokemon', sealedKind: 'Booster Bundle', set: 'Surging Sparks', setCode: 'SSP', blurb: '6 packs' },
  { slug: 'charizard-tin', name: 'Charizard ex Premium Collection Tin', kind: 'sealed', franchise: 'pokemon', sealedKind: 'Collector Tin', blurb: '4 packs + promo card' },
  { slug: 'op10-booster-box', name: 'OP-10 Royal Blood Booster Box', kind: 'sealed', franchise: 'one-piece', sealedKind: 'Booster Box', set: 'Royal Blood', setCode: 'OP10', blurb: '24 packs · 12 cards per pack' },
  { slug: 'op09-booster-pack', name: 'OP-09 Booster Pack', kind: 'sealed', franchise: 'one-piece', sealedKind: 'Booster Pack', set: 'Emperors in the New World', setCode: 'OP09', blurb: '12 cards' },
  { slug: 'st21-starter', name: 'ST-21 Gear 5 Starter Deck', kind: 'sealed', franchise: 'one-piece', sealedKind: 'Starter Deck', blurb: '51 cards · ready to play' },
  { slug: 'bt22-booster-box', name: 'BT-22 Booster Box', kind: 'sealed', franchise: 'dragon-ball', sealedKind: 'Booster Box', setCode: 'BT22', blurb: '24 packs' },
  { slug: 'fusion-starter', name: 'Fusion World Starter Deck — Goku', kind: 'sealed', franchise: 'dragon-ball', sealedKind: 'Starter Deck', blurb: '51 cards · ready to play' },
  { slug: 'ygo-25th-tin', name: '25th Anniversary Collector Tin', kind: 'sealed', franchise: 'yu-gi-oh', sealedKind: 'Collector Tin', blurb: '3 packs + 3 promo cards' },

  // ---- accessories -------------------------------------------------
  { slug: 'ds-matte-sleeves', name: 'Dragon Shield Matte Sleeves', kind: 'accessory', franchise: null, brand: 'Dragon Shield', category: 'Sleeves', blurb: '100 count · standard size · matte finish' },
  { slug: 'up-eclipse-sleeves', name: 'Ultra Pro Eclipse Sleeves', kind: 'accessory', franchise: null, brand: 'Ultra Pro', category: 'Sleeves', blurb: '100 count · standard size · opaque back' },
  { slug: 'penny-sleeves', name: 'Penny Sleeves', kind: 'accessory', franchise: null, brand: 'Ultra Pro', category: 'Sleeves', blurb: '100 count · soft inner sleeve' },
  { slug: 'ug-zipfolio-360', name: 'Ultimate Guard Zipfolio 360', kind: 'accessory', franchise: null, brand: 'Ultimate Guard', category: 'Binder', blurb: '9-pocket · 360 cards · zip closure' },
  { slug: 'vault-4pocket-binder', name: '4-Pocket Portfolio Binder', kind: 'accessory', franchise: null, brand: 'Vault', category: 'Binder', blurb: '4-pocket · 160 cards · side-loading' },
  { slug: 'toploader-35pt', name: 'Rigid Toploaders 35pt', kind: 'accessory', franchise: null, brand: 'Ultra Pro', category: 'Toploader', blurb: 'Pack of 25 · fits standard cards' },
  { slug: 'card-savers', name: 'Semi-Rigid Card Savers', kind: 'accessory', franchise: null, brand: 'Cardboard Gold', category: 'Toploader', blurb: 'Pack of 50 · grading submission safe' },
  { slug: 'ug-boulder-100', name: 'Ultimate Guard Boulder Deck Box 100+', kind: 'accessory', franchise: null, brand: 'Ultimate Guard', category: 'Deck Box', blurb: 'Holds 100 sleeved cards · magnetic close' },
  { slug: 'pokemon-playmat', name: 'Pokémon TCG Playmat', kind: 'accessory', franchise: 'pokemon', brand: 'Vault', category: 'Playmat', blurb: '60 × 35 cm · stitched edge · rubber base' },
  { slug: 'onepiece-playmat', name: 'One Piece Leader Playmat', kind: 'accessory', franchise: 'one-piece', brand: 'Vault', category: 'Playmat', blurb: '60 × 35 cm · stitched edge · rubber base' },
];

export const VARIANTS: Variant[] = [
  // singles
  { id: 'v1', product: 'charizard-ex-223', condition: 'NM', language: 'EN', price: 18400, mrp: 21000, stock: 1 },
  { id: 'v2', product: 'charizard-ex-223', condition: 'LP', language: 'EN', price: 14900, stock: 1 },
  { id: 'v3', product: 'charizard-ex-223', condition: 'NM', language: 'JP', price: 11200, stock: 2 },
  { id: 'v4', product: 'charizard-ex-223', condition: 'NM', language: 'EN', graded: { company: 'PSA', grade: 10 }, price: 46000, stock: 1 },
  { id: 'v5', product: 'pikachu-vmax-044', condition: 'NM', language: 'EN', price: 3400, mrp: 3900, stock: 3 },
  { id: 'v6', product: 'pikachu-vmax-044', condition: 'MP', language: 'EN', price: 2100, stock: 1 },
  { id: 'v7', product: 'mew-ex-205', condition: 'NM', language: 'EN', price: 9800, stock: 1 },
  { id: 'v8', product: 'umbreon-vmax-215', condition: 'NM', language: 'JP', price: 31500, stock: 1 },
  { id: 'v9', product: 'umbreon-vmax-215', condition: 'LP', language: 'EN', price: 27800, stock: 1 },
  { id: 'v10', product: 'lugia-v-186', condition: 'NM', language: 'EN', price: 7600, stock: 2 },
  { id: 'v11', product: 'gengar-vmax-271', condition: 'NM', language: 'EN', price: 12400, mrp: 14000, stock: 1 },
  { id: 'v12', product: 'luffy-op05-119', condition: 'NM', language: 'EN', price: 8900, mrp: 10500, stock: 1 },
  { id: 'v13', product: 'luffy-op05-119', condition: 'NM', language: 'JP', price: 6400, stock: 2 },
  { id: 'v14', product: 'zoro-op01-025', condition: 'LP', language: 'EN', price: 2800, stock: 1 },
  { id: 'v15', product: 'shanks-op09-051', condition: 'NM', language: 'EN', price: 5200, stock: 4 },
  { id: 'v16', product: 'nami-op03-040', condition: 'NM', language: 'JP', price: 1950, stock: 6 },
  { id: 'v17', product: 'law-op02-069', condition: 'NM', language: 'EN', graded: { company: 'BGS', grade: 9.5 }, price: 15800, stock: 1 },
  { id: 'v18', product: 'goku-bt21-121', condition: 'NM', language: 'EN', price: 4600, mrp: 5400, stock: 2 },
  { id: 'v19', product: 'vegeta-fb02-045', condition: 'NM', language: 'EN', price: 2200, stock: 5 },
  { id: 'v20', product: 'frieza-bt20-138', condition: 'HP', language: 'EN', price: 890, stock: 1 },
  { id: 'v21', product: 'gohan-bt19-091', condition: 'NM', language: 'JP', price: 1750, stock: 3 },
  { id: 'v22', product: 'blue-eyes-lob-001', condition: 'MP', language: 'EN', price: 24000, stock: 1 },
  { id: 'v23', product: 'dark-magician-lob-005', condition: 'LP', language: 'EN', price: 16500, stock: 1 },
  { id: 'v24', product: 'exodia-lob-124', condition: 'NM', language: 'JP', graded: { company: 'PSA', grade: 9 }, price: 38000, stock: 1 },

  // sealed — language and edition are the axes here, never condition
  { id: 'v30', product: 'obf-booster-box', language: 'EN', price: 12900, mrp: 14500, stock: 8 },
  { id: 'v31', product: 'obf-booster-box', language: 'JP', price: 9400, stock: 3 },
  { id: 'v32', product: 'obf-booster-pack', language: 'EN', price: 420, stock: 64 },
  { id: 'v33', product: 'obf-booster-pack', language: 'JP', price: 340, stock: 40 },
  { id: 'v34', product: 'paf-etb', language: 'EN', price: 6400, stock: 12 },
  { id: 'v35', product: 'surging-bundle', language: 'EN', price: 2600, mrp: 2900, stock: 18 },
  { id: 'v36', product: 'charizard-tin', language: 'EN', price: 3200, stock: 6 },
  { id: 'v37', product: 'op10-booster-box', language: 'EN', price: 9800, stock: 0, preorder: 'Ships 14 Nov' },
  { id: 'v38', product: 'op10-booster-box', language: 'JP', price: 7600, stock: 0, preorder: 'Ships 21 Nov' },
  { id: 'v39', product: 'op09-booster-pack', language: 'EN', price: 480, stock: 52 },
  { id: 'v40', product: 'st21-starter', language: 'EN', price: 1350, stock: 9 },
  { id: 'v41', product: 'bt22-booster-box', language: 'EN', price: 8600, stock: 4 },
  { id: 'v42', product: 'fusion-starter', language: 'EN', price: 1250, stock: 14 },
  { id: 'v43', product: 'ygo-25th-tin', language: 'EN', price: 2400, mrp: 2800, stock: 7 },

  // accessories — colour and pack size are the axes
  { id: 'v50', product: 'ds-matte-sleeves', colour: { name: 'Matte Black', hex: '#1B1B1F' }, packSize: '100 ct', price: 1150, mrp: 1300, stock: 24 },
  { id: 'v51', product: 'ds-matte-sleeves', colour: { name: 'Crimson', hex: '#9E2B24' }, packSize: '100 ct', price: 1150, stock: 11 },
  { id: 'v52', product: 'ds-matte-sleeves', colour: { name: 'Cobalt', hex: '#26497E' }, packSize: '100 ct', price: 1150, stock: 6 },
  { id: 'v53', product: 'ds-matte-sleeves', colour: { name: 'Forest', hex: '#2C5A3A' }, packSize: '100 ct', price: 1150, stock: 0 },
  { id: 'v54', product: 'up-eclipse-sleeves', colour: { name: 'Jet Black', hex: '#15161A' }, packSize: '100 ct', price: 950, stock: 30 },
  { id: 'v55', product: 'up-eclipse-sleeves', colour: { name: 'Arctic White', hex: '#E8E9EC' }, packSize: '100 ct', price: 950, stock: 15 },
  { id: 'v56', product: 'penny-sleeves', colour: { name: 'Clear', hex: '#C9CDD6' }, packSize: '100 ct', price: 250, stock: 80 },
  { id: 'v57', product: 'ug-zipfolio-360', colour: { name: 'Black', hex: '#1B1B1F' }, price: 3400, mrp: 3900, stock: 5 },
  { id: 'v58', product: 'ug-zipfolio-360', colour: { name: 'Blue', hex: '#26497E' }, price: 3400, stock: 2 },
  { id: 'v59', product: 'vault-4pocket-binder', colour: { name: 'Black', hex: '#1B1B1F' }, price: 1200, stock: 20 },
  { id: 'v60', product: 'vault-4pocket-binder', colour: { name: 'Red', hex: '#9E2B24' }, price: 1200, stock: 13 },
  { id: 'v61', product: 'toploader-35pt', packSize: '25 pack', price: 450, stock: 46 },
  { id: 'v62', product: 'toploader-35pt', packSize: '100 pack', price: 1500, mrp: 1800, stock: 18 },
  { id: 'v63', product: 'card-savers', packSize: '50 pack', price: 600, stock: 22 },
  { id: 'v64', product: 'ug-boulder-100', colour: { name: 'Onyx', hex: '#1B1B1F' }, price: 1400, stock: 9 },
  { id: 'v65', product: 'pokemon-playmat', price: 1800, mrp: 2100, stock: 7 },
  { id: 'v66', product: 'onepiece-playmat', price: 1800, stock: 4 },
];

/* ------------------------------------------------------------------ */
/* Derived views                                                       */
/* ------------------------------------------------------------------ */

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Cheapest first, but anything actually in stock outranks a preorder. */
export const variantsFor = (slug: string) =>
  VARIANTS.filter((v) => v.product === slug).sort(
    (a, b) => Number(b.stock > 0) - Number(a.stock > 0) || a.price - b.price,
  );

export type Tile = { product: Product; variant: Variant; count: number };

export function tiles(filter?: {
  kind?: Kind;
  franchise?: string;
  category?: GearCategory;
  sealedKind?: SealedKind;
  brand?: string;
  condition?: ConditionCode[];
  language?: Language[];
  inStock?: boolean;
}): Tile[] {
  const out: Tile[] = [];
  for (const product of PRODUCTS) {
    if (filter?.kind && product.kind !== filter.kind) continue;
    // Gear with no franchise stays visible under a franchise filter only when
    // it is genuinely licensed for it (playmats), never as a false match.
    if (filter?.franchise && product.franchise !== filter.franchise) continue;
    if (filter?.category && product.category !== filter.category) continue;
    if (filter?.sealedKind && product.sealedKind !== filter.sealedKind) continue;
    if (filter?.brand && product.brand !== filter.brand) continue;

    let vs = variantsFor(product.slug);
    if (filter?.condition?.length) vs = vs.filter((v) => v.condition && filter.condition!.includes(v.condition));
    if (filter?.language?.length) vs = vs.filter((v) => v.language && filter.language!.includes(v.language));
    if (filter?.inStock) vs = vs.filter((v) => v.stock > 0 || v.preorder);
    if (!vs.length) continue;

    out.push({ product, variant: vs[0], count: vs.length });
  }
  return out;
}

/** Which facets a browse view should offer, given what's being listed. */
export function facetsFor(kind: Kind | undefined) {
  return {
    condition: kind === 'single',
    language: kind === 'single' || kind === 'sealed' || kind === undefined,
    sealedKind: kind === 'sealed',
    category: kind === 'accessory',
    brand: kind === 'accessory',
    franchise: kind !== 'accessory',
  };
}

export const GEAR_CATEGORIES: GearCategory[] = ['Sleeves', 'Binder', 'Toploader', 'Deck Box', 'Playmat'];
export const SEALED_KINDS: SealedKind[] = ['Booster Pack', 'Booster Box', 'Elite Trainer Box', 'Booster Bundle', 'Starter Deck', 'Collector Tin'];
export const BRANDS = [...new Set(PRODUCTS.filter((p) => p.brand).map((p) => p.brand!))];

export const KINDS: { id: Kind; label: string }[] = [
  { id: 'single', label: 'Singles' },
  { id: 'sealed', label: 'Sealed' },
  { id: 'accessory', label: 'Accessories' },
];

export const conditionMeta = (code: string) => conditions.find((c) => c.code === code)!;
export const franchiseMeta = (slug: string | null) =>
  franchises.find((f) => f.slug === slug) ?? { slug: 'gear', name: 'Gear', hue: '#4B5563', hue2: '#1F2937' };

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

/** Short line describing a variant, used wherever a chosen option is echoed back. */
export function variantLabel(v: Variant): string {
  const bits: string[] = [];
  if (v.condition) bits.push(v.condition);
  if (v.graded) bits.push(`${v.graded.company} ${v.graded.grade}`);
  if (v.language) bits.push(v.language);
  if (v.colour) bits.push(v.colour.name);
  if (v.packSize) bits.push(v.packSize);
  return bits.join(' · ');
}

export { conditions, franchises };
