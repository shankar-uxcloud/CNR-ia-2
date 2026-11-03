import { Svg, Ar, Tx, Bx, Nb, Lg } from './kit';

/* ---------------- Q01 Greenhouse effect ---------------- */
export function Greenhouse() {
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180;
    return [90 + Math.cos(a) * 38, 62 + Math.sin(a) * 38, 90 + Math.cos(a) * 50, 62 + Math.sin(a) * 50];
  });
  const pill = (x, t) => (
    <g key={t}>
      <rect x={x - 24} y="160" width="48" height="24" rx="12" className="bx bx-c" />
      <Tx x={x} y="176" s="s" b t={t} />
    </g>
  );
  return (
    <Svg label="Greenhouse effect: sunlight warms Earth's surface; greenhouse gases absorb and re-emit outgoing heat">
      <rect x="0" y="125" width="760" height="100" className="f-atm" />
      <line x1="0" y1="125" x2="760" y2="125" className="ln ln-c dash" style={{ strokeWidth: 1 }} />
      <line x1="0" y1="225" x2="760" y2="225" className="ln ln-c dash" style={{ strokeWidth: 1 }} />
      <Tx x="748" y="216" a="end" s="s" b c="c" t="Greenhouse-gas layer" />
      {/* Sun */}
      {rays.map((r, i) => <line key={i} x1={r[0]} y1={r[1]} x2={r[2]} y2={r[3]} className="ln ln-w" style={{ strokeWidth: 3 }} />)}
      <circle cx="90" cy="62" r="32" className="f-sun" />
      <Tx x="90" y="124" s="s" b t="Sun" />
      {/* Solar radiation */}
      <Ar x1="125" y1="92" x2="215" y2="342" c="w" />
      <Ar x1="150" y1="78" x2="330" y2="342" c="w" />
      <Tx x="168" y="290" a="end" s="s" b c="w" t={['Incoming solar', 'radiation']} />
      {/* GHG pills */}
      {pill(250, 'CO₂')}{pill(310, 'CH₄')}{pill(410, 'N₂O')}{pill(520, 'CFCs')}
      {/* Outgoing heat */}
      <Ar x1="360" y1="342" x2="360" y2="26" c="r" />
      <Tx x="370" y="40" a="start" s="s" b c="r" t={['Some heat escapes', 'to space']} />
      <Ar x1="480" y1="342" x2="480" y2="232" c="r" />
      <Tx x="472" y="292" a="end" s="s" b c="r" t={['Heat absorbed by', 'greenhouse gases']} />
      <Ar x1="560" y1="190" x2="560" y2="338" c="r" dash flow />
      <Tx x="570" y="262" a="start" s="s" b c="r" t={['Re-emitted heat', 'returns towards the', 'surface: more warming']} />
      <Ar x1="610" y1="130" x2="640" y2="72" c="r" dash />
      <Tx x="648" y="64" a="start" s="s" c="r" t={['Part re-emitted', 'upwards']} />
      {/* Earth */}
      <rect x="0" y="350" width="760" height="90" className="f-land" />
      <Tx x="380" y="392" s="m" b t="Earth’s surface – absorbs sunlight and warms" />
      <Tx x="380" y="414" s="s" t="More greenhouse gas → more heat retained → enhanced greenhouse effect" />
      {/* Legend */}
      <Lg x={580} y={16} c="w" t="Solar radiation" />
      <Lg x={580} y={36} c="r" t="Outgoing heat (infrared)" />
    </Svg>
  );
}

/* ---------------- Q04 EIA process flowchart ---------------- */
const STEPS = [
  ['Screening', 'Is an EIA required?'],
  ['Scoping', 'Key issues and studies'],
  ['Baseline studies', 'Air, water, soil, biodiversity'],
  ['Impact prediction', 'Positive and negative impacts'],
  ['Alternatives and mitigation', 'Avoid, minimise, compensate'],
  ['EIA report', 'Impacts, alternatives, measures'],
  ['Public consultation', 'Feedback from stakeholders'],
  ['Appraisal and clearance', 'Competent authority decides'],
  ['Monitoring and compliance', 'Conditions and management'],
];
export function EiaFlow() {
  const X = [30, 280, 530];
  const Y = [20, 160, 300];
  const pos = [
    [0, 0], [1, 0], [2, 0],
    [2, 1], [1, 1], [0, 1],
    [0, 2], [1, 2], [2, 2],
  ];
  const tone = ['n', 'n', 'n', 'b', 'b', 'b', 'g', 'g', 'w'];
  return (
    <Svg vb="0 0 760 428" label="Flowchart of the nine steps of the EIA process from screening to monitoring and compliance">
      {STEPS.map((s, i) => {
        const [cx, cy] = pos[i];
        const x = X[cx], y = Y[cy];
        return (
          <g key={s[0]}>
            <Bx x={x} y={y} w={200} h={90} tone={tone[i]} />
            <Nb x={x + 18} y={y + 18} n={i + 1} tone={tone[i] === 'n' ? 'g' : tone[i]} />
            <Tx x={x + 108} y={y + 40} s="m" b t={s[0].length > 22 ? s[0].split(' and ').map((p, k) => (k ? 'and ' + p : p)) : s[0]} lh={15} />
            <Tx x={x + 100} y={y + 74} s="s" t={s[1]} />
          </g>
        );
      })}
      {/* arrows row 1 */}
      <Ar x1="230" y1="65" x2="278" y2="65" c="k" />
      <Ar x1="480" y1="65" x2="528" y2="65" c="k" />
      {/* row1 -> row2 */}
      <Ar x1="630" y1="110" x2="630" y2="158" c="k" />
      {/* row 2 leftwards */}
      <Ar x1="528" y1="205" x2="482" y2="205" c="k" />
      <Ar x1="278" y1="205" x2="232" y2="205" c="k" />
      {/* row2 -> row3 */}
      <Ar x1="130" y1="250" x2="130" y2="298" c="k" />
      {/* row 3 */}
      <Ar x1="230" y1="345" x2="278" y2="345" c="k" />
      <Ar x1="480" y1="345" x2="528" y2="345" c="k" />
      <Tx x="380" y="418" s="s" t="Decision point: step 8 – clearance may be granted, with conditions where applicable" />
    </Svg>
  );
}

/* ---------------- Q07 Conservation classification ---------------- */
export function ConservationTree() {
  const insitu = [
    ['National parks', ['e.g. Bandipur (Karnataka), Sundarbans', '(West Bengal), Kaziranga (Assam)']],
    ['Wildlife sanctuaries', ['e.g. Dandeli Wildlife Sanctuary', '(Karnataka)']],
    ['Biosphere reserves', ['Core, buffer and transition zones']],
  ];
  const exsitu = [
    ['Zoological gardens', 'captive breeding, education, research'],
    ['Botanical gardens', 'living plant collections'],
    ['Gene banks', 'seeds, genes and DNA'],
    ['Pollen and tissue culture', 'preserve and multiply plant material'],
    ['Cryopreservation', 'very-low-temperature storage'],
  ];
  return (
    <Svg vb="0 0 800 470" label="Classification of biodiversity conservation into in-situ and ex-situ methods">
      <Bx x={280} y={14} w={240} h={46} tone="n" b t="Biodiversity conservation" />
      <Ar d="M400,60 V84 M200,84 H600 M200,84 V108 M600,84 V108" c="k" noHead />
      <Ar x1="200" y1="100" x2="200" y2="108" c="k" />
      <Ar x1="600" y1="100" x2="600" y2="108" c="k" />
      {/* In-situ */}
      <Bx x={60} y={110} w={280} h={46} tone="g" b t={['In-situ conservation', '(on-site, natural habitat)']} lh={14} />
      <line x1="46" y1="133" x2="60" y2="133" className="ln ln-g" />
      <line x1="46" y1="133" x2="46" y2="373" className="ln ln-g" />
      {insitu.map((r, i) => {
        const y = 176 + i * 82;
        return (
          <g key={r[0]}>
            <line x1="46" y1={y + 33} x2="60" y2={y + 33} className="ln ln-g" />
            <Bx x={60} y={y} w={280} h={66} tone="n" />
            <Tx x={200} y={y + 26} s="s" b t={r[0]} />
            <Tx x={200} y={y + 43} s="xs" t={r[1]} lh={13} />
          </g>
        );
      })}
      {/* Ex-situ */}
      <Bx x={460} y={110} w={280} h={46} tone="b" b t={['Ex-situ conservation', '(off-site, outside habitat)']} lh={14} />
      <line x1="446" y1="133" x2="460" y2="133" className="ln ln-b" />
      <line x1="446" y1="133" x2="446" y2="440" className="ln ln-b" />
      {exsitu.map((r, i) => {
        const y = 176 + i * 55;
        return (
          <g key={r[0]}>
            <line x1="446" y1={y + 24} x2="460" y2={y + 24} className="ln ln-b" />
            <Bx x={460} y={y} w={280} h={48} tone="n" />
            <Tx x={600} y={y + 20} s="s" b t={r[0]} />
            <Tx x={600} y={y + 36} s="xs" t={r[1]} />
          </g>
        );
      })}
    </Svg>
  );
}
