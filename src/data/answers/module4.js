// MODULE 4 – Biodiversity and Ecosystem Conservation
// Source: "Conservation_of_Natural_Resources_Module_4_10_Important_Questions_Revised.docx"
// (Q06 and Q07 also draw on Module 5 notes where stated.)

const M4 = 'Module 4 notes (Conservation_of_Natural_Resources_Module_4_10_Important_Questions_Revised.docx)';
const M5 = 'Module 5 notes (Conservation_of_Natural_Resources_Module_5_10_Questions_Answers_Revised.docx)';

export const q05 = {
  source: { doc: M4, refs: ['Module 4 – Q1 (levels and values)', 'Module 4 – Q7 (economic values in detail)'] },
  keywords: ['Biodiversity', 'Genetic diversity', 'Species diversity', 'Ecosystem diversity', 'Ecological value', 'Economic value', 'Genetic value', 'Ethical value', 'Aesthetic value', 'Pollination', 'Medicinal plants'],
  sections: [
    {
      id: 'definition', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Biodiversity** is the **variety of life on Earth**, including plants, animals, fungi, microorganisms, the **genetic differences within species**, and the **ecosystems** they form. It is essential for ecosystem health, stability and human well-being.' },
      ],
    },
    {
      id: 'levels', title: '1. Levels (Types) of Biodiversity',
      blocks: [
        { type: 'table', head: ['Level', 'Meaning', 'Examples (from the notes)', 'Significance'], rows: [
          ['**Genetic diversity**', 'Variation in genes within the same species', 'Different varieties of rice, wheat and mango', 'Helps species adapt to environmental change; supports crop improvement and disease resistance'],
          ['**Species diversity**', 'Variety of species in a habitat or region – number of species and their relative abundance', 'Tigers, elephants, birds, insects and plants in a forest', 'Reflects the richness of life in an area'],
          ['**Ecosystem diversity**', 'Variety of habitats, biological communities and ecological processes', 'Forests, grasslands, deserts, wetlands, rivers and oceans', 'Supports different ecological processes and habitats'],
        ] },
        { type: 'p', text: 'The three levels are linked: genes make up species, and species interact with their surroundings to form ecosystems.' },
        { type: 'note', kind: 'added', text: 'The sentence above is a short linking explanation added for understanding; it is not stated in the notes.' },
      ],
    },
    {
      id: 'values', title: '2. Values (Importance) of Biodiversity',
      blocks: [],
      subsections: [
        { title: '2.1 Ecological value', blocks: [
          { type: 'p', text: 'Maintains **food chains and food webs, pollination, nutrient cycling, soil fertility** and ecosystem balance. Plants absorb CO₂ and release oxygen through photosynthesis; microorganisms decompose organic matter and release nutrients into soil; biodiversity also supports water quality.' },
        ] },
        { title: '2.2 Economic value', blocks: [
          { type: 'p', text: 'Biodiversity provides **direct economic products and indirect ecosystem services**: food, timber, fuelwood, medicines, fisheries, raw materials and tourism opportunities.' },
          { type: 'list', ordered: true, items: [
            '**Medicinal plants and drugs:** many traditional and modern medicines use plant compounds. Examples in the notes: **neem** (antiseptic and antibacterial), **tulsi** (respiratory complaints, traditionally) and **turmeric** (anti-inflammatory). The notes also cite **aspirin and willow bark**, and **quinine and the Cinchona tree**.',
            '**Agriculture and genetic resources:** genetic material for crop improvement, disease resistance and adaptation; varieties of rice, wheat and millets, including useful traits from wild relatives, support agricultural resilience.',
            '**Forestry:** timber, fuelwood, medicinal plants, food and fodder – e.g. **teak and sandalwood** as timber resources. Sustainable management is needed to prevent depletion.',
            '**Fisheries and aquaculture:** marine and freshwater biodiversity supports fish and seafood production, food security, employment and income; coastal aquaculture (shrimp, fish, crab) and inland freshwater fish farming; fish and seafood exports contribute to the economy.',
            '**Tourism and recreation:** forests, wildlife sanctuaries, wetlands and scenic landscapes attract visitors and support nature-based tourism and local livelihoods.',
          ] },
        ] },
        { title: '2.3 Genetic value', blocks: [
          { type: 'p', text: 'Provides **genetic material for improved crop varieties, disease resistance and adaptation** to changing conditions.' },
        ] },
        { title: '2.4 Ethical value', blocks: [
          { type: 'p', text: 'Biodiversity has **cultural and religious significance** for communities.' },
        ] },
        { title: '2.5 Aesthetic value', blocks: [
          { type: 'p', text: 'Provides **scenic beauty, recreation and ecotourism**.' },
          { type: 'note', kind: 'gap', text: 'The Module 4 notes treat “ethical and aesthetic value” as one heading (cultural and religious significance; scenic beauty, recreation and ecotourism). They are shown separately here only because the question lists them separately; no further detail is given in the notes.' },
        ] },
        { title: '2.6 Climate-regulation value', blocks: [
          { type: 'p', text: 'Forests and vegetation **absorb carbon dioxide, influence rainfall and temperature**, and help maintain water cycles.' },
        ] },
      ],
    },
    {
      id: 'summary', title: '3. Summary Table of Values',
      blocks: [
        { type: 'table', head: ['Value', 'Key contribution'], rows: [
          ['Ecological', 'Food webs, pollination, nutrient cycling, soil fertility, balance'],
          ['Economic', 'Food, timber, fuelwood, medicines, fisheries, tourism'],
          ['Genetic', 'Crop improvement, disease resistance, adaptation'],
          ['Ethical', 'Cultural and religious significance'],
          ['Aesthetic', 'Scenic beauty, recreation, ecotourism'],
          ['Climate regulation', 'CO₂ absorption, rainfall and temperature influence, water cycles'],
        ] },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'Biodiversity has both **market value** and essential **indirect value**. It supports ecological stability and human livelihoods, so protecting **genetic, species and ecosystem diversity** is necessary for present and future generations.' },
      ],
    },
  ],
};

export const q06 = {
  source: { doc: M4, refs: ['Module 4 – Q2'], extra: [`Climate-change detail: ${M5} – Q6`] },
  keywords: ['Habitat loss', 'Fragmentation', 'Pollution', 'Overexploitation', 'Poaching', 'Invasive species', 'Climate change', 'Algal bloom', 'Protected areas', 'Restoration', 'Sustainable use'],
  sections: [
    {
      id: 'intro', title: 'Introduction',
      blocks: [
        { type: 'p', text: 'Biodiversity is threatened by **natural events and human activities**. These threats reduce species populations, damage habitats and may lead to **extinction**.' },
      ],
    },
    {
      id: 'threats', title: '1. Major Threats to Biodiversity',
      blocks: [],
      subsections: [
        { title: '1.1 Habitat destruction and fragmentation', blocks: [
          { type: 'p', text: 'Forests and other habitats are converted for **agriculture, mining, dams, roads and urban development**. **Fragmented habitats isolate populations, reduce genetic diversity and increase extinction risk.**' },
        ] },
        { title: '1.2 Pollution', blocks: [
          { type: 'p', text: 'Chemical pollutants, **pesticides, heavy metals, plastics and excess nutrients** damage land and water ecosystems. **Nutrient pollution can cause algal blooms and oxygen-depleted water.**' },
        ] },
        { title: '1.3 Overexploitation', blocks: [
          { type: 'p', text: '**Excessive fishing, hunting, poaching and unsustainable timber cutting** reduce wildlife and plant populations.' },
        ] },
        { title: '1.4 Invasive species', blocks: [
          { type: 'p', text: 'Introduced **non-native species** may **compete with, prey on or spread disease** to native species.' },
        ] },
        { title: '1.5 Climate change', blocks: [
          { type: 'p', text: 'Changes in temperature and rainfall affect **species distribution, breeding, survival and habitats**.' },
          { type: 'list', items: [
            '**Habitat loss and alteration:** forests, wetlands, mangroves, coral reefs and cold-region habitats can become unsuitable; sea-level rise can inundate coastal habitats.',
            '**Shifts in species distribution:** some species move to cooler regions, higher altitudes or higher latitudes.',
            '**Changes in seasonal timing:** flowering, breeding and migration may shift, causing mismatches with food sources or pollinators.',
            '**Coral bleaching and ocean acidification:** warmer seas make corals expel their algae; absorbed CO₂ lowers seawater pH and affects corals, molluscs and other shell-builders.',
          ] },
          { type: 'note', kind: 'added', text: 'These four points are taken from the Module 5 notes on climate change and biodiversity (Q6) to support the climate-change threat; Module 4’s own note on this threat is the one-line statement above.' },
        ] },
        { title: '1.6 Natural disturbances', blocks: [
          { type: 'p', text: '**Earthquakes, floods, droughts and volcanic eruptions** can destroy habitats and affect plants and animals.' },
        ] },
        { title: '1.7 Other pressures', blocks: [
          { type: 'p', text: '**Overgrazing, disease, intensive farming and population pressure** can also contribute to biodiversity loss.' },
        ] },
      ],
    },
    {
      id: 'table', title: '2. Summary Table of Threats',
      blocks: [
        { type: 'table', head: ['Threat', 'Main causes', 'Effect on biodiversity'], rows: [
          ['Habitat loss & fragmentation', 'Agriculture, mining, dams, roads, urban development', 'Isolated populations, reduced genetic diversity, extinction risk'],
          ['Pollution', 'Pesticides, heavy metals, plastics, excess nutrients', 'Damaged land/water ecosystems; algal blooms; low-oxygen water'],
          ['Overexploitation', 'Excess fishing, hunting, poaching, timber cutting', 'Declining wildlife and plant populations'],
          ['Invasive species', 'Introduced non-native species', 'Competition, predation, disease spread to natives'],
          ['Climate change', 'Changes in temperature and rainfall', 'Altered distribution, breeding, survival and habitats'],
        ] },
      ],
    },
    {
      id: 'measures', title: '3. Measures for Biodiversity Conservation',
      blocks: [
        { type: 'list', ordered: true, items: [
          'Establish and effectively manage **national parks, wildlife sanctuaries and biosphere reserves**.',
          '**Protect and reconnect habitats**; restore degraded forests, wetlands and grasslands.',
          'Promote **sustainable agriculture, fishing and forestry**.',
          '**Control pollution and invasive species**; prevent poaching and illegal wildlife trade.',
          '**Reduce greenhouse-gas emissions** and conserve forests as carbon sinks.',
          'Support **conservation education, public participation, research** and cooperation between governments and communities.',
        ] },
        { type: 'note', kind: 'gap', text: 'The notes give no Indian case studies or statistics for this question, so none have been added.' },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'Effective biodiversity conservation requires **habitat protection, sustainable resource use, pollution control, restoration and community participation**.' },
      ],
    },
  ],
};

export const q07 = {
  source: { doc: M4, refs: ['Module 4 – Q3'], extra: [`Global strategy mention of ex-situ methods: ${M5} – Q7`] },
  keywords: ['In-situ', 'Ex-situ', 'National parks', 'Bandipur', 'Sundarbans', 'Kaziranga', 'Wildlife sanctuaries', 'Dandeli', 'Biosphere reserves', 'Zoological gardens', 'Botanical gardens', 'Gene banks', 'Cryopreservation'],
  sections: [
    {
      id: 'intro', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Biodiversity conservation** means protecting and sustainably managing **species, ecosystems and genetic variability** for present and future generations. The two main approaches are **in-situ** and **ex-situ** conservation.' },
        { type: 'diagram', id: 'conservation', caption: 'Classification of biodiversity conservation into in-situ (on-site) and ex-situ (off-site) methods.' },
      ],
    },
    {
      id: 'insitu', title: '1. In-situ Conservation (On-site)',
      blocks: [
        { type: 'p', text: '**In-situ conservation** protects species **in their natural habitats** so that they continue to live, reproduce and interact within their ecosystems.' },
        { type: 'list', ordered: true, items: [
          '**National parks:** protected areas managed for wildlife and ecosystem conservation. Examples in the notes: **Bandipur National Park (Karnataka)**, **Sundarbans National Park (West Bengal)** and **Kaziranga National Park (Assam)**.',
          '**Wildlife sanctuaries:** areas established to protect wildlife, including particular species and their habitats. Example: **Dandeli Wildlife Sanctuary (Karnataka)**.',
          '**Biosphere reserves:** large areas commonly organised into **core, buffer and transition zones** to support conservation alongside compatible activities.',
        ] },
      ],
    },
    {
      id: 'exsitu', title: '2. Ex-situ Conservation (Off-site)',
      blocks: [
        { type: 'p', text: '**Ex-situ conservation** protects species or their genetic material **outside their natural habitats**. It is useful when species are **highly threatened** or need **specialised care or storage**.' },
        { type: 'list', ordered: true, items: [
          '**Zoological gardens (zoos):** maintain animals and may support captive breeding, education and research.',
          '**Botanical gardens:** maintain living collections of plant species.',
          '**Gene banks:** store seeds, genes and DNA for future use (the Module 5 notes also mention seed banks).',
          '**Pollen culture and tissue culture:** help preserve and multiply plant material.',
          '**Cryopreservation:** long-term storage of biological material at very low temperatures.',
        ] },
      ],
    },
    {
      id: 'differences', title: '3. Differences between In-situ and Ex-situ Conservation',
      blocks: [
        { type: 'table', head: ['Basis', 'In-situ conservation', 'Ex-situ conservation'], rows: [
          ['Meaning', 'Protects species in their natural habitats', 'Protects species or genetic material outside natural habitats'],
          ['Location', 'Takes place in natural habitats', 'Takes place outside natural habitats'],
          ['Focus', 'Species together with their habitat and ecological relationships', 'Selected organisms or biological material'],
          ['Methods / examples', 'National parks, wildlife sanctuaries, biosphere reserves', 'Zoos, botanical gardens, gene banks, pollen/tissue culture, cryopreservation'],
          ['When useful', 'To protect ecosystems and let species live, reproduce and interact naturally', 'When species are highly threatened or need specialised care or storage'],
        ] },
        { type: 'note', kind: 'gap', text: 'The notes name no specific example for biosphere reserves, zoos or botanical gardens and give no detail on how cryopreservation is carried out. No examples have been invented; add class examples if required.' },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'Both methods **complement each other**. In-situ conservation protects ecosystems, while ex-situ methods provide **additional protection and support recovery of threatened species**.' },
      ],
    },
  ],
};

export const q08 = {
  source: { doc: M4, refs: ['Module 4 – Q10'] },
  keywords: ['Biogeochemical cycles', 'Carbon cycle', 'Nitrogen fixation', 'Nitrification', 'Denitrification', 'Oxygen cycle', 'Phosphorus cycle', 'Water cycle', 'Photosynthesis', 'Respiration', 'Soil fertility', 'Ecosystem balance'],
  sections: [
    {
      id: 'definition', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Biogeochemical cycles** are the natural pathways through which **essential elements and water** move between living organisms and the air, water and soil. They **recycle materials, maintain nutrient availability** and support ecosystem productivity.' },
        { type: 'note', kind: 'added', text: 'The five diagrams below were drawn for this website from the text descriptions in the notes. The notes themselves contain no figures. Standard labels such as “reservoir” are used only for clarity.' },
      ],
    },
    {
      id: 'carbon', title: '1. Carbon Cycle',
      blocks: [
        { type: 'list', ordered: true, items: [
          'Plants absorb atmospheric **carbon dioxide** during **photosynthesis** and incorporate carbon into organic matter.',
          'Carbon moves through **food chains** when animals eat plants or other animals.',
          '**Respiration, decomposition and combustion** release carbon dioxide back into the atmosphere.',
          '**Forests and oceans act as carbon sinks** and help regulate climate.',
        ] },
        { type: 'diagram', id: 'carbon', caption: 'Carbon cycle: photosynthesis removes CO₂; respiration, decomposition and combustion return it; oceans act as a sink.' },
        { type: 'eq', title: 'Photosynthesis and respiration (standard equations)', lines: ['6CO₂ + 6H₂O  —(light, chlorophyll)→  C₆H₁₂O₆ + 6O₂', 'C₆H₁₂O₆ + 6O₂  →  6CO₂ + 6H₂O + energy'] },
        { type: 'note', kind: 'added', text: 'These two equations are standard textbook equations added for completeness. They are not written out in the notes.' },
      ],
    },
    {
      id: 'nitrogen', title: '2. Nitrogen Cycle',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Nitrogen fixation:** atmospheric nitrogen is converted into usable compounds by certain microorganisms and other natural processes.',
          'Plants absorb usable nitrogen compounds from the soil; **animals obtain nitrogen** by feeding on plants or other animals.',
          '**Decomposers** return nitrogen compounds to the soil from dead organisms and wastes.',
          '**Nitrification** converts ammonium into nitrite and nitrate.',
          '**Denitrification** returns nitrogen gas to the atmosphere.',
        ] },
        { type: 'diagram', id: 'nitrogen', caption: 'Nitrogen cycle: fixation → ammonium → nitrite → nitrate → plants → animals → decomposers; denitrification returns N₂.' },
      ],
    },
    {
      id: 'oxygen', title: '3. Oxygen Cycle',
      blocks: [
        { type: 'list', ordered: true, items: [
          'Plants **release oxygen during photosynthesis**.',
          'Organisms **use oxygen in respiration**, and **combustion also consumes oxygen**.',
          'Oxygen circulates among the **atmosphere, water and living organisms**; photosynthesis and respiration are the important processes in this cycle.',
        ] },
        { type: 'diagram', id: 'oxygen', caption: 'Oxygen cycle: photosynthesis releases O₂; respiration and combustion consume it; O₂ is exchanged with water.' },
      ],
    },
    {
      id: 'phosphorus', title: '4. Phosphorus Cycle',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Weathering** of phosphate-containing rocks releases phosphate into soil and water.',
          'Plants **absorb phosphate through their roots**; animals obtain it through food.',
          '**Decomposition and excretion** return phosphate to the environment.',
          'Some phosphate **settles in sediments** and may eventually form rocks.',
          'Unlike carbon and nitrogen, the phosphorus cycle has **no major gaseous atmospheric phase**.',
        ] },
        { type: 'diagram', id: 'phosphorus', caption: 'Phosphorus cycle: rocks → weathering → soil and water → plants → animals → decomposition; sediments may form rocks.' },
      ],
    },
    {
      id: 'water', title: '5. Water Cycle',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Solar energy** causes **evaporation** from water bodies and **transpiration** from plants.',
          'Water vapour **cools and condenses** to form clouds.',
          '**Precipitation** returns water to land and water bodies.',
          'Water flows as **runoff**, **infiltrates** the soil and replenishes **groundwater** and rivers, eventually returning to lakes and oceans.',
        ] },
        { type: 'diagram', id: 'water', caption: 'Water cycle: evaporation and transpiration → condensation → precipitation → runoff and infiltration → return to oceans.' },
      ],
    },
    {
      id: 'compare', title: '6. Comparison of the Five Cycles',
      blocks: [
        { type: 'table', head: ['Cycle', 'Key processes (from the notes)', 'Return to environment'], rows: [
          ['Carbon', 'Photosynthesis, feeding, respiration, decomposition, combustion', 'CO₂ to atmosphere; forests and oceans act as sinks'],
          ['Nitrogen', 'Fixation, absorption, feeding, nitrification, denitrification', 'Decomposers return compounds to soil; denitrification returns N₂ gas'],
          ['Oxygen', 'Photosynthesis (release); respiration and combustion (use)', 'Circulates among atmosphere, water and organisms'],
          ['Phosphorus', 'Weathering, absorption, decomposition, excretion, sedimentation', 'Phosphate to soil and water; no major gaseous phase'],
          ['Water', 'Evaporation, transpiration, condensation, precipitation, runoff, infiltration', 'Rivers, lakes, oceans, groundwater'],
        ] },
      ],
    },
    {
      id: 'importance', title: '7. Importance for Soil Fertility, Productivity and Ecological Balance',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Recycles essential nutrients** and maintains their availability to organisms.',
          'Supports **soil fertility, plant growth and agricultural productivity**.',
          '**Connects organisms with air, water and soil.**',
          'Helps **regulate climate and maintain water quality**.',
          '**Decomposition and nutrient return** support continued ecosystem functioning.',
        ] },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'The **carbon, nitrogen, oxygen, phosphorus and water cycles are interconnected**. Disturbing them through **deforestation, pollution or excessive emissions** can affect soil fertility, climate and ecosystem balance.' },
      ],
    },
  ],
};
