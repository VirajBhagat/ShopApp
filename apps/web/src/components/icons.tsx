/** Inline icons — no icon dependency, and each one ports to react-native-svg as-is. */
type P = { className?: string };
const base = 'h-6 w-6';

export const MenuIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
export const SearchIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
);
export const BagIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M4 8h16l-1.2 12H5.2L4 8Z" /><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
  </svg>
);
export const HeartIcon = ({ className = base, filled }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 5.8-8.5 11.3-8.5 11.3Z" />
  </svg>
);
export const HomeIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" /><path d="M9.5 20v-5h5v5" />
  </svg>
);
export const GridIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" />
  </svg>
);
export const CrownIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M3 8.5 6.5 12 12 5l5.5 7L21 8.5V19H3V8.5Z" />
  </svg>
);
export const BackIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const FilterIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18M6 12h12M10 18h4" />
  </svg>
);
export const SortIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" />
  </svg>
);
export const BellIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" /><path d="M10 18a2 2 0 0 0 4 0" />
  </svg>
);
export const ShieldIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M12 3.5 19 6v6c0 4.5-3 7.3-7 8.5-4-1.2-7-4-7-8.5V6l7-2.5Z" /><path d="m9 12 2 2 4-4" strokeLinecap="round" />
  </svg>
);
export const TruckIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" /><circle cx="6.5" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" />
  </svg>
);
export const SleeveIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2" /><rect x="8.5" y="6" width="7" height="7" rx="1" />
  </svg>
);
export const GoogleIcon = ({ className = 'h-6 w-6' }: P) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.7l7.8 6.1C12.3 13.9 17.6 9.5 24 9.5Z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.2 7.1-17.6Z" />
    <path fill="#FBBC05" d="M10.4 28.2a14.6 14.6 0 0 1 0-8.4l-7.8-6.1a24 24 0 0 0 0 20.6l7.8-6.1Z" />
    <path fill="#34A853" d="M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.6-5.9c-2.1 1.4-4.8 2.3-7.8 2.3-6.4 0-11.7-4.4-13.6-10.3l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5Z" />
  </svg>
);
