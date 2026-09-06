'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Screen, SubHeader } from '@/components/chrome';
import { ProductArt, artAspect } from '@/components/ProductArt';
import { PreorderBadge } from '@/components/product';
import { BellIcon, HeartIcon, ShieldIcon, TruckIcon } from '@/components/icons';
import { inr, productBySlug, variantsFor, type Variant } from '@/lib/data';

/**
 * Detail page for sealed product and gear.
 *
 * Singles keep their own page because they sell a specific physical copy.
 * Here the buyer is picking options off a restockable SKU — colour, pack
 * size, language, edition — which is a different interaction and a different
 * stock story: out-of-stock means "notify me", not "gone forever".
 */
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = productBySlug(slug);
  const variants = variantsFor(slug ?? '');
  const [picked, setPicked] = useState(0);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);

  if (!product || variants.length === 0 || product.kind === 'single') {
    return (
      <Screen>
        <SubHeader title="Product" />
        <p className="px-6 py-24 text-center text-[14px] text-muted">This product is no longer listed.</p>
      </Screen>
    );
  }

  const v = variants[picked];
  const colours = variants.filter((x) => x.colour);
  const packs = variants.filter((x) => x.packSize && !x.colour);
  const langs = variants.filter((x) => x.language);
  const soldOut = v.stock === 0 && !v.preorder;

  const Option = ({ on, disabled, children, onClick }: {
    on: boolean; disabled?: boolean; children: React.ReactNode; onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-tile border px-3.5 py-2 text-[13px] font-medium
        ${on ? 'border-primary bg-primary-tint text-primary-dark' : 'border-line bg-white text-body'}
        ${disabled ? 'cursor-not-allowed text-muted line-through opacity-50' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <Screen>
      <SubHeader title={product.name} right={
        <button onClick={() => setSaved((s) => !s)} aria-label="Watchlist" className={saved ? 'text-accent' : 'text-ink'}>
          <HeartIcon filled={saved} />
        </button>
      } />

      <div className="bg-surface-2 px-8 py-6">
        <div className={`mx-auto w-[74%] ${artAspect(product.kind)}`}>
          <ProductArt product={product} tint={v.colour?.hex} />
        </div>
      </div>

      <div className="px-4 pt-4">
        {product.brand && (
          <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">{product.brand}</p>
        )}
        {product.set && (
          <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">{product.set} · {product.setCode}</p>
        )}
        <h1 className="u-head pt-1 text-[21px] font-extrabold leading-tight text-ink">{product.name}</h1>
        {product.blurb && <p className="pt-1 text-[13px] text-muted">{product.blurb}</p>}

        <div className="flex items-baseline gap-2.5 pt-4">
          <span className="u-head text-[26px] font-extrabold text-ink">{inr(v.price)}</span>
          {v.mrp && (
            <>
              <span className="text-[14px] text-muted line-through">{inr(v.mrp)}</span>
              <span className="text-[14px] font-bold text-primary">
                {Math.round((1 - v.price / v.mrp) * 100)}% off
              </span>
            </>
          )}
        </div>
        <p className="text-[11.5px] text-muted">Inclusive of all taxes</p>

        {v.preorder && (
          <div className="mt-3 rounded-tile bg-club-tint px-3.5 py-2.5">
            <PreorderBadge when={v.preorder} />
            <p className="pt-1.5 text-[12.5px] text-ink">
              Charged now, dispatched on release day. Cancel any time before it ships.
            </p>
          </div>
        )}
        {!v.preorder && v.stock > 0 && v.stock <= 5 && (
          <p className="mt-3 inline-flex rounded-tile bg-[#FBE3E1] px-3 py-1.5 text-[12.5px] font-bold text-accent-ink">
            Only {v.stock} left
          </p>
        )}
      </div>

      {colours.length > 0 && (
        <div className="px-4 pt-6">
          <h2 className="section-title pb-1">Colour</h2>
          <p className="pb-3 text-[12.5px] text-muted">{v.colour?.name}</p>
          <div className="flex flex-wrap gap-2.5">
            {colours.map((c) => {
              const i = variants.indexOf(c);
              const on = i === picked;
              return (
                <button
                  key={c.id}
                  onClick={() => setPicked(i)}
                  disabled={c.stock === 0}
                  aria-label={c.colour!.name}
                  className={`relative h-11 w-11 rounded-full border-2 ${on ? 'border-primary' : 'border-line'} ${c.stock === 0 ? 'opacity-35' : ''}`}
                  style={{ background: c.colour!.hex }}
                >
                  {c.stock === 0 && <span className="absolute inset-0 grid place-items-center text-[18px] text-white">/</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {packs.length > 1 && (
        <div className="px-4 pt-6">
          <h2 className="section-title pb-3">Pack size</h2>
          <div className="flex flex-wrap gap-2">
            {packs.map((p) => {
              const i = variants.indexOf(p);
              return (
                <Option key={p.id} on={i === picked} disabled={p.stock === 0} onClick={() => setPicked(i)}>
                  {p.packSize} — {inr(p.price)}
                </Option>
              );
            })}
          </div>
        </div>
      )}

      {langs.length > 1 && (
        <div className="px-4 pt-6">
          <h2 className="section-title pb-3">Print run</h2>
          <div className="flex flex-wrap gap-2">
            {langs.map((l) => {
              const i = variants.indexOf(l);
              return (
                <Option key={l.id} on={i === picked} onClick={() => setPicked(i)}>
                  {l.language === 'EN' ? 'English' : 'Japanese'} — {inr(l.price)}
                </Option>
              );
            })}
          </div>
          <p className="pt-2 text-[12px] text-muted">
            Japanese print runs are cheaper per pack but pull from a different card pool.
          </p>
        </div>
      )}

      <div className="flex items-center gap-4 px-4 pt-6">
        <h2 className="section-title">Quantity</h2>
        <div className="flex items-center gap-4 rounded-tile border border-line px-3 py-1.5">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-[18px] text-ink">−</button>
          <span className="w-6 text-center text-[15px] font-semibold text-ink">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(v.stock || 99, q + 1))} className="text-[18px] text-ink">+</button>
        </div>
      </div>

      <div className="mt-6 space-y-3 bg-surface-2 px-4 py-5">
        {[
          product.kind === 'sealed'
            ? { i: <ShieldIcon className="h-6 w-6" />, t: 'Sealed and untampered', s: 'Straight from the distributor. We never weigh or search packs.' }
            : { i: <ShieldIcon className="h-6 w-6" />, t: 'Genuine stock', s: `Sourced direct from ${product.brand ?? 'the brand'}. No counterfeits, ever.` },
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

      {soldOut && (
        <div className="m-4 flex items-center gap-3 rounded-card border border-line p-4">
          <BellIcon className="h-6 w-6 text-club" />
          <span className="flex-1 text-[12.5px] text-body">Out of stock — we&apos;ll alert you when it&apos;s back.</span>
          <button className="text-[12px] font-bold uppercase text-accent-ink">Notify me</button>
        </div>
      )}

      <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-3 border-t border-line bg-white px-4 py-3">
        <button onClick={() => setSaved(true)} className="btn-outline">Watchlist</button>
        {soldOut ? (
          <button className="btn-primary" disabled>Sold out</button>
        ) : (
          <Link href="/cart" className="btn-primary">{v.preorder ? 'Preorder' : 'Add to cart'}</Link>
        )}
      </div>
    </Screen>
  );
}
