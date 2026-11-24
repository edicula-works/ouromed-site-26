import Link from 'next/link';
import { services, site } from '@/data/site';
import { Phone, Pin, Roll, Whats } from './Icons';

// Rodapé como finale (DESIGN.md): a espinha termina no número grande em ouro.
export function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <p className="footer__lede">
            Central 24 h com triagem médica.
            <br />
            Em Belo Horizonte e em todo o Brasil.
          </p>
          <p className="footer__call">
            <a href={`tel:${site.phones.tel}`} className="footer__number">
              {site.phones.display}
            </a>
          </p>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h2 className="footer__h">Serviços</h2>
            <ul className="footer__list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.nav}</Link>
                </li>
              ))}
            </ul>
          </div>
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
                  Avaliar a Ouromed no Google
                </a>
              </li>
            </ul>
            <h2 className="footer__h">E-mails</h2>
            <ul className="footer__list">
              <li>
                <a href={`mailto:${site.emails.agendamento}`}>Agendamento de remoção</a>
              </li>
              <li>
                <a href={`mailto:${site.emails.eventos}`}>Locação e eventos</a>
              </li>
              <li>
                <a href={`mailto:${site.emails.diretoria}`}>Diretoria</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="footer__h">Onde</h2>
            <address className="footer__address">
              <Pin className="ico" />
              <span>
                {site.address.street}
                <br />
                {site.address.district}, {site.address.city}/{site.address.state}
                <br />
                {site.address.zip}
              </span>
            </address>
            <ul className="footer__phones">
              {site.phones.all.map((p, i) => (
                <li key={p}>
                  <a href={`tel:${site.phones.allTel[i]}`}>
                    <Phone className="ico" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  <Whats className="ico" />
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            <strong>{site.name}</strong>, {site.legalName.replace('Ouromed, ', '')}
            {/* CNPJ: ausente no site atual; só renderiza quando o cliente enviar. */}
            {site.cnpj && <> · CNPJ {site.cnpj}</>}
          </p>
          <p className="footer__emergency">
            <a href={site.emergency.tel}>{site.emergency.label}</a>
          </p>
          <p className="footer__small">
            © {y} {site.name}. Site por <a href="https://edicula.works">Edícula Works</a>.
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
      <a href={`tel:${site.phones.tel}`} className="btn btn--gold ctabar__btn">
        <Phone className="ico" />
        <Roll>Ligar {site.phones.display}</Roll>
      </a>
      <a
        href={site.whatsapp.href}
        className="btn btn--ghost ctabar__btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Whats className="ico" />
        <Roll>WhatsApp</Roll>
      </a>
    </nav>
  );
}
