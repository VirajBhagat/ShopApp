'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Screen, SubHeader } from '@/components/chrome';
import { ProductArt, artAspect } from '@/components/ProductArt';
import { ConditionBadge } from '@/components/product';
import { BagIcon } from '@/components/icons';
import { inr, productBySlug, variantLabel, VARIANTS } from '@/lib/data';

/** A single, a sealed box and a pack of sleeves — the realistic mixed basket. */
const IN_CART = ['v1', 'v30', 'v50'];

/**
 * Cart with a visible hold timer.
 *
 * Because most singles are quantity 1, adding to cart has to actually reserve
 * the copy in the database or two buyers race for it. Once the backend holds
 * stock, the shopper needs to *see* that hold and its expiry — otherwise a
 * silently released card turns into a support complaint at checkout.
 */
export default function CartPage() {
  const [empty, setEmpty] = useState(false);
  const [left, setLeft] = useState(9 * 60 + 42);

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const items = VARIANTS.filter((l) => IN_CART.includes(l.id));
  const subtotal = items.reduce((n, l) => n + l.price, 0);
  const mrp = items.reduce((n, l) => n + (l.mrp ?? l.price), 0);
  const shipping = subtotal > 999 ? 0 : 79;
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return (
    <Screen>
      <SubHeader
        title="Cart"
        right={<button onClick={() => setEmpty((e) => !e)} className="text-[11px] font-bold text-muted">DEMO</button>}
      />

      {empty ? (
        <div className="flex flex-col items-center px-8 pb-10 pt-16 text-center">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-surface-2">
            <BagIcon className="h-14 w-14 text-primary" />
          </div>
          <h2 className="u-head pt-6 text-[17px] font-extrabold text-ink">Your cart is empty</h2>
          <p className="pt-2 text-[13.5px] text-muted">Fresh singles land every day — go find something rare.</p>

          <div className="mt-7 w-full rounded-card bg-surface-2 p-4">
            <p className="pb-3 text-[13px] font-bold text-ink">Popular right now</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Charizard', 'One Piece OP-05', 'Graded slabs', 'Under ₹2,000', 'Japanese'].map((c) => (
                <Link key={c} href="/browse" className="chip">{c}</Link>
              ))}
            </div>
          </div>

          <div className="mt-8 grid w-full grid-cols-2 gap-3">
            <Link href="/browse" className="btn-outline">Continue</Link>
            <Link href="/login" className="btn-primary">Login</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-4 mt-4 flex items-center gap-2 rounded-tile bg-[#FBE3E1] px-3.5 py-2.5">
            <span className="text-[12.5px] text-accent-ink">
              Single copies in this cart are held for you — <span className="font-bold tabular-nums">{mm}:{ss}</span>
            </span>
          </div>

          <div className="divide-y divide-line px-4">
            {items.map((l) => {
              const card = productBySlug(l.product)!;
              return (
                <div key={l.id} className="flex gap-3 py-4">
                  <Link
                    href={card.kind === 'single' ? `/card/${card.slug}` : `/product/${card.slug}`}
                    className={`w-[74px] shrink-0 rounded-tile p-1.5 ${card.kind === 'single' ? 'bg-tile' : 'bg-surface-2'}`}
                  >
                    <div className={artAspect(card.kind)}><ProductArt product={card} /></div>
                  </Link>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-semibold text-ink">{card.name}</p>
                    <p className="text-[11.5px] text-muted">
                      {card.kind === 'single' ? `${card.set} · #${card.number}` : card.brand ?? card.sealedKind}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                      {l.condition && <ConditionBadge code={l.condition} />}
                      {variantLabel(l) && !l.condition && (
                        <span className="rounded-[3px] border border-line px-1.5 py-[2px] text-[10px] font-bold text-ink">{variantLabel(l)}</span>
                      )}
                      {l.condition && l.language && (
                        <span className="rounded-[3px] border border-line px-1.5 py-[2px] text-[10px] font-bold text-ink">{l.language}</span>
                      )}
                      {card.kind === 'single' && l.stock === 1 && (
                        <span className="text-[11px] font-semibold text-accent-ink">last one</span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-[14.5px] font-bold text-ink">{inr(l.price)}</span>
                      {l.mrp && <span className="text-[12px] text-muted line-through">{inr(l.mrp)}</span>}
                    </div>
                    <div className="flex gap-4 pt-2">
                      <button className="text-[12px] font-semibold uppercase text-muted">Remove</button>
                      <button className="text-[12px] font-semibold uppercase text-accent-ink">Move to watchlist</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mx-4 mt-2 flex items-center gap-3 rounded-card border border-dashed border-primary bg-primary-tint p-3.5">
            <span className="flex-1 text-[12.5px] text-ink">
              Apply <span className="font-bold">VAULT10</span> for 10% off singles
            </span>
            <button className="text-[12px] font-bold uppercase text-primary-dark">Apply</button>
          </div>

          <div className="mt-6 bg-surface-2 px-4 py-5">
            <h2 className="section-title pb-3">Price details</h2>
            {[
              ['Total MRP', inr(mrp)],
              ['Discount', '– ' + inr(mrp - subtotal)],
              ['Shipping', shipping === 0 ? 'FREE' : inr(shipping)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 text-[13.5px] text-body">
                <span>{k}</span><span className={v === 'FREE' ? 'font-semibold text-primary' : ''}>{v}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-line pt-3 text-[15px] font-bold text-ink">
              <span>Total</span><span>{inr(subtotal + shipping)}</span>
            </div>
            <p className="pt-2 text-[11.5px] text-muted">You&apos;ll earn {Math.round(subtotal * 0.1)} Vault Points on this order.</p>
          </div>

          <div className="sticky bottom-0 z-20 flex items-center gap-3 border-t border-line bg-white px-4 py-3">
            <div className="flex-1">
              <p className="text-[16px] font-bold text-ink">{inr(subtotal + shipping)}</p>
              <p className="text-[11px] text-muted">{items.length} items</p>
            </div>
            {/* The login gate sits here and nowhere earlier. */}
            <Link href="/login" className="btn-primary flex-1">Login to pay</Link>
          </div>
        </>
      )}
    </Screen>
  );
}
