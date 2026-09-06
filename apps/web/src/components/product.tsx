'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProductArt, artAspect } from './ProductArt';
import { HeartIcon } from './icons';
import { conditionMeta, inr, variantsFor, type Tile, type Variant } from '@/lib/data';

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

export function PreorderBadge({ when }: { when: string }) {
  return (
    <span className="inline-flex items-center rounded-[3px] bg-club px-1.5 py-[2px] text-[10px] font-bold text-white">
      PREORDER
      <span className="pl-1 font-medium opacity-80">{when}</span>
    </span>
  );
}

function Swatches({ variants }: { variants: Variant[] }) {
  const cols = variants.filter((v) => v.colour);
  if (cols.length < 2) return null;
  return (
    <span className="flex items-center gap-1 pt-1">
      {cols.slice(0, 5).map((v) => (
        <span
          key={v.id}
          title={v.colour!.name}
          className={`h-3 w-3 rounded-full border border-line ${v.stock === 0 ? 'opacity-30' : ''}`}
          style={{ background: v.colour!.hex }}
        />
      ))}
      {cols.length > 5 && <span className="text-[10.5px] text-muted">+{cols.length - 5}</span>}
    </span>
  );
}

/**
 * One tile for all three product kinds.
 *
 * The sub-line under the name is what changes: a single needs its condition
 * and print run, a sealed box needs its contents and preorder date, and gear
 * needs its brand and the colours it comes in. Same grid, different proof.
 */
export function ProductTile({ tile }: { tile: Tile }) {
  const { product, variant, count } = tile;
  const [saved, setSaved] = useState(false);
  const all = variantsFor(product.slug);
  const scarce = product.kind === 'single' && variant.stock === 1;
  const href = product.kind === 'single' ? `/card/${product.slug}` : `/product/${product.slug}`;

  return (
    <div className="relative">
      <Link href={href} className="block">
        <div className={`relative overflow-hidden rounded-tile ${product.kind === 'single' ? 'bg-tile p-3' : 'bg-surface-2 p-2'}`}>
          <div className={`mx-auto w-full ${artAspect(product.kind)}`}>
            <ProductArt product={product} tint={variant.colour?.hex} />
          </div>
          <div className="absolute bottom-2 left-2 flex flex-wrap items-center gap-1">
            {variant.condition && <ConditionBadge code={variant.condition} />}
            {product.kind === 'single' && variant.language && <LangBadge lang={variant.language} />}
            {variant.graded && <GradeBadge company={variant.graded.company} grade={variant.graded.grade} />}
            {variant.preorder && <PreorderBadge when={variant.preorder} />}
          </div>
        </div>

        <div className="pt-2">
          <p className="truncate text-[13.5px] font-semibold text-ink">{product.name}</p>
          <p className="truncate text-[11.5px] text-muted">
            {product.kind === 'single'
              ? `${product.set} · ${product.number}`
              : product.kind === 'sealed'
                ? `${product.sealedKind}${product.blurb ? ' · ' + product.blurb.split(' · ')[0] : ''}`
                : `${product.brand} · ${product.category}`}
          </p>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[14px] font-bold text-ink">{inr(variant.price)}</span>
            {variant.mrp && (
              <>
                <span className="text-[11.5px] text-muted line-through">{inr(variant.mrp)}</span>
                <span className="text-[11.5px] font-semibold text-primary">
                  {Math.round((1 - variant.price / variant.mrp) * 100)}% off
                </span>
              </>
            )}
          </div>

          {product.kind === 'accessory' ? (
            <Swatches variants={all} />
          ) : (
            <p className={`mt-0.5 text-[11px] font-semibold ${scarce ? 'text-accent-ink' : 'text-muted'}`}>
              {scarce
                ? 'Only 1 left'
                : variant.preorder
                  ? `Preorder · ${variant.preorder}`
                  : product.kind === 'single'
                    ? `${count} copies from ${inr(variant.price)}`
                    : variant.stock <= 5
                      ? `Only ${variant.stock} left`
                      : 'In stock'}
            </p>
          )}
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
      {tiles.map((t) => <ProductTile key={t.product.slug} tile={t} />)}
    </div>
  );
}
