'use client';

import { useMemo, useState } from 'react';
import { Header, PromoStrip, Screen } from '@/components/chrome';
import { ProductGrid } from '@/components/product';
import { FilterIcon, SortIcon } from '@/components/icons';
import { conditions, franchises, tiles, type ConditionCode, type Language } from '@/lib/data';

const SORTS = ['Relevance', 'Price: low to high', 'Price: high to low', 'Newest first'] as const;

/**
 * Faceted browse.
 *
 * The reference app gets away with a single scroll-rail of category chips
 * because apparel shoppers browse. Card buyers narrow hard — set, condition,
 * language, budget — so the chip rail stays for quick moods and the real
 * work happens in a filter sheet with multi-select and visible applied state.
 */
export default function BrowsePage() {
  const [sheet, setSheet] = useState<null | 'filter' | 'sort'>(null);
  const [franchise, setFranchise] = useState<string | undefined>();
  const [cond, setCond] = useState<ConditionCode[]>([]);
  const [lang, setLang] = useState<Language[]>([]);
  const [inStock, setInStock] = useState(true);
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Relevance');

  const list = useMemo(() => {
    const t = tiles({ franchise, condition: cond, language: lang, inStock });
    if (sort === 'Price: low to high') return [...t].sort((a, b) => a.listing.price - b.listing.price);
    if (sort === 'Price: high to low') return [...t].sort((a, b) => b.listing.price - a.listing.price);
    return t;
  }, [franchise, cond, lang, inStock, sort]);

  const applied = [
    ...(franchise ? [{ k: 'f', label: franchises.find((f) => f.slug === franchise)!.name, clear: () => setFranchise(undefined) }] : []),
    ...cond.map((c) => ({ k: 'c' + c, label: c, clear: () => setCond((x) => x.filter((v) => v !== c)) })),
    ...lang.map((l) => ({ k: 'l' + l, label: l, clear: () => setLang((x) => x.filter((v) => v !== l)) })),
  ];

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <Screen>
      <Header cartCount={2} />
      <PromoStrip>10% back as Vault Points on every order</PromoStrip>

      <div className="rail px-4 py-3">
        <button onClick={() => setFranchise(undefined)} className={`chip ${!franchise ? 'chip-on' : ''}`}>All</button>
        {franchises.map((f) => (
          <button key={f.slug} onClick={() => setFranchise(f.slug)} className={`chip ${franchise === f.slug ? 'chip-on' : ''}`}>
            {f.name}
          </button>
        ))}
      </div>

      {applied.length > 0 && (
        <div className="rail px-4 pb-3">
          {applied.map((a) => (
            <button key={a.k} onClick={a.clear} className="chip chip-on gap-1.5">
              {a.label} <span className="text-[15px] leading-none">×</span>
            </button>
          ))}
          <button
            onClick={() => { setFranchise(undefined); setCond([]); setLang([]); }}
            className="chip border-none text-accent-ink underline"
          >
            Clear all
          </button>
        </div>
      )}

      <p className="px-4 pb-3 text-[12.5px] text-muted">{list.length} cards</p>

      {list.length === 0 ? (
        <div className="px-8 py-20 text-center">
          <p className="u-head text-[16px] font-extrabold uppercase text-ink">Nothing matches</p>
          <p className="mt-2 text-[13px] text-muted">Try widening the condition or language filters.</p>
        </div>
      ) : (
        <ProductGrid tiles={list} />
      )}

      {/* Sticky action bar — standard on Indian storefronts and the fastest
          route back to the facets after a long scroll. */}
      <div className="sticky bottom-0 z-20 grid grid-cols-2 border-t border-line bg-white">
        <button onClick={() => setSheet('sort')} className="flex items-center justify-center gap-2 py-3.5 text-[13.5px] font-semibold text-ink">
          <SortIcon className="h-[18px] w-[18px]" /> Sort
        </button>
        <button onClick={() => setSheet('filter')} className="flex items-center justify-center gap-2 border-l border-line py-3.5 text-[13.5px] font-semibold text-ink">
          <FilterIcon className="h-[18px] w-[18px]" /> Filter
          {applied.length > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] text-white">{applied.length}</span>}
        </button>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-40 mx-auto flex max-w-app flex-col justify-end bg-black/45" onClick={() => setSheet(null)}>
          <div className="rounded-t-sheet bg-white p-5" onClick={(e) => e.stopPropagation()}>
            {sheet === 'sort' ? (
              <>
                <h3 className="section-title pb-3">Sort by</h3>
                {SORTS.map((s) => (
                  <button key={s} onClick={() => { setSort(s); setSheet(null); }}
                    className={`flex w-full items-center justify-between border-b border-line py-3.5 text-left text-[14px] ${sort === s ? 'font-semibold text-primary' : 'text-body'}`}>
                    {s}{sort === s && <span>✓</span>}
                  </button>
                ))}
              </>
            ) : (
              <>
                <h3 className="section-title pb-4">Filter</h3>

                <p className="pb-2 text-[12px] font-bold uppercase tracking-wider text-muted">Condition</p>
                <div className="flex flex-wrap gap-2 pb-5">
                  {conditions.map((c) => (
                    <button key={c.code} onClick={() => toggle(cond, c.code as ConditionCode, setCond)}
                      className={`chip ${cond.includes(c.code as ConditionCode) ? 'chip-on' : ''}`}>
                      {c.code} · {c.label}
                    </button>
                  ))}
                </div>

                <p className="pb-2 text-[12px] font-bold uppercase tracking-wider text-muted">Language</p>
                <div className="flex flex-wrap gap-2 pb-5">
                  {(['EN', 'JP'] as Language[]).map((l) => (
                    <button key={l} onClick={() => toggle(lang, l, setLang)} className={`chip ${lang.includes(l) ? 'chip-on' : ''}`}>
                      {l === 'EN' ? 'English' : 'Japanese'}
                    </button>
                  ))}
                </div>

                <label className="flex items-center justify-between border-t border-line py-4">
                  <span className="text-[14px] text-ink">In stock only</span>
                  <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-5 w-5 accent-[#2C7A70]" />
                </label>

                <button onClick={() => setSheet(null)} className="btn-primary mt-2 w-full">
                  Show {list.length} cards
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </Screen>
  );
}
