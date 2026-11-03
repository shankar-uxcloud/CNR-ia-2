import { Svg, Ar, Tx, Bx, Nb } from './kit';

const Step = ({ x, y, n, t, tone = 'g' }) => (
  <g>
    <Nb x={x} y={y} n={n} tone={tone} />
    <Tx x={x + 18} y={y + 4} a="start" s="s" t={t} />
  </g>
);

/* ---------------- Electrostatic precipitator ---------------- */
export function Esp() {
  const plates = [195, 380, 565];
  const wires = [285, 475];
  const charged = [
    [255, 130, -52], [315, 172, 52], [245, 238, -42], [325, 214, 52],
    [445, 140, -52], [505, 182, 52], [440, 236, -52], [510, 250, 44],
  ];
  const dust = [[176, 150], [192, 205], [172, 238], [218, 176], [165, 120]];
  return (
    <Svg vb="0 0 760 490" label="Electrostatic precipitator: gas passes through a high-voltage field, particles are charged and collected on plates, dust falls into a hopper">
      {/* legend */}
      <circle cx="26" cy="18" r="4" className="pd" /><Tx x="38" y="22" a="start" s="xs" t="Dust particle (before charging)" />
      <circle cx="26" cy="38" r="4" className="pt" /><Tx x="38" y="42" a="start" s="xs" t="Electrically charged particle" />
      <rect x="22" y="52" width="8" height="14" rx="2" className="f-plate" /><Tx x="38" y="63" a="start" s="xs" t="Collecting plate (three shown)" />
      <line x1="26" y1="74" x2="26" y2="90" className="ln ln-w" style={{ strokeWidth: 2 }} /><Tx x="38" y="86" a="start" s="xs" t="Discharge electrode (high voltage)" />
      {/* HV supply */}
      <Bx x={290} y={8} w={180} h={34} tone="w" s="s" b t="High-voltage supply" />
      <Ar d="M380,42 V62 M285,62 H475" c="w" noHead />
      {/* housing */}
      <rect x="150" y="70" width="460" height="230" rx="6" className="bx bx-n" />
      {wires.map((x) => (
        <g key={x}>
          <Ar d={`M${x},62 V292`} c="w" noHead />
          {[100, 135, 170, 205, 240, 275].map((y) => <circle key={y} cx={x} cy={y} r="3" className="pt" />)}
        </g>
      ))}
      {plates.map((x) => <rect key={x} x={x - 4} y="84" width="8" height="206" rx="2" className="f-plate" />)}
      {/* gas flow */}
      {[112, 262].map((y) => <Ar key={y} x1="156" y1={y} x2="604" y2={y} c="k" dash flow w={1.4} />)}
      {dust.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className="pd" />)}
      {charged.map(([x, y, d], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4.5" className="pt" />
          <Ar x1={x + (d > 0 ? 7 : -7)} y1={y} x2={x + d} y2={y} c="w" w={1.6} />
        </g>
      ))}
      {/* inlet/outlet */}
      <Tx x="22" y="150" a="start" s="s" b t={['Dust-laden', 'gas in']} />
      <Ar x1="20" y1="187" x2="148" y2="187" c="k" w={3} />
      <Ar x1="612" y1="187" x2="742" y2="187" c="g" w={3} />
      <Tx x="676" y="160" s="s" b c="g" t={['Cleaned', 'gas out']} />
      {/* hopper */}
      <polygon points="150,300 610,300 440,372 320,372" className="f-hop" />
      <Tx x="380" y="340" s="s" b t="Hopper" />
      <Ar x1="380" y1="374" x2="380" y2="410" c="k" />
      <Tx x="392" y="398" a="start" s="s" b t="Collected dust removed periodically" />
      <Nb x={60} y={215} n={1} /><Nb x={300} y={120} n={2} tone="w" /><Nb x={352} y={196} n={3} tone="w" /><Nb x={500} y={340} n={4} />
      {/* steps */}
      <Step x={30} y={440} n={1} t="Dust-laden gas enters the high-voltage field" />
      <Step x={390} y={440} n={2} t="Particles become electrically charged" tone="w" />
      <Step x={30} y={466} n={3} t="Charged particles move to the collecting plates" tone="w" />
      <Step x={390} y={466} n={4} t="Dust removed periodically; cleaned gas exits" />
    </Svg>
  );
}

/* ---------------- Baghouse filter ---------------- */
export function Baghouse() {
  const cx = [225, 325, 425, 525];
  const gaps = [275, 375, 475];
  return (
    <Svg vb="0 0 760 536" label="Baghouse filter: dust-laden air passes through fabric bags, clean air exits through the plenum, dust falls into the hopper">
      {/* cleaning pipe */}
      <rect x="195" y="42" width="360" height="12" rx="3" className="f-tube" />
      <Tx x="375" y="32" s="s" b c="v" t="Periodic cleaning: shaking, reverse air or pulse-jet" />
      {/* housing */}
      <rect x="170" y="70" width="420" height="260" rx="6" className="bx bx-n" />
      <line x1="170" y1="140" x2="590" y2="140" className="ln ln-k" style={{ strokeWidth: 3.5 }} />
      <Tx x="582" y="134" a="end" s="xs" b t="Tube sheet" />
      <Tx x="600" y="150" a="start" s="s" b t={['Clean-air', 'plenum']} />
      {/* bags */}
      {cx.map((x) => (
        <g key={x}>
          <rect x={x - 22} y="140" width="44" height="152" rx="18" className="f-bag" />
          <Ar x1={x + 9} y1="270" x2={x + 9} y2="106" c="g" />
          <Ar x1={x - 9} y1="56" x2={x - 9} y2="150" c="v" dash />
          {[170, 200, 232, 262].map((y, i) => <circle key={y} cx={i % 2 ? x - 24 : x + 24} cy={y} r="3" className="pd" />)}
          <Ar x1={x} y1="294" x2={x} y2="326" c="k" dash w={1.4} />
        </g>
      ))}
      {gaps.map((x) => (
        <g key={x}>
          <Ar x1={x} y1="205" x2={x - 25} y2="205" c="k" w={1.6} />
          <Ar x1={x} y1="205" x2={x + 25} y2="205" c="k" w={1.6} />
        </g>
      ))}
      <Ar x1="183" y1="205" x2="199" y2="205" c="k" w={1.6} />
      <Ar x1="567" y1="205" x2="551" y2="205" c="k" w={1.6} />
      {/* inlet */}
      <Tx x="22" y="290" a="start" s="s" b t={['Dust-laden', 'air in']} />
      <Ar x1="20" y1="312" x2="168" y2="312" c="k" w={3} />
      {/* outlet */}
      <Ar x1="590" y1="108" x2="742" y2="108" c="g" w={3} />
      <Tx x="666" y="94" s="s" b c="g" t="Cleaned air out" />
      {/* hopper */}
      <polygon points="170,330 590,330 430,402 330,402" className="f-hop" />
      <Tx x="380" y="368" s="s" b t="Hopper" />
      <Ar x1="380" y1="404" x2="380" y2="440" c="k" />
      <Tx x="392" y="428" a="start" s="s" b t="Collected dust removed" />
      <Tx x="640" y="260" s="xs" t="Dust cake on outside of fabric" />
      <line x1="560" y1="256" x2="548" y2="262" className="ln ln-k" style={{ strokeWidth: 1 }} />
      {/* steps */}
      <Step x={30} y={466} n={1} t="Dust-laden air enters and passes through the fabric bags" />
      <Step x={30} y={490} n={2} t="Fabric retains the dust; cleaner air passes through and leaves" />
      <Step x={30} y={514} n={3} t="Dust removed by shaking, reverse air or pulse-jet; collected in the hopper" />
    </Svg>
  );
}

/* ---------------- Cyclone separator ---------------- */
export function Cyclone() {
  const loops = [[150, 95, 15], [190, 92, 14], [232, 76, 12], [275, 56, 10], [315, 36, 8]];
  const cxm = 380;
  return (
    <Svg vb="0 0 760 540" label="Cyclone separator: tangential gas inlet, spinning flow throws particles to the wall, particles fall to the hopper, cleaned gas leaves centrally">
      {/* body */}
      <path d="M280,90 H480 V230 L405,350 H355 L280,230 Z" className="f-cyc" />
      {/* inlet duct */}
      <rect x="150" y="100" width="130" height="36" className="f-tube" />
      <Tx x="28" y="82" a="start" s="s" b t={['Dust-laden', 'gas in']} />
      <Ar x1="30" y1="118" x2="272" y2="118" c="w" w={3} />
      <Tx x="215" y="158" s="xs" b t="Tangential inlet" />
      {/* spiral */}
      {loops.map(([cy, rx, ry], i) => (
        <g key={i}>
          <path d={`M${cxm + rx},${cy} A${rx},${ry} 0 0 0 ${cxm - rx},${cy}`} className="ln ln-k dash" style={{ strokeWidth: 1.4, opacity: 0.55 }} />
          <Ar d={`M${cxm - rx},${cy} A${rx},${ry} 0 0 0 ${cxm + rx},${cy}`} c="w" w={2.2} />
        </g>
      ))}
      {/* particles near wall */}
      {[[292, 168], [468, 176], [318, 262], [442, 262], [336, 304], [424, 304]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" className="pd" />)}
      {/* outlet tube */}
      <rect x="360" y="36" width="40" height="112" className="f-tube" />
      <Ar d="M380,330 V22" c="g" dash flow />
      <Tx x="412" y="46" a="start" s="s" b c="g" t={['Cleaned gas out', '(central outlet)']} />
      {/* hopper */}
      <rect x="335" y="350" width="90" height="56" rx="4" className="f-hop" />
      <Tx x="380" y="383" s="s" b t="Hopper" />
      <Ar x1="380" y1="408" x2="380" y2="440" c="k" />
      <Tx x="392" y="430" a="start" s="s" b t="Dust removed" />
      {/* labels */}
      <Tx x="496" y="118" a="start" s="s" b t={['Cylindrical', 'section']} />
      <Tx x="496" y="192" a="start" s="s" b c="w" t={['Particles thrown', 'to outer wall by', 'centrifugal force']} />
      <Tx x="452" y="298" a="start" s="s" b t={['Conical', 'section']} />
      <Tx x="130" y="250" a="start" s="s" b c="w" t={['Spinning gas flow', '(outer vortex)']} />
      <Ar x1="224" y1="248" x2="296" y2="226" c="w" w={1.2} noHead />
      {/* steps */}
      <Step x={30} y={474} n={1} t="Dust-laden gas enters the cylindrical / conical chamber tangentially" />
      <Step x={30} y={498} n={2} t="Rotating gas drives particles towards the outer wall" />
      <Step x={30} y={522} n={3} t="Particles fall into the hopper; cleaned gas leaves through the central outlet" />
    </Svg>
  );
}

/* ---------------- Wet scrubber ---------------- */
export function Scrubber() {
  const drops = [[320, 160], [350, 190], [395, 170], [425, 205], [335, 228], [385, 238], [430, 150], [305, 205], [370, 150]];
  return (
    <Svg vb="0 0 760 490" label="Wet scrubber: polluted gas rises through sprayed liquid; droplets capture particles and absorb gases; contaminated liquid is collected for treatment">
      {/* column */}
      <rect x="280" y="80" width="180" height="290" rx="8" className="bx bx-n" />
      <rect x="281" y="310" width="178" height="59" className="f-sea" />
      <Tx x="370" y="344" s="s" b t="Liquid sump" />
      {/* mist eliminator */}
      <path d="M290,102 l15,-13 l15,13 l15,-13 l15,13 l15,-13 l15,13 l15,-13 l15,13 l15,-13 l15,13 l15,-13 l15,13" className="ln ln-k" style={{ strokeWidth: 1.6 }} />
      <Tx x="472" y="96" a="start" s="s" b t="Mist eliminator" />
      {/* outlet */}
      <rect x="355" y="36" width="30" height="46" className="f-tube" />
      <Ar x1="370" y1="72" x2="370" y2="14" c="g" w={3} />
      <Tx x="396" y="40" a="start" s="s" b c="g" t="Cleaned gas out" />
      {/* spray header */}
      <Tx x="30" y="108" a="start" s="s" b c="b" t={['Scrubbing liquid in', '(water or solution)']} />
      <Ar x1="30" y1="130" x2="300" y2="130" c="b" w={3} />
      <line x1="300" y1="130" x2="440" y2="130" className="ln ln-b" style={{ strokeWidth: 4 }} />
      {[320, 370, 420].map((x) => <polygon key={x} points={`${x - 7},132 ${x + 7},132 ${x},144`} className="f-drop" />)}
      <Tx x="472" y="134" a="start" s="s" b t="Spray nozzles" />
      {drops.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" className="f-drop" />
          {i % 2 === 0 && <circle cx={x} cy={y} r="2.4" className="pd" />}
        </g>
      ))}
      {/* gas path */}
      <Tx x="30" y="262" a="start" s="s" b t={['Polluted gas in', '(dust and gases)']} />
      <Ar x1="30" y1="285" x2="278" y2="285" c="k" w={3} />
      {[318, 372, 426].map((x) => <Ar key={x} x1={x} y1="280" x2={x} y2="112" c="k" dash flow w={1.4} />)}
      {/* drain */}
      <Ar x1="370" y1="371" x2="370" y2="425" c="w" w={3} />
      <Tx x="384" y="410" a="start" s="s" b c="w" t={['Contaminated liquid / sludge', 'collected for treatment']} />
      {/* right panel */}
      <Bx x={500} y={160} w={250} h={46} tone="n" />
      <Nb x={522} y={183} n={1} /><Tx x={540} y={187} a="start" s="s" t={['Droplets capture', 'dust particles']} lh={13} />
      <Bx x={500} y={218} w={250} h={46} tone="n" />
      <Nb x={522} y={241} n={2} /><Tx x={540} y={245} a="start" s="s" t={['Soluble gases are', 'absorbed in the liquid']} lh={13} />
      <Bx x={500} y={276} w={250} h={46} tone="n" />
      <Nb x={522} y={299} n={3} /><Tx x={540} y={303} a="start" s="s" t={['Alkaline liquid neutralises', 'acidic gases']} lh={13} />
      <circle cx="514" cy="352" r="4.5" className="pd" /><Tx x="528" y="356" a="start" s="xs" t="Dust particle" />
      <circle cx="514" cy="374" r="7" className="f-drop" /><Tx x="528" y="378" a="start" s="xs" t="Spray droplet" />
      <Tx x="30" y="470" a="start" s="s" t="Principle: liquid scrubbing – gas contacts sprayed water or a suitable scrubbing solution." />
    </Svg>
  );
}
