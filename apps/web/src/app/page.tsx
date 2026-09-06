'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header, PromoStrip, Screen, TrustStrip } from '@/components/chrome';
import { ProductGrid } from '@/components/product';
import { CardArt } from '@/components/CardArt';
import { SEALED, franchises, inr, tiles } from '@/lib/data';

/**
 * Franchise replaces the reference app's MEN / WOMEN / SNEAKERS tabs.
 * Fandom loyalty is the strongest sorting axis a card shop has — most
 * visitors care about exactly one of these and want the rest out of the way.
 */
function FranchiseTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="sticky top-0 z-20 flex border-b border-line bg-white">
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

function Banner({ kicker, title, sub, from, to, tall }: {
  kicker?: string; title: string; sub?: string; from: string; to: string; tall?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col justify-end overflow-hidden px-5 py-5 ${tall ? 'h-[210px]' : 'h-[132px]'}`}
      style={{ background: `linear-gradient(115deg, ${from}, ${to})` }}
    >
      <div className="absolute -right-6 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-black/15" />
      {kicker && <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">{kicker}</p>}
      <h2 className="relative u-head text-[26px] font-extrabold uppercase leading-none tracking-[0.01em] text-white">{title}</h2>
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
  const [franchise, setFranchise] = useState('pokemon');
  const list = tiles({ franchise });
  const sealed = SEALED.filter((s) => s.franchise === franchise);
  const meta = franchises.find((f) => f.slug === franchise)!;

  return (
    <Screen>
      <Header cartCount={2} />
      <PromoStrip>10% back as Vault Points on every order</PromoStrip>
      <FranchiseTabs value={franchise} onChange={setFranchise} />

      {/* Entry-point rail: the three ways people shop cards */}
      <div className="rail px-4 py-3">
        {['Singles', 'Sealed', 'Graded slabs', 'Preorders', 'Under ₹2,000'].map((c, i) => (
          <span key={c} className={`chip ${i === 0 ? 'chip-on' : ''}`}>{c}</span>
        ))}
      </div>

      <Banner
        kicker="Now listing"
        title={meta.name}
        sub={`${list.length} singles in stock · fresh pulls added daily`}
        from={meta.hue}
        to={meta.hue2}
        tall
      />

      {/* Hero rail of individual cards — the equivalent of the reference
          app's lifestyle photo grid, but portrait so card art isn't cropped. */}
      <div className="rail bg-tile px-4 py-4">
        {list.slice(0, 6).map((t) => (
          <Link key={t.card.slug} href={`/card/${t.card.slug}`} className="w-[104px] shrink-0">
            <div className="aspect-[5/7]">
              <CardArt slug={t.card.slug} name={t.card.name} franchise={t.card.franchise} holo />
            </div>
            <p className="truncate pt-1.5 text-[11px] font-semibold text-white">{t.card.name}</p>
            <p className="text-[11px] text-white/60">{inr(t.listing.price)}</p>
          </Link>
        ))}
      </div>

      <TrustStrip />

      <SectionHead title="Fresh singles" href="/browse" />
      <ProductGrid tiles={list.slice(0, 4)} />

      <SectionHead title="Shop by mood" />
      <div className="grid grid-cols-3 gap-2 px-4">
        {[
          { t: 'Vault picks', c: '#1F5FA8' },
          { t: 'Under ₹2,000', c: '#2C7A70' },
          { t: 'Graded slabs', c: '#6D3BE4' },
        ].map((m) => (
          <Link key={m.t} href="/browse" className="flex h-[92px] flex-col justify-end rounded-card p-2.5" style={{ background: m.c }}>
            <span className="u-head text-[12px] font-extrabold uppercase leading-tight tracking-[0.02em] text-white">{m.t}</span>
          </Link>
        ))}
      </div>

      <SectionHead title="Sealed & preorders" href="/browse" />
      <div className="rail px-4 pb-2">
        {sealed.length === 0 && (
          <p className="px-1 text-[13px] text-muted">No sealed product for {meta.name} right now.</p>
        )}
        {sealed.map((s) => (
          <div key={s.slug} className="w-[168px] shrink-0">
            <div
              className="flex h-[112px] items-end rounded-card p-3"
              style={{ background: `linear-gradient(140deg, ${meta.hue}, ${meta.hue2})` }}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">{s.kind}</span>
            </div>
            <p className="truncate pt-2 text-[12.5px] font-semibold text-ink">{s.name}</p>
            <p className="text-[13px] font-bold text-ink">{inr(s.price)}</p>
            {s.preorder ? (
              <p className="text-[11px] font-semibold text-club">Preorder · {s.preorder}</p>
            ) : (
              <p className="text-[11px] text-muted">{s.stock} in stock</p>
            )}
          </div>
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
