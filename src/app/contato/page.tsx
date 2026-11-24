import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { PageHero } from '@/components/Sections';
import { contact, illustrationAlt, site } from '@/data/site';

export const metadata: Metadata = {
  title: contact.seoTitle,
  description: contact.description,
  alternates: { canonical: './' },
};

// Links externos (WhatsApp) abrem em outra aba, com noopener.
const ext = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

export default function Contato() {
  const a = site.address;
  return (
    <>
      <PageHero
        read={contact.read}
        title={contact.h1}
        intro={contact.intro}
        illustration="telefone"
        artTitle={illustrationAlt.telefone}
        ctas={[
          { label: 'Ligar para a Central 24 h', href: `tel:${site.phones.tel}` },
          { label: 'WhatsApp', href: site.whatsapp.href },
        ]}
      />
      <section className="sec sec--tight block contact" aria-labelledby="onde-h">
        <div className="wrap contact__grid">
          <div className="contact__col">
            <h2 data-split="lines">{contact.channels.heading}</h2>
            <dl className="channels" data-reveal="fade">
              {contact.channels.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>
                    {r.href ? (
                      <a
                        href={r.href}
                        className={r.href.startsWith('http') ? 'link' : undefined}
                        {...ext(r.href)}
                      >
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="contact__col">
            <h2 id="onde-h">Onde</h2>
            <address className="address">
              <a href={a.maps} target="_blank" rel="noopener noreferrer" className="link">
                {a.street}
                <br />
                {a.district}, {a.city}/{a.state}
                <br />
                {a.zip}
              </a>
            </address>
            <div className="map">
              <iframe
                src={a.embed}
                title={`Mapa: ${a.street}, ${a.district}, ${a.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      <section className="sec block" aria-labelledby="orcamento-h">
        <div className="wrap">
          <h2 id="orcamento-h" data-split="lines">
            {contact.form.heading}
          </h2>
          <p className="block__intro">{contact.form.intro}</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
