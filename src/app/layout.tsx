import type { Metadata } from 'next';
import Script from 'next/script';
import { CtaBar, Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { grotesk, mono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Ouromed: ambulância UTI e atendimento domiciliar em BH | Central 24 h',
    template: '%s | Ouromed',
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  robots: { index: true, follow: true },
};

// Antes da primeira tinta: estilos "escondido até revelar" só valem com JS e com motion permitidos.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

// Tag do Google Ads (ID 955189289, só remarketing; não havia label de conversão no site de 2011).
const gtag = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ads.id}');`;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${site.url}/#ouromed`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phones.tel,
  email: site.emails.agendamento,
  medicalSpecialty: 'Emergency',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip.replace('CEP ', ''),
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Belo Horizonte' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens: '00:00',
      closes: '23:59',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script de flags constante, antes da primeira tinta; sem input */}
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel" />
        </div>

        <Header />

        <div id="page">
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          {/* A espinha: a linha ouro que nasce no telefone do cabeçalho e termina no número do rodapé. */}
          <div className="spine" data-spine aria-hidden="true">
            <span className="spine__track" />
            <span className="spine__draw" data-spine-draw />
            <span className="spine__tip" data-spine-tip />
          </div>
        </div>

        <CtaBar />

        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD serializado com JSON.stringify e "<" escapado
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.ads.id}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {gtag}
        </Script>
        <Motion />
      </body>
    </html>
  );
}
