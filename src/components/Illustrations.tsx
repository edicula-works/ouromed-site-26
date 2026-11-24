// Ilustração própria (DESIGN.md): traço de tinta (3 px no viewBox 440), preenchimentos chapados de
// white/bone/gold/steel, cantos levemente arredondados. Viaturas de perfil, de frente para a
// direita (para a espinha). `data-wheel` e `data-dash` são alvos do motion (GSAP).
import type { ReactNode } from 'react';
import type { IllustrationKey } from '@/data/site';

const INK = 'var(--c-ink)';
const BONE = 'var(--c-bone)';
const GOLD = 'var(--c-gold)';
const STEEL = 'var(--c-steel)';
const RED = 'var(--c-red)';
const WHITE = 'var(--c-white)';

type ArtProps = { className?: string; title?: string };
type SvgProps = ArtProps & { children: ReactNode; vb?: string };

/** Classe padrão `art` + a variante + o que o caller passar. */
const art = (variant: string, extra?: string) => ['art', variant, extra].filter(Boolean).join(' ');

function Svg({ className, title, children, vb = '0 0 440 240' }: SvgProps) {
  return (
    <svg
      viewBox={vb}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const stroke = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};
const thin = { ...stroke, strokeWidth: 2 };

/** Roda com raios; `data-wheel` gira em torno do centro do grupo (que é o centro da roda). */
function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g data-wheel>
      <circle cx={cx} cy={cy} r={r} fill={INK} />
      <circle cx={cx} cy={cy} r={r * 0.52} fill={BONE} {...thin} />
      <path
        d={`M${cx} ${cy - r * 0.52}V${cy + r * 0.52}M${cx - r * 0.52} ${cy}H${cx + r * 0.52}`}
        stroke={INK}
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={3} fill={INK} />
    </g>
  );
}

/** A via: tracejado ouro que corre sob a viatura (`data-dash` anima o offset). */
function Road({ y = 224 }: { y?: number }) {
  return (
    <path
      data-dash
      d={`M0 ${y}H440`}
      stroke={GOLD}
      strokeWidth={3}
      strokeDasharray="22 16"
      strokeLinecap="round"
    />
  );
}

function Cross({ cx, cy, r, fill = GOLD }: { cx: number; cy: number; r: number; fill?: string }) {
  const w = r * 0.42;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} {...stroke} />
      <path
        d={`M${cx - w / 2} ${cy - r * 0.6}h${w}v${r * 0.6 - w / 2}h${r * 0.6 - w / 2}v${w}h-${r * 0.6 - w / 2}v${r * 0.6 - w / 2}h-${w}v-${r * 0.6 - w / 2}h${r * 0.6 - w / 2}v-${w}h${r * 0.6 - w / 2}z`}
        fill={WHITE}
      />
    </g>
  );
}

/** Cabine de van: para-brisa inclinado, porta, farol, para-choque. x = frente da caixa. */
function Cab({ x }: { x: number }) {
  return (
    <>
      <path
        d={`M${x} 190V112q0-8 8-8h14l20-28q4-6 10-6h46q8 0 8 8v112z`}
        fill={WHITE}
        {...stroke}
      />
      <path d={`M${x + 16} 104l19-26h38v26z`} fill={STEEL} {...thin} />
      <path d={`M${x + 86} 104v86`} stroke={INK} strokeWidth={2} />
      <circle cx={414} cy={140} r={5} fill={BONE} {...thin} />
      <rect x={420} y={168} width={10} height={22} rx={2} fill={STEEL} {...thin} />
    </>
  );
}

function LightBar({ x, y, w = 64 }: { x: number; y: number; w?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={12} rx={3} fill={GOLD} {...thin} />
      <rect x={x} y={y} width={w * 0.33} height={12} rx={3} fill={RED} {...thin} />
    </>
  );
}

/** Ambulância de caixa alta (UTI móvel): caixa reta alta, cabine à frente, faixa ouro, cruz. */
function VanUti({ className, title, road = true }: ArtProps & { road?: boolean }) {
  return (
    <Svg className={art('art--van', className)} title={title}>
      <ellipse cx={230} cy={228} rx={195} ry={5} fill={INK} opacity={0.08} />
      {road && <Road />}
      <LightBar x={346} y={50} />
      {/* caixa alta */}
      <path d="M40 190V62q0-8 8-8h282q8 0 8 8v128z" fill={WHITE} {...stroke} />
      <path d="M54 62v128" stroke={INK} strokeWidth={2} />
      <rect x={72} y={92} width={64} height={44} rx={4} fill={STEEL} {...thin} />
      <rect x={150} y={92} width={64} height={44} rx={4} fill={STEEL} {...thin} />
      <Cross cx={280} cy={114} r={24} />
      <Cab x={338} />
      {/* faixa */}
      <rect x={40} y={150} width={380} height={12} fill={GOLD} />
      <rect x={30} y={176} width={10} height={16} rx={2} fill={STEEL} {...thin} />
      <Wheel cx={112} cy={190} r={30} />
      <Wheel cx={372} cy={190} r={30} />
    </Svg>
  );
}

/** Ambulância de suporte básico: van de passageiros, teto baixo, janelas compridas. */
function VanBasica({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--van art--van-basica', className)} title={title}>
      <ellipse cx={230} cy={228} rx={195} ry={5} fill={INK} opacity={0.08} />
      <Road />
      <LightBar x={226} y={58} w={52} />
      <path d="M40 190V96q0-24 24-24h216l40 48h80q22 0 22 22v48z" fill={WHITE} {...stroke} />
      {/* para-brisa e janelas */}
      <path d="M288 80l32 40h36V80z" fill={STEEL} {...thin} />
      <rect x={64} y={92} width={106} height={40} rx={4} fill={STEEL} {...thin} />
      <rect x={182} y={92} width={66} height={40} rx={4} fill={STEEL} {...thin} />
      <path d="M176 92v98M362 120v70" stroke={INK} strokeWidth={2} />
      <Cross cx={264} cy={112} r={14} />
      <rect x={40} y={166} width={380} height={8} fill={GOLD} />
      <rect x={30} y={176} width={10} height={16} rx={2} fill={STEEL} {...thin} />
      <rect x={420} y={168} width={10} height={22} rx={2} fill={STEEL} {...thin} />
      <circle cx={414} cy={140} r={5} fill={BONE} {...thin} />
      <Wheel cx={112} cy={190} r={30} />
      <Wheel cx={372} cy={190} r={30} />
    </Svg>
  );
}

/** Ambulância 4×4: picape com caixa de resgate atrás, cabine e capô compridos, rodas grandes. */
function Picape({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--picape', className)} title={title}>
      <ellipse cx={230} cy={228} rx={195} ry={5} fill={INK} opacity={0.08} />
      <Road />
      {/* caixa de resgate */}
      <path d="M40 190V92q0-8 8-8h190q8 0 8 8v98z" fill={WHITE} {...stroke} />
      <rect x={66} y={108} width={52} height={34} rx={4} fill={STEEL} {...thin} />
      <Cross cx={184} cy={125} r={20} />
      {/* cabine alta e capô */}
      <path
        d="M246 190v-78q0-8 8-8h20l16-24q3-4 8-4h32v36h74q16 0 16 16v62z"
        fill={WHITE}
        {...stroke}
      />
      <path d="M276 104l14-20h32v20z" fill={STEEL} {...thin} />
      <path d="M330 104v86" stroke={INK} strokeWidth={2} />
      <LightBar x={290} y={70} w={42} />
      <rect x={40} y={150} width={380} height={10} fill={GOLD} />
      <rect x={420} y={168} width={10} height={22} rx={2} fill={STEEL} {...thin} />
      <circle cx={412} cy={132} r={5} fill={BONE} {...thin} />
      <Wheel cx={104} cy={190} r={32} />
      <Wheel cx={372} cy={190} r={32} />
    </Svg>
  );
}

/** Van pequena para cenas (com giroflex): base y = cy + r da roda. */
function SmallVan({ x, ground }: { x: number; ground: number }) {
  const top = ground - 46;
  return (
    <g>
      <path
        d={`M${x} ${ground}V${top + 12}q0-12 12-12h${70}q12 0 16 8l14 18h${20}q8 0 8 8v12z`}
        fill={WHITE}
        {...stroke}
      />
      <rect
        x={x + 22}
        y={top - 5}
        width={16}
        height={5}
        rx={1.5}
        fill={GOLD}
        {...thin}
        strokeWidth={1.5}
      />
      <rect
        x={x + 22}
        y={top - 5}
        width={5}
        height={5}
        rx={1.5}
        fill={RED}
        {...thin}
        strokeWidth={1.5}
      />
      <path d={`M${x + 76} ${top + 2}l14 20h${18}V${top + 2}z`} fill={STEEL} {...thin} />
      <rect x={x + 12} y={top + 10} width={40} height={22} rx={3} fill={STEEL} {...thin} />
      <Cross cx={x + 68} cy={top + 36} r={8} />
      <rect x={x} y={ground - 18} width={140} height={6} fill={GOLD} />
      <Wheel cx={x + 30} cy={ground - 2} r={13} />
      <Wheel cx={x + 112} cy={ground - 2} r={13} />
    </g>
  );
}

/** Atendimento domiciliar: porta aberta, bolsa médica na soleira, van pequena à espera. */
function House({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--house', className)} title={title}>
      <Road y={226} />
      <path d="M24 124L134 54l110 70" fill={BONE} {...stroke} />
      <path d="M16 124h236" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <rect x={46} y={124} width={176} height={100} fill={WHITE} {...stroke} />
      {/* porta aberta e soleira */}
      <rect x={130} y={140} width={46} height={84} fill={INK} />
      <rect x={114} y={214} width={78} height={8} fill={STEEL} {...thin} />
      <rect x={66} y={144} width={34} height={34} rx={2} fill={STEEL} {...thin} />
      <rect x={188} y={144} width={34} height={34} rx={2} fill={STEEL} {...thin} />
      <Cross cx={134} cy={98} r={12} />
      {/* bolsa médica na soleira, encostada na porta */}
      <path d="M204 192q0-8 8-8h20q8 0 8 8" fill="none" {...thin} />
      <rect x={194} y={192} width={56} height={22} rx={7} fill={GOLD} {...stroke} />
      <path d="M222 197v10M217 202h10" stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
      <SmallVan x={296} ground={226} />
    </Svg>
  );
}

/** Remoção: porta traseira aberta e a maca entrando na ambulância de UTI. */
function Remocao({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--remocao', className)} title={title}>
      <ellipse cx={230} cy={228} rx={195} ry={5} fill={INK} opacity={0.08} />
      <Road />
      <LightBar x={346} y={50} />
      {/* caixa com a traseira aberta: vão escuro largo com moldura */}
      <path d="M100 190V62q0-8 8-8h222q8 0 8 8v128z" fill={WHITE} {...stroke} />
      <rect x={100} y={92} width={72} height={98} fill={INK} />
      <rect x={100} y={92} width={72} height={98} fill="none" {...thin} />
      <rect x={188} y={92} width={56} height={40} rx={4} fill={STEEL} {...thin} />
      <Cross cx={272} cy={114} r={22} />
      <Cab x={338} />
      <rect x={176} y={150} width={244} height={12} fill={GOLD} />
      {/* maca entrando: colchão com travesseiro, chassi, tesoura e quatro rodízios */}
      <rect
        x={30}
        y={136}
        width={148}
        height={18}
        rx={5}
        fill={WHITE}
        {...stroke}
        strokeWidth={2.5}
      />
      <rect x={34} y={140} width={30} height={10} rx={4} fill={BONE} />
      <rect x={26} y={154} width={156} height={5} fill={STEEL} {...thin} />
      <path d="M48 159l84 50M132 159l-84 50" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M48 209v8M132 209v8" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <circle cx={48} cy={220} r={5} fill={INK} />
      <circle cx={132} cy={220} r={5} fill={BONE} />
      <Wheel cx={200} cy={190} r={30} />
      <Wheel cx={372} cy={190} r={30} />
    </Svg>
  );
}

/** Eventos: tenda com bandeirolas e a ambulância estacionada ao lado. */
function Tent({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--tent', className)} title={title}>
      <Road y={226} />
      <path d="M24 200L150 88l126 112" fill={BONE} {...stroke} />
      <path d="M84 200l66-78 66 78" fill={WHITE} {...thin} />
      <path
        d="M36 200V226M264 200V226M150 88V58"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path d="M150 58l52 10-52 12z" fill={GOLD} {...stroke} />
      {/* varal de bandeirolas dentro da face da tenda, seguindo a corda */}
      <path d="M62 150q88 28 176 0" fill="none" stroke={INK} strokeWidth={2} />
      {[...Array(8)].map((_, i) => {
        const x = 72 + i * 21;
        const t = i / 7;
        const y = 150 + 4 * 28 * t * (1 - t) + 4;
        return (
          <path
            key={x}
            d={`M${x} ${y}l9 2-5 11z`}
            fill={i % 2 ? GOLD : STEEL}
            {...stroke}
            strokeWidth={1.5}
          />
        );
      })}
      <Cross cx={150} cy={172} r={16} />
      <SmallVan x={292} ground={226} />
    </Svg>
  );
}

/** Área protegida: prédio atrás de uma cerca, escudo com cruz sobre ele. */
function Protected({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--protected', className)} title={title}>
      <Road y={226} />
      <rect x={60} y={30} width={150} height={170} fill={WHITE} {...stroke} />
      <path d="M60 46h150" stroke={INK} strokeWidth={3} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={78 + c * 42}
            y={60 + r * 34}
            width={26}
            height={22}
            rx={2}
            fill={STEEL}
            {...thin}
          />
        )),
      )}
      <rect x={120} y={168} width={26} height={32} fill={INK} />
      <path d="M250 44h100v58q0 48-50 76q-50-28-50-76z" fill={GOLD} {...stroke} />
      <path d="M300 66v48M276 90h48" stroke={WHITE} strokeWidth={10} strokeLinecap="round" />
      {/* cerca à frente do prédio: a área é protegida */}
      <path d="M28 186h384M28 206h384" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      {[...Array(11)].map((_, i) => {
        const x = 40 + i * 36;
        return (
          <path key={x} d={`M${x} 178v48`} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        );
      })}
    </Svg>
  );
}

/** Ambulatório: contêiner clínico com porta, janela e letreiro, assentado no chão. */
function Clinic({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--clinic', className)} title={title}>
      <Road y={226} />
      <rect x={50} y={108} width={330} height={112} fill={WHITE} {...stroke} />
      {[...Array(12)].map((_, i) => {
        const x = 66 + i * 26;
        return <path key={x} d={`M${x} 120v98`} stroke={INK} strokeWidth={1.5} opacity={0.22} />;
      })}
      <rect x={46} y={102} width={338} height={6} fill={INK} />
      <rect x={46} y={220} width={338} height={6} fill={INK} />
      <rect x={80} y={130} width={72} height={40} rx={3} fill={STEEL} {...thin} />
      <rect x={300} y={126} width={44} height={94} fill={INK} />
      <rect x={294} y={74} width={56} height={22} rx={3} fill={GOLD} {...thin} />
      <path d="M322 79v12M316 85h12" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
    </Svg>
  );
}

/** Telefone tocando: fone na tela e ondas simétricas dos dois lados. */
function Phone({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--phone', className)} title={title}>
      <rect x={160} y={40} width={120} height={190} rx={22} fill={WHITE} {...stroke} />
      <rect x={174} y={58} width={92} height={142} rx={8} fill={BONE} />
      <path
        d="M200 110h12l4 12-7 4a22 22 0 0 0 12 12l4-7 12 4v12a3 3 0 0 1-3 3 34 34 0 0 1-37-37 3 3 0 0 1 3-3z"
        fill={INK}
      />
      <circle cx={220} cy={214} r={6} fill={INK} />
      {[0, 1, 2].map((i) => (
        <path
          key={`l${i}`}
          d={`M${124 - i * 20} ${104 + i * 10}a64 64 0 0 0 0 ${52 + i * 10}`}
          fill="none"
          stroke={GOLD}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <path
          key={`r${i}`}
          d={`M${316 + i * 20} ${104 + i * 10}a64 64 0 0 1 0 ${52 + i * 10}`}
          fill="none"
          stroke={GOLD}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}

/** Headset da triagem médica: quem atende na Central 24 h. */
function Headset({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--headset', className)} title={title}>
      <path
        d="M112 150v-20a108 108 0 0 1 216 0v20"
        fill="none"
        stroke={INK}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <rect x={92} y={140} width={44} height={66} rx={14} fill={GOLD} {...stroke} />
      <rect x={304} y={140} width={44} height={66} rx={14} fill={GOLD} {...stroke} />
      <path
        d="M326 206q0 24-40 24h-40"
        fill="none"
        stroke={INK}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={238} cy={230} r={7} fill={INK} />
    </Svg>
  );
}

/** Hospital: prédio com letreiro e cruz grande no telhado, cruz vermelha na fachada. */
function Hospital({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--hospital', className)} title={title}>
      <Road y={226} />
      <rect x={120} y={90} width={230} height={136} fill={WHITE} {...stroke} />
      <rect x={200} y={52} width={70} height={38} fill={BONE} {...stroke} />
      <path d="M200 90h70" stroke={INK} strokeWidth={3} />
      <Cross cx={235} cy={71} r={20} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={138 + c * 50}
            y={106 + r * 36}
            width={28}
            height={24}
            rx={2}
            fill={STEEL}
            {...thin}
          />
        )),
      )}
      <rect x={216} y={190} width={40} height={36} fill={INK} />
      <path d="M300 172v24M288 184h24" stroke={RED} strokeWidth={8} strokeLinecap="round" />
      <path
        d="M40 226h80"
        stroke={GOLD}
        strokeWidth={3}
        strokeDasharray="12 10"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function Illustration({ k, className, title }: ArtProps & { k: IllustrationKey }) {
  switch (k) {
    case 'uti':
      return <VanUti className={className} title={title} />;
    case 'basico':
      return <VanBasica className={className} title={title} />;
    case 'locacao':
      return <Picape className={className} title={title} />;
    case 'domiciliar':
      return <House className={className} title={title} />;
    case 'remocao':
      return <Remocao className={className} title={title} />;
    case 'eventos':
      return <Tent className={className} title={title} />;
    case 'protegida':
      return <Protected className={className} title={title} />;
    case 'ambulatorios':
      return <Clinic className={className} title={title} />;
    case 'telefone':
      return <Phone className={className} title={title} />;
    case 'triagem':
      return <Headset className={className} title={title} />;
    case 'destino':
      return <Hospital className={className} title={title} />;
    default:
      return null;
  }
}

/** A ambulância do palco "Como funciona": a UTI móvel sem a via (a via é a linha do palco). */
export function StageVan({ className }: { className?: string }) {
  return <VanUti className={className} road={false} />;
}

export function Wordmark({ className }: { className?: string }) {
  // Sem logotipo vetorial (⚠️ pendência 7): marca tipográfica com a linha ouro por baixo do "Ouro".
  return (
    <span className={`wordmark ${className ?? ''}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="wordmark__mark">
        <circle cx={12} cy={12} r={10} fill="none" stroke="var(--c-gold)" strokeWidth={2.5} />
        <path d="M12 6v12M6 12h12" stroke="var(--c-ink)" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
      <span className="wordmark__text">Ouromed</span>
    </span>
  );
}
