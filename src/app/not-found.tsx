import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Roll } from '@/components/Icons';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description:
    'Essa página não está aqui. Se você precisa de ajuda agora, ligue para a Central 24 h da Ouromed.',
};

// A espinha para num beco: o papel cobre a linha a partir da metade e um travessão ouro a fecha.
export default function NotFound() {
  return (
    <section className="nf wrap" aria-labelledby="nf-h">
      <div className="nf__end" aria-hidden="true" />
      <p className="read nf__code">404</p>
      <div className="phero__mask">
        <h1 id="nf-h" className="nf__title">
          Essa página não está aqui.
        </h1>
      </div>
      <p className="nf__text">
        O endereço mudou ou foi digitado com erro. Se você precisa de ajuda agora, ligue para a
        Central 24 h.
      </p>
      <div className="nf__btns">
        <a href={`tel:${site.phones.tel}`} className="btn btn--gold btn--lg">
          <Phone className="ico" />
          <Roll>Ligar {site.phones.display}</Roll>
        </a>
        <Link href="/" className="btn btn--ghost btn--lg">
          <Roll>Ir para o início</Roll>
        </Link>
      </div>
    </section>
  );
}
