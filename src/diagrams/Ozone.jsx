import { Svg, Ar, Tx, Bx, Nb } from './kit';

export function OzoneDepletion() {
  const polar = [
    ['Cold polar', 'winter: PSCs', 'form'],
    ['PSC surfaces', 'convert reservoir', 'Cl compounds'],
    ['Spring sunlight', 'releases', 'chlorine radicals'],
    ['Rapid O₃ loss:', 'Antarctic', 'ozone hole'],
  ];
  return (
    <Svg vb="0 0 760 520" label="Ozone depletion mechanism: ODS reach the stratosphere, UV releases chlorine and bromine radicals, a catalytic cycle destroys ozone, polar conditions produce the ozone hole">
      <rect x="10" y="10" width="740" height="414" rx="14" className="f-str" />
      <Tx x="26" y="34" a="start" s="s" b c="v" t="STRATOSPHERE" />
      <rect x="10" y="432" width="740" height="78" rx="14" className="f-land" />

      {/* UV and release of radicals */}
      <Ar x1="240" y1="40" x2="240" y2="93" c="w" w={3} />
      <Tx x="250" y="70" a="start" s="s" b c="w" t="UV radiation" />
      <Bx x={40} y={95} w={260} h={92} tone="w" s="s" lh={17} t={['UV (hν) breaks down ODS', 'CF₂Cl₂ + hν → CF₂Cl• + Cl•', 'halons release Br•']} />

      {/* Catalytic cycle */}
      <Ar x1="302" y1="141" x2="390" y2="141" c="k" />
      <Tx x="346" y="130" s="xs" b t="Cl•" />
      <circle cx="430" cy="141" r="36" className="bx bx-g" />
      <Tx x="430" y="148" s="l" b c="g" t="Cl•" />
      <circle cx="640" cy="141" r="36" className="bx bx-w" />
      <Tx x="640" y="148" s="l" b c="w" t="ClO•" />
      <Ar d="M450,110 Q535,50 620,110" c="w" />
      <Tx x="535" y="60" s="s" b c="w" t="Cl• + O₃ → ClO• + O₂" />
      <Ar d="M620,172 Q535,232 450,172" c="g" />
      <Tx x="535" y="226" s="s" b c="g" t="ClO• + O → Cl• + O₂" />
      <Tx x="535" y="138" s="s" b t={['Cl• regenerated', 'net: O₃ + O → 2O₂']} lh={16} />
      <Tx x="535" y="256" s="xs" t={['Bromine (from halons) follows the same cycle:', 'Br• + O₃ → BrO• + O₂   and   BrO• + O → Br• + O₂']} lh={13} />

      {/* Ozone layer band */}
      <Bx x={30} y={290} w={700} h={36} tone="v" dash s="s" b t="Ozone layer (O₃) – absorbs much of the Sun’s harmful UV radiation" />

      {/* ODS rise */}
      <Ar x1="155" y1="446" x2="155" y2="189" c="k" w={3} />
      <Tx x="166" y="366" a="start" s="s" b t={['ODS are stable in the', 'lower atmosphere and', 'reach the stratosphere']} lh={14} />

      {/* Polar sequence */}
      <Tx x="536" y="348" s="s" b c="v" t="Ozone-hole sequence over the polar region" />
      {polar.map((t, i) => {
        const x = 334 + i * 104;
        return (
          <g key={i}>
            <Bx x={x} y={356} w={92} h={58} tone="n" s="xs" lh={13} t={t} />
            {i < 3 && <Ar x1={x + 93} y1={385} x2={x + 103} y2={385} c="v" />}
          </g>
        );
      })}
      <Ar x1="692" y1="416" x2="692" y2="446" c="w" w={3} />

      {/* Surface */}
      <Bx x={40} y={448} w={230} h={50} tone="n" s="s" b lh={15} t={['CFCs, halons and other ODS', 'released at the surface']} />
      <Bx x={334} y={446} w={404} h={56} tone="w" s="xs" lh={14} t={['Increased UV-B reaches the surface: skin cancer,', 'cataracts, immune suppression;', 'damage to crops and phytoplankton']} />
      <Nb x={52} y={437} n={1} /><Nb x={52} y={118} n={2} tone="w" /><Nb x={404} y={104} n={3} tone="g" /><Nb x={334} y={347} n={4} tone="v" />
    </Svg>
  );
}
