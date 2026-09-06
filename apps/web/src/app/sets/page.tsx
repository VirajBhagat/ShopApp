'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header, PromoStrip, Screen } from '@/components/chrome';
import { CardArt } from '@/components/CardArt';
import { CARDS, franchises, tiles } from '@/lib/data';

/**
 * Set browser — the card-shop equivalent of the reference app's Categories tab.
 *
 * Apparel categories are flat (Shirts, Polos, Jeans). A card catalogue is a
 * hierarchy: franchise → set → card, and set is how collectors think, so it
 * gets its own tab rather than living inside search.
 */
export default function SetsPage() {
  const [open, setOpen] = useState<string | null>('pokemon');

  return (
    <Screen>
      <Header cartCount={2} />
      <PromoStrip>10% back as Vault Points on every order</PromoStrip>

      <h1 className="section-title px-4 pb-1 pt-5">Browse by set</h1>
      <p className="px-4 pb-4 text-[12.5px] text-muted">Every set we stock, newest first.</p>

      {franchises.map((f) => {
        const cards = CARDS.filter((c) => c.franchise === f.slug);
        const sets = [...new Map(cards.map((c) => [c.setCode, c])).values()];
        const isOpen = open === f.slug;
        return (
          <section key={f.slug} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : f.slug)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
            >
              <span className="h-9 w-9 shrink-0 rounded-full" style={{ background: `linear-gradient(135deg, ${f.hue}, ${f.hue2})` }} />
              <span className="flex-1">
                <span className="block text-[14.5px] font-bold text-ink">{f.name}</span>
                <span className="block text-[12px] text-muted">{sets.length} sets · {tiles({ franchise: f.slug }).length} cards in stock</span>
              </span>
              <span className={`text-[13px] text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {isOpen && (
              <div className="grid grid-cols-3 gap-3 px-4 pb-5">
                {sets.map((s) => {
                  const count = cards.filter((c) => c.setCode === s.setCode).length;
                  return (
                    <Link key={s.setCode} href="/browse" className="block">
                      <div className="overflow-hidden rounded-card bg-tile p-2">
                        <div className="aspect-[5/7]">
                          <CardArt slug={s.slug} name={s.name} franchise={s.franchise} holo />
                        </div>
                      </div>
                      <p className="truncate pt-1.5 text-[11.5px] font-semibold text-ink">{s.set}</p>
                      <p className="text-[11px] text-muted">{s.setCode} · {count} cards</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      <div className="px-4 py-8">
        <p className="text-center text-[12px] text-muted">Looking for a set we don&apos;t stock? Ask and we&apos;ll source it.</p>
      </div>
    </Screen>
  );
}
