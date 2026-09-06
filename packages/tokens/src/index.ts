/**
 * Design tokens shared by the web storefront and (later) the Expo app.
 *
 * Kept as plain data so both consumers can read them: the Next.js Tailwind
 * config imports this directly, and NativeWind on mobile will do the same.
 * Nothing here may import from `next`, `react-native`, or Tailwind itself.
 */

export const color = {
  // Brand
  primary: '#2C7A70',       // teal — primary buttons, promo strip, active links
  primaryDark: '#215C55',
  primaryTint: '#E6F1EF',
  accent: '#E63329',        // coral — brand mark, active nav icon, badges
  accentInk: '#C0271D',     // deepened for text links (AA on white)

  // Neutrals
  ink: '#16203A',           // headings
  body: '#3A4256',
  muted: '#6B7280',
  line: '#E4E6EB',
  surface: '#FFFFFF',
  surface2: '#F4F5F7',

  // Card art sits on a near-black tile so holo/foil art reads properly
  tile: '#14161C',
  tileEdge: '#252833',

  // Collector's Club
  club: '#6D3BE4',
  clubTint: '#F0E9FF',
} as const;

/** Condition grades. Order matters — it drives filter + sort order. */
export const conditions = [
  { code: 'NM', label: 'Near Mint',  fg: '#0B6B5B', bg: '#DCF3EE' },
  { code: 'LP', label: 'Lightly Played', fg: '#1D5FA8', bg: '#E1EDFB' },
  { code: 'MP', label: 'Moderately Played', fg: '#8A5A00', bg: '#FCF0DA' },
  { code: 'HP', label: 'Heavily Played', fg: '#A2440B', bg: '#FCE8DA' },
  { code: 'DMG', label: 'Damaged', fg: '#A32219', bg: '#FBE3E1' },
] as const;

export const franchises = [
  { slug: 'pokemon',    name: 'Pokémon',     hue: '#F0B429', hue2: '#2B6CB0' },
  { slug: 'one-piece',  name: 'One Piece',   hue: '#C0271D', hue2: '#1B2A4A' },
  { slug: 'dragon-ball',name: 'Dragon Ball', hue: '#E8842A', hue2: '#1F5FA8' },
  { slug: 'yu-gi-oh',   name: 'Yu-Gi-Oh!',   hue: '#7A4BC4', hue2: '#2A1B3D' },
] as const;

export const radius = {
  tile: '4px',
  card: '12px',
  sheet: '20px',
  pill: '999px',
} as const;

export const font = {
  /** Headings: heavy, uppercase, letterspaced — matches the reference app. */
  heading: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
  body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
} as const;

export type ConditionCode = (typeof conditions)[number]['code'];
export type FranchiseSlug = (typeof franchises)[number]['slug'];
