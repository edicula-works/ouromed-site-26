import type { Metadata } from 'next';
import { ServicePage } from '@/components/ServicePage';
import { serviceBySlug } from '@/data/site';

const service = serviceBySlug('ambulatorios');

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.description,
  alternates: { canonical: './' },
};

export default function Page() {
  return <ServicePage service={service} />;
}
