'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BagIcon, BackIcon, CrownIcon, GridIcon, HeartIcon, HomeIcon, MenuIcon, SearchIcon, SleeveIcon, ShieldIcon, TruckIcon } from './icons';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`u-head inline-flex items-baseline gap-[3px] ${className}`}>
      <span className="text-[19px] font-extrabold uppercase tracking-[0.02em] text-ink">Card</span>
      <span className="text-[19px] font-extrabold uppercase tracking-[0.02em] text-accent">Vault</span>
    </Link>
  );
}

/**
 * Search sits in the header as a live input rather than behind an icon:
 * a large share of card buyers arrive knowing the exact card or set code
 * they want, so hiding search under a tap costs the highest-intent traffic.
 */
export function Header({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="flex items-center gap-3 px-4 pb-2 pt-3">
        <button aria-label="Menu" className="text-ink"><MenuIcon /></button>
        <Logo className="mx-auto" />
        <Link href="/cart" aria-label="Cart" className="relative text-ink">
          <BagIcon />
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
      <div className="px-4 pb-3">
        <Link href="/browse" className="flex h-11 items-center gap-2 rounded-tile border border-line bg-surface-2 px-3 text-muted">
          <SearchIcon className="h-[18px] w-[18px]" />
          <span className="text-[13.5px]">Search card, set or code — “OP05-119”</span>
        </Link>
      </div>
    </header>
  );
}

export function SubHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 bg-white px-4 py-3.5">
      <Link href="/" aria-label="Back" className="text-ink"><BackIcon /></Link>
      <h1 className="u-head flex-1 text-center text-[15px] font-extrabold uppercase tracking-[0.06em] text-ink">{title}</h1>
      <div className="w-6 text-ink">{right}</div>
    </header>
  );
}

export function PromoStrip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary px-4 py-2.5 text-center text-[13.5px] font-semibold text-white">
      {children}
    </div>
  );
}

/**
 * The reference app's trust row, re-pointed at what a card buyer actually
 * worries about: is the grade honest, will it arrive bent, how fast.
 */
export function TrustStrip() {
  const items = [
    { icon: <ShieldIcon className="h-7 w-7" />, a: 'Condition', b: 'checked & guaranteed' },
    { icon: <SleeveIcon className="h-7 w-7" />, a: 'Sleeved +', b: 'toploader on every card' },
    { icon: <TruckIcon className="h-7 w-7" />, a: 'Same-day', b: 'dispatch before 4pm' },
  ];
  return (
    <div className="flex items-start justify-between gap-2 bg-primary-tint px-4 py-3.5">
      {items.map((i) => (
        <div key={i.a} className="flex flex-1 flex-col items-center gap-1.5 text-center">
          <span className="text-primary-dark">{i.icon}</span>
          <span className="text-[11px] font-bold leading-tight text-ink">{i.a}</span>
          <span className="text-[10.5px] leading-tight text-muted">{i.b}</span>
        </div>
      ))}
    </div>
  );
}

const TABS = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/watchlist', label: 'Watchlist', Icon: HeartIcon },
  { href: '/sets', label: 'Sets', Icon: GridIcon },
  { href: '/club', label: 'Club', Icon: CrownIcon },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-line bg-white pb-1 pt-2">
      {TABS.map(({ href, label, Icon }) => {
        const on = href === '/' ? path === '/' : path.startsWith(href);
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1">
            <Icon className={`h-[23px] w-[23px] ${on ? 'text-accent' : 'text-ink'}`} />
            <span className={`text-[11px] ${on ? 'font-semibold text-accent' : 'text-body'}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/** Wraps a screen so every page gets the same nav footprint. */
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}
