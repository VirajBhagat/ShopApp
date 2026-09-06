'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CardArt } from './CardArt';
import { HeartIcon } from './icons';
import { conditionMeta, inr, type Tile } from '@/lib/data';

export function ConditionBadge({ code, size = 'sm' }: { code: string; size?: 'sm' | 'md' }) {
  const m = conditionMeta(code);
  return (
    <span
      className={`inline-flex items-center rounded-[3px] font-bold ${size === 'sm' ? 'px-1.5 py-[2px] text-[10px]' : 'px-2 py-1 text-[12px]'}`}
      style={{ color: m.fg, backgroundColor: m.bg }}
      title={m.label}
    >
      {m.code}
    </span>
  );
}

export function LangBadge({ lang, size = 'sm' }: { lang: string; size?: 'sm' | 'md' }) {
  return (
    <span className={`inline-flex items-center rounded-[3px] bg-white/90 font-bold text-ink ${size === 'sm' ? 'px-1.5 py-[2px] text-[10px]' : 'px-2 py-1 text-[12px]'}`}>
      {lang}
    </span>
  );
}

export function GradeBadge({ company, grade }: { company: string; grade: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[3px] bg-ink px-1.5 py-[2px] text-[10px] font-bold text-white">
      {company} {grade}
    </span>
  );
}

/**
 * Grid tile for a single.
 *
 * Carries more than the reference app's apparel tile because condition,
 * language and scarcity are price-determining here — a shopper comparing
 * two copies cannot be made to open both detail pages to see the difference.
 */
export function ProductTile({ tile }: { tile: Tile }) {
  const { card, listing, copies } = tile;
  const [saved, setSaved] = useState(false);
  const scarce = listing.stock === 1;

  return (
    <div className="relative">
      <Link href={`/card/${card.slug}`} className="block">
        <div className="relative overflow-hidden rounded-tile bg-tile p-3">
          <div className="mx-auto aspect-[5/7] w-full">
            <CardArt slug={card.slug} name={card.name} franchise={card.franchise} holo />
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <ConditionBadge code={listing.condition} />
            <LangBadge lang={listing.language} />
            {listing.graded && <GradeBadge company={listing.graded.company} grade={listing.graded.grade} />}
          </div>
        </div>
        <div className="pt-2">
          <p className="truncate text-[13.5px] font-semibold text-ink">{card.name}</p>
          <p className="truncate text-[11.5px] text-muted">
            {card.set} · {card.number}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[14px] font-bold text-ink">{inr(listing.price)}</span>
            {listing.mrp && (
              <>
                <span className="text-[11.5px] text-muted line-through">{inr(listing.mrp)}</span>
                <span className="text-[11.5px] font-semibold text-primary">
                  {Math.round((1 - listing.price / listing.mrp) * 100)}% off
                </span>
              </>
            )}
          </div>
          <p className={`mt-0.5 text-[11px] font-semibold ${scarce ? 'text-accent-ink' : 'text-muted'}`}>
            {scarce ? 'Only 1 left' : `${copies} copies from ${inr(listing.price)}`}
          </p>
        </div>
      </Link>
      <button
        aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 ${saved ? 'text-accent' : 'text-ink'}`}
      >
        <HeartIcon className="h-[17px] w-[17px]" filled={saved} />
      </button>
    </div>
  );
}

export function ProductGrid({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4">
      {tiles.map((t) => <ProductTile key={t.card.slug} tile={t} />)}
    </div>
  );
}
