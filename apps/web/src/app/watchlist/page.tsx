'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Screen, SubHeader } from '@/components/chrome';
import { ProductGrid } from '@/components/product';
import { BellIcon } from '@/components/icons';
import { tiles } from '@/lib/data';

/**
 * Watchlist, not wishlist.
 *
 * The reference app's wishlist is passive storage. Collectors track a card
 * for months waiting on a price or a restock, so this one is built around
 * alerts — which is also what earns the push-notification permission.
 */
export default function WatchlistPage() {
  const [empty, setEmpty] = useState(false);
  const watched = tiles().slice(0, 4);

  return (
    <Screen>
      <SubHeader
        title={`Watchlist · ${empty ? 0 : watched.length}`}
        right={
          <button onClick={() => setEmpty((e) => !e)} aria-label="Toggle demo state" className="text-[11px] font-bold text-muted">
            DEMO
          </button>
        }
      />

      {empty ? (
        <div className="flex flex-col items-center px-8 pb-10 pt-16 text-center">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-surface-2">
            <BellIcon className="h-14 w-14 text-primary" />
          </div>
          <h2 className="u-head pt-6 text-[17px] font-extrabold text-ink">Nothing on watch yet</h2>
          <p className="pt-2 text-[13.5px] leading-relaxed text-muted">
            Tap the heart on any card and we&apos;ll ping you the moment its price drops or it comes back in stock.
          </p>
          <div className="mt-8 grid w-full grid-cols-2 gap-3">
            <Link href="/browse" className="btn-outline">Browse cards</Link>
            <Link href="/login" className="btn-primary">Login</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-4 mt-4 flex items-center gap-3 rounded-card bg-club-tint p-3.5">
            <BellIcon className="h-6 w-6 shrink-0 text-club" />
            <p className="flex-1 text-[12.5px] leading-snug text-ink">
              Alerts are <span className="font-bold">on</span> for price drops and restocks.
            </p>
            <button className="text-[12px] font-bold uppercase text-club">Manage</button>
          </div>

          <div className="px-4 pb-3 pt-5">
            <h2 className="section-title">Watching</h2>
          </div>
          <ProductGrid tiles={watched} />

          <div className="px-4 pb-8 pt-6">
            <Link href="/browse" className="btn-outline w-full">Find more cards</Link>
          </div>
        </>
      )}
    </Screen>
  );
}
