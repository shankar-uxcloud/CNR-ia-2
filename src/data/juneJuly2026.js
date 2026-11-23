export const EXAM_META = {
  title: 'June/July 2026',
  code: 'BCV755B',
  subject: 'Conservation of Natural Resources',
  semester: '7th Semester B.E./B.Tech.',
  scheme: 'CBCS',
  duration: '3 Hours',
  marks: 100,
  instruction: 'Answer any FIVE full questions, choosing ONE full question from each module.',
};

export const EXAM_MODULES = [
  { id: 1, title: 'Land and Soil', questions: [1, 2] },
  { id: 2, title: 'Water Resources', questions: [3, 4] },
  { id: 3, title: 'Air and Air Pollution', questions: [5, 6] },
  { id: 4, title: 'Biodiversity and Ecosystem', questions: [7, 8] },
  { id: 5, title: 'Global Warming and EIA', questions: [9, 10] },
];

const section = (heading, points) => ({ heading, points });
const answer = (id, question, module, title, intro, sections, conclusion, source, diagram = null) => ({
  id, question, module, title, marks: 10, intro, sections, conclusion, source, diagram,
});

export const EXAM_ANSWERS = [
  answer('q1a','Q1(a)',1,'Conservation of Land and Types of Land',
    'The supplied notes do not give a separate one-line formal definition of conservation of land. Based on their discussion of land as a finite resource and the conservation of landforms, it can be described as the planned and careful use, protection and management of land so that its productive capacity and ecological functions are maintained for present and future generations.',
    [
      section('Importance of conserving land',[
        'Land provides habitats for plants and animals and helps regulate climate, water cycles and air quality.',
        'It supports agriculture, forests, minerals, infrastructure and human settlements.',
        'Proper management prevents erosion, degradation, loss of fertile topsoil and damage to natural landforms.'
      ]),
      section('Different types of land',[
        'Arable land: land suitable for cultivation and ploughing. Its productivity depends on soil fertility, water availability and climate.',
        'Forest land: land covered by trees and woody vegetation. It supports biodiversity, timber production, carbon storage, erosion control and watershed health.',
        'Pasture and grazing land: grass-dominated land used mainly for grazing livestock; important to pastoral livelihoods, particularly in semi-arid and mountainous regions.',
        'Barren and wasteland: land with little agricultural or forestry productivity, including deserts, rocky areas, high mountains and severely degraded land. Some degraded areas may be reclaimed.',
        'Urban and industrial land: land used for residential settlements, commercial activity, factories, roads, airports and other infrastructure. Expansion can put pressure on farmland and forests.'
      ]),
      section('Methods of land conservation',[
        'Control erosion by contour ploughing, terracing, afforestation and reforestation.',
        'Protect riverbanks and coastal dunes using vegetation and suitable stabilization measures.',
        'Adopt watershed management to coordinate land and water use and reduce sediment flow.',
        'Use land-capability classification, zoning and sustainable land-use planning to match each area with a suitable use.'
      ])
    ],
    'Land conservation maintains soil productivity, ecological balance and livelihoods. Scientific planning and responsible use are essential because land is a limited resource.',
    'BCV755B Full Notes, PDF pp. 2–4 and 12–13: “Land as a Resource”, “Types of Land”, “Conservation of Landforms” and “Sustainable Land Use Planning”.',
    'land'),

  answer('q1b','Q1(b)',1,'Ecological and Economic Importance of Soil',
    'Soil is a living natural resource formed from mineral matter, organic matter, water and air. Healthy soil functions as an ecosystem and supports plants, animals and human beings.',
    [
      section('Ecological importance',[
        'Nutrient cycling: decomposers break down organic matter and release nutrients that plants absorb. This supports terrestrial food chains.',
        'Water regulation and purification: soil absorbs and stores water, filters it as it percolates and supports groundwater recharge. Water storage also helps reduce floods and sustain ecosystems during dry periods.',
        'Carbon sequestration: soil stores large quantities of carbon, particularly in organic matter, and therefore contributes to climate regulation.',
        'Habitat for biodiversity: soil supports bacteria, fungi, earthworms, insects and other organisms that decompose material, cycle nutrients and improve soil structure.',
        'Plant support: soil anchors roots and supplies water, air and nutrients needed for plant growth.'
      ]),
      section('Economic importance',[
        'Agriculture and food production: fertile soil is the basic medium for crop growth and provides water and nutrients required for production.',
        'Foundation for infrastructure: buildings, roads and other structures depend on the stability and load-bearing capacity of soil.',
        'Raw materials: soil provides clay for pottery and bricks, sand for construction and other useful materials.',
        'Livelihoods: productive soil supports farmers, forestry, grazing and related economic activities.'
      ]),
      section('Maintaining soil health',[
        'Maintain organic matter and soil biological activity.',
        'Prevent erosion and compaction and manage irrigation to avoid salt accumulation.',
        'Avoid harmful contamination and use land according to its capability.'
      ])
    ],
    'Soil is essential to ecosystem functioning and economic development. Conserving soil health protects food production, water resources, biodiversity and infrastructure.',
    'BCV755B Full Notes, PDF pp. 10–12: “Soil Health” and “Ecological and Economic Importance of Soil”.'),

  answer('q2a','Q2(a)',1,'Impact of Soil Degradation on Agriculture and Food Security',
    'Soil degradation is the decline in soil quality and productivity due to improper management. It reduces the ability of land to support crops and threatens a stable food supply.',
    [
      section('Major forms and their agricultural effects',[
        'Soil erosion: wind and water remove fertile topsoil. The loss of the nutrient-rich upper layer reduces crop yields and may cause sedimentation in rivers and reservoirs.',
        'Soil compaction: heavy machinery and intensive tillage reduce pore spaces and aeration. Roots cannot grow normally, water infiltration decreases and plant health suffers.',
        'Salinization and alkalinization: salts accumulate, often due to improper irrigation in dry regions. High salt levels are harmful to crops and can make land unproductive.',
        'Chemical contamination: pesticides, herbicides, heavy metals and industrial waste introduce toxic substances into soil. They can contaminate crops and the food chain and may make land unsuitable for cultivation.',
        'Loss of organic matter: continuous cropping without replenishment depletes soil fertility, water-holding capacity and beneficial microorganisms.'
      ]),
      section('Effects on food security',[
        'Reduced crop yield lowers the quantity of food produced from agricultural land.',
        'Lower soil fertility and poor plant growth can reduce the nutritional quality of food.',
        'Farmers may need more fertilizers and pesticides, increasing production costs and reducing income.',
        'Declining production can increase food prices, create supply instability and increase vulnerability to food shortages.',
        'Degraded land becomes less resilient to drought and heavy rainfall, making agricultural output less reliable.'
      ]),
      section('Control and prevention',[
        'Use soil-conservation practices such as contour farming, terracing and vegetation cover to reduce erosion.',
        'Improve irrigation and drainage to prevent salinity and waterlogging.',
        'Add organic matter and adopt suitable crop and land-management practices.',
        'Prevent chemical pollution through careful input use and safe disposal of industrial waste.'
      ])
    ],
    'Soil degradation reduces agricultural productivity and weakens food security. Preventing degradation and restoring soil health are necessary for sustainable farming.',
    'BCV755B Full Notes, PDF pp. 11–12: “Impact of Soil Degradation on Agriculture and Food Security” and “Need for Soil Conservation”.'),

  answer('q2b','Q2(b)',1,'Principles of Sustainable Land Use Planning',
    'Sustainable land-use planning is a systematic process of managing land resources to balance economic development, social equity and environmental protection. It meets present needs without compromising the ability of future generations to meet their needs.',
    [
      section('Principles',[
        'Integration: consider environmental, economic and social factors together rather than planning for one objective in isolation.',
        'Multi-stakeholder participation: involve government agencies, local communities, businesses and environmental groups in planning and decisions.',
        'Long-term perspective: consider future generations, cumulative impacts and long-term land productivity instead of only immediate gains.',
        'Adaptive management: monitor land-use outcomes and revise plans when new information or changing conditions require it.'
      ]),
      section('Key steps and tools',[
        'Land-capability classification: classify land according to suitability for different uses by considering soil type, slope and climate.',
        'Zoning and land-use regulations: designate suitable areas for agriculture, housing, industry and conservation to prevent conflicting uses and uncontrolled development.',
        'Integrated watershed management: plan land and water use across a watershed to minimize erosion and maintain water quality.',
        'Agroforestry: integrate trees and shrubs with farming to improve soil health, biodiversity and crop yields.'
      ]),
      section('Expected outcomes',[
        'Protection of fertile agricultural land and ecologically sensitive areas.',
        'Reduced land degradation, erosion and conflicts between competing land uses.',
        'More efficient use of land and water and improved long-term community livelihoods.'
      ])
    ],
    'Sustainable land-use planning combines scientific assessment, stakeholder participation and long-term monitoring. It helps maintain productive land while protecting ecosystems.',
    'BCV755B Full Notes, PDF p. 13: “Sustainable Land Use Planning”.'),

  answer('q3a','Q3(a)',2,'Water-Deficit and Water-Surplus Basins of India',
    'A water-surplus basin has water availability greater than its assessed requirements, while a water-deficit basin has insufficient water to meet its needs. In India, water availability varies greatly by region and season because rainfall and river flows are unevenly distributed.',
    [
      section('Water-surplus basins',[
        'The notes identify the Mahanadi and Godavari basins as generally water-surplus.',
        'The Mahanadi surplus is estimated in the notes at about 22,058 Mm³ at the proposed Manibhadra dam site.',
        'The Godavari surplus is estimated at about 15,852 Mm³ at the proposed Polavaram dam site.',
        'Surplus flows, especially during the monsoon, may coexist with flood conditions and cannot automatically be treated as freely transferable water.'
      ]),
      section('Water-deficit basins',[
        'The Krishna basin is identified as a major deficit basin in Peninsular India.',
        'The Pennar basin experiences water shortage and may require transfers from surplus basins.',
        'The Cauvery basin faces water shortages and is included among the deficit basins.',
        'The Vaigai basin is also identified as water-deficit.'
      ]),
      section('Issues and management',[
        'Deficits affect irrigation, drinking-water supply and overall water-resource management.',
        'The National Water Development Agency has identified possible inter-basin links under the National Perspective Plan.',
        'One example in the notes is the Godavari (Inchampalli)–Krishna (Pulichintala) link.',
        'Water transfers require agreement among states and careful consideration of ecological effects, rehabilitation, cost and existing water rights.'
      ])
    ],
    'The contrast between surplus and deficit basins is a major water-management challenge. Basin planning, conservation, efficient irrigation and carefully assessed transfers can help address regional imbalance.',
    'BCV755B Full Notes, PDF pp. 17–20: “Water Deficit and Water Surplus Basins in India” and “Inter-basin Water Transfer”.',
    'basins'),

  answer('q3b','Q3(b)',2,'Global Water Resources and Indian Water Resources',
    'Water is abundant on Earth, but readily available freshwater is limited. The distribution of water is uneven globally and within India, making conservation and proper management essential.',
    [
      section('Global water resources',[
        'About 97.5% of the Earth’s water is saline and is mainly present in oceans.',
        'Freshwater forms only about 2.5% of total water.',
        'Of freshwater, about 68.7% is stored in glaciers and ice caps, about 30.1% as groundwater and about 1.2% as surface freshwater such as rivers, lakes and swamps.',
        'Only a small portion is readily accessible for direct human use; therefore, freshwater conservation is important.'
      ]),
      section('Indian water resources',[
        'India’s water resources depend strongly on the hydrological cycle, particularly annual monsoon rainfall.',
        'The notes estimate annual precipitation at about 4,000 billion cubic metres (BCM).',
        'Not all precipitation can be used. Utilizable surface water is about 690 BCM and utilizable groundwater is approximately 398 BCM, as stated in the notes.',
        'Water distribution is uneven. The Ganga and Brahmaputra basins have relatively abundant water, while parts of southern and western India face recurring scarcity.'
      ]),
      section('Water-use sectors in India',[
        'Agriculture uses the largest share, approximately 80–85% in the notes. Drip and sprinkler irrigation can improve efficiency compared with wasteful flood irrigation.',
        'Domestic use accounts for around 5–7% and includes drinking, cooking and sanitation. Demand rises with population growth and urbanization.',
        'Industrial use accounts for approximately 8–10%, including manufacturing and power generation. Industrial effluents can also pollute water sources.'
      ])
    ],
    'Although global and Indian water resources are substantial in total, accessible freshwater is limited and unevenly distributed. Efficient use, pollution prevention and groundwater recharge are essential.',
    'BCV755B Full Notes, PDF pp. 14–17: “Global Water Resources”, “Indian Water Resources” and “Water Use Sectors”.',
    'water'),

  answer('q4a','Q4(a)',2,'Himalayan and Peninsular Components of the National River Linking Project',
    'The National River Linking Project (NRLP) is a proposed large-scale engineering project intended to connect major rivers through canals and reservoirs. Its central objective is to transfer water from water-surplus basins to water-deficit basins.',
    [
      section('1. Himalayan component',[
        'It focuses on rivers of northern and eastern India, particularly the Ganga and Brahmaputra and their tributaries.',
        'The proposal involves dams and storage reservoirs to capture monsoon flows.',
        'Stored water would be conveyed through canals to deficit areas, including parts of Rajasthan and Gujarat, according to the notes.',
        'Expected objectives include additional irrigation, hydropower generation and flood mitigation.'
      ]),
      section('2. Peninsular component',[
        'It deals with rivers of southern India.',
        'The proposal is to transfer surplus water from east-flowing rivers such as the Mahanadi and Godavari towards water-scarce basins such as the Krishna, Pennar and Cauvery.',
        'The intended benefits are more reliable irrigation for rain-fed regions and addressing regional water shortages.'
      ]),
      section('Issues involved',[
        'Environmental concerns: dams and canals may submerge forests, destroy habitats and alter river, delta and coastal ecosystems.',
        'Displacement and rehabilitation: reservoirs may displace tribal and rural communities and affect traditional livelihoods.',
        'High financial cost: construction and long-term maintenance of dams, canals and related infrastructure require very large investment.',
        'Inter-state disputes: states may disagree over the quantity, timing and conditions of water sharing. Agreement among the concerned states is a major challenge.'
      ])
    ],
    'The Himalayan and Peninsular components seek to address regional water imbalance, but their social, environmental, financial and inter-state consequences require careful evaluation.',
    'BCV755B Full Notes, PDF pp. 19–20: “Interlinking of Rivers”, “Himalayan Component”, “Peninsular Component” and “Issues Involved”.',
    'river'),

  answer('q4b','Q4(b)',2,'Sea Water Ingress: Problems and Solutions',
    'Sea water ingress is the intrusion of saltwater from the ocean into freshwater aquifers in coastal regions. It occurs when the natural balance between freshwater and seawater is disturbed.',
    [
      section('Mechanism of ingress',[
        'Freshwater is less dense than seawater and forms a freshwater lens that floats above the denser saltwater in a coastal aquifer.',
        'The freshwater lens exerts pressure that normally helps prevent seawater from moving inland.',
        'Excessive pumping from wells near the coast lowers the freshwater table and reduces this pressure.',
        'Saltwater can then move inland and upward into the aquifer, contaminating wells.'
      ]),
      section('Problems caused',[
        'Wells become saline and water may become unfit for drinking, agriculture and industrial use.',
        'Salt accumulation can reduce agricultural productivity and render coastal land unproductive.',
        'Contamination threatens the water security of coastal communities and increases the difficulty of obtaining freshwater.'
      ]),
      section('Solutions',[
        'Controlled groundwater extraction: regulate pumping through permits, monitoring of water levels and withdrawal limits, especially during dry seasons.',
        'Artificial recharge: replenish aquifers with freshwater through recharge wells, pits and surface-spreading basins to maintain the freshwater level and hydraulic pressure.',
        'Subsurface barriers: construct physical barriers such as slurry walls or grout curtains where suitable to restrict seawater movement.',
        'Managed aquifer recharge (MAR): combine planned methods of adding water to aquifers and managing the water table to prevent landward movement of the saltwater interface.'
      ])
    ],
    'Sea water ingress is mainly associated with excessive coastal groundwater extraction. Controlling pumping and maintaining freshwater recharge are central to preventing saline intrusion.',
    'BCV755B Full Notes, PDF p. 22: “Sea Water Ingress: Problems and Solutions”.',
    'ingress'),

  answer('q5a','Q5(a)',3,'Air Pollution: Sources and Classification of Air Pollutants',
    'Air pollution is the contamination or alteration of the atmosphere by unwanted and harmful substances that can affect living organisms and the environment. Air pollutants may be released directly or formed in the atmosphere.',
    [
      section('Sources of air pollutants',[
        'Natural sources: volcanoes release sulphur dioxide, hydrogen sulphide and ash; forest fires release smoke, carbon monoxide and nitrogen oxides; dust storms add particulate matter; biological decay in swamps and marshes releases methane.',
        'Anthropogenic sources: industrial processes and power plants emit gases and particles; vehicles release carbon monoxide, nitrogen oxides, hydrocarbons and particulate matter; thermal power plants burning fossil fuels release sulphur dioxide, nitrogen oxides and fly ash; agricultural activities may release ammonia and other chemicals.'
      ]),
      section('Classification based on origin',[
        'Primary pollutants: emitted directly into the atmosphere from a source. Examples given in the notes include carbon monoxide (CO), carbon dioxide (CO₂), sulphur dioxide (SO₂), nitrogen oxides (NOx) and particulate matter.',
        'Secondary pollutants: formed in the atmosphere by chemical reactions involving primary pollutants and other atmospheric components. Ground-level ozone (O₃), formed through reactions involving NOx and volatile organic compounds in sunlight, is an example.'
      ]),
      section('Classification based on physical state',[
        'Gaseous pollutants: pollutants present in gaseous form, such as CO, SO₂, NOx and hydrocarbons.',
        'Particulate pollutants: suspended solid particles or liquid droplets. The notes describe PM10 as particles with diameter of 10 micrometres or less and PM2.5 as particles with diameter of 2.5 micrometres or less.'
      ])
    ],
    'Air pollutants arise from both natural and human activities. Classifying them by origin and physical state helps identify sources and select appropriate control measures.',
    'BCV755B Full Notes, PDF pp. 23–25: “Sources and Classification of Air Pollutants”.'),

  answer('q5b','Q5(b)',3,'Effects of Air Pollution on Human Health and the Economy',
    'Air pollution affects human health and causes economic losses. The severity depends on the pollutant, its concentration and the duration of exposure.',
    [
      section('Effects on human health',[
        'Respiratory system: PM2.5, SO₂ and NO₂ can penetrate deep into the lungs and contribute to asthma, bronchitis and chronic obstructive pulmonary disease (COPD).',
        'Cardiovascular system: particulate matter can enter the bloodstream and cause inflammation, increasing the risk of heart attacks, strokes and irregular heartbeat.',
        'Nervous system: lead exposure can harm the nervous system, particularly in children, and affect development and cognitive function.',
        'Cancer: long-term exposure to pollutants such as benzene and polycyclic aromatic hydrocarbons (PAHs) is linked with increased cancer risk.'
      ]),
      section('Economic effects',[
        'Healthcare costs: respiratory and cardiovascular illness increases medical expenses, hospital bills and treatment costs.',
        'Loss of productivity: illness and premature absence from work reduce workforce productivity and economic output.',
        'Agricultural losses: ground-level ozone can damage crops, reduce yield and quality, and affect farmers’ income and food security.',
        'Damage to buildings and materials: acid rain associated with SO₂ and NOx accelerates corrosion of buildings, bridges and statues, increasing maintenance and repair costs.',
        'Tourism impacts: poor air quality reduces the attractiveness of landscapes and heritage sites and can affect tourism-related income.'
      ]),
      section('Control measures',[
        'Reduce emissions at source through cleaner fuels, improved combustion and pollution-control equipment.',
        'Use suitable particulate-control devices such as electrostatic precipitators, cyclone separators, fabric filters and wet scrubbers.',
        'Control gaseous pollutants through absorption, adsorption and catalytic converters where appropriate.'
      ])
    ],
    'Air pollution creates serious health burdens and economic costs. Prevention at source and effective emission-control systems protect people, agriculture and infrastructure.',
    'BCV755B Full Notes, PDF p. 26 and pp. 27–29: “Effects of Air Pollution”, “Economic Effects” and “Control of Air Pollution by Equipment”.'),

  answer('q6a','Q6(a)',3,'Air-Pollution-Control Equipment and Bag Filter',
    'Air-pollution-control equipment captures particulate matter or removes gaseous pollutants from industrial exhaust before the cleaned gas is released. The choice of equipment depends on the pollutant type, particle size and concentration.',
    [
      section('Major air-pollution-control equipment',[
        'Electrostatic precipitator (ESP): uses an electric field to charge particles and attract them to collection plates. The plates are periodically rapped so dust falls into a hopper.',
        'Cyclone separator: uses centrifugal force. Dust-laden gas enters a cylindrical chamber at high velocity; heavier particles move towards the wall and fall into a hopper while cleaner gas exits at the top.',
        'Fabric filter or baghouse: passes polluted gas through woven fabric bags. Dust is trapped on the bag surface and cleaned gas passes through the fabric.',
        'Wet scrubber: brings polluted gas into contact with liquid droplets that capture particles and, with suitable liquid chemistry, some gaseous pollutants.',
        'Absorption: transfers soluble gaseous pollutants from the gas stream into a liquid; the notes give SO₂ absorption using lime solution as an example.',
        'Adsorption: traps gas molecules on the surface of a porous solid such as activated carbon.',
        'Catalytic converter: uses catalysts such as platinum, palladium and rhodium to convert CO, NOx and hydrocarbons into less harmful products.'
      ]),
      section('Working of a bag filter',[
        'Dust-laden gas is directed into a housing containing a number of fabric filter bags.',
        'As the gas passes through the woven fabric, dust particles are retained on the outer surface of the bags.',
        'The cleaned gas passes through the fabric and leaves the filter unit through the clean-gas outlet.',
        'Accumulated dust is periodically removed from the bags and collected in a hopper for disposal or handling.',
        'The fabric filter is effective for a wide range of particle sizes, including fine particles.'
      ])
    ],
    'Baghouse filters remove particulate matter by passing dust-laden gas through fabric bags. They are widely useful where efficient collection of fine dust is required.',
    'BCV755B Full Notes, PDF pp. 27–29: “Control of Air Pollution by Equipment” and “Fabric Filter (Baghouse Filter)”. The notes describe the operating principle but do not assign a numbered figure to a bag-filter sketch.',
    'bag'),

  answer('q6b','Q6(b)',3,'Causes and Impacts of Ozone Depletion',
    'Ozone depletion is the thinning of the protective ozone layer in the stratosphere, approximately 10 to 50 kilometres above Earth. Stratospheric ozone absorbs most of the Sun’s harmful ultraviolet radiation.',
    [
      section('Causes and mechanism',[
        'Chlorofluorocarbons (CFCs), formerly used in aerosols, refrigerants and solvents, are important ozone-depleting substances.',
        'CFC molecules are stable in the lower atmosphere and gradually reach the stratosphere.',
        'Strong ultraviolet radiation breaks down CFC molecules and releases reactive chlorine atoms.',
        'Chlorine reacts with ozone: Cl + O₃ → ClO + O₂.',
        'Chlorine monoxide reacts with a free oxygen atom: ClO + O → Cl + O₂. The chlorine atom is regenerated and can destroy more ozone molecules through repeated reactions.'
      ]),
      section('Impacts of ozone depletion',[
        'More harmful UV-B radiation reaches Earth’s surface.',
        'Human health: increased UV exposure raises the risk of skin cancer, cataracts and immune-system damage.',
        'Marine ecosystems: UV radiation can harm phytoplankton, which form the base of marine food webs, disrupting ocean ecosystems.',
        'Plants and crops: UV can damage plant DNA and affect photosynthesis, reducing crop yields and harming forests.',
        'Materials: plastics and paints may degrade more rapidly under increased UV exposure.'
      ]),
      section('Control',[
        'International cooperation and agreements are needed to control ozone-depleting substances.',
        'The notes identify the Montreal Protocol as an agreement that phased out CFC production and contributed to the slow recovery of the ozone layer.'
      ])
    ],
    'Ozone depletion allows more harmful ultraviolet radiation to reach the surface and affects human health, plants and marine life. Phasing out ozone-depleting substances is essential.',
    'BCV755B Full Notes, PDF pp. 30–31: “Ozone Depletion”, “Mechanism of Ozone Depletion” and “Consequences of Ozone Depletion”.',
    'ozone'),

  answer('q7a','Q7(a)',4,'Biodiversity and Its Importance',
    'Biodiversity is the variety of life on Earth at all levels, from genes to ecosystems. It includes genetic variation within species, diversity among species and the ecosystems formed by living organisms. Flora refers to plant life and fauna refers to animal life in a region.',
    [
      section('Importance of biodiversity',[
        'Ecological balance and resilience: diverse ecosystems are generally more stable and resilient to disturbances and environmental change.',
        'Nutrient cycling: decomposers such as bacteria and fungi break down organic matter and return nutrients such as nitrogen and phosphorus to the soil.',
        'Pollination: insects, birds and other animals pollinate plants, supporting fruit and seed production and many crops.',
        'Natural pest control: predators and parasites help regulate pest populations and can reduce dependence on chemical pesticides.',
        'Medicinal plants and drugs: plants, animals and microorganisms provide materials used in medicines. The notes give taxol from the Pacific yew tree as an example.',
        'Fisheries and food: diverse marine ecosystems provide food and livelihoods for millions of people.',
        'Biogeochemical cycling: organisms contribute to cycling carbon, nitrogen and phosphorus through ecosystems.',
        'Livelihood and resource value: biodiversity supports useful biological resources and ecosystem services on which communities and economic activities depend.'
      ]),
      section('Conservation approaches',[
        'In-situ conservation protects species in their natural ecosystems, for example through national parks, wildlife sanctuaries and biosphere reserves.',
        'Ex-situ conservation protects species outside their natural habitats through zoological gardens, gene banks, seed banks and pollen culture.'
      ])
    ],
    'Biodiversity supports ecological processes, food, medicine and livelihoods. Its conservation is necessary for ecosystem stability and human well-being.',
    'BCV755B Full Notes, PDF pp. 32–34 and 38–40: “Biodiversity”, “Importance of Biodiversity” and “Conservation of Biodiversity”.'),

  answer('q7b','Q7(b)',4,'Ecological Restoration for Conservation of Biodiversity',
    'Ecological restoration is the process of assisting the recovery of an ecosystem that has been degraded, damaged or destroyed. The aim is to return it to its original condition or to a healthy, self-sustaining state.',
    [
      section('Need for ecological restoration',[
        'Habitat destruction and fragmentation reduce available living space and isolate wildlife populations.',
        'Pollution of air, water and soil damages organisms and ecosystem processes.',
        'Deforestation, overexploitation and invasive species disturb ecological balance.',
        'Restoration helps recover habitats, ecological interactions and the services provided by ecosystems.'
      ]),
      section('Restoration measures',[
        'Reforestation and native vegetation planting: re-establish tree and plant cover in degraded forest areas and help restore habitat and soil protection.',
        'Wetland restoration: restore water conditions and vegetation in wetlands so they can again provide habitat, filter water and reduce flood impacts.',
        'Pollution clean-up: remove or reduce contaminants from damaged land and water before native communities can recover.',
        'Habitat rehabilitation: reconnect fragmented habitats where possible and improve conditions for species to move, feed and reproduce.',
        'Social forestry: manage and protect forests for local community needs such as fuel, fodder and timber while encouraging forest conservation.',
        'Community involvement: include local communities in protection and management so restored ecosystems are maintained over time.'
      ]),
      section('Benefits for biodiversity',[
        'Restores habitats for native plants, animals and microorganisms.',
        'Improves ecological interactions and the functioning of food webs.',
        'Supports ecosystem services such as nutrient cycling, water regulation and soil protection.',
        'Helps conserve species and improve the long-term resilience of ecosystems.'
      ])
    ],
    'Ecological restoration supports biodiversity by helping damaged ecosystems recover their habitats and functions. Long-term success requires suitable restoration methods and continued protection.',
    'BCV755B Full Notes, PDF pp. 35–40: “Threats to Biodiversity”, “Ecological Restoration” and “Social Forestry”.',
    'restoration'),

  answer('q8a','Q8(a)',4,'Ecosystem and Different Types of Ecosystem',
    'An ecosystem is a community of living organisms (biotic components) interacting with one another and with their non-living environment (abiotic components). Ecosystems may be terrestrial or aquatic and are classified by their dominant physical and biological features.',
    [
      section('Major types of ecosystems',[
        'Forest ecosystem: characterized by dense growth of trees and associated plants and animals. Forests support biodiversity and influence climate, soil and water processes.',
        'Grassland ecosystem: dominated by grasses and other non-woody plants. It supports grazing animals and organisms adapted to open habitats.',
        'Marine ecosystem: includes oceans, seas and coral reefs. It contains saltwater habitats and supports diverse aquatic organisms.',
        'Desert ecosystem: receives very low rainfall and often experiences extreme temperatures. Its plants and animals have adaptations for water scarcity.',
        'Wetland ecosystem: land remains saturated or flooded for part or all of the year. Examples include swamps, marshes, bogs and mangroves. Wetlands filter water, provide breeding habitats and absorb excess water during floods.',
        'Estuarine ecosystem: a transition zone where river freshwater mixes with ocean saltwater. It is nutrient-rich, supports nursery habitats for fish and shellfish and helps protect coastlines.',
        'Lotic ecosystem: flowing-water systems such as rivers, streams and creeks. Moving water is often oxygen-rich and supports organisms adapted to currents.',
        'Lentic ecosystem: standing-water systems such as lakes, ponds and reservoirs. They support aquatic plants, fish, amphibians and birds.'
      ]),
      section('Functional basis',[
        'Producers capture energy, mainly through photosynthesis.',
        'Consumers obtain energy by feeding on plants or other organisms.',
        'Decomposers break down dead organic matter and return nutrients to the environment.',
        'Abiotic factors such as sunlight, water, soil, air, temperature and nutrients influence ecosystem structure and function.'
      ])
    ],
    'Ecosystems differ in their climate, water conditions and dominant organisms, but all depend on interactions between biotic and abiotic components.',
    'BCV755B Full Notes, PDF pp. 40–45: “Ecosystem” and “Types of Ecosystems”.',
    'ecosystem'),

  answer('q8b','Q8(b)',4,'Forest and Lotic Ecosystems; Biotic and Abiotic Components',
    'Forest ecosystems are terrestrial ecosystems dominated by trees, while lotic ecosystems are aquatic ecosystems in which water flows continuously. Every ecosystem contains living (biotic) and non-living (abiotic) components that interact.',
    [
      section('i) Forest ecosystem',[
        'A forest ecosystem is characterized by dense growth of trees and associated vegetation, animals and microorganisms.',
        'Plants form the producer level and provide food and habitat for herbivores, carnivores and decomposers.',
        'Forests support biodiversity, protect soil, regulate water and store carbon.',
        'Forest conservation helps maintain ecological balance and the livelihoods that depend on forest resources.'
      ]),
      section('i) Lotic ecosystem',[
        'Lotic ecosystems include rivers, streams and creeks where water is continuously moving.',
        'Water movement generally promotes oxygenation, and the habitat supports species adapted to flowing currents, such as trout and mayflies as examples in the notes.',
        'These ecosystems supply freshwater for drinking, agriculture and industry.',
        'They can support fish migration routes and connect habitats along river systems.'
      ]),
      section('ii) Abiotic components',[
        'Sunlight: primary energy source for most ecosystems; it drives photosynthesis.',
        'Water: essential for life processes and influences which organisms can survive.',
        'Soil: provides physical support for plants and stores water and nutrients.',
        'Air: supplies oxygen for respiration and carbon dioxide for photosynthesis.',
        'Temperature: affects metabolism, growth and survival.',
        'Nutrients: elements such as nitrogen, phosphorus and potassium are cycled through ecosystems.'
      ]),
      section('ii) Biotic components',[
        'Producers (autotrophs): plants, algae and some bacteria make their own food, mainly through photosynthesis.',
        'Consumers (heterotrophs): organisms obtain energy by eating other organisms. Primary consumers are herbivores; secondary and tertiary consumers feed at higher trophic levels.',
        'Decomposers: mainly bacteria and fungi break down dead organic matter and wastes, returning nutrients to the ecosystem.'
      ])
    ],
    'Forest and lotic ecosystems have different physical settings, but both depend on the interaction of producers, consumers, decomposers and abiotic factors.',
    'BCV755B Full Notes, PDF pp. 40–46: “Forest”, “Lotic Ecosystems”, “Abiotic Components” and “Biotic Components”.',
    'biotic'),

  answer('q9a','Q9(a)',5,'Global Warming: Meaning, Causes and Effects',
    'Global warming is the long-term increase in Earth’s average surface temperature due to the accumulation of heat-trapping gases in the atmosphere. It is driven mainly by the enhanced greenhouse effect and contributes to broader climate change.',
    [
      section('Greenhouse effect',[
        'Sunlight enters the atmosphere and warms Earth’s surface.',
        'The surface releases heat, and greenhouse gases absorb and re-emit some of this outgoing heat.',
        'The natural greenhouse effect is essential for life, but increased concentrations of gases intensify heat retention and cause additional warming.',
        'The notes identify carbon dioxide (CO₂), methane (CH₄) and nitrous oxide (N₂O) among the important greenhouse gases.'
      ]),
      section('Causes of global warming',[
        'Natural factors: volcanic eruptions can temporarily cool Earth through reflective aerosols; solar variations and natural climate cycles influence climate but do not explain the current sustained warming trend in the notes.',
        'Burning fossil fuels: combustion of coal, oil and natural gas releases greenhouse gases, especially CO₂.',
        'Deforestation: fewer trees remain to absorb CO₂, while clearing and burning vegetation can release stored carbon.',
        'Industrial processes and agriculture: cement production, livestock farming and synthetic fertilizer use contribute greenhouse gases such as CO₂, CH₄ and N₂O.',
        'Waste management: decomposition of organic waste in landfills can release methane.'
      ]),
      section('Effects of global warming',[
        'Ecological: biodiversity loss, changed migration and breeding patterns and coral bleaching due to warmer oceans.',
        'Geophysical: melting glaciers and ice sheets, rising sea levels, permafrost thawing and more severe heatwaves, droughts, floods, cyclones and wildfires.',
        'Agricultural: changes in rainfall and temperature can disrupt crop yields and food security.',
        'Health: heat-related illness, vector-borne diseases and respiratory problems associated with poor air quality.',
        'Economic: damage to infrastructure, reduced productivity and higher disaster-recovery costs.'
      ])
    ],
    'Global warming is mainly associated with the increased concentration of greenhouse gases from human activities. Its effects extend to ecosystems, agriculture, health and the economy.',
    'BCV755B Full Notes, PDF pp. 47–50: “Global Warming and Climate Change”, “Factors (Causes)” and “Effects of Global Warming”.',
    'warming'),

  answer('q9b','Q9(b)',5,'Impact of Global Warming on Biodiversity',
    'Global warming changes temperature and precipitation patterns and disrupts habitats and ecological relationships. These changes threaten species survival and the functioning of ecosystems.',
    [
      section('Major impacts on biodiversity',[
        'Habitat disruption: changing temperature and rainfall can force species to move towards cooler regions, higher altitudes or deeper waters. The notes describe Himalayan alpine plants moving upslope, reducing the area of suitable habitat.',
        'Species extinction: species with narrow environmental tolerance or limited ability to move are at greater risk. The notes cite the Golden Toad of Costa Rica as believed to have become extinct partly due to climate-related habitat changes.',
        'Ecosystem shifts: warming oceans and acidification contribute to coral bleaching and can transform reef ecosystems, affecting marine biodiversity.',
        'Changes in migration and breeding: birds, fish and other wildlife may shift their natural seasonal cycles in response to changing temperatures.',
        'Loss of ecosystem services: degradation can reduce pollination, nutrient cycling and water purification, affecting human livelihoods and food production.'
      ]),
      section('Why species are vulnerable',[
        'Species depend on particular temperature, rainfall and habitat conditions.',
        'Rapid environmental change may occur faster than some organisms can adapt or migrate.',
        'Loss or fragmentation of suitable habitat can prevent species from moving to more favourable areas.',
        'Changes in one species can affect food chains and other species that depend on it.'
      ]),
      section('Conservation response',[
        'Protect and restore natural habitats and ecological corridors.',
        'Conserve biodiversity through in-situ and ex-situ approaches where appropriate.',
        'Reduce greenhouse-gas emissions and manage ecosystems to improve resilience.'
      ])
    ],
    'Global warming threatens biodiversity by changing habitats, increasing extinction risk and disrupting ecosystem services. Habitat conservation and climate action are both necessary.',
    'BCV755B Full Notes, PDF pp. 49–53: “Ecological Impacts”, “Impact on Biodiversity” and “Global Efforts in Biodiversity Conservation”.'),

  answer('q10a','Q10(a)',5,'Environmental Impact Assessment: Importance and Stages',
    'Environmental Impact Assessment (EIA) is a process used to identify, predict and evaluate the likely environmental and social impacts of a proposed project before approval. In India, the notes describe EIA as a statutory process governed by the EIA Notification, 2006, under the Environment (Protection) Act, 1986.',
    [
      section('Importance of EIA',[
        'Identifies potential adverse environmental, social and economic impacts before a project is implemented.',
        'Supports informed decision-making and helps authorities determine whether a project should receive environmental clearance.',
        'Identifies mitigation measures to avoid, reduce or manage negative impacts.',
        'Provides an opportunity for public consultation so affected communities can express concerns and suggestions.',
        'Promotes more environmentally responsible and sustainable project planning.'
      ]),
      section('Stages and process described in the notes',[
        'Screening and categorization: determine the project category and the level of assessment required. Category A projects require clearance from MoEFCC; Category B projects are considered by SEIAA, with B1 requiring a full EIA and B2 not requiring one according to the notes.',
        'EIA study and report: identify and assess likely impacts and prepare the environmental information required for appraisal.',
        'Public consultation: for most Category A and B1 projects, public hearing allows local communities and stakeholders to provide concerns and suggestions.',
        'Appraisal: the assessment and consultation findings are considered by the competent authority during evaluation.',
        'Environmental clearance decision: the authority decides on clearance and associated conditions or mitigation requirements.',
        'Post-clearance implementation and monitoring: environmental safeguards and clearance conditions need to be implemented and monitored.'
      ]),
      section('Status and challenges in India',[
        'The notes identify the EIA Notification, 2006 as the statutory framework.',
        'Concerns include the quality of EIA reports, effectiveness of public hearings and retrospective clearances for projects that began without valid environmental clearance.'
      ])
    ],
    'EIA is an important preventive planning tool. It supports environmental protection by identifying impacts early, involving the public and requiring mitigation before and during project implementation.',
    'BCV755B Full Notes, PDF p. 54: “EIA Regulations and Status in India”. The notes describe screening, categorization and public consultation; the staged summary above organizes the process described there and should not be read as a separately numbered list in the source.',
    'eia'),

  answer('q10b','Q10(b)',5,'Importance of EIA for a Thermal Power Plant',
    'A thermal power plant burns fuel to generate heat and produce electricity. The BCV755B notes identify thermal power plants as projects requiring environmental clearance under the EIA framework and describe EIA as a process for identifying and mitigating environmental, social and economic impacts before approval.',
    [
      section('Why EIA is important',[
        'Air-quality assessment: thermal power plants burning fossil fuels can emit sulphur dioxide (SO₂), nitrogen oxides (NOx) and particulate matter such as fly ash. EIA helps identify these emissions and the need for pollution-control measures.',
        'Water assessment: project planning must consider water requirements and the potential for impacts on surface water and groundwater.',
        'Land and ecosystem assessment: site development, ash handling and associated infrastructure may affect land, vegetation and habitats.',
        'Health and community assessment: emissions, waste and other project impacts can affect nearby communities and require suitable mitigation.',
        'Regulatory compliance: the notes list thermal power plants among projects requiring environmental clearance under the EIA Notification, 2006.',
        'Public participation: consultation helps affected communities communicate concerns that can be considered during appraisal.'
      ]),
      section('Mitigation and management measures',[
        'Install and operate suitable air-pollution-control equipment to control particulate emissions and other pollutants.',
        'Plan safe handling, storage and disposal or beneficial management of fly ash and other wastes.',
        'Manage water use and treat wastewater before discharge.',
        'Protect nearby habitats and provide suitable green-belt or site-management measures where required by the assessment.',
        'Monitor emissions and environmental conditions and comply with clearance conditions.'
      ]),
      section('Link to the source case study',[
        'The notes include a case study of the Sardar Sarovar hydroelectric project, not a thermal power plant. It demonstrates how EIA considers ecological, hydrological, seismic and socio-economic impacts and recommends mitigation such as compensatory afforestation, catchment-area treatment and rehabilitation and resettlement.',
        'For a thermal power plant, the same assessment logic is applied to the impacts relevant to that project type; the source notes do not provide a separate detailed thermal-plant case study.'
      ])
    ],
    'EIA helps a thermal power project identify pollution, resource-use and community impacts before approval and establish mitigation and monitoring measures. The provided notes list thermal plants as clearance-requiring projects but do not provide a detailed thermal-plant case study.',
    'BCV755B Full Notes, PDF pp. 24, 27–29 and 54–57: thermal power plant emissions, air-pollution-control equipment, EIA regulations, projects needing clearance and the hydroelectric case study. Thermal-specific impact details are limited in the supplied notes.')
];

export const EXAM_QUESTION_PAPER = [
  { module: 1, number: 1, parts: [
    { id:'q1a', label:'a', text:'Define Conservation of land. Explain different types of land.' },
    { id:'q1b', label:'b', text:'Discuss the ecological and economic importance of soil.' },
  ], alternative: [
    { id:'q2a', label:'a', text:'Explain the impact of soil degradation on agriculture and food security.' },
    { id:'q2b', label:'b', text:'Enumerate the principles for sustainable land use planning.' },
  ]},
  { module: 2, number: 3, parts: [
    { id:'q3a', label:'a', text:'Discuss briefly about water deficit and water surplus issues of India.' },
    { id:'q3b', label:'b', text:'Explain briefly global water resources and Indian water resources.' },
  ], alternative: [
    { id:'q4a', label:'a', text:'Discuss about Himalayas and Peninsular component of National river linking project.' },
    { id:'q4b', label:'b', text:'What is sea water ingress? Explain brief the various problems and solution of it.' },
  ]},
  { module: 3, number: 5, parts: [
    { id:'q5a', label:'a', text:'Define Air pollution. Explain the source and classification of air pollutants.' },
    { id:'q5b', label:'b', text:'Explain effect of air pollution on human health and economy of country.' },
  ], alternative: [
    { id:'q6a', label:'a', text:'List the various air pollution control equipment. With a neat sketch, explain Filter bag house or bag filter.' },
    { id:'q6b', label:'b', text:'Explain the cause and impact of Ozone depletion.' },
  ]},
  { module: 4, number: 7, parts: [
    { id:'q7a', label:'a', text:'What is Biodiversity? Explain the importance of Biodiversity.' },
    { id:'q7b', label:'b', text:'Discuss about the Ecological restoration for conservation of biodiversity.' },
  ], alternative: [
    { id:'q8a', label:'a', text:'Define Ecosystem. List and explain the different types of ecosystem.' },
    { id:'q8b', label:'b', text:'Briefly discuss : i) Forest and Lotic Ecosystem ii Biotic and Abiotic components.' },
  ]},
  { module: 5, paperHeading: 'Module - 3 (as printed on page 2)', number: 9, parts: [
    { id:'q9a', label:'a', text:'What is meant by Global warming? Discuss its causes and effect.' },
    { id:'q9b', label:'b', text:'Briefly explain the impact of global warming in Biodiversity.' },
  ], alternative: [
    { id:'q10a', label:'a', text:'Define EIA. Explain the importance and stages involved in EIA.' },
    { id:'q10b', label:'b', text:'Explain the importance of EIA in implementing project like thermal power plant.' },
  ]},
];

export const DIAGRAM_LABELS = {
  land: 'Land conservation: vegetation cover and contour-based erosion control',
  basins: 'Schematic basin transfer: surplus Mahanadi/Godavari towards deficit Krishna/Pennar/Cauvery/Vaigai',
  water: 'Earth water distribution: saline water, freshwater and freshwater storage',
  river: 'National river linking: Himalayan and Peninsular components',
  ingress: 'Coastal aquifer: freshwater lens and seawater interface',
  bag: 'Baghouse filter: dust-laden gas, fabric bags, clean gas outlet and dust hopper',
  ozone: 'Ozone depletion catalytic cycle involving chlorine',
  ecosystem: 'Ecosystem: interaction between biotic and abiotic components',
  biotic: 'Biotic and abiotic components of an ecosystem',
  warming: 'Enhanced greenhouse effect and global warming',
};
