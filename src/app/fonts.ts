import { Archivo, Martian_Mono } from 'next/font/google';

// Duas vozes. Archivo variável (peso e largura): títulos largos (eixo wdth 125, ecoa as letras
// largas do logotipo) e texto na largura normal. Martian Mono: só dados e legendas (telefones,
// números-prova, equipamentos, legendas de imagem), como a mono do olympic.no.
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

export const mono = Martian_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
});
