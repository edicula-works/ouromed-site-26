'use client';

// Formulário de orçamento sem backend: compõe o mailto: (destino por serviço) conforme a pessoa
// digita. Nada fica guardado no site; a validação é nativa.
import { type ChangeEvent, type FormEvent, type MouseEvent, useRef, useState } from 'react';
import { contact, site } from '@/data/site';
import { Roll } from './Icons';

const destinos: Record<string, string> = {
  'Cobertura de eventos': site.emails.eventos,
  'Locação de ambulâncias': site.emails.eventos,
  'Área protegida': site.emails.diretoria,
  Ambulatórios: site.emails.diretoria,
  'Remoção de pacientes': site.emails.agendamento,
  Outro: site.emails.diretoria,
};

const fields = ['nome', 'telefone', 'email', 'empresa', 'servico', 'mensagem'] as const;
type Field = (typeof fields)[number];
type Values = Record<Field, string>;

const empty: Values = {
  nome: '',
  telefone: '',
  email: '',
  empresa: '',
  servico: contact.form.services[0],
  mensagem: '',
};

function compose(v: Values) {
  const linhas = [
    `Nome: ${v.nome}`,
    `Telefone: ${v.telefone}`,
    `E-mail: ${v.email}`,
    ...(v.empresa ? [`Empresa: ${v.empresa}`] : []),
    `Serviço: ${v.servico}`,
    '',
    v.mensagem,
  ];
  const texto = linhas.join('\n');
  const assunto = `Orçamento: ${v.servico}`;
  return {
    mailto: `mailto:${destinos[v.servico] ?? site.emails.diretoria}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(texto)}`,
    destino: destinos[v.servico] ?? site.emails.diretoria,
    assunto,
    texto,
  };
}

export function ContactForm() {
  const [v, setV] = useState<Values>(empty);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const links = compose(v);
  const ref =
    (k: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setV((s) => ({ ...s, [k]: e.target.value }));

  // O botão é um link real (mailto:); o clique só passa depois da validação nativa.
  // Depois do clique, o site diz o que aconteceu e oferece copiar a mensagem: no computador sem
  // aplicativo de e-mail configurado, o mailto: não abre nada.
  const valid = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!form.current?.reportValidity()) {
      e.preventDefault();
      return;
    }
    setSent(true);
    setCopied(false);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${links.assunto}\n\n${links.texto}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form
      className="form"
      ref={form}
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <div className="form__field">
        <label htmlFor="f-nome">Nome</label>
        <input
          id="f-nome"
          name="nome"
          autoComplete="name"
          required
          value={v.nome}
          onChange={ref('nome')}
        />
      </div>
      <div className="form__field">
        <label htmlFor="f-telefone">Telefone ou WhatsApp</label>
        <input
          id="f-telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={v.telefone}
          onChange={ref('telefone')}
        />
      </div>
      <div className="form__field">
        <label htmlFor="f-email">E-mail</label>
        <input
          id="f-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={v.email}
          onChange={ref('email')}
        />
      </div>
      <div className="form__field">
        <label htmlFor="f-empresa">Empresa (opcional)</label>
        <input
          id="f-empresa"
          name="empresa"
          autoComplete="organization"
          value={v.empresa}
          onChange={ref('empresa')}
        />
      </div>
      <div className="form__field">
        <label htmlFor="f-servico">Tipo de serviço</label>
        <select id="f-servico" name="servico" required value={v.servico} onChange={ref('servico')}>
          {contact.form.services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="form__field form__field--full">
        <label htmlFor="f-mensagem">Mensagem</label>
        <textarea
          id="f-mensagem"
          name="mensagem"
          rows={4}
          required
          value={v.mensagem}
          onChange={ref('mensagem')}
        />
      </div>
      <div className="form__actions form__field--full">
        <a className="btn btn--gold btn--lg" href={links.mailto} onClick={valid}>
          <Roll>Enviar por e-mail</Roll>
        </a>
      </div>
      {sent && (
        <div className="form__sent form__field--full" role="status">
          <p>
            <strong>O seu aplicativo de e-mail deve ter aberto com a mensagem pronta.</strong> Não
            abriu? Copie a mensagem e envie para {links.destino}.
          </p>
          <button type="button" className="btn btn--ghost" onClick={copy}>
            {copied ? 'Mensagem copiada' : 'Copiar mensagem'}
          </button>
        </div>
      )}
      <p className="form__note form__field--full">
        {contact.form.note} Vai para {links.destino}. Para urgências, ligue {site.phones.display}: o
        formulário não é monitorado em tempo real.
      </p>
    </form>
  );
}
