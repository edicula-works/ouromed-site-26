import type { CSSProperties } from 'react';

/** Índice para atrasos em cascata no CSS (`animation-delay: calc(60ms * var(--i))`). */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
