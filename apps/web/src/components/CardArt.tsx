import { franchiseMeta } from '@/lib/data';

/**
 * Stand-in for real card photography.
 *
 * Every single you list will eventually carry photos of *that physical copy*
 * (corners and edges are how a buyer verifies condition), so this component
 * exists only to make the layouts evaluable before those photos exist.
 * Replace with <Image> once the admin panel is uploading real files.
 *
 * Art is deterministic per slug so a card looks the same everywhere it appears.
 */
export function CardArt({ slug, name, franchise, holo }: {
  slug: string; name: string; franchise: string; holo?: boolean;
}) {
  const f = franchiseMeta(franchise);
  const seed = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rot = seed % 60;
  const id = `g-${slug}`;

  return (
    <svg viewBox="0 0 250 350" className="h-full w-full" role="img" aria-label={name}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={f.hue} />
          <stop offset="100%" stopColor={f.hue2} />
        </linearGradient>
        <linearGradient id={`${id}-holo`} x1="0" y1="0" x2="1" y2="1"
          gradientTransform={`rotate(${rot} 0.5 0.5)`}>
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x="14" y="46" width="222" height="176" rx="4" />
        </clipPath>
      </defs>

      {/* card stock + border */}
      <rect x="0" y="0" width="250" height="350" rx="12" fill="#F2E3B3" />
      <rect x="6" y="6" width="238" height="338" rx="9" fill="#1b1c22" />

      {/* name bar */}
      <rect x="14" y="14" width="222" height="26" rx="4" fill="#2b2d36" />
      <text x="24" y="32" fill="#F4F5F7" fontSize="14" fontWeight="700"
        fontFamily="Archivo, Helvetica, sans-serif">
        {name.length > 20 ? name.slice(0, 19) + '…' : name}
      </text>

      {/* art window */}
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="14" y="46" width="222" height="176" fill={`url(#${id}-bg)`} />
        <circle cx={60 + (seed % 130)} cy={110 + (seed % 60)} r="62" fill="#fff" opacity="0.16" />
        <circle cx={190 - (seed % 90)} cy={190 - (seed % 40)} r="44" fill="#000" opacity="0.18" />
        <path d={`M14 ${180 + (seed % 25)} Q 125 ${120 + (seed % 50)} 236 ${190 - (seed % 30)} L236 222 L14 222 Z`}
          fill="#000" opacity="0.25" />
        {holo && <rect x="14" y="46" width="222" height="176" fill={`url(#${id}-holo)`} />}
      </g>
      <rect x="14" y="46" width="222" height="176" rx="4" fill="none" stroke="#F2E3B3" strokeWidth="2" />

      {/* text box */}
      <rect x="14" y="232" width="222" height="104" rx="4" fill="#33353f" />
      <rect x="24" y="244" width="150" height="7" rx="3.5" fill="#6c6f7d" />
      <rect x="24" y="260" width="196" height="6" rx="3" fill="#54576380" />
      <rect x="24" y="274" width="176" height="6" rx="3" fill="#54576380" />
      <rect x="24" y="288" width="188" height="6" rx="3" fill="#54576380" />
      <rect x="24" y="314" width="60" height="6" rx="3" fill="#6c6f7d" />
    </svg>
  );
}
