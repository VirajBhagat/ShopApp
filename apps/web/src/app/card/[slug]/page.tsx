'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Screen, SubHeader } from '@/components/chrome';
import { CardArt } from '@/components/CardArt';
import { ConditionBadge, GradeBadge, LangBadge } from '@/components/product';
import { BellIcon, HeartIcon, ShieldIcon, SleeveIcon, TruckIcon } from '@/components/icons';
import { cardBySlug, conditionMeta, inr, listingsForCard } from '@/lib/data';

export default function CardPage() {
  const { slug } = useParams<{ slug: string }>();
  const card = cardBySlug(slug);
  const copies = listingsForCard(slug ?? '');
  const [picked, setPicked] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!card || copies.length === 0) {
    return (
      <Screen>
        <SubHeader title="Card" />
        <p className="px-6 py-24 text-center text-[14px] text-muted">This card is no longer listed.</p>
      </Screen>
    );
  }

  const listing = copies[picked];
  const meta = conditionMeta(listing.condition);

  return (
    <Screen>
      <SubHeader title={card.name} right={
        <button onClick={() => setSaved((s) => !s)} aria-label="Watchlist" className={saved ? 'text-accent' : 'text-ink'}>
          <HeartIcon filled={saved} />
        </button>
      } />

      {/* Gallery. Real listings carry photos of the exact copy — corners and
          edges are how a buyer verifies the grade we assigned it. */}
      <div className="bg-tile px-6 py-6">
        <div className="mx-auto aspect-[5/7] w-[62%]">
          <CardArt slug={card.slug} name={card.name} franchise={card.franchise} holo />
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {['Front', 'Back', 'Corners'].map((t, i) => (
            <span key={t} className={`rounded-full px-3 py-1 text-[11px] font-semibold ${i === 0 ? 'bg-white text-ink' : 'bg-white/15 text-white/70'}`}>
              {t}
            </span>
          ))}
        </div>
        <p className="pt-3 text-center text-[11px] text-white/50">
          Photos are of the exact copy you receive
        </p>
      </div>

      <div className="px-4 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">{card.set} · {card.setCode}</p>
        <h1 className="u-head pt-1 text-[22px] font-extrabold leading-tight text-ink">{card.name}</h1>
        <p className="pt-1 text-[13px] text-muted">#{card.number} · {card.rarity}</p>

        <div className="flex items-baseline gap-2.5 pt-4">
          <span className="u-head text-[26px] font-extrabold text-ink">{inr(listing.price)}</span>
          {listing.mrp && (
            <>
              <span className="text-[14px] text-muted line-through">{inr(listing.mrp)}</span>
              <span className="text-[14px] font-bold text-primary">
                {Math.round((1 - listing.price / listing.mrp) * 100)}% off
              </span>
            </>
          )}
        </div>
        <p className="text-[11.5px] text-muted">Inclusive of all taxes</p>

        {listing.stock === 1 && (
          <p className="mt-3 inline-flex rounded-tile bg-[#FBE3E1] px-3 py-1.5 text-[12.5px] font-bold text-accent-ink">
            Only 1 copy in this condition
          </p>
        )}
      </div>

      {/* Copy picker. This is the screen's real job: condition and language
          are the product here, the way size is for apparel — except each row
          has its own price and its own stock count. */}
      <div className="px-4 pt-6">
        <div className="flex items-baseline justify-between pb-3">
          <h2 className="section-title">Choose a copy</h2>
          <Link href="/browse" className="text-[12px] font-semibold text-accent-ink">CONDITION GUIDE</Link>
        </div>
        <div className="space-y-2">
          {copies.map((c, i) => {
            const on = i === picked;
            return (
              <button
                key={c.id}
                onClick={() => setPicked(i)}
                className={`flex w-full items-center gap-3 rounded-tile border p-3 text-left ${on ? 'border-primary bg-primary-tint' : 'border-line bg-white'}`}
              >
                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-primary' : 'border-line'}`}>
                  {on && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                <span className="flex flex-1 flex-wrap items-center gap-1.5">
                  <ConditionBadge code={c.condition} size="md" />
                  <span className="rounded-[3px] border border-line bg-white px-2 py-1 text-[12px] font-bold text-ink">{c.language}</span>
                  {c.graded && <GradeBadge company={c.graded.company} grade={c.graded.grade} />}
                  <span className="text-[12px] text-muted">{c.stock === 1 ? 'last one' : `${c.stock} available`}</span>
                </span>
                <span className="shrink-0 text-[15px] font-bold text-ink">{inr(c.price)}</span>
              </button>
            );
          })}
        </div>
        <p className="pt-2 text-[12px] text-muted">
          Selected: <span className="font-semibold text-body">{meta.label}</span> — {meta.code === 'NM'
            ? 'sharp corners, clean surface, pack-fresh.'
            : 'visible wear consistent with the grade; see photos.'}
        </p>
      </div>

      <div className="mt-6 space-y-3 bg-surface-2 px-4 py-5">
        {[
          { i: <ShieldIcon className="h-6 w-6" />, t: 'Condition guaranteed', s: 'Graded by hand against the TCG standard. Mismatch? Full refund.' },
          { i: <SleeveIcon className="h-6 w-6" />, t: 'Sleeved + toploader', s: 'Every card ships rigid and sealed against moisture.' },
          { i: <TruckIcon className="h-6 w-6" />, t: 'Dispatched same day', s: 'Order before 4pm on a working day.' },
        ].map((r) => (
          <div key={r.t} className="flex gap-3">
            <span className="text-primary-dark">{r.i}</span>
            <span>
              <span className="block text-[13px] font-bold text-ink">{r.t}</span>
              <span className="block text-[12px] text-muted">{r.s}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Watchlist alerts are the retention hook: collectors track a card for
          months, so a back-in-stock or price-drop push brings them back. */}
      <div className="m-4 flex items-center gap-3 rounded-card border border-line p-4">
        <BellIcon className="h-6 w-6 text-club" />
        <span className="flex-1 text-[12.5px] text-body">
          Watch this card and we&apos;ll notify you on any price drop or restock.
        </span>
        <button onClick={() => setSaved(true)} className="text-[12px] font-bold uppercase text-accent-ink">Watch</button>
      </div>

      <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-3 border-t border-line bg-white px-4 py-3">
        <button onClick={() => setSaved(true)} className="btn-outline">Watchlist</button>
        <Link href="/cart" className="btn-primary">Add to cart</Link>
      </div>
    </Screen>
  );
}
