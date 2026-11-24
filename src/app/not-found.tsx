import type { Metadata } from 'next';
import Link from 'next/link';
import { CallButtons } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description:
    'Essa página não está aqui. Se você precisa de ajuda agora, ligue para a Central 24 h da Ouromed.',
};

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-h">
      <div className="wrap nf__inner">
        <p className="nf__code">404</p>
        <h1 id="nf-h" className="nf__title">
          Essa página não está aqui.
        </h1>
        <p className="nf__text">
          O endereço mudou ou foi digitado com erro. Se você precisa de ajuda agora, ligue para a
          Central 24 h.{' '}
          <Link href="/" className="link">
            Ir para o início
          </Link>
          .
        </p>
        <div className="nf__btns">
          <CallButtons />
        </div>
      </div>
    </section>
  );
}
