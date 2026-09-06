'use client';

import { useState } from 'react';
import { Screen, SubHeader } from '@/components/chrome';
import { BellIcon, CrownIcon, ShieldIcon, TruckIcon } from '@/components/icons';
import { inr } from '@/lib/data';

const PLANS = [
  { id: '3m', price: 199, months: 3, per: 66.3 },
  { id: '12m', price: 499, months: 12, per: 41.6, best: true },
];

/**
 * Collector's Club — the reference app's Membership tab, re-aimed.
 *
 * It transfers better to cards than to apparel because the scarcity is real:
 * early access to a preorder window or first pick on a fresh single is worth
 * paying for when there is genuinely one copy. The "add to cart and save on
 * this order" mechanic from the reference is kept — it converts at the moment
 * of highest intent instead of sending the shopper to a separate flow.
 */
export default function ClubPage() {
  const [plan, setPlan] = useState('12m');

  return (
    <Screen>
      <SubHeader title="Collector's Club" />

      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-sheet bg-gradient-to-br from-[#6D3BE4] to-[#3B1E86] px-6 py-8 text-center">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <CrownIcon className="mx-auto h-10 w-10 text-white" />
          <p className="pt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">Member</p>
          <h1 className="u-head pt-2 text-[38px] font-extrabold uppercase leading-none text-white">First pick</h1>
          <p className="pt-3 text-[13px] leading-relaxed text-white/85">
            Early access to every drop, member pricing on singles, and free shipping — all year.
          </p>
        </div>
      </div>

      <div className="px-4 pt-6">
        <h2 className="section-title pb-3">What you get</h2>
        <div className="space-y-3">
          {[
            { i: <BellIcon className="h-6 w-6" />, t: '24-hour early access', s: 'New singles and preorders open to members a full day before everyone else.' },
            { i: <CrownIcon className="h-6 w-6" />, t: 'Member pricing', s: 'Extra 8% off every raw single, stacked on top of sale prices.' },
            { i: <TruckIcon className="h-6 w-6" />, t: 'Free shipping', s: 'On every order, no minimum cart value.' },
            { i: <ShieldIcon className="h-6 w-6" />, t: 'Extended returns', s: '14 days on condition disputes instead of 7.' },
          ].map((b) => (
            <div key={b.t} className="flex gap-3 rounded-card border border-line p-3.5">
              <span className="text-club">{b.i}</span>
              <span>
                <span className="block text-[13.5px] font-bold text-ink">{b.t}</span>
                <span className="block pt-0.5 text-[12px] leading-snug text-muted">{b.s}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-7">
        <h2 className="section-title pb-1 text-center">Become a member</h2>
        <p className="pb-4 text-center text-[12.5px] text-muted">
          Add it to your cart and the discount applies to this order itself.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {PLANS.map((p) => {
            const on = plan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`relative rounded-card border-2 p-4 text-center ${on ? 'border-club bg-club-tint' : 'border-line bg-white'}`}
              >
                {p.best && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-club px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Best value
                  </span>
                )}
                <p className="u-head text-[26px] font-extrabold text-ink">{inr(p.price)}</p>
                <p className="pt-0.5 text-[12.5px] text-muted">{p.months} month plan</p>
                <p className="pt-1.5 text-[11.5px] text-body">₹{p.per}/month</p>
              </button>
            );
          })}
        </div>
        <button className="btn-dark mt-5 w-full">Add membership to cart</button>
        <p className="pb-8 pt-3 text-center text-[11.5px] text-muted">
          Renews manually. Cancel any time — no auto-debit.
        </p>
      </div>
    </Screen>
  );
}
