'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header, PromoStrip, Screen, TrustStrip } from '@/components/chrome';
import { ProductGrid } from '@/components/product';
import { ProductArt, artAspect } from '@/components/ProductArt';
import {
  GEAR_CATEGORIES, KINDS, franchises, inr, tiles,
  type GearCategory, type Kind,
} from '@/lib/data';

/**
 * Kind is the primary axis, franchise the secondary one.
 *
 * This inverts the reference app, and it has to: sleeves, binders and
 * toploaders belong to no fandom, so a franchise-first navigation has
 * nowhere to put half the catalogue. Singles and sealed still get franchise
 * tabs underneath, because that *is* how people shop cards.
 */
function KindRail({ value, onChange }: { value: Kind; onChange: (k: Kind) => void }) {
  return (
    <div className="rail border-b border-line px-4 py-3">
      {KINDS.map((k) => (
        <button key={k.id} onClick={() => onChange(k.id)} className={`chip ${value === k.id ? 'chip-on' : ''}`}>
          {k.label}
        </button>
      ))}
      <Link href="/browse" className="chip">Graded slabs</Link>
      <Link href="/browse" className="chip">Preorders</Link>
    </div>
  );
}

function FranchiseTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex border-b border-line bg-white">
      {franchises.map((f) => {
        const on = f.slug === value;
        return (
          <button
            key={f.slug}
            onClick={() => onChange(f.slug)}
            className={`relative flex-1 px-1 py-3 text-[12.5px] font-bold uppercase tracking-[0.02em] ${on ? 'text-ink' : 'text-muted'}`}
          >
            {f.name}
            {on && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-primary" />}
          </button>
        );
      })}
    </div>
  );
}

function Banner({ kicker, title, sub, from, to }: {
  kicker?: string; title: string; sub?: string; from: string; to: string;
}) {
  return (
    <div className="relative flex h-[176px] flex-col justify-end overflow-hidden px-5 py-5"
      style={{ background: `linear-gradient(115deg, ${from}, ${to})` }}>
      <div className="absolute -right-6 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-black/15" />
      {kicker && <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">{kicker}</p>}
      <h2 className="relative u-head text-[26px] font-extrabold uppercase leading-none text-white">{title}</h2>
      {sub && <p className="relative mt-1.5 text-[12.5px] text-white/85">{sub}</p>}
    </div>
  );
}

function SectionHead({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-baseline justify-between px-4 pb-3 pt-6">
      <h2 className="section-title">{title}</h2>
      {href && <Link href={href} className="text-[12.5px] font-semibold text-accent-ink">VIEW ALL</Link>}
    </div>
  );
}

export default function HomePage() {
  const [kind, setKind] = useState<Kind>('single');
  const [franchise, setFranchise] = useState('pokemon');
  const [gear, setGear] = useState<GearCategory | undefined>();

  const isGear = kind === 'accessory';
  const list = isGear
    ? tiles({ kind: 'accessory', category: gear })
    : tiles({ kind, franchise });
  const meta = franchises.find((f) => f.slug === franchise)!;

  return (
    <Screen>
      <Header cartCount={3} />
      <PromoStrip>10% back as Vault Points on every order</PromoStrip>
      <KindRail value={kind} onChange={setKind} />

      {isGear ? (
        <div className="rail px-4 py-3">
          <button onClick={() => setGear(undefined)} className={`chip ${!gear ? 'chip-on' : ''}`}>All gear</button>
          {GEAR_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setGear(c)} className={`chip ${gear === c ? 'chip-on' : ''}`}>{c}</button>
          ))}
        </div>
      ) : (
        <FranchiseTabs value={franchise} onChange={setFranchise} />
      )}

      {isGear ? (
        <Banner
          kicker="Protect your collection"
          title="Sleeves & storage"
          sub={`${list.length} products · Dragon Shield, Ultimate Guard, Ultra Pro`}
          from="#4B5563"
          to="#111827"
        />
      ) : (
        <Banner
          kicker={kind === 'sealed' ? 'Sealed & preorders' : 'Now listing'}
          title={meta.name}
          sub={`${list.length} ${kind === 'sealed' ? 'sealed products' : 'singles'} in stock`}
          from={meta.hue}
          to={meta.hue2}
        />
      )}

      {/* Hero rail. Singles are portrait and sit on a dark ground so foil art
          reads; boxes and gear are square on light. */}
      <div className={`rail px-4 py-4 ${kind === 'single' ? 'bg-tile' : 'bg-surface-2'}`}>
        {list.slice(0, 6).map((t) => (
          <Link
            key={t.product.slug}
            href={t.product.kind === 'single' ? `/card/${t.product.slug}` : `/product/${t.product.slug}`}
            className={t.product.kind === 'single' ? 'w-[104px] shrink-0' : 'w-[132px] shrink-0'}
          >
            <div className={artAspect(t.product.kind)}>
              <ProductArt product={t.product} />
            </div>
            <p className={`truncate pt-1.5 text-[11px] font-semibold ${kind === 'single' ? 'text-white' : 'text-ink'}`}>
              {t.product.name}
            </p>
            <p className={`text-[11px] ${kind === 'single' ? 'text-white/60' : 'text-muted'}`}>{inr(t.variant.price)}</p>
          </Link>
        ))}
      </div>

      <TrustStrip />

      <SectionHead
        title={isGear ? 'Gear' : kind === 'sealed' ? 'Sealed & preorders' : 'Fresh singles'}
        href="/browse"
      />
      <ProductGrid tiles={list.slice(0, 4)} />

      {/* Cross-sell. Anyone spending five figures on a card needs a toploader,
          and gear carries far better margin than singles do. */}
      {kind !== 'accessory' && (
        <>
          <SectionHead title="Don't ship it naked" href="/browse" />
          <p className="-mt-2 px-4 pb-3 text-[12.5px] text-muted">
            Sleeves, toploaders and binders to keep what you just bought at its grade.
          </p>
          <div className="rail px-4">
            {tiles({ kind: 'accessory' }).slice(0, 5).map((t) => (
              <Link key={t.product.slug} href={`/product/${t.product.slug}`} className="w-[132px] shrink-0">
                <div className="rounded-tile bg-surface-2 p-2">
                  <div className="aspect-square"><ProductArt product={t.product} /></div>
                </div>
                <p className="truncate pt-1.5 text-[11.5px] font-semibold text-ink">{t.product.name}</p>
                <p className="text-[11.5px] text-muted">{t.product.category}</p>
                <p className="text-[12.5px] font-bold text-ink">{inr(t.variant.price)}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      <SectionHead title="Shop by mood" />
      <div className="grid grid-cols-3 gap-2 px-4">
        {[
          { t: 'Vault picks', c: '#1F5FA8' },
          { t: 'Under ₹2,000', c: '#2C7A70' },
          { t: 'Graded slabs', c: '#6D3BE4' },
        ].map((m) => (
          <Link key={m.t} href="/browse" className="flex h-[92px] flex-col justify-end rounded-card p-2.5" style={{ background: m.c }}>
            <span className="u-head text-[12px] font-extrabold uppercase leading-tight text-white">{m.t}</span>
          </Link>
        ))}
      </div>

      <div className="px-4 pb-8 pt-6">
        <p className="text-center text-[11.5px] leading-relaxed text-muted">
          Every card is inspected, sleeved and shipped in a toploader.<br />
          Condition disputes refunded in full within 7 days.
        </p>
      </div>
    </Screen>
  );
}
