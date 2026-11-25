import type { ReactNode } from 'react';

type IconProps = { className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function Arrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M4 12h16M13 5l7 7-7 7" {...base} />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        {...base}
      />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 5v14M5 12h14" {...base} />
    </svg>
  );
}

/** Rótulo de botão. O "letter roll" saiu na rodada 6 (inventário de motion fechado). */
export function Roll({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}
