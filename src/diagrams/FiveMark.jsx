import { Svg, Ar, Tx, Bx } from './kit';

export function SoilFoodSecurity() {
  return (
    <Svg vb="0 0 760 390" label="Soil degradation causes reduced soil functions, lower crop productivity and weaker food security">
      <Tx x="380" y="28" s="m" b t="Soil degradation and food security" />
      <Bx x={30} y={62} w={210} h={92} tone="w" t={['Causes', 'Erosion • compaction', 'Salinity • contamination']} lh={16} />
      <Bx x={275} y={62} w={210} h={92} tone="n" t={['Soil functions decline', 'Less fertility and organic matter', 'Poor water storage and rooting']} lh={16} />
      <Bx x={520} y={62} w={210} h={92} tone="r" t={['Agricultural effects', 'Lower crop yield and quality', 'Higher input costs']} lh={16} />
      <Ar x1="240" y1="108" x2="273" y2="108" c="k" />
      <Ar x1="485" y1="108" x2="518" y2="108" c="k" />
      <Ar x1="625" y1="154" x2="625" y2="205" c="r" />
      <Bx x={150} y={210} w={460} h={72} tone="b" t={['Food-security risks', 'Reduced food availability • unstable supply • greater vulnerability']} lh={17} />
      <Ar x1="380" y1="282" x2="380" y2="315" c="g" />
      <Bx x={120} y={318} w={520} h={54} tone="g" t="Conservation: cover crops • organic matter • contour farming • proper irrigation and drainage" />
    </Svg>
  );
}

export function LandUsePlanning() {
  const steps = [
    ['Assess land', 'Soil • slope • water • ecology'],
    ['Plan together', 'Community • experts • agencies'],
    ['Allocate uses', 'Zoning • capability • suitability'],
    ['Protect and restore', 'Soil • forests • wetlands'],
    ['Monitor and adapt', 'Review • revise • improve'],
  ];
  return (
    <Svg vb="0 0 760 330" label="Sustainable land-use planning sequence from assessment to monitoring">
      <Tx x="380" y="28" s="m" b t="Sustainable land-use planning" />
      {steps.map((step, index) => {
        const x = 18 + index * 148;
        return (
          <g key={step[0]}>
            <Bx x={x} y={95} w={132} h={112} tone={index === 4 ? 'g' : 'n'} />
            <Tx x={x + 66} y={130} s="s" b t={step[0]} />
            <Tx x={x + 66} y={163} s="xs" t={step[1].split(' • ')} lh={14} />
            {index < steps.length - 1 ? <Ar x1={x + 133} y1="151" x2={x + 146} y2="151" c="k" /> : null}
          </g>
        );
      })}
      <Tx x="380" y="260" s="s" t="Balance economic development, social needs and environmental protection" />
      <Tx x="380" y="282" s="xs" t="Use the watershed as a planning unit and revise decisions when evidence changes" />
    </Svg>
  );
}

export function BasinImbalance() {
  return (
    <Svg vb="0 0 760 390" label="Comparison of water-surplus and water-deficit basins and integrated management">
      <Tx x="380" y="28" s="m" b t="Water availability varies by basin and season" />
      <Bx x={35} y={66} w={320} h={58} tone="b" b t="Water-surplus basins" />
      <Bx x={405} y={66} w={320} h={58} tone="r" b t="Water-deficit basins" />
      <Bx x={35} y={142} w={320} h={116} tone="n" t={['Notes examples', 'Mahanadi • Godavari', 'Higher assessed availability', 'during some periods']} lh={17} />
      <Bx x={405} y={142} w={320} h={116} tone="n" t={['Notes examples', 'Krishna • Pennar • Cauvery • Vaigai', 'Demand may exceed', 'dependable availability']} lh={17} />
      <Ar x1="195" y1="258" x2="195" y2="294" c="k" />
      <Ar x1="565" y1="258" x2="565" y2="294" c="k" />
      <Bx x={90} y={300} w={580} h={60} tone="g" t={['Integrated basin planning', 'Conservation • efficient use • ecological flows • fair agreements']} lh={16} />
    </Svg>
  );
}

export function WaterDistribution() {
  return (
    <Svg vb="0 0 760 380" label="Global water distribution: 97.5 percent saline and 2.5 percent freshwater; freshwater storage shares">
      <Tx x="380" y="28" s="m" b t="Global water resources" />
      <Bx x={35} y={64} w={330} h={70} tone="b" b t={['Saline water', '97.5% of total global water']} lh={18} />
      <Bx x={395} y={64} w={330} h={70} tone="g" b t={['Freshwater', '2.5% of total global water']} lh={18} />
      <Ar x1="560" y1="134" x2="560" y2="178" c="k" />
      <Bx x={35} y={192} w={215} h={92} tone="n" t={['Glaciers and ice caps', '68.7% of freshwater']} lh={17} />
      <Bx x={273} y={192} w={215} h={92} tone="n" t={['Groundwater', '30.1% of freshwater']} lh={17} />
      <Bx x={510} y={192} w={215} h={92} tone="n" t={['Surface freshwater', '1.2% of freshwater']} lh={17} />
      <Tx x="380" y="330" s="xs" t="The lower percentages are shares of freshwater, not of all global water." />
    </Svg>
  );
}

export function RiverLinking() {
  return (
    <Svg vb="0 0 760 410" label="National River Linking Project split into Himalayan and Peninsular components">
      <Bx x={220} y={18} w={320} h={58} tone="n" b t="National River Linking Project" />
      <Ar d="M380,76 V105 M190,105 H570 M190,105 V135 M570,105 V135" c="k" noHead />
      <Bx x={28} y={140} w={324} h={58} tone="b" b t="Himalayan component" />
      <Bx x={408} y={140} w={324} h={58} tone="g" b t="Peninsular component" />
      <Bx x={28} y={220} w={324} h={112} tone="n" t={['Ganga • Brahmaputra and tributaries', 'Storage reservoirs and link canals', 'Potential supply to deficit regions']} lh={17} />
      <Bx x={408} y={220} w={324} h={112} tone="n" t={['Mahanadi • Godavari', 'Proposed links towards Krishna,', 'Pennar and Cauvery basins']} lh={17} />
      <Tx x="380" y="370" s="xs" t="Proposals require ecological assessment, rehabilitation, finance and inter-state agreement." />
    </Svg>
  );
}

export function SeawaterIngress() {
  return (
    <Svg vb="0 0 760 400" label="Coastal aquifer showing seawater intrusion when excessive pumping lowers freshwater pressure">
      <Bx x={24} y={42} w={190} h={72} tone="b" b t={['Sea', 'Saline water']} lh={17} />
      <Bx x={252} y={42} w={484} h={72} tone="g" b t={['Coastal freshwater aquifer', 'Freshwater normally flows towards the sea']} lh={17} />
      <Ar x1="214" y1="78" x2="250" y2="78" c="w" dash />
      <Bx x={36} y={158} w={300} h={84} tone="n" t={['Normal balance', 'Freshwater pressure resists', 'landward saline movement']} lh={17} />
      <Bx x={424} y={158} w={300} h={84} tone="r" t={['Excessive coastal pumping', 'Groundwater level falls', 'Freshwater pressure decreases']} lh={17} />
      <Ar x1="336" y1="200" x2="422" y2="200" c="k" />
      <Ar x1="575" y1="242" x2="575" y2="284" c="r" />
      <Bx x={160} y={290} w={440} h={72} tone="b" t={['Result: saline interface moves inland', 'Wells become brackish • crop and ecosystem impacts']} lh={17} />
      <Tx x="380" y="386" s="xs" t="Control: reduce pumping • recharge aquifers • monitor groundwater salinity" />
    </Svg>
  );
}
