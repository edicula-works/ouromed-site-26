import { Archivo } from 'next/font/google';

// Archivo variável (peso e largura): títulos expandidos (eixo wdth 125, ecoa as letras largas do
// logotipo) e texto na largura normal. Uma família só; números com tabular-nums.
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});
