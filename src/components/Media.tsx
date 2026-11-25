// Foto ou vídeo com o tratamento único do site (mesma cor e granulação para foto real e imagem
// gerada). Proporção fixa: sem deslocamento de layout. As cenas geradas por IA levam a legenda
// "Imagem ilustrativa" (AGENTS.md §1). A foto entra pelos arquivos que
// scripts/fotos.mjs gerou em public/midia/ (AVIF e WebP em larguras, registrados em
// src/data/midia.json), num <picture>: o navegador escolhe o formato e a largura pelo `sizes`.
// Sem arquivo, o slot mostra em mono o que vai ali, sobre o azul-noite com a linha ouro.
import type { CSSProperties } from 'react';
import { type MediaKey, media, midiaDe } from '@/data/site';

export function Media({
  k,
  ratio = '4 / 3',
  priority = false,
  reveal = true,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  className = '',
}: {
  k: MediaKey;
  ratio?: string;
  priority?: boolean;
  /** Aparece por transparência ao entrar na tela (fotos não deslizam; pedido da pessoa, 24/11). */
  reveal?: boolean;
  sizes?: string;
  className?: string;
}) {
  const m = media[k];
  const g = midiaDe(k);
  // A largura do meio é o `src` do <img> (para navegadores sem srcset).
  const meia = g?.larguras[Math.floor(g.larguras.length / 2)];
  const srcset = (fmt: 'avif' | 'webp') => g?.larguras.map((a) => `${a[fmt]} ${a.w}w`).join(', ');
  const style = { '--ratio': ratio } as CSSProperties;
  return (
    <figure
      className={`media${m.video || g ? '' : ' media--empty'} ${className}`}
      style={style}
      data-reveal={reveal ? 'fade' : undefined}
    >
      {m.video ? (
        <video
          className="media__el"
          src={m.video}
          poster={m.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={m.alt}
          data-media-video
        />
      ) : g && meia ? (
        <picture>
          <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
          <img
            className="media__el"
            src={meia.webp}
            srcSet={srcset('webp')}
            sizes={sizes}
            width={meia.w}
            height={meia.h}
            alt={m.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
            // Onde o recorte ancora quando a caixa tem outra proporção que a do arquivo (mapa de fotos).
            style={g.posicao ? { objectPosition: g.posicao } : undefined}
          />
        </picture>
      ) : (
        <div className="media__ph" role="img" aria-label={m.alt}>
          <span className="media__ph-label">{m.label}</span>
        </div>
      )}
      {/* Cenário fictício gerado por IA: declarado na tela (AGENTS.md §1). A foto real não leva. */}
      {g && m.origem === 'ia' && (
        <figcaption className="media__nota">Imagem ilustrativa</figcaption>
      )}
    </figure>
  );
}
