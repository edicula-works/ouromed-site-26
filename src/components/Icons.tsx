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

export function Whats({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" {...base} />
      <path
        d="M9 8.5c0 4 2.5 6.5 6.5 6.5l.5-2-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"
        {...base}
        strokeWidth={1.6}
      />
    </svg>
  );
}

export function Pin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" {...base} />
      <circle cx={12} cy={9} r={2.5} {...base} />
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

/** Rótulo que rola no hover (um tratamento por papel: botões primários e navegação). */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function Tel({
  className,
  children = 'Ligar (31) 3786-1506',
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href="tel:+553137861506" className={className}>
      <Phone className="ico" />
      <Roll>{children}</Roll>
    </a>
  );
}
