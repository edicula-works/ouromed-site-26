// Foto ou vídeo com o tratamento único do site (mesma cor e granulação para foto real e imagem
// gerada). Proporção fixa: sem deslocamento de layout. Sem arquivo ainda, o slot mostra em mono o
// que vai ali, sobre o azul-noite com a linha ouro, e o layout final já fica pronto.
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { type MediaKey, media } from '@/data/site';

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
  /** Revelação por máscara ao entrar na tela (desligue no hero, que entra por CSS). */
  reveal?: boolean;
  sizes?: string;
  className?: string;
}) {
  const m = media[k];
  const style = { '--ratio': ratio } as CSSProperties;
  return (
    <figure
      className={`media${m.src || m.video ? '' : ' media--empty'} ${className}`}
      style={style}
      data-reveal={reveal ? 'clip' : undefined}
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
          data-reveal-scale
        />
      ) : m.src ? (
        <Image
          className="media__el"
          src={m.src}
          alt={m.alt}
          fill
          sizes={sizes}
          priority={priority}
          data-reveal-scale
        />
      ) : (
        <div className="media__ph" role="img" aria-label={m.alt} data-reveal-scale>
          <span className="media__ph-label">{m.label}</span>
        </div>
      )}
    </figure>
  );
}
