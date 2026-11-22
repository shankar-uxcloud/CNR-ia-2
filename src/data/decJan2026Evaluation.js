// Verified against the uploaded VTU Scheme & Solutions pages for BCV755B (viewer pages 4–8).
// These are the scheme's stated mark allocations and topic checklist, not an independent marking guarantee.
export const evaluationScheme = {
  '4a': { marks: '3 + 5 + 2 = 10', requirements: [
    ['3 marks','Explain water-deficit basins; use the scheme examples: Cauvery, Krishna and Pennar.'],
    ['5 marks','Explain water-surplus basins; use the scheme examples: Brahmaputra, Ganga and Mahanadi.'],
    ['2 marks','Explain the significance of inter-basin water-transfer planning based on deficit and surplus basins.']
  ]},
  '4b': { marks: '4 + 6 = 10', requirements: [
    ['4 marks','Define seawater ingress as movement of saline water into freshwater aquifers and explain the cause noted in the scheme: over-utilisation of groundwater.'],
    ['6 marks','Explain engineering/structural solutions (sea walls, coastal barriers, floodgates/sluice gates, elevated land, dikes and levees); groundwater protection (injection into bore wells, aquifer recharge and reduced pumping); natural/ecosystem-based solutions; zoning regulation; regular inspection and repair; early-warning systems.']
  ]},
  '5a': { marks: '6 + 4 = 10', requirements: [
    ['6 marks','Explain sources with examples: mobile (vehicles), stationary (factories and power plants), area (livestock, cities, farming and oil/gas) and natural (volcanoes, wildfires and lightning).'],
    ['4 marks','Explain primary and secondary pollutants with examples.']
  ]},
  '5b': { marks: '10', requirements: [
    ['10 marks','List and explain health effects: respiratory (asthma, bronchitis, lung infections and reduced lung function), cardiovascular, neurological, other effects (eye/nose/throat irritation and skin allergies) and long-term consequences (cancer, reduced life expectancy and increased hospital admissions).']
  ]},
  '6a': { marks: '4 + 6 = 10', requirements: [
    ['4 marks','Define ozone depletion and explain its causes/pollutants that destroy ozone molecules.'],
    ['6 marks','Explain impacts on human health, animals, the environment and marine life.']
  ]},
  '6b': { marks: '6 + 4 = 10', requirements: [
    ['6 marks','Give brief information on the starting/history of NAAQS, its role and revisions.'],
    ['4 marks','List the scheme-named parameters (SO₂, NO₂, PM₂.₅, PM₁₀, CO, O₃, Pb, NH₃, etc.) with acceptable limits.']
  ], naaqs: [
    ['SO₂','Annual 50; 24-hour 80','µg/m³'],['NO₂','Annual 40; 24-hour 80','µg/m³'],
    ['PM₁₀','Annual 60; 24-hour 100','µg/m³'],['PM₂.₅','Annual 40; 24-hour 60','µg/m³'],
    ['CO','8-hour 2; 1-hour 4','mg/m³'],['O₃','8-hour 100; 1-hour 180','µg/m³'],
    ['Lead (Pb)','Annual 0.50; 24-hour 1.0','µg/m³'],['Ammonia (NH₃)','Annual 100; 24-hour 400','µg/m³'],
    ['Benzene','Annual 5','µg/m³'],['Benzo(a)pyrene','Annual 1','ng/m³'],
    ['Arsenic','Annual 6','ng/m³'],['Nickel','Annual 20','ng/m³']
  ], naaqsNote:'These are the 2009 Indian NAAQS limits for industrial, residential, rural and other areas. SO₂ and NO₂ annual limits differ for notified ecologically sensitive areas (20 and 30 µg/m³ respectively). Refer to the official notification for all averaging/compliance notes.'},
  '7a': { marks: '2 + 8 = 10', requirements: [
    ['2 marks','Define biodiversity as variety/variability of plant and animal life in the world or in a particular habitat.'],
    ['8 marks','Explain its importance under ecological, economic and ethical importance.']
  ]},
  '7b': { marks: '2 + 8 = 10', requirements: [
    ['2 marks','Define habitat loss as destruction or alteration of the natural environment so it can no longer support the plants and animals that lived there.'],
    ['8 marks','Explain biodiversity-conservation methods: protected areas, habitat conservation and restoration, sustainable land and water management, zoos and botanical gardens, gene banks and seed banks, cryopreservation, legislation and policies, community involvement, research and monitoring.']
  ]},
  '8a': { marks: '10', requirements: [
    ['10 marks','List and explain natural agents (solar-radiation variations, volcanic eruptions and Earth orbital changes) and anthropogenic agents (burning fossil fuels, deforestation, agriculture, industrial processes, urbanisation and waste management).']
  ]},
  '8b': { marks: '2.5 × 4 = 10', requirements: [
    ['2.5 marks','Gene banks.'],['2.5 marks','Pollen culture.'],['2.5 marks','Social forestry.'],['2.5 marks','Zoological gardens.']
  ]},
  '9a': { marks: '2 + 4 + 4 = 10', requirements: [
    ['2 marks','Define global warming using the gradual increase in Earth’s temperature due to the greenhouse effect and increased greenhouse gases.'],
    ['4 marks','Explain causes listed in the scheme: deforestation, vehicle use, CFCs, industrial development, agriculture, overpopulation, volcanoes, water vapour and wildfires.'],
    ['4 marks','Explain effects: temperature rise, threats to ecosystems, climate change, high mortality, spread of diseases and loss of natural habitat.']
  ]},
  '9b': { marks: '10', requirements: [
    ['10 marks','List at least 20 projects that require environmental clearance under the EIA Notification. The scheme asks for a list; ensure at least 20 distinct project types are written.']
  ], projects: [
    'Mining of minerals','Offshore and onshore oil and gas exploration, development and production','River valley projects','Thermal power plants','Nuclear power projects and nuclear-fuel processing','Coal washeries','Mineral beneficiation','Metallurgical industries','Cement plants','Petroleum refineries','Coke oven plants','Asbestos milling and asbestos-based products','Chlor-alkali industry','Soda ash industry','Fertiliser plants','Pesticide industry','Petrochemical complexes','Oil and gas transportation pipelines','Storage of hazardous chemicals','Distilleries','Sugar industry','Pulp and paper industry','Leather/skin/hide processing industry','Ports, harbours and breakwaters','Airports','Highways','Ship-breaking yards','Common hazardous-waste treatment, storage and disposal facilities','Common municipal solid-waste management facilities','Building and construction projects','Townships and area-development projects'
  ]},
  '10a': { marks: '4 + 6 = 10', requirements: [
    ['4 marks','Explain Environmental Impact Assessment (EIA).'],
    ['6 marks','Explain the importance and need for EIA in projects, using a thermal power plant as the example.']
  ]},
  '10b': { marks: '10', requirements: [
    ['10 marks','List the global biodiversity-conservation efforts with their years. Include the conventions and organisations named in the scheme.']
  ], conventions: [
    ['Convention on Biological Diversity (CBD)','1993 (as written in the supplied scheme)'],
    ['Convention on the Conservation of Migratory Species of Wild Animals (CMS)','1979'],
    ['Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES)','1973'],
    ['International Treaty on Plant Genetic Resources for Food and Agriculture','2001'],
    ['Ramsar Convention on Wetlands','1971'],
    ['World Heritage Convention','1972'],
    ['International Plant Protection Convention','1952'],
    ['International Whaling Commission','1946']
  ], note:'The scheme sheet writes CBD as 1993. The Convention was adopted in 1992 and entered into force in 1993; preserve the scheme year in the exam answer and, if useful, note both dates.'}
};
