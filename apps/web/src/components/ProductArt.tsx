import { CardArt } from './CardArt';
import { franchiseMeta, type Product } from '@/lib/data';

/**
 * Placeholder artwork for every product kind, so layouts can be judged before
 * real photography exists. Swap each branch for <Image> as the admin panel
 * starts uploading files — singles need photos of the exact copy, sealed and
 * gear can reuse one stock shot per product.
 */

function PackArt({ product }: { product: Product }) {
  const f = franchiseMeta(product.franchise);
  const k = product.sealedKind;
  const id = `p-${product.slug}`;

  return (
    <svg viewBox="0 0 250 250" className="h-full w-full" role="img" aria-label={product.name}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={f.hue} /><stop offset="100%" stopColor={f.hue2} />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {k === 'Booster Pack' ? (
        <g>
          {/* foil pack: crimped top and bottom, tall and narrow */}
          <rect x="88" y="26" width="74" height="198" rx="4" fill={`url(#${id}-a)`} />
          <rect x="88" y="26" width="74" height="198" rx="4" fill={`url(#${id}-sheen)`} />
          <path d="M88 40h74M88 210h74" stroke="#000" strokeOpacity="0.25" strokeWidth="7" strokeDasharray="4 4" />
          <circle cx="125" cy="118" r="27" fill="#fff" opacity="0.22" />
          <rect x="100" y="160" width="50" height="6" rx="3" fill="#fff" opacity="0.4" />
        </g>
      ) : k === 'Collector Tin' ? (
        <g>
          <rect x="46" y="70" width="158" height="118" rx="14" fill={`url(#${id}-a)`} />
          <rect x="46" y="70" width="158" height="118" rx="14" fill={`url(#${id}-sheen)`} />
          <rect x="46" y="70" width="158" height="20" rx="10" fill="#fff" opacity="0.22" />
          <circle cx="125" cy="132" r="30" fill="#fff" opacity="0.2" />
        </g>
      ) : (
        <g>
          {/* box: front face plus a top and side face for depth */}
          <path d="M62 82 L125 58 L200 84 L137 110 Z" fill={`url(#${id}-a)`} opacity="0.75" />
          <path d="M137 110 L200 84 L200 190 L137 218 Z" fill={`url(#${id}-a)`} opacity="0.55" />
          <rect x="62" y="82" width="75" height="108" fill={`url(#${id}-a)`} />
          <path d="M62 190 L137 218 L137 110 L62 82 Z" fill="#000" opacity="0.12" />
          <rect x="62" y="82" width="75" height="108" fill={`url(#${id}-sheen)`} />
          <circle cx="99" cy="128" r="24" fill="#fff" opacity="0.22" />
          <rect x="74" y="166" width="50" height="6" rx="3" fill="#fff" opacity="0.45" />
          {k === 'Elite Trainer Box' && <rect x="62" y="82" width="75" height="16" fill="#000" opacity="0.2" />}
        </g>
      )}

      <text x="125" y="238" textAnchor="middle" fill="#8A8F9C" fontSize="12"
        fontFamily="Archivo, Helvetica, sans-serif" fontWeight="700">
        {(k ?? 'Sealed').toUpperCase()}
      </text>
    </svg>
  );
}

function GearArt({ product, tint }: { product: Product; tint?: string }) {
  const c = product.category;
  // Sleeves, binders and deck boxes are bought by colour, so the art follows
  // the selected variant rather than showing one generic grey for all of them.
  const body = tint ?? '#4B5563';
  const id = `g-${product.slug}`;

  return (
    <svg viewBox="0 0 250 250" className="h-full w-full" role="img" aria-label={product.name}>
      <defs>
        <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={body} /><stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>

      {c === 'Sleeves' && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={62 + i * 16} y={44 + i * 6} width="104" height="146" rx="6"
              fill={`url(#${id}-m)`} stroke="#6B7280" strokeWidth="1.5" opacity={0.55 + i * 0.22} />
          ))}
          <rect x="94" y="56" width="104" height="146" rx="6" fill={body} opacity="0.9" stroke="#9AA1AE" strokeWidth="1.5" />
        </g>
      )}

      {c === 'Binder' && (
        <g>
          <rect x="56" y="42" width="140" height="168" rx="8" fill={`url(#${id}-m)`} />
          <rect x="56" y="42" width="20" height="168" rx="8" fill="#000" opacity="0.28" />
          <path d="M196 46 v160" stroke="#F0B429" strokeWidth="5" strokeLinecap="round" />
          <circle cx="196" cy="126" r="8" fill="#F0B429" />
          <g opacity="0.5">
            {[0, 1, 2].map((r) => [0, 1, 2].map((cc) => (
              <rect key={`${r}${cc}`} x={92 + cc * 32} y={64 + r * 48} width="26" height="38" rx="3"
                fill="none" stroke="#9AA1AE" strokeWidth="1.5" />
            )))}
          </g>
        </g>
      )}

      {c === 'Toploader' && (
        <g>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i * 26}, ${i * -12}) rotate(${i * 5} 125 125)`}>
              <rect x="70" y="52" width="110" height="152" rx="4" fill="#DDE1E8" opacity="0.35" stroke="#AEB4C0" strokeWidth="2" />
              <rect x="78" y="60" width="94" height="136" rx="2" fill="none" stroke="#AEB4C0" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          ))}
        </g>
      )}

      {c === 'Deck Box' && (
        <g>
          <path d="M70 92 L125 66 L182 92 L127 118 Z" fill={body} />
          <path d="M127 118 L182 92 L182 176 L127 202 Z" fill="#374151" />
          <path d="M70 92 L127 118 L127 202 L70 176 Z" fill="#1F2937" />
          <path d="M70 108 L127 134 L182 108" fill="none" stroke="#F0B429" strokeWidth="3" opacity="0.8" />
        </g>
      )}

      {c === 'Playmat' && (
        <g>
          <path d="M34 108 L125 76 L216 108 L125 150 Z" fill={`url(#${id}-m)`} />
          <path d="M34 108 L125 150 L125 168 L34 126 Z" fill="#111827" />
          <path d="M216 108 L125 150 L125 168 L216 126 Z" fill="#0B1220" />
          <g opacity="0.45">
            {[0, 1, 2].map((i) => (
              <rect key={i} x={84 + i * 28} y={100} width="22" height="16" rx="2" fill="none" stroke="#9AA1AE" strokeWidth="1.5" />
            ))}
          </g>
        </g>
      )}

      <text x="125" y="234" textAnchor="middle" fill="#8A8F9C" fontSize="12"
        fontFamily="Archivo, Helvetica, sans-serif" fontWeight="700">
        {(product.brand ?? '').toUpperCase()}
      </text>
    </svg>
  );
}

export function ProductArt({ product, tint }: { product: Product; tint?: string }) {
  if (product.kind === 'single')
    return <CardArt slug={product.slug} name={product.name} franchise={product.franchise ?? 'pokemon'} holo />;
  if (product.kind === 'sealed') return <PackArt product={product} />;
  return <GearArt product={product} tint={tint} />;
}

/** Singles are portrait; boxes and gear read better square. */
export const artAspect = (kind: Product['kind']) => (kind === 'single' ? 'aspect-[5/7]' : 'aspect-square');
