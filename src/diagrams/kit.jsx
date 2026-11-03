import { createContext, useContext } from 'react';

// Unique id prefix per rendered diagram so SVG markers never collide (important for collapsed / enlarged copies).
export const DgCtx = createContext('dg');
const COLORS = ['k', 'g', 'w', 'b', 'v', 'c', 'r'];

function Defs() {
  const u = useContext(DgCtx);
  return (
    <defs>
      {COLORS.map((c) => (
        <marker key={c} id={`${u}-${c}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className={`mk mk-${c}`} />
        </marker>
      ))}
    </defs>
  );
}

export function Svg({ vb = '0 0 760 440', label, children }) {
  return (
    <svg className="dg" viewBox={vb} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <Defs />
      {children}
    </svg>
  );
}

/** Arrow / line. Use d="..." or x1,y1,x2,y2. c = colour key. both = arrowheads on both ends. */
export function Ar({ d, x1, y1, x2, y2, c = 'k', dash, both, flow, noHead, w }) {
  const u = useContext(DgCtx);
  const path = d || `M${x1},${y1} L${x2},${y2}`;
  return (
    <path
      d={path}
      className={`ln ln-${c}${dash ? ' dash' : ''}${flow ? ' flow' : ''}`}
      style={w ? { strokeWidth: w } : undefined}
      markerEnd={noHead ? undefined : `url(#${u}-${c})`}
      markerStart={both ? `url(#${u}-${c})` : undefined}
    />
  );
}

/** Text. t = string or array of lines. s = size key (xs,s,m,l). b = bold. c = colour key. */
export function Tx({ x, y, t, a = 'middle', s = 'm', b, c, lh = 15, rot }) {
  const lines = Array.isArray(t) ? t : [t];
  return (
    <text x={x} y={y} textAnchor={a} className={`tx tx-${s}${b ? ' tb' : ''}${c ? ` tc-${c}` : ''}`} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>{l}</tspan>
      ))}
    </text>
  );
}

/** Box with vertically-centred text lines. tone: n g w b v c r */
export function Bx({ x, y, w, h, t, tone = 'n', rx = 10, s = 'm', b, dash, lh = 15, c }) {
  const lines = Array.isArray(t) ? t : t ? [t] : [];
  const sy = y + h / 2 - ((lines.length - 1) * lh) / 2 + 4.5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} className={`bx bx-${tone}${dash ? ' dash' : ''}`} />
      {lines.length > 0 && <Tx x={x + w / 2} y={sy} t={lines} s={s} b={b} c={c} lh={lh} />}
    </g>
  );
}

/** Numbered badge */
export function Nb({ x, y, n, tone = 'g' }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className={`nb nb-${tone}`} />
      <text x={x} y={y + 4.2} textAnchor="middle" className="tx tx-s tb nbt">{n}</text>
    </g>
  );
}

/** Small legend row */
export function Lg({ x, y, c, t, dash }) {
  return (
    <g>
      <Ar x1={x} y1={y} x2={x + 28} y2={y} c={c} dash={dash} />
      <Tx x={x + 36} y={y + 4} a="start" s="s" t={t} />
    </g>
  );
}
