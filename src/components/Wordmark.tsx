// A marca no cabeçalho e no menu: marca tipográfica nas cores do logotipo até chegar o vetor original.

export function Wordmark({ className }: { className?: string }) {
  // Sem logotipo vetorial (⚠️ pendência 7): marca tipográfica nas cores do logotipo — "Ouro" em ouro,
  // "med" em azul-marinho — e o "o" com a cruz como símbolo.
  return (
    <span className={`wordmark ${className ?? ''}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="wordmark__mark">
        <circle cx={12} cy={12} r={11} fill="var(--c-gold)" />
        <path
          d="M12 6.5v11M6.5 12h11"
          stroke="var(--c-white)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
      <span className="wordmark__text">
        <span className="wordmark__ouro">Ouro</span>
        <span className="wordmark__med">med</span>
      </span>
    </span>
  );
}
