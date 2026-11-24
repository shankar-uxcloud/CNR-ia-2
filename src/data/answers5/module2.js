const section = (id, title, blocks) => ({ id, title, blocks });
const p = (text) => ({ type: 'p', text });
const list = (items, ordered = true) => ({ type: 'list', ordered, items });
const table = (head, rows) => ({ type: 'table', head, rows });
const diagram = (id, caption) => ({ type: 'diagram', id, caption });
const note = (text, kind = 'gap') => ({ type: 'note', kind, text });

const answer = (id, reviewStatus, sections, topicTags, reviewReason = null) => ({
  id,
  answer: sections,
  topicTags,
  reviewStatus,
  reviewReason,
});

export const FIVE_MARK_MODULE_2_ANSWERS = [
  answer('june-july-2026-q3a', 'draft-needs-pdf-review', [
    section('definition', 'Water-surplus and water-deficit basins', [
      p('A water-surplus basin has assessed water availability greater than its requirements, while a water-deficit basin has insufficient dependable water to meet its needs. In India, rainfall and river flows vary greatly by region and season.'),
    ]),
    section('examples', 'Examples from the supplied notes', [
      table(['Water-surplus basins', 'Water-deficit basins'], [
        ['Mahanadi and Godavari', 'Krishna, Pennar, Cauvery and Vaigai'],
      ]),
      p('The notes quote estimated surplus volumes of about 22,058 Mm³ for Mahanadi at the proposed Manibhadra dam site and about 15,852 Mm³ for Godavari at the proposed Polavaram dam site. These are planning estimates, not guaranteed annual transferable volumes.'),
    ]),
    section('causes', 'Reasons for regional imbalance', [
      list([
        'Uneven and seasonal monsoon rainfall.',
        'Differences in river-basin size, runoff and storage capacity.',
        'High agricultural, domestic and industrial demand.',
        'Population growth, urbanisation and inefficient irrigation.',
      ]),
    ]),
    section('management', 'Management measures', [
      list([
        'Improve watershed management, rainwater harvesting and groundwater recharge.',
        'Use water efficiently in agriculture and reduce distribution losses.',
        'Reuse treated wastewater where suitable and prevent pollution.',
        'Assess inter-basin transfers only after ecological, social and inter-state review.',
      ], false),
      diagram('basinImbalance', 'Study schematic of surplus and deficit basins cited in the supplied notes.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Basin-level planning, conservation and efficient use are essential because water availability is uneven in space and time.'),
    ]),
  ], ['Water resources', 'Surplus basins', 'Deficit basins', 'Basin planning']),
  answer('june-july-2026-q3b', 'draft-needs-pdf-review', [
    section('introduction', 'Introduction', [
      p('Water is abundant on Earth, but accessible freshwater is limited and unevenly distributed. Both global and Indian water resources require careful management.'),
    ]),
    section('global', 'Global water resources', [
      table(['Water store', 'Share'], [
        ['Saline water', 'About 97.5% of all global water'],
        ['Freshwater', 'About 2.5% of all global water'],
        ['Glaciers and ice caps', 'About 68.7% of freshwater'],
        ['Groundwater', 'About 30.1% of freshwater'],
        ['Surface freshwater', 'About 1.2% of freshwater'],
      ]),
      diagram('waterDistribution', 'Original study diagram showing global saline and freshwater shares.'),
    ]),
    section('india', 'Indian water resources', [
      list([
        'The supplied notes estimate annual precipitation in India at about 4,000 billion cubic metres (BCM).',
        'Estimated utilizable surface water is about 690 BCM.',
        'Estimated utilizable groundwater is approximately 398 BCM.',
        'Water availability is uneven: the Ganga and Brahmaputra basins are relatively water-rich, while parts of southern and western India experience recurring scarcity.',
      ]),
    ]),
    section('uses', 'Major water-use sectors in India', [
      list([
        'Agriculture: approximately 80–85% of water use in the supplied notes.',
        'Domestic use: approximately 5–7%, including drinking, cooking and sanitation.',
        'Industrial use: approximately 8–10%, including manufacturing and power generation.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('The accessible share of freshwater is small. Conservation, pollution prevention, efficient irrigation and groundwater recharge are necessary for water security.'),
    ]),
  ], ['Global water resources', 'Indian water resources', 'Freshwater', 'Water conservation']),
  answer('june-july-2026-q4a', 'draft-needs-pdf-review', [
    section('introduction', 'Introduction', [
      p('The National River Linking Project (NRLP) is a proposed system of links, reservoirs and canals intended to transfer water from relatively surplus basins to water-deficit basins.'),
    ]),
    section('components', 'Main components', [
      table(['Himalayan component', 'Peninsular component'], [
        ['Focuses on northern and eastern rivers, including the Ganga and Brahmaputra and their tributaries.', 'Focuses on rivers of southern India.'],
        ['Proposes storage dams and reservoirs to capture monsoon flows and convey water through links.', 'Proposes transfers from rivers such as Mahanadi and Godavari towards Krishna, Pennar and Cauvery basins.'],
        ['Intended benefits include irrigation, hydropower and possible flood moderation.', 'Intended benefits include more reliable irrigation and support for water-scarce regions.'],
      ]),
      diagram('riverLinking', 'Original study schematic of the two National River Linking Project components.'),
    ]),
    section('issues', 'Major issues', [
      list([
        'Dams and canals may submerge forests and alter river, delta and coastal ecosystems.',
        'Reservoirs may displace tribal and rural communities and require rehabilitation.',
        'Construction and maintenance involve very high costs.',
        'Inter-state water-sharing agreements can be difficult.',
        'Environmental flows and climate variability must be considered before treating a basin as surplus.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('River linking may address regional water imbalance, but it requires detailed environmental and social assessment, public participation and agreement among states.'),
    ]),
  ], ['National River Linking Project', 'Himalayan component', 'Peninsular component']),
  answer('june-july-2026-q4b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of seawater ingress', [
      p('Seawater ingress is the movement of saline seawater into freshwater aquifers in coastal regions when the natural balance between freshwater and seawater is disturbed.'),
    ]),
    section('mechanism', 'Mechanism', [
      list([
        'Freshwater normally forms a lens above denser seawater in a coastal aquifer.',
        'Freshwater pressure helps resist the landward movement of seawater.',
        'Excessive pumping from coastal wells lowers the freshwater table and reduces this pressure.',
        'The saline interface then moves inland and upward, contaminating wells.',
      ]),
      diagram('seawaterIngress', 'Original study schematic of saline intrusion after excessive coastal groundwater pumping.'),
    ]),
    section('effects', 'Problems caused', [
      list([
        'Wells become saline and water may become unsuitable for drinking and irrigation.',
        'Salt accumulation can reduce soil productivity and damage crops.',
        'Coastal communities face reduced freshwater security.',
      ]),
    ]),
    section('solutions', 'Solutions', [
      list([
        'Regulate groundwater extraction and monitor water levels.',
        'Recharge aquifers through recharge wells, pits and surface-spreading basins.',
        'Use subsurface barriers where technically suitable.',
        'Protect coastal vegetation and avoid damaging dunes and wetlands.',
        'Plan well locations and pumping limits according to coastal aquifer conditions.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Controlled pumping and maintenance of freshwater recharge are central to preventing seawater ingress in coastal aquifers.'),
    ]),
  ], ['Seawater ingress', 'Coastal aquifers', 'Groundwater recharge']),
  answer('dec-jan-2026-4a', 'draft-needs-pdf-review', [
    section('definition', 'Water-surplus and water-deficit basins', [
      p('A water-surplus basin has assessed water availability greater than its requirements, whereas a water-deficit basin has inadequate dependable water to meet its demand.'),
    ]),
    section('examples', 'Examples recorded in the December/January scheme', [
      table(['Surplus basins', 'Deficit basins'], [
        ['Brahmaputra, Ganga and Mahanadi', 'Cauvery, Krishna and Pennar'],
      ]),
    ]),
    section('causes', 'Reasons for imbalance', [
      list([
        'Uneven distribution of monsoon rainfall and seasonal river flow.',
        'Differences in basin area, runoff and storage.',
        'High irrigation demand and growing domestic and industrial needs.',
        'Unequal groundwater availability and recharge.',
      ]),
    ]),
    section('management', 'Management', [
      list([
        'Improve rainwater harvesting, watershed management and groundwater recharge.',
        'Increase irrigation efficiency and reduce water losses.',
        'Study inter-basin transfers from surplus to deficit basins only after technical, ecological and social assessment.',
        'Ensure fair agreements among the concerned states and maintain environmental flows.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('The surplus/deficit classification helps planning, but actual transfers depend on seasonal availability, environmental needs and agreements among states.'),
    ]),
  ], ['Water-deficit basins', 'Water-surplus basins', 'December January paper']),
  answer('dec-jan-2026-4b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning and cause', [
      p('Seawater ingress is the intrusion of saline water into coastal freshwater aquifers. It is commonly accelerated when excessive groundwater pumping lowers the freshwater level and reduces the pressure that normally keeps seawater away.'),
    ]),
    section('effects', 'Problems', [
      list([
        'Salinity makes wells unsuitable for drinking and many agricultural uses.',
        'Salt accumulation can reduce soil fertility and crop productivity.',
        'Freshwater availability declines for coastal settlements and industries.',
      ]),
    ]),
    section('methods', 'Methods to reduce seawater ingress', [
      list([
        'Control groundwater pumping through regulated extraction and monitoring.',
        'Artificially recharge aquifers using suitable recharge wells, pits and surface-spreading methods.',
        'Use subsurface barriers where hydrogeological conditions permit.',
        'Protect coastal vegetation, wetlands and natural recharge areas.',
        'Apply coastal land-use planning and monitor groundwater level and salinity.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Coastal aquifers can be protected by balancing extraction with recharge and by managing coastal land and groundwater together.'),
    ]),
  ], ['Seawater ingress', 'Coastal groundwater', 'December January paper']),
  answer('21cv654-3-a-', 'draft-needs-academic-review', [
    section('definition', 'Water-surplus and water-deficit basins', [
      p('A river basin is the area drained by a river and its tributaries. A surplus basin has comparatively more utilizable water than its assessed demand, while a deficit basin faces a shortage.'),
    ]),
    section('examples', 'Examples in the supplied notes', [
      table(['Surplus basins', 'Deficit basins'], [
        ['Mahanadi and Godavari', 'Krishna, Pennar, Cauvery and Vaigai'],
      ]),
    ]),
    section('reasons', 'Reasons for regional imbalance', [
      list([
        'Uneven monsoon rainfall and seasonal river flows.',
        'Differences in runoff, basin size and storage capacity.',
        'High irrigation demand, population growth and urbanisation.',
        'Differences in groundwater availability and recharge.',
      ]),
    ]),
    section('management', 'Management options', [
      list([
        'Rainwater harvesting and watershed management.',
        'Groundwater recharge and efficient irrigation.',
        'Reuse of treated wastewater and pollution prevention.',
        'Carefully assessed inter-basin transfer with environmental and social safeguards.',
      ], false),
      diagram('basinImbalance', 'Study schematic of the surplus and deficit basins named in the supplied notes.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Integrated basin management is needed because water availability varies across regions and seasons.'),
    ]),
  ], ['Water basins', 'Water availability', 'Regional imbalance']),
  answer('21cv654-3-b-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of conjunctive use', [
      p('Conjunctive use is the planned and coordinated use of surface water and groundwater to meet water demand efficiently. Both sources are operated together according to their availability, quality and seasonal demand.'),
    ]),
    section('working', 'Working principle', [
      list([
        'During periods of high river or canal supply, surface water is used for irrigation and excess water may recharge the aquifer.',
        'During dry periods or canal closures, groundwater is pumped from wells to supplement the reduced surface supply.',
        'Groundwater pumping in suitable canal-command areas can help control waterlogging and maintain a favourable water table.',
        'The combined supply is scheduled according to crop-water requirements, water quality and sustainable aquifer yield.',
      ]),
    ]),
    section('flow', 'Simple flow representation', [
      p('Reservoir / river → canal → fields; aquifer → well → fields. Canal seepage and rainwater harvesting → aquifer recharge. Both sources are monitored and allocated together.'),
    ]),
    section('advantages', 'Advantages and precautions', [
      list([
        'Improves irrigation reliability during droughts and seasonal variation.',
        'Makes use of groundwater storage and can reduce pressure on surface reservoirs.',
        'May reduce waterlogging when pumping is carefully controlled.',
        'Avoid over-pumping; monitor groundwater levels and quality and maintain recharge through rainwater harvesting and recharge structures.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Conjunctive use improves water security only when surface-water allocation and groundwater extraction are coordinated and groundwater withdrawal is balanced with recharge.'),
    ]),
  ], ['Conjunctive use', 'Groundwater', 'Surface water', 'Irrigation'], 'The source paper identifies this topic, and the repository model-paper answer supplies the additional explanation. Compare with the official scheme and notes before academic sign-off.'),
  answer('21cv654-3-c-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of inter-basin water transfer', [
      p('Inter-basin water transfer is the planned movement of water from one river basin to another through canals, tunnels, pipelines, reservoirs or link channels. It is proposed mainly to move water from relatively surplus basins to water-deficit basins.'),
    ]),
    section('objectives', 'Objectives', [
      list([
        'Reduce regional differences in water availability.',
        'Provide irrigation to drought-prone areas.',
        'Improve drinking and industrial water supply.',
        'Support regional development and, in some projects, hydropower or flood moderation.',
      ]),
    ]),
    section('example', 'Indian example and concerns', [
      p('The supplied notes discuss potential links under the National Perspective Plan and identify Mahanadi and Godavari as surplus basins and Krishna, Pennar, Cauvery and Vaigai as deficit basins. One example is the proposed Godavari (Inchampalli)–Krishna (Pulichintala) link.'),
      list([
        'Possible impacts include forest submergence, habitat change and altered river ecology.',
        'Reservoirs may displace communities and require rehabilitation.',
        'Projects are costly and need inter-state agreements.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Inter-basin transfer is a major planning option, but it must be evaluated together with local conservation, ecological needs and social impacts.'),
    ]),
  ], ['Inter-basin transfer', 'National Perspective Plan', 'Water management']),
  answer('21cv654-4-a-', 'draft-needs-academic-review', [
    section('global', 'Global distribution of water', [
      table(['Water category', 'Share'], [
        ['Saline water', 'Approximately 97.5% of total global water'],
        ['Freshwater', 'Approximately 2.5% of total global water'],
        ['Glaciers and ice caps', 'About 68.7% of freshwater'],
        ['Groundwater', 'About 30.1% of freshwater'],
        ['Surface freshwater', 'About 1.2% of freshwater'],
      ]),
      diagram('waterDistribution', 'Original study diagram of global water distribution.'),
    ]),
    section('importance', 'Importance and challenges', [
      list([
        'Water is required for drinking, sanitation, agriculture, industry and ecosystems.',
        'Most freshwater is frozen or stored underground, leaving only a small fraction readily accessible.',
        'Water is unevenly distributed geographically and seasonally.',
        'Pollution, over-extraction and climate change increase pressure on available supplies.',
      ]),
    ]),
    section('conservation', 'Conservation', [
      list([
        'Rainwater harvesting and watershed protection.',
        'Groundwater recharge and efficient irrigation.',
        'Wastewater treatment and reuse where safe.',
        'Prevention of water pollution.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('The global water cycle circulates water continuously, but accessible freshwater is limited. Efficient and equitable management is essential.'),
    ]),
  ], ['Global water resources', 'Freshwater distribution', 'Water conservation']),
  answer('21cv654-4-b-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of water-resource system planning', [
      p('Water-resource system planning is the systematic assessment, development, allocation and management of water resources to meet present and future needs while considering economic, social and environmental factors.'),
    ]),
    section('steps', 'Main steps', [
      list([
        'Assess rainfall, river flow, reservoir storage, groundwater availability and water quality.',
        'Estimate sectoral demand for domestic use, agriculture, industry, energy and ecosystems.',
        'Compare supply with present and projected demand to identify seasonal and regional gaps.',
        'Evaluate alternatives such as reservoirs, watershed management, rainwater harvesting, recharge, reuse and inter-basin transfer.',
        'Allocate water transparently and equitably among users.',
        'Assess environmental and social impacts and plan mitigation and rehabilitation.',
        'Implement, monitor and revise the system as conditions change.',
      ]),
    ]),
    section('sectoral-use', 'Approximate sectoral use stated in the notes', [
      table(['Sector', 'Approximate share'], [
        ['Agriculture', '80–85%'],
        ['Domestic', '5–7%'],
        ['Industry', '8–10%'],
      ]),
      p('Note: these are approximate figures quoted in the supplied notes; they should not be treated as a universal or current national inventory.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Integrated planning balances supply and demand, reduces conflicts and protects water resources for future generations.'),
    ]),
  ], ['Water-resource planning', 'Demand assessment', 'Water allocation']),
  answer('21cv654-4-c-', 'needs-source-review', [
    section('importance', 'Agriculture and water use', [
      p('The supplied notes identify agriculture as the largest water-consuming sector in India and estimate its share at approximately 80–85% of total water use. Water is required for crop growth and related farm activities.'),
    ]),
    section('efficiency', 'Water-efficiency measures supported by the notes', [
      list([
        'Improve irrigation scheduling according to crop and soil-water needs.',
        'Use drip irrigation to deliver water near the root zone where suitable.',
        'Use sprinkler irrigation where it is appropriate for the crop and field conditions.',
        'Reduce conveyance and field losses and maintain irrigation infrastructure.',
        'Harvest and store rainwater for use during dry periods.',
      ]),
    ]),
    section('source-gap', 'Source limitation', [
      note('The existing source audit says the notes establish agriculture’s dominant share and the need for efficient irrigation, but do not provide a sufficiently detailed comparison of all irrigation methods. This draft is therefore not marked complete for five marks.', 'gap'),
    ]),
  ], ['Agricultural water use', 'Irrigation efficiency', 'Drip irrigation', 'Sprinkler irrigation'], 'The supplied notes provide only partial support for detailed agricultural water-use methods and comparisons. Manual source review or an additional approved reference is required before this answer can be marked complete.'),
  answer('dec-jan-2026-q3-a', 'draft-needs-pdf-review', [
    section('distribution', 'Distribution of global water resources', [
      p('Water covers most of the Earth, but nearly all of it is saline. Only a small fraction is freshwater, and much of that is frozen or stored underground.'),
      table(['Water store', 'Approximate share'], [
        ['Saline water', 'About 97.5% of all Earth water'],
        ['Freshwater', 'About 2.5% of all Earth water'],
        ['Glaciers and ice caps', 'About 68.7% of freshwater'],
        ['Groundwater', 'About 30.1% of freshwater'],
        ['Surface freshwater', 'About 1.2% of freshwater'],
      ]),
    ]),
    section('importance', 'Importance and availability', [
      list([
        'Water is essential for drinking, sanitation, agriculture, industry and ecosystem functioning.',
        'Only a very small portion of global freshwater is readily accessible in rivers and lakes.',
        'Freshwater is unevenly distributed by region and season, creating water stress in many areas.',
        'Pollution, over-extraction, population growth and climate change place additional pressure on available supplies.',
      ]),
    ]),
    section('conservation', 'Conservation measures', [
      list([
        'Protect watersheds and wetlands and prevent water pollution.',
        'Harvest rainwater and recharge groundwater.',
        'Improve irrigation efficiency and reduce leakage in distribution systems.',
        'Treat and safely reuse wastewater where suitable.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Although water circulates through the hydrological cycle, accessible freshwater is limited. Conservation and equitable management are essential.'),
    ]),
  ], ['Global water resources', 'Freshwater distribution', 'Water conservation'], 'The repository contains a topic summary rather than the exact December 2025/January 2026 question wording. This answer addresses the recorded topic; compare the original paper before academic sign-off.'),
  answer('dec-jan-2026-q3-b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of inter-basin water transfer', [
      p('Inter-basin water transfer is the planned movement of water from one river basin to another through canals, tunnels, pipelines, reservoirs or link channels, generally to improve water availability in deficit areas.'),
    ]),
    section('objectives', 'Objectives', [
      list([
        'Reduce regional differences in water availability.',
        'Supply irrigation water to drought-prone regions.',
        'Improve drinking-water and industrial-water supply where local resources are insufficient.',
        'Support hydropower and, where properly designed, flood moderation.',
      ]),
    ]),
    section('india', 'Indian context and example', [
      p('The National Water Development Agency has studied potential river links under the National Perspective Plan. The supplied model-paper notes identify Mahanadi and Godavari as comparatively surplus basins and Krishna, Pennar, Cauvery and Vaigai as deficit basins. A proposed example is the Godavari (Inchampalli)–Krishna (Pulichintala) link.'),
    ]),
    section('issues', 'Benefits and limitations', [
      list([
        'May improve seasonal water distribution, irrigation and drought resilience.',
        'Large dams and canals may submerge forests, disturb river ecology and affect deltas.',
        'Projects can displace communities and require rehabilitation.',
        'Construction and maintenance costs are high, and inter-state water-sharing agreements can be difficult.',
        'A surplus in one year is not guaranteed in every year, especially under climate variability.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Inter-basin transfer is one water-management option, not a replacement for local conservation. It requires basin studies, environmental assessment, public participation and fair agreements.'),
    ]),
  ], ['Inter-basin transfer', 'River linking', 'Water management'], 'The repository contains a topic summary rather than the exact December 2025/January 2026 question wording. This answer addresses the recorded topic; compare the original paper before academic sign-off.')

