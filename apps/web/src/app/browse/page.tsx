'use client';

import { useMemo, useState } from 'react';
import { Header, PromoStrip, Screen } from '@/components/chrome';
import { ProductGrid } from '@/components/product';
import { FilterIcon, SortIcon } from '@/components/icons';
import {
  BRANDS, GEAR_CATEGORIES, KINDS, SEALED_KINDS, conditions, facetsFor, franchises, tiles,
  type ConditionCode, type GearCategory, type Kind, type Language, type SealedKind,
} from '@/lib/data';

const SORTS = ['Relevance', 'Price: low to high', 'Price: high to low', 'Newest first'] as const;

/**
 * Facets follow the kind being browsed.
 *
 * Offering "Condition: Near Mint / Lightly Played" while someone shops for
 * binders is nonsense, and offering "Colour" on a Charizard is worse — so
 * facetsFor() decides which groups render rather than showing all of them
 * and letting most return nothing.
 */
export default function BrowsePage() {
  const [sheet, setSheet] = useState<null | 'filter' | 'sort'>(null);
  const [kind, setKind] = useState<Kind | undefined>();
  const [franchise, setFranchise] = useState<string | undefined>();
  const [category, setCategory] = useState<GearCategory | undefined>();
  const [sealedKind, setSealedKind] = useState<SealedKind | undefined>();
  const [brand, setBrand] = useState<string | undefined>();
  const [cond, setCond] = useState<ConditionCode[]>([]);
  const [lang, setLang] = useState<Language[]>([]);
  const [inStock, setInStock] = useState(true);
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Relevance');

  const facets = facetsFor(kind);

  const list = useMemo(() => {
    const t = tiles({
      kind, franchise, category, sealedKind, brand,
      condition: cond, language: lang, inStock,
    });
    if (sort === 'Price: low to high') return [...t].sort((a, b) => a.variant.price - b.variant.price);
    if (sort === 'Price: high to low') return [...t].sort((a, b) => b.variant.price - a.variant.price);
    return t;
  }, [kind, franchise, category, sealedKind, brand, cond, lang, inStock, sort]);

  const applied = [
    ...(franchise ? [{ k: 'f', label: franchises.find((f) => f.slug === franchise)!.name, clear: () => setFranchise(undefined) }] : []),
    ...(category ? [{ k: 'cat', label: category, clear: () => setCategory(undefined) }] : []),
    ...(sealedKind ? [{ k: 'sk', label: sealedKind, clear: () => setSealedKind(undefined) }] : []),
    ...(brand ? [{ k: 'b', label: brand, clear: () => setBrand(undefined) }] : []),
    ...cond.map((c) => ({ k: 'c' + c, label: c, clear: () => setCond((x) => x.filter((v) => v !== c)) })),
    ...lang.map((l) => ({ k: 'l' + l, label: l, clear: () => setLang((x) => x.filter((v) => v !== l)) })),
  ];

  const clearAll = () => {
    setFranchise(undefined); setCategory(undefined); setSealedKind(undefined);
    setBrand(undefined); setCond([]); setLang([]);
  };

  /** Switching kind drops facets that no longer apply, so nothing filters invisibly. */
  const pickKind = (k: Kind | undefined) => {
    setKind(k);
    if (k !== 'single') setCond([]);
    if (k !== 'accessory') { setCategory(undefined); setBrand(undefined); }
    if (k !== 'sealed') setSealedKind(undefined);
    if (k === 'accessory') { setFranchise(undefined); setLang([]); }
  };

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <>
      <p className="pb-2 text-[12px] font-bold uppercase tracking-wider text-muted">{title}</p>
      <div className="flex flex-wrap gap-2 pb-5">{children}</div>
    </>
  );

  return (
    <Screen>
      <Header cartCount={3} />
      <PromoStrip>10% back as Vault Points on every order</PromoStrip>

      <div className="rail border-b border-line px-4 py-3">
        <button onClick={() => pickKind(undefined)} className={`chip ${!kind ? 'chip-on' : ''}`}>Everything</button>
        {KINDS.map((k) => (
          <button key={k.id} onClick={() => pickKind(k.id)} className={`chip ${kind === k.id ? 'chip-on' : ''}`}>
            {k.label}
          </button>
        ))}
      </div>

      {/* Secondary rail follows the kind: franchises for cards and boxes,
          gear categories for accessories. */}
      <div className="rail px-4 py-3">
        {kind === 'accessory'
          ? GEAR_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(category === c ? undefined : c)} className={`chip ${category === c ? 'chip-on' : ''}`}>{c}</button>
            ))
          : franchises.map((f) => (
              <button key={f.slug} onClick={() => setFranchise(franchise === f.slug ? undefined : f.slug)} className={`chip ${franchise === f.slug ? 'chip-on' : ''}`}>{f.name}</button>
            ))}
      </div>

      {applied.length > 0 && (
        <div className="rail px-4 pb-3">
          {applied.map((a) => (
            <button key={a.k} onClick={a.clear} className="chip chip-on gap-1.5">
              {a.label} <span className="text-[15px] leading-none">×</span>
            </button>
          ))}
          <button onClick={clearAll} className="chip border-none text-accent-ink underline">Clear all</button>
        </div>
      )}

      <p className="px-4 pb-3 text-[12.5px] text-muted">{list.length} products</p>

      {list.length === 0 ? (
        <div className="px-8 py-20 text-center">
          <p className="u-head text-[16px] font-extrabold uppercase text-ink">Nothing matches</p>
          <p className="mt-2 text-[13px] text-muted">Try clearing a filter or two.</p>
        </div>
      ) : (
        <ProductGrid tiles={list} />
      )}

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
          <div className="max-h-[82vh] overflow-y-auto rounded-t-sheet bg-white p-5" onClick={(e) => e.stopPropagation()}>
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

                {facets.condition && (
                  <Group title="Condition">
                    {conditions.map((c) => (
                      <button key={c.code} onClick={() => toggle(cond, c.code as ConditionCode, setCond)}
                        className={`chip ${cond.includes(c.code as ConditionCode) ? 'chip-on' : ''}`}>
                        {c.code} · {c.label}
                      </button>
                    ))}
                  </Group>
                )}

                {facets.sealedKind && (
                  <Group title="Product type">
                    {SEALED_KINDS.map((s) => (
                      <button key={s} onClick={() => setSealedKind(sealedKind === s ? undefined : s)}
                        className={`chip ${sealedKind === s ? 'chip-on' : ''}`}>{s}</button>
                    ))}
                  </Group>
                )}

                {facets.category && (
                  <Group title="Gear type">
                    {GEAR_CATEGORIES.map((c) => (
                      <button key={c} onClick={() => setCategory(category === c ? undefined : c)}
                        className={`chip ${category === c ? 'chip-on' : ''}`}>{c}</button>
                    ))}
                  </Group>
                )}

                {facets.brand && (
                  <Group title="Brand">
                    {BRANDS.map((b) => (
                      <button key={b} onClick={() => setBrand(brand === b ? undefined : b)}
                        className={`chip ${brand === b ? 'chip-on' : ''}`}>{b}</button>
                    ))}
                  </Group>
                )}

                {facets.language && (
                  <Group title="Print run">
                    {(['EN', 'JP'] as Language[]).map((l) => (
                      <button key={l} onClick={() => toggle(lang, l, setLang)} className={`chip ${lang.includes(l) ? 'chip-on' : ''}`}>
                        {l === 'EN' ? 'English' : 'Japanese'}
                      </button>
                    ))}
                  </Group>
                )}

                <label className="flex items-center justify-between border-t border-line py-4">
                  <span className="text-[14px] text-ink">In stock &amp; preorders only</span>
                  <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-5 w-5 accent-[#2C7A70]" />
                </label>

                <button onClick={() => setSheet(null)} className="btn-primary mt-2 w-full">
                  Show {list.length} products
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </Screen>
  );
}
