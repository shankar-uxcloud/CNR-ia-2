import { Svg, Ar, Tx, Bx } from './kit';

/* ---------------- Carbon cycle ---------------- */
export function CarbonCycle() {
  return (
    <Svg label="Carbon cycle: photosynthesis, feeding, respiration, decomposition, combustion and ocean uptake of carbon dioxide">
      <Bx x={30} y={20} w={700} h={48} tone="c" b t="Atmosphere – carbon dioxide (CO₂)" />
      <Bx x={30} y={180} w={170} h={56} tone="g" s="s" lh={14} t={['Plants / producers', '(forests = carbon sinks)']} b />
      <Bx x={280} y={180} w={170} h={56} tone="n" b t="Animals / consumers" />
      <Bx x={500} y={130} w={140} h={58} tone="w" s="s" lh={14} t={['Combustion of fossil', 'fuels, wood and wastes']} />
      <Bx x={560} y={250} w={180} h={56} tone="b" b t={['Oceans', '(carbon sink)']} lh={14} />
      <Bx x={230} y={350} w={290} h={56} tone="n" b t={['Decomposers', '(bacteria and fungi)']} lh={14} />

      <Ar x1="60" y1="68" x2="60" y2="178" c="g" />
      <Tx x="68" y="106" a="start" s="s" b c="g" t={['Photosynthesis', '(CO₂ absorbed)']} />
      <Ar x1="170" y1="178" x2="170" y2="70" c="w" />
      <Tx x="178" y="150" a="start" s="s" b c="w" t="Respiration" />
      <Ar x1="365" y1="178" x2="365" y2="70" c="w" />
      <Tx x="373" y="120" a="start" s="s" b c="w" t="Respiration" />
      <Ar x1="202" y1="208" x2="278" y2="208" c="b" />
      <Tx x="240" y="199" s="s" b c="b" t="Feeding" />
      <Ar x1="570" y1="128" x2="570" y2="70" c="w" />
      <Tx x="578" y="104" a="start" s="s" b c="w" t="CO₂ released" />
      <Ar x1="700" y1="70" x2="700" y2="248" c="g" />
      <Tx x="692" y="215" a="end" s="s" b c="g" t="CO₂ absorbed" />
      <Ar x1="480" y1="348" x2="480" y2="70" c="w" />
      <Tx x="488" y="326" a="start" s="s" b c="w" t={['CO₂ released by', 'decomposition']} />
      <Ar d="M115,238 V378 H228" c="k" />
      <Tx x="122" y="322" a="start" s="s" t={['Dead plants', 'and wastes']} />
      <Ar x1="365" y1="238" x2="365" y2="348" c="k" />
      <Tx x="373" y="290" a="start" s="s" t={['Dead animals', 'and wastes']} />
    </Svg>
  );
}

/* ---------------- Nitrogen cycle ---------------- */
export function NitrogenCycle() {
  return (
    <Svg vb="0 0 760 470" label="Nitrogen cycle: fixation, absorption by plants, feeding, decomposition, nitrification and denitrification">
      <rect x="0" y="290" width="760" height="180" className="f-soil" />
      <Tx x="746" y="310" a="end" s="s" b c="k" t="SOIL" />
      <Bx x={30} y={20} w={700} h={46} tone="c" b t="Atmosphere – nitrogen gas (N₂)" />
      <Bx x={290} y={190} w={140} h={50} tone="n" b t="Animals" />
      <Bx x={500} y={190} w={150} h={50} tone="g" b t="Plants" />
      <Bx x={300} y={312} w={140} h={44} tone="n" b t="Decomposers" />
      <Bx x={40} y={390} w={150} h={50} tone="v" b t={['Ammonium', '(NH₄⁺)']} lh={14} />
      <Bx x={290} y={390} w={150} h={50} tone="v" b t={['Nitrite', '(NO₂⁻)']} lh={14} />
      <Bx x={540} y={390} w={150} h={50} tone="v" b t={['Nitrate', '(NO₃⁻)']} lh={14} />

      <Ar x1="60" y1="66" x2="60" y2="388" c="g" />
      <Tx x="68" y="124" a="start" s="s" b c="g" lh={14} t={['Nitrogen fixation', '(certain microorganisms', 'and other natural processes)']} />
      <Ar x1="690" y1="388" x2="690" y2="68" c="w" />
      <Tx x="682" y="104" a="end" s="s" b c="w" lh={14} t={['Denitrification', '(returns N₂ to atmosphere)']} />
      <Ar x1="560" y1="388" x2="560" y2="242" c="g" />
      <Tx x="568" y="326" a="start" s="s" b c="g" t={['Absorbed by', 'plant roots']} />
      <Ar x1="498" y1="215" x2="432" y2="215" c="b" />
      <Tx x="465" y="206" s="s" b c="b" t="Feeding" />
      <Ar x1="360" y1="242" x2="360" y2="310" c="k" />
      <Ar d="M520,242 V276 H410 V310" c="k" />
      <Tx x="352" y="284" a="end" s="s" t={['Dead organisms', 'and wastes']} />
      <Ar x1="300" y1="346" x2="192" y2="394" c="k" />
      <Tx x="72" y="336" a="start" s="s" lh={14} t={['Decomposers return', 'nitrogen compounds to soil']} />
      <Ar x1="192" y1="415" x2="288" y2="415" c="v" />
      <Tx x="240" y="406" s="s" b c="v" t="Nitrification" />
      <Ar x1="442" y1="415" x2="538" y2="415" c="v" />
      <Tx x="490" y="406" s="s" b c="v" t="Nitrification" />
    </Svg>
  );
}

/* ---------------- Oxygen cycle ---------------- */
export function OxygenCycle() {
  return (
    <Svg label="Oxygen cycle: oxygen released by photosynthesis and used in respiration and combustion, exchanged with water">
      <Bx x={30} y={20} w={700} h={46} tone="c" b t="Atmosphere – oxygen (O₂)" />
      <Bx x={30} y={190} w={190} h={60} tone="g" s="s" b lh={14} t={['Plants and algae', '(photosynthesis, sunlight)']} />
      <Bx x={300} y={190} w={170} h={60} tone="n" s="s" b lh={14} t={['Animals and humans', '(respiration)']} />
      <Bx x={550} y={190} w={180} h={60} tone="w" s="s" b lh={14} t={['Combustion', '(fuels, wood, wastes)']} />
      <Bx x={30} y={330} w={700} h={84} tone="b" rx={16} s="s" lh={16} t={['Water bodies (dissolved O₂)', 'Aquatic plants and algae release O₂ by photosynthesis;', 'aquatic organisms use dissolved O₂ for respiration']} />

      <Ar x1="70" y1="188" x2="70" y2="68" c="g" />
      <Tx x="78" y="112" a="start" s="s" b c="g" t={['O₂ released by', 'photosynthesis']} />
      <Ar x1="200" y1="68" x2="200" y2="188" c="w" />
      <Tx x="208" y="112" a="start" s="s" b c="w" t={['O₂ used in', 'respiration']} />
      <Ar x1="385" y1="68" x2="385" y2="188" c="w" />
      <Tx x="393" y="112" a="start" s="s" b c="w" t={['O₂ used in', 'respiration']} />
      <Ar x1="640" y1="68" x2="640" y2="188" c="w" />
      <Tx x="632" y="112" a="end" s="s" b c="w" t={['O₂ consumed', 'in combustion']} />
      <Ar x1="222" y1="220" x2="298" y2="220" c="b" />
      <Tx x="260" y="211" s="s" b c="b" t="Food" />
      <Ar x1="520" y1="68" x2="520" y2="328" c="c" both />
      <Tx x="510" y="292" a="end" s="s" b c="c" t={['Exchange of O₂', 'between air and water']} />
    </Svg>
  );
}

/* ---------------- Phosphorus cycle ---------------- */
export function PhosphorusCycle() {
  return (
    <Svg vb="0 0 760 450" label="Phosphorus cycle: weathering of rocks, uptake by plants, food chain, decomposition and sedimentation; no major gaseous phase">
      <Bx x={30} y={20} w={700} h={42} tone="n" dash s="s" t="Atmosphere – no major gaseous phase for phosphorus" />
      <Bx x={200} y={180} w={160} h={56} tone="g" b lh={14} t={['Plants', '(absorb phosphate)']} />
      <Bx x={430} y={180} w={170} h={56} tone="n" b lh={14} t={['Animals', '(obtain it through food)']} />
      <Bx x={30} y={320} w={170} h={60} tone="n" b lh={14} t={['Phosphate-containing', 'rocks']} />
      <Bx x={290} y={320} w={190} h={60} tone="b" b lh={14} t={['Soil and water', '(dissolved phosphate)']} />
      <Bx x={560} y={320} w={170} h={60} tone="v" b lh={14} t={['Sediments', '(phosphate settles)']} />

      <Ar x1="202" y1="350" x2="288" y2="350" c="k" />
      <Tx x="245" y="341" s="s" b t="Weathering" />
      <Ar x1="482" y1="350" x2="558" y2="350" c="k" />
      <Tx x="520" y="341" s="s" b t="Settles" />
      <Ar d="M645,382 V425 H115 V382" c="k" />
      <Tx x="380" y="417" s="s" b t="Over long periods, sediments may form rocks" />
      <Ar x1="330" y1="318" x2="330" y2="238" c="g" />
      <Tx x="338" y="284" a="start" s="s" b c="g" t={['Absorbed', 'by roots']} />
      <Ar x1="362" y1="208" x2="428" y2="208" c="b" />
      <Tx x="395" y="199" s="s" b c="b" t="Food" />
      <Ar x1="510" y1="238" x2="450" y2="318" c="w" />
      <Tx x="520" y="282" a="start" s="s" b c="w" t={['Excretion and', 'decomposition']} />
      <Ar x1="250" y1="238" x2="300" y2="318" c="w" />
      <Tx x="238" y="284" a="end" s="s" b c="w" t="Decomposition" />
    </Svg>
  );
}

/* ---------------- Water cycle ---------------- */
export function WaterCycle() {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return [70 + Math.cos(a) * 34, 58 + Math.sin(a) * 34, 70 + Math.cos(a) * 44, 58 + Math.sin(a) * 44];
  });
  return (
    <Svg label="Water cycle: evaporation, transpiration, condensation, precipitation, runoff, infiltration and groundwater flow">
      {rays.map((r, i) => <line key={i} x1={r[0]} y1={r[1]} x2={r[2]} y2={r[3]} className="ln ln-w" style={{ strokeWidth: 3 }} />)}
      <circle cx="70" cy="58" r="26" className="f-sun" />
      <Tx x="122" y="62" a="start" s="s" b c="w" t="Solar energy" />
      {/* Cloud */}
      {['f-cloud-o', 'f-cloud'].map((c) => (
        <g key={c} className={c}>
          <circle cx="300" cy="86" r="26" /><circle cx="345" cy="70" r="34" /><circle cx="400" cy="62" r="38" />
          <circle cx="455" cy="70" r="34" /><circle cx="500" cy="84" r="26" />
          <rect x="285" y="78" width="230" height="34" rx="17" />
        </g>
      ))}
      <Tx x="400" y="16" s="s" b c="b" t="Condensation – water vapour cools and forms clouds" />
      {/* Land, sea, groundwater */}
      <path d="M300,440 L300,332 Q360,332 420,262 L520,178 L600,262 Q660,322 760,330 L760,440 Z" className="f-land" />
      <rect x="0" y="350" width="300" height="90" className="f-sea" />
      <rect x="300" y="398" width="460" height="42" className="f-gw" />
      <path d="M20,372 q15,-9 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0" className="ln ln-b" style={{ strokeWidth: 1.5, opacity: 0.6 }} />
      <Tx x="150" y="404" s="s" b t={['Oceans, lakes', 'and rivers']} />
      <Tx x="530" y="414" s="s" b t="Groundwater flows towards rivers and oceans" />
      {/* Tree */}
      <rect x="650" y="270" width="8" height="34" className="f-trunk" />
      <circle cx="654" cy="254" r="26" className="f-leaf" />
      {/* Arrows */}
      <Ar d="M130,346 Q130,150 262,108" c="b" dash flow />
      <Tx x="122" y="250" a="end" s="s" b c="b" t={['Evaporation', '(solar energy)']} />
      <Ar d="M654,224 Q650,150 528,114" c="g" dash flow />
      <Tx x="662" y="176" a="start" s="s" b c="g" t={['Transpiration', 'from plants']} />
      <Ar x1="285" y1="124" x2="285" y2="346" c="b" />
      <Tx x="293" y="236" a="start" s="s" b c="b" t={['Precipitation', '(rain / snow)']} />
      <Ar x1="495" y1="124" x2="495" y2="188" c="b" />
      <Ar x1="455" y1="124" x2="455" y2="224" c="b" />
      <Ar d="M470,216 Q395,268 322,330 L302,348" c="k" />
      <Tx x="392" y="338" a="start" s="s" b t="Surface runoff" />
      <Ar x1="560" y1="262" x2="560" y2="396" c="b" />
      <Tx x="568" y="326" a="start" s="s" b c="b" t={['Infiltration', 'into soil']} />
      <Ar x1="740" y1="430" x2="304" y2="430" c="b" flow dash />
    </Svg>
  );
}
