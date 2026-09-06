'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GoogleIcon } from '@/components/icons';
import { franchises } from '@/lib/data';
import { CardArt } from '@/components/CardArt';

/**
 * Phone-first OTP with a visible SKIP, mirroring the reference app.
 *
 * The skip matters commercially: browsing stays open to everyone and the
 * account is only required at checkout, so search traffic can reach a card
 * without hitting a wall. The guest cart merges into the account on sign-in.
 */
const HERO = [
  { slug: 'charizard-ex-223', name: 'Charizard ex' },
  { slug: 'luffy-op05-119', name: 'Monkey D. Luffy' },
  { slug: 'goku-bt21-121', name: 'Son Goku' },
];

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const valid = /^[6-9]\d{9}$/.test(phone);

  return (
    <div className="relative flex min-h-screen flex-col bg-tile">
      {/* Hero: on the reference app this is a lifestyle photo. Card art does
          the same job here — it shows the buyer what the shop sells. */}
      <div className="relative h-[46vh] min-h-[300px] overflow-hidden bg-tile">
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {HERO.map(({ slug, name }, i) => (
            <div
              key={slug}
              className="aspect-[5/7] w-[36%] drop-shadow-2xl"
              style={{ transform: `rotate(${(i - 1) * 9}deg) translateY(${i === 1 ? -14 : 10}px)` }}
            >
              <CardArt slug={slug} name={name} franchise={franchises[i].slug} holo />
            </div>
          ))}
        </div>
        <Link
          href="/"
          className="absolute right-4 top-4 rounded-full bg-black/45 px-5 py-2 text-[13px] font-bold uppercase tracking-wider text-white backdrop-blur"
        >
          Skip
        </Link>
      </div>

      <div className="-mt-6 flex-1 rounded-t-sheet bg-white px-5 pt-7">
        <h1 className="u-head text-[21px] font-extrabold uppercase tracking-[0.02em] text-ink">
          Log in to order
        </h1>
        <p className="mt-1 text-[13px] text-muted">
          Browsing is open to all. An account is only needed to check out and track orders.
        </p>

        <label className="mt-6 flex h-[58px] items-center rounded-tile border border-line focus-within:border-primary">
          <span className="grid w-[74px] place-items-center border-r border-line text-[16px] text-muted">+91</span>
          <input
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter Mobile Number"
            className="h-full flex-1 rounded-r-tile px-4 text-[16px] text-ink outline-none placeholder:text-muted"
          />
        </label>

        <p className="mt-4 text-[12.5px] leading-relaxed text-body">
          By continuing, I agree to the{' '}
          <span className="font-semibold text-accent-ink">Terms of Use</span> &{' '}
          <span className="font-semibold text-accent-ink">Privacy Policy</span>
        </p>

        <button
          disabled={!valid}
          className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          Continue to login
        </button>

        <p className="mt-5 text-center text-[13.5px] text-body">
          New to CardVault?{' '}
          <span className="font-bold uppercase text-accent-ink underline">Register now</span>
        </p>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="text-[13px] text-muted">OR</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="flex justify-center pb-8">
          <button aria-label="Continue with Google" className="grid h-14 w-14 place-items-center rounded-full border border-line">
            <GoogleIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
