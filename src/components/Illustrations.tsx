// Ilustração própria (DESIGN.md): traço de tinta (3 px no viewBox 440), preenchimentos chapados de
// white/bone/gold/steel, cantos levemente arredondados. Viaturas de perfil, de frente para a
// direita (para a espinha). `data-wheel` e `data-dash` são alvos do motion.
import { type ReactNode, useId } from 'react';
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

/** Roda com raios; `data-wheel` gira em torno do centro do grupo (que é o centro da roda). */
function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g data-wheel>
      <circle cx={cx} cy={cy} r={r} fill={INK} />
      <circle cx={cx} cy={cy} r={r * 0.52} fill={BONE} {...stroke} strokeWidth={2} />
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
  const w = r * 0.36;
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

/** Ambulância de van: UTI móvel (caixa longa, faixa ouro) ou suporte básico (caixa curta).
 *  A frente da carroceria é sempre x=398; só a traseira muda. */
function Van({ variant = 'uti', className, title }: ArtProps & { variant?: 'uti' | 'basico' }) {
  const id = useId();
  const uti = variant === 'uti';
  const rear = uti ? 36 : 78;
  const w = 398 - rear;
  const cab = 308; // onde começa o para-brisa
  const bar = uti ? 196 : 206;
  const body = `M${rear} 190V64q0-6 6-6h${292 - rear}q30 0 48 14l34 40q18 6 18 24v54z`;
  return (
    <Svg className={art('art--van', className)} title={title}>
      <defs>
        <clipPath id={`${id}-body`}>
          <path d={body} />
        </clipPath>
      </defs>
      <ellipse cx={rear + w / 2} cy={228} rx={w * 0.46} ry={5} fill={INK} opacity={0.08} />
      <Road />
      {/* barra de luz */}
      <rect x={bar} y={46} width={92} height={12} rx={3} fill={GOLD} {...stroke} />
      <rect x={bar} y={46} width={30} height={12} rx={3} fill={RED} {...stroke} />
      {/* carroceria */}
      <path d={body} fill={WHITE} {...stroke} />
      {/* para-brisa e porta */}
      <path d={`M${cab} 66h28q6 0 10 6l22 40h-60z`} fill={STEEL} {...stroke} strokeWidth={2} />
      <path d={`M${cab} 118v70`} stroke={INK} strokeWidth={2} />
      {/* janelas e emblema */}
      {uti ? (
        <>
          <rect
            x={212}
            y={78}
            width={66}
            height={38}
            rx={4}
            fill={STEEL}
            {...stroke}
            strokeWidth={2}
          />
          <Cross cx={106} cy={104} r={24} />
          <rect
            x={146}
            y={80}
            width={52}
            height={34}
            rx={4}
            fill={STEEL}
            {...stroke}
            strokeWidth={2}
          />
        </>
      ) : (
        <>
          <rect
            x={206}
            y={78}
            width={56}
            height={38}
            rx={4}
            fill={STEEL}
            {...stroke}
            strokeWidth={2}
          />
          <Cross cx={148} cy={100} r={20} />
        </>
      )}
      {/* faixa */}
      <rect
        x={rear}
        y={138}
        width={w}
        height={uti ? 12 : 8}
        fill={GOLD}
        clipPath={`url(#${id}-body)`}
      />
      {/* para-choques e farol, colados na frente (x=398) */}
      <rect
        x={396}
        y={168}
        width={10}
        height={22}
        rx={2}
        fill={STEEL}
        {...stroke}
        strokeWidth={2}
      />
      <rect
        x={rear - 8}
        y={176}
        width={8}
        height={16}
        rx={2}
        fill={STEEL}
        {...stroke}
        strokeWidth={2}
      />
      <circle cx={390} cy={150} r={5} fill={BONE} {...stroke} strokeWidth={2} />
      <Wheel cx={rear + 74} cy={190} r={30} />
      <Wheel cx={332} cy={190} r={30} />
    </Svg>
  );
}

function Defender({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--defender', className)} title={title}>
      <ellipse cx={220} cy={228} rx={190} ry={5} fill={INK} opacity={0.08} />
      <Road />
      <rect x={210} y={40} width={70} height={12} rx={3} fill={GOLD} {...stroke} />
      <path
        d="M44 190V100q0-6 6-6h34l20-30q2-3 6-3h204q4 0 6 3l20 30h46q8 0 8 8v88z"
        fill={WHITE}
        {...stroke}
      />
      <path d="M84 94h22l18-26h-20z" fill={STEEL} {...stroke} strokeWidth={2} />
      <rect x={130} y={72} width={60} height={26} rx={3} fill={STEEL} {...stroke} strokeWidth={2} />
      <rect x={204} y={72} width={60} height={26} rx={3} fill={STEEL} {...stroke} strokeWidth={2} />
      <path d="M278 94h38l-18-26h-20z" fill={STEEL} {...stroke} strokeWidth={2} />
      <path d="M318 94h22l-18-26h-4z" fill={STEEL} {...stroke} strokeWidth={2} />
      <path d="M196 100v90M282 100v90" stroke={INK} strokeWidth={2} />
      {/* faixa: 44 → 394, a medida exata da carroceria */}
      <rect x={44} y={150} width={350} height={10} fill={GOLD} />
      <rect
        x={398}
        y={166}
        width={12}
        height={24}
        rx={2}
        fill={STEEL}
        {...stroke}
        strokeWidth={2}
      />
      <rect x={32} y={166} width={12} height={24} rx={2} fill={STEEL} {...stroke} strokeWidth={2} />
      {/* estepe traseiro */}
      <circle cx={40} cy={128} r={22} fill={INK} />
      <circle cx={40} cy={128} r={11} fill={BONE} {...stroke} strokeWidth={2} />
      <Cross cx={340} cy={128} r={14} />
      <Wheel cx={120} cy={190} r={32} />
      <Wheel cx={306} cy={190} r={32} />
    </Svg>
  );
}

function House({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--house', className)} title={title}>
      <Road y={226} />
      <path d="M36 130L140 62l104 68" fill={BONE} {...stroke} />
      <path d="M28 130h224" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <rect x={58} y={130} width={164} height={96} fill={WHITE} {...stroke} />
      <rect x={124} y={166} width={38} height={60} fill={INK} />
      <rect x={78} y={146} width={30} height={30} rx={2} fill={STEEL} {...stroke} strokeWidth={2} />
      <rect
        x={174}
        y={146}
        width={30}
        height={30}
        rx={2}
        fill={STEEL}
        {...stroke}
        strokeWidth={2}
      />
      <Cross cx={140} cy={104} r={16} />
      {/* bolsa médica */}
      <path d="M292 168q0-16 16-16h40q16 0 16 16" fill="none" {...stroke} />
      <rect x={270} y={166} width={116} height={60} rx={10} fill={GOLD} {...stroke} />
      <path d="M328 178v36M310 196h36" stroke={WHITE} strokeWidth={9} strokeLinecap="round" />
      {/* calçada */}
      <path
        d="M162 226h108"
        stroke={INK}
        strokeWidth={3}
        strokeDasharray="2 12"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Cadeira de rodas: a roda grande toca a via (y=226); `data-wheel` gira em torno do eixo. */
function Wheelchair({ className, title }: ArtProps) {
  const spokes = (
    <path
      d="M200 129v92M154 175h92M167 142l66 66M233 142l-66 66"
      stroke={INK}
      strokeWidth={2}
      opacity={0.5}
    />
  );
  return (
    <Svg className={art('art--wheelchair', className)} title={title}>
      <Road y={226} />
      <circle cx={200} cy={175} r={50} fill={BONE} {...stroke} />
      <g data-wheel>
        <circle cx={200} cy={175} r={50} fill="none" {...stroke} />
        {spokes}
      </g>
      <circle cx={200} cy={175} r={7} fill={INK} />
      {/* quadro: eixo → garfo do caster, encosto, braço, apoio do pé */}
      <path d="M200 175h84" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M284 175l12 35" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <circle cx={296} cy={210} r={16} fill={INK} />
      <circle cx={296} cy={210} r={6} fill={BONE} />
      <path d="M176 175v-70h10v70z" fill={INK} />
      <path d="M186 124h70v10h-70z" fill={INK} />
      <path d="M248 134v41h20" fill="none" {...stroke} strokeWidth={6} />
      <path d="M270 186h52v8h-52z" fill={STEEL} {...stroke} strokeWidth={2} />
      <Cross cx={352} cy={96} r={26} />
    </Svg>
  );
}

function Tent({ className, title }: ArtProps) {
  const flags = [8, 14, 17, 14, 8, 14, 17, 14];
  return (
    <Svg className={art('art--tent', className)} title={title}>
      <Road y={226} />
      <path d="M60 150h320" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M48 150L220 70l172 80" fill={BONE} {...stroke} />
      <path d="M110 150l110-80 110 80" fill={WHITE} {...stroke} strokeWidth={2} />
      <path d="M48 150q43-14 86 0t86 0 86 0 86 0" fill="none" stroke={GOLD} strokeWidth={6} />
      <path
        d="M70 150v76M370 150v76M220 70v-24"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path d="M220 46l56 12-56 14z" fill={GOLD} {...stroke} />
      {/* bandeirolas */}
      <path d="M70 150q75 34 150 0t150 0" fill="none" stroke={INK} strokeWidth={2} />
      {flags.map((dy, i) => {
        const x = 86 + i * 36;
        return (
          <path
            key={x}
            d={`M${x} ${150 + dy}l10 2-6 12z`}
            fill={i % 2 ? GOLD : STEEL}
            {...stroke}
            strokeWidth={1.5}
          />
        );
      })}
      <Cross cx={220} cy={184} r={18} />
      <path d="M190 226h60" stroke={INK} strokeWidth={3} />
    </Svg>
  );
}

function Protected({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--protected', className)} title={title}>
      <Road y={226} />
      <rect
        x={56}
        y={70}
        width={230}
        height={156}
        rx={8}
        fill="none"
        stroke={GOLD}
        strokeWidth={3}
        strokeDasharray="10 8"
      />
      <rect x={88} y={94} width={166} height={132} fill={WHITE} {...stroke} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={102 + c * 38}
            y={108 + r * 36}
            width={24}
            height={24}
            rx={2}
            fill={STEEL}
            {...stroke}
            strokeWidth={2}
          />
        )),
      )}
      <rect x={152} y={198} width={38} height={28} fill={INK} />
      <path d="M330 80h60v52q0 30-30 46q-30-16-30-46z" fill={GOLD} {...stroke} />
      <path d="M360 96v40M340 116h40" stroke={WHITE} strokeWidth={9} strokeLinecap="round" />
    </Svg>
  );
}

function Clinic({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--clinic', className)} title={title}>
      <Road y={226} />
      <rect x={40} y={112} width={270} height={114} rx={6} fill={WHITE} {...stroke} />
      {[...Array(9)].map((_, i) => {
        const x = 60 + i * 28;
        return <path key={x} d={`M${x} 124v90`} stroke={INK} strokeWidth={1.5} opacity={0.25} />;
      })}
      <rect x={70} y={146} width={40} height={80} fill={INK} />
      <rect
        x={130}
        y={146}
        width={84}
        height={44}
        rx={3}
        fill={STEEL}
        {...stroke}
        strokeWidth={2}
      />
      <rect
        x={228}
        y={146}
        width={64}
        height={44}
        rx={3}
        fill={STEEL}
        {...stroke}
        strokeWidth={2}
      />
      <path d="M40 112h270" stroke={INK} strokeWidth={3} />
      <path d="M120 112V92h60v20" fill={BONE} {...stroke} />
      <Cross cx={150} cy={70} r={20} />
      {/* capacete */}
      <path d="M322 226q0-40 40-40t40 40z" fill={GOLD} {...stroke} />
      <rect x={308} y={224} width={108} height={9} rx={3} fill={GOLD} {...stroke} strokeWidth={2} />
      <path d="M362 186v-10" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

function Phone({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--phone', className)} title={title}>
      <rect x={160} y={40} width={120} height={190} rx={22} fill={WHITE} {...stroke} />
      <rect x={174} y={58} width={92} height={142} rx={8} fill={BONE} />
      <path
        d="M176 140q30-26 44-6t44-10"
        fill="none"
        stroke={GOLD}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M200 100l16 16 30-30"
        fill="none"
        stroke={INK}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={220} cy={214} r={6} fill={INK} />
      {[0, 1, 2].map((i) => (
        <path
          key={`l${i}`}
          d={`M${118 - i * 18} ${96 + i * 10}a60 60 0 0 0 0 ${48 + i * 10}`}
          fill="none"
          stroke={GOLD}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <path
          key={`r${i}`}
          d={`M${322 + i * 18} ${96 + i * 10}a60 60 0 0 1 0 ${48 + i * 10}`}
          fill="none"
          stroke={GOLD}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}

/** Headset da triagem: a cabeça é um círculo tracejado (quem está do outro lado da linha). */
function Headset({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--headset', className)} title={title}>
      <circle
        cx={220}
        cy={140}
        r={44}
        fill="none"
        stroke={INK}
        strokeWidth={2.5}
        strokeDasharray="6 8"
        opacity={0.55}
      />
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

function Hospital({ className, title }: ArtProps) {
  return (
    <Svg className={art('art--hospital', className)} title={title}>
      <Road y={226} />
      <rect x={120} y={90} width={230} height={136} fill={WHITE} {...stroke} />
      <rect x={200} y={52} width={70} height={38} fill={BONE} {...stroke} />
      <path d="M200 90h70" stroke={INK} strokeWidth={3} />
      <Cross cx={235} cy={71} r={14} />
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
            {...stroke}
            strokeWidth={2}
          />
        )),
      )}
      <rect x={216} y={190} width={40} height={36} fill={INK} />
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
      return <Van variant="uti" className={className} title={title} />;
    case 'basico':
      return <Van variant="basico" className={className} title={title} />;
    case 'locacao':
      return <Defender className={className} title={title} />;
    case 'domiciliar':
      return <House className={className} title={title} />;
    case 'remocao':
      return <Wheelchair className={className} title={title} />;
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
