import type { Config } from 'tailwindcss';
import { color, radius, font } from '@shopapp/tokens';

/**
 * Tailwind reads straight from the shared token package, so the palette can
 * never drift between web and the future Expo app (NativeWind reads the same
 * file). Add colours to packages/tokens, not here.
 */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: color.primary, dark: color.primaryDark, tint: color.primaryTint },
        accent: { DEFAULT: color.accent, ink: color.accentInk },
        ink: color.ink,
        body: color.body,
        muted: color.muted,
        line: color.line,
        surface: { DEFAULT: color.surface, 2: color.surface2 },
        tile: { DEFAULT: color.tile, edge: color.tileEdge },
        club: { DEFAULT: color.club, tint: color.clubTint },
      },
      borderRadius: {
        tile: radius.tile,
        card: radius.card,
        sheet: radius.sheet,
      },
      fontFamily: {
        heading: [font.heading],
        body: [font.body],
      },
      maxWidth: { app: '430px' },
    },
  },
  plugins: [],
} satisfies Config;
