import type { Metadata } from 'next';
import Script from 'next/script';
import { CtaBar, Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { archivo, mono } from './fonts';
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
// A intro da marca roda só na primeira visita da sessão e só com motion permitido. O próprio
// script tira a classe ao fim (1,3 s), então o hero nunca fica preso esperando o bundle.
const flags = `(function(){var h=document.documentElement;h.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;h.classList.add('motion');try{if(!sessionStorage.getItem('om-intro')){sessionStorage.setItem('om-intro','1');h.classList.add('intro-on');setTimeout(function(){h.classList.remove('intro-on')},1300)}}catch(e){}})()`;

// VLibras (tradução para Libras, do governo federal), carregado quando a página está ociosa.
// O widget (v7) cria ele mesmo o host #vlibras-access-wrapper com o botão num shadow DOM; a
// posição é dada em globals.css. A marcação antiga ([vw], [vw-access-button]) era do widget v2 e
// não é mais procurada por ele (conferido no script entregue em 25/11: v7.12.3).
const vlibras = `(function(){var s=document.createElement('script');s.src='https://vlibras.gov.br/app/vlibras-plugin.js';s.async=true;s.onload=function(){try{new window.VLibras.Widget('https://vlibras.gov.br/app')}catch(e){}};document.body.appendChild(s)})()`;

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
    <html lang="pt-BR" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script de flags constante, antes da primeira tinta; sem input */}
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        {/* Intro da marca (primeira visita): só aparece com a classe intro-on, posta pelo script de flags. */}
        <div id="intro" aria-hidden="true">
          <div className="intro__brand">
            <svg viewBox="0 0 24 24" className="intro__mark" aria-hidden="true" focusable="false">
              <circle cx={12} cy={12} r={11} fill="var(--c-gold)" />
              <path
                d="M12 6.5v11M6.5 12h11"
                stroke="var(--c-night)"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </svg>
            <span className="intro__word">
              <span className="intro__ouro">Ouro</span>
              <span className="intro__med">med</span>
            </span>
          </div>
        </div>
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
        <Script id="vlibras" strategy="lazyOnload">
          {vlibras}
        </Script>
        <Motion />
      </body>
    </html>
  );
}
