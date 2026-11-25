import Link from 'next/link';
import { audiencePages, type Publico, serviceHref, servicesFor, site } from '@/data/site';
import { Phone, Whats } from './Icons';
import { Texture } from './Sections';
import { WaLink } from './WaLink';

const groups: Publico[] = ['voce', 'empresa'];

// Rodapé: o telefone grande, os serviços por público, onde fica e os dados legais.
export function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="footer">
      {/* A Serra do Curral em traço é o fundo do rodapé inteiro; o conteúdo fica por cima. */}
      <Texture className="tex--serra tex--footer" />
      <div className="wrap footer__inner">
        <div className="footer__top">
          <div className="footer__call">
            <p className="footer__lede">Central 24 horas com triagem médica.</p>
            <a href={`tel:${site.phones.tel}`} className="footer__number">
              {site.phones.display}
            </a>
          </div>
          <p className="footer__note">
            <a href={site.emergency.tel}>{site.emergency.label}</a>
          </p>
        </div>

        <div className="footer__grid">
          {groups.map((g) => (
            <div key={g} className="footer__col">
              <h2 className="footer__h">
                <Link href={audiencePages[g].path}>{audiencePages[g].nav}</Link>
              </h2>
              <ul className="footer__list">
                {servicesFor(g).map((s) => (
                  <li key={s.slug}>
                    <Link href={serviceHref(s)}>{s.nav}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer__col">
            <h2 className="footer__h">A Ouromed</h2>
            <ul className="footer__list">
              <li>
                <Link href="/sobre">Sobre</Link>
              </li>
              <li>
                <Link href="/contato">Contato e orçamento</Link>
              </li>
              <li>
                <a href={site.googleReview} target="_blank" rel="noopener noreferrer">
                  Avaliar no Google
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="footer__h">Onde</h2>
            <address className="footer__address">
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city}/{site.address.state}
              <br />
              {site.address.zip}
            </address>
            <ul className="footer__list">
              {site.phones.all.slice(1).map((p, i) => (
                <li key={p}>
                  <a href={`tel:${site.phones.allTel[i + 1]}`}>{p}</a>
                </li>
              ))}
              <li>
                <WaLink>WhatsApp {site.whatsapp.display}</WaLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {y} {site.legalName}
            {/* CNPJ: ausente no site atual; só renderiza quando o cliente enviar. */}
            {site.cnpj && <> · CNPJ {site.cnpj}</>}
          </p>
          <p className="footer__credits">
            Desenho da serra a partir de foto de Eduardo Elias Camponez,{' '}
            <a href="https://creativecommons.org/licenses/by/2.0/deed.pt-br">CC BY 2.0</a> · Site
            por <a href="https://edicula.works">Edícula Works</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Barra fixa no celular: telefone e WhatsApp em toda página (a conversão é ligar). */
export function CtaBar() {
  return (
    <nav className="ctabar" aria-label="Contato rápido">
      <a href={`tel:${site.phones.tel}`} className="btn btn--gold">
        <Phone className="ico" />
        Ligar {site.phones.display}
      </a>
      <WaLink className="btn btn--ghost">
        <Whats className="ico" />
        WhatsApp
      </WaLink>
    </nav>
  );
}
