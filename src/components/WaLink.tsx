'use client';

import { usePathname } from 'next/navigation';
// Link do WhatsApp com mensagem pré-preenchida conforme a rota (header, barra fixa e rodapé
// não sabem a página): "Olá, vim pelo site da Ouromed e preciso de …". Ver waTopicByPath.
import type { ReactNode } from 'react';
import { waHref, waTopicByPath } from '@/data/site';

export function useWaHref(): string {
  const topic = waTopicByPath(usePathname() ?? '');
  return waHref(topic);
}

export function WaLink({
  className,
  children,
  topic,
}: {
  className?: string;
  children: ReactNode;
  topic?: string;
}) {
  const byRoute = useWaHref();
  const href = topic ? waHref(topic) : byRoute;
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
