// A marca no cabeçalho e no menu, até chegar o vetor original (⚠️ pendência 7): o "o" com a cruz e
// "Ouro" em ouro + "med" em azul-marinho, as cores do logotipo. O nome é SVG, como um logotipo:
// a cor do "Ouro" sobre fundo claro não segue o contraste de texto (logotipos são isentos na WCAG
// 1.4.3), e o nome acessível vem do link que envolve a marca.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ''}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="wordmark__mark">
        <circle cx={12} cy={12} r={11} fill="var(--c-gold)" />
        <path d="M12 6.5v11M6.5 12h11" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      </svg>
      <svg
        viewBox="0 0 92 24"
        aria-hidden="true"
        focusable="false"
        className="wordmark__text"
        overflow="visible"
      >
        <text x="0" y="19">
          <tspan className="wordmark__ouro">Ouro</tspan>
          <tspan className="wordmark__med">med</tspan>
        </text>
      </svg>
    </span>
  );
}
