import { IBM_Plex_Mono, Schibsted_Grotesk } from 'next/font/google';

// Schibsted Grotesk: voz (display e texto). IBM Plex Mono: leituras (telefone, horas, siglas).
// next/font/google baixa e hospeda os arquivos no build; subsets latin cobrem o português.
export const grotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
