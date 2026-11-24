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

export const FIVE_MARK_MODULE_1_ANSWERS = [
  answer('june-july-2026-q1a', 'draft-needs-pdf-review', [
    section('definition', 'Definition of land conservation', [
      p('Land conservation is the planned and careful use, protection and management of land so that its productive capacity and ecological functions are maintained for present and future generations.'),
    ]),
    section('types', 'Different types of land', [
      table(['Land type', 'Description and use'], [
        ['Arable land', 'Land suitable for cultivation; productivity depends on soil fertility, water and climate.'],
        ['Forest land', 'Tree-covered land that supports biodiversity, timber, carbon storage and watershed health.'],
        ['Pasture and grazing land', 'Grass-dominated land used mainly for grazing livestock and supporting pastoral livelihoods.'],
        ['Barren and wasteland', 'Land with little agricultural or forestry productivity, such as rocky, desert or severely degraded areas.'],
        ['Urban and industrial land', 'Land used for houses, commercial activity, factories, roads and other infrastructure.'],
      ]),
    ]),
    section('conservation', 'Methods of land conservation', [
      list([
        'Use land according to its capability through proper land-use planning and zoning.',
        'Control soil erosion by contour ploughing, terracing and maintaining vegetation cover.',
        'Protect riverbanks and coastal dunes using suitable vegetation and stabilization measures.',
        'Restore degraded land through afforestation and reforestation.',
        'Adopt watershed management to coordinate land and water use and reduce sediment flow.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Land supports ecosystems and human activities. Matching land use to its capability and preventing degradation help maintain its productivity and ecological functions.'),
    ]),
  ], ['Land conservation', 'Land types', 'Arable land', 'Forest land', 'Pasture', 'Wasteland', 'Land-use planning']),
  answer('june-july-2026-q1b', 'draft-needs-pdf-review', [
    section('introduction', 'Introduction', [
      p('Soil is a natural resource made up of mineral matter, organic matter, water, air and living organisms. It supports terrestrial ecosystems and human economic activities.'),
    ]),
    section('ecological', 'Ecological importance of soil', [
      list([
        'Nutrient cycling: decomposers break down organic matter and release nutrients that plants absorb.',
        'Water regulation and purification: soil absorbs and stores rainfall, filters water and supports groundwater recharge.',
        'Carbon storage: soil organic matter stores carbon and contributes to climate regulation.',
        'Habitat for biodiversity: soil supports bacteria, fungi, earthworms and insects that maintain decomposition and soil structure.',
        'Plant support: soil anchors roots and supplies water, air and essential nutrients.',
      ]),
    ]),
    section('economic', 'Economic importance of soil', [
      list([
        'Agriculture: fertile soil is the basic medium for crop production and food security.',
        'Infrastructure: soil provides the foundation for buildings, roads and other structures.',
        'Raw materials: clay and sand are used in bricks, pottery and construction.',
        'Livelihoods: productive soil supports farming, forestry, grazing and related rural activities.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Soil is both an ecological life-support system and an economic resource. Preventing erosion, compaction, salinity and contamination protects its long-term value.'),
    ]),
  ], ['Soil', 'Ecological importance', 'Economic importance', 'Nutrient cycling', 'Soil health']),
  answer('june-july-2026-q2a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of soil degradation', [
      p('Soil degradation is the decline in soil quality, fertility and productive capacity. It reduces the ability of land to support healthy crop growth and reliable food production.'),
    ]),
    section('causes', 'Major forms of soil degradation', [
      list([
        'Soil erosion removes fertile topsoil through wind and water.',
        'Soil compaction reduces pore spaces, aeration, root growth and water infiltration.',
        'Salinization and alkalinization cause salts to accumulate, often due to improper irrigation and drainage.',
        'Loss of organic matter reduces soil fertility, structure and water-holding capacity.',
        'Chemical contamination from pesticides, heavy metals and industrial wastes can harm crops and enter the food chain.',
      ]),
    ]),
    section('food-security', 'Effects on agriculture and food security', [
      list([
        'Reduced soil fertility and root growth lower crop yields.',
        'Poor plant growth and nutrient imbalance can affect food quality.',
        'Farmers may need more fertilizers, pesticides and irrigation, increasing production costs.',
        'Lower and less reliable harvests can increase food prices and supply instability.',
        'Degraded soil is less resilient to drought and heavy rainfall, increasing the risk of crop failure.',
      ]),
    ]),
    section('control', 'Control measures', [
      list([
        'Use contour farming, terracing and vegetation cover to reduce erosion.',
        'Maintain organic matter through crop residues and suitable organic amendments.',
        'Improve irrigation and drainage to prevent salinity and waterlogging.',
        'Avoid excessive tillage, compaction and unsafe waste disposal.',
      ], false),
      diagram('soilFoodSecurity', 'Original study schematic: soil degradation reduces soil functions and crop productivity, increasing food-security risks.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Soil degradation threatens food availability, quality and stability. Soil conservation and restoration are essential for sustainable agriculture.'),
    ]),
  ], ['Soil degradation', 'Food security', 'Soil erosion', 'Salinity', 'Soil conservation']),
  answer('june-july-2026-q2b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of sustainable land-use planning', [
      p('Sustainable land-use planning is the systematic management of land to balance economic development, social needs and environmental protection while maintaining land resources for future generations.'),
    ]),
    section('principles', 'Principles', [
      list([
        'Integration: consider environmental, economic and social factors together.',
        'Stakeholder participation: involve government agencies, local communities, farmers, businesses and experts.',
        'Long-term perspective: consider future resource demand, climate and cumulative ecological impacts.',
        'Adaptive management: monitor results and revise plans when new evidence or conditions require it.',
        'Land capability and suitability: match land uses to soil, slope, climate, water availability and ecological sensitivity.',
        'Zoning and regulation: identify suitable areas for agriculture, housing, industry, forests and conservation.',
        'Watershed approach: plan land and water together to reduce erosion and pollution.',
      ]),
    ]),
    section('tools', 'Planning tools', [
      list([
        'Land-capability classification.',
        'Land-use zoning and environmental regulations.',
        'Integrated watershed management.',
        'Agroforestry and restoration of degraded land.',
      ], false),
      diagram('landUsePlanning', 'Original study flowchart: assess land, involve stakeholders, allocate suitable uses, protect resources and monitor outcomes.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Scientific assessment, public participation and continuous monitoring help maintain productive land and protect ecosystems while allowing responsible development.'),
    ]),
  ], ['Sustainable land use', 'Planning principles', 'Land capability', 'Zoning', 'Watershed management']),
  answer('21cv654-1-a-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of natural resources', [
      p('Natural resources are materials and components obtained from nature that support life and human development. Examples include air, water, soil, forests, wildlife, minerals and sunlight.'),
    ]),
    section('classification', 'Types of natural resources', [
      table(['Basis', 'Type', 'Examples'], [
        ['Renewability', 'Renewable', 'Sunlight, wind, flowing water, forests and biomass; they regenerate naturally when managed sustainably.'],
        ['Renewability', 'Non-renewable', 'Coal, petroleum, natural gas and metallic minerals; they form over geological time and are finite.'],
        ['Origin', 'Biotic', 'Resources from living organisms or organic matter, such as forests, crops, livestock, fish and wildlife.'],
        ['Origin', 'Abiotic', 'Non-living resources such as air, water, land, soil, sunlight and minerals.'],
        ['Availability', 'Inexhaustible / exhaustible', 'Solar and wind energy are practically continuous; forests, groundwater and minerals can be depleted by overuse.'],
      ]),
    ]),
    section('conservation', 'Need for conservation', [
      list([
        'Use renewable resources at a rate that allows natural regeneration.',
        'Reduce, reuse and recycle non-renewable materials and improve energy efficiency.',
        'Protect forests, soil, water bodies and wildlife habitats.',
        'Prevent pollution and avoid wasteful consumption.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Natural resources support ecosystems and economic activity. Their planned and equitable use is necessary to maintain availability for present and future generations.'),
    ]),
  ], ['Natural resources', 'Renewable resources', 'Non-renewable resources', 'Biotic', 'Abiotic'], 'Supplementary answer drafted from the question wording and the existing 21CV654 model-paper source record. Verify terminology against the final approved BCV755B notes before academic sign-off.'),
  answer('21cv654-1-b-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of landforms', [
      p('Landforms are the natural physical features of the Earth’s surface. They are formed and modified by internal geological forces and external agents such as rivers, wind, glaciers, waves and weathering.'),
    ]),
    section('types', 'Major types of landforms', [
      list([
        'Mountains: High elevated areas with steep slopes and peaks; they influence climate, store snow and water, and support forests and wildlife.',
        'Plateaus: Elevated areas with relatively level tops and steep sides; they may contain minerals, forests and grazing lands.',
        'Plains: Broad areas of low relief, often formed by river deposition; fertile plains support agriculture, settlements and transport.',
        'Valleys: Low areas between hills or mountains, commonly formed by rivers or glaciers; they may contain fertile soil and water resources.',
        'Hills: Raised areas lower and generally less rugged than mountains; they support forests, plantations and watersheds.',
        'Deserts: Very dry regions with sand dunes, rocky surfaces or salt flats and vegetation adapted to low rainfall.',
        'Coastal landforms: Beaches, cliffs, dunes, spits and estuaries formed by waves, tides and sediment deposition.',
      ]),
    ]),
    section('conservation', 'Conservation measures', [
      list([
        'Control soil erosion by contour farming, terracing and maintaining vegetation cover.',
        'Afforest degraded slopes and protect fragile mountain and coastal ecosystems.',
        'Regulate mining, quarrying, construction and tourism in sensitive areas.',
        'Stabilise riverbanks and coastal dunes and follow integrated watershed management.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Landforms provide habitats, water, minerals and land for human activities. Proper land-use planning and erosion control help conserve their ecological and economic value.'),
    ]),
  ], ['Landforms', 'Mountains', 'Plateaus', 'Plains', 'Valleys', 'Landform conservation'], 'Supplementary answer drafted from the question wording and the existing 21CV654 model-paper source record. Verify the expected landform classification against the approved course notes before academic sign-off.'),
  answer('21cv654-1-c-', 'draft-needs-academic-review', [
    section('introduction', 'Introduction', [
      p('Soil is a slowly forming natural resource containing minerals, organic matter, water, air and organisms. It supports plant growth and terrestrial life.'),
    ]),
    section('ecological', 'Ecological importance', [
      list([
        'Nutrient cycling: soil organisms decompose organic matter and release nutrients such as nitrogen and phosphorus.',
        'Water regulation: soil absorbs rainfall, stores moisture, filters water and supports groundwater recharge.',
        'Carbon storage: soil organic matter stores carbon and helps regulate atmospheric carbon dioxide.',
        'Habitat: microorganisms, earthworms and insects live in soil and support decomposition and soil structure.',
        'Plant support: soil anchors roots and supplies water and nutrients.',
      ]),
    ]),
    section('economic', 'Economic importance', [
      list([
        'Supports crop production, food security and farmer livelihoods.',
        'Provides materials such as clay and sand for pottery, bricks and construction.',
        'Provides a stable foundation for buildings and roads.',
        'Supports forestry, grazing and other land-based livelihoods.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Soil is essential to both ecological functioning and economic development. Conserving soil health protects food production, biodiversity, water resources and infrastructure.'),
    ]),
  ], ['Soil', 'Ecological value', 'Economic value', 'Soil conservation']),
  answer('21cv654-2-a-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of soil degradation', [
      p('Soil degradation is the decline in soil quality, fertility and productive capacity due to erosion, improper management and other damaging processes.'),
    ]),
    section('impacts', 'Impact on food security', [
      list([
        'Erosion removes nutrient-rich topsoil and reduces crop productivity.',
        'Compaction restricts root growth and reduces water infiltration.',
        'Salinity and alkalinity interfere with seed germination and crop growth.',
        'Loss of organic matter reduces fertility and the soil’s ability to hold water.',
        'Chemical contamination can harm crops and introduce pollutants into the food chain.',
        'Lower yields and higher input costs make food supplies less reliable and increase pressure on farm incomes.',
      ]),
    ]),
    section('prevention', 'Prevention and restoration', [
      list([
        'Maintain vegetation cover and use contour farming or terracing.',
        'Add organic matter and practise crop rotation.',
        'Use suitable irrigation and drainage to prevent salt accumulation.',
        'Control chemical pollution and manage land according to its capability.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Soil conservation protects crop production and the availability, quality and stability of food supplies.'),
    ]),
  ], ['Soil degradation', 'Food security', 'Agriculture', 'Soil restoration']),
  answer('21cv654-2-b-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of soil health', [
      p('Soil health is the continued capacity of soil to function as a living ecosystem that sustains plants, animals and humans. It depends on physical, chemical and biological conditions.'),
    ]),
    section('indicators', 'Indicators of soil health', [
      table(['Indicator group', 'Important features'], [
        ['Physical', 'Good structure and aggregation, suitable bulk density, porosity, aeration, infiltration and water-holding capacity.'],
        ['Chemical', 'Suitable pH, balanced nutrients such as nitrogen, phosphorus and potassium, adequate organic matter and low toxic contamination.'],
        ['Biological', 'Diverse bacteria, fungi, earthworms and insects that decompose organic matter and cycle nutrients.'],
      ]),
    ]),
    section('maintenance', 'Practices to maintain soil health', [
      list([
        'Add compost, farmyard manure and crop residues.',
        'Practise crop rotation, cover cropping and agroforestry.',
        'Reduce excessive tillage and prevent compaction.',
        'Use fertilizers according to soil needs and apply pesticides judiciously.',
        'Control erosion and provide proper irrigation and drainage.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Soil health includes physical, chemical and biological functioning, not fertility alone. Regular monitoring and sustainable management maintain productive soil.'),
    ]),
  ], ['Soil health', 'Physical indicators', 'Chemical indicators', 'Biological indicators']),
  answer('21cv654-2-c-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of sustainable land-use planning', [
      p('Sustainable land-use planning manages land to balance economic development, social equity and environmental protection without reducing the ability of future generations to meet their needs.'),
    ]),
    section('principles', 'Principles', [
      list([
        'Integration of environmental, economic and social objectives.',
        'Participation of government, communities, farmers, businesses and experts.',
        'Long-term planning that considers future demand and ecological impacts.',
        'Adaptive management based on monitoring and new evidence.',
        'Matching land use to capability, soil, slope, climate and water availability.',
        'Zoning to reduce conflicts between agriculture, housing, industry and conservation.',
        'Watershed-based planning and protection or restoration of sensitive ecosystems.',
      ]),
    ]),
    section('tools', 'Tools and implementation', [
      list([
        'Land-capability classification and suitability assessment.',
        'Zoning and land-use regulations.',
        'Integrated watershed management.',
        'Agroforestry and restoration of degraded land.',
      ], false),
      diagram('landUsePlanning', 'Original study flowchart of assessment, participation, land allocation, conservation and monitoring.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Sustainable land-use planning combines scientific assessment, community participation and continuous monitoring to protect productivity and ecosystem services.'),
    ]),
  ], ['Sustainable land use', 'Land capability', 'Zoning', 'Adaptive management']),
  answer('dec-jan-2026-q1-a', 'draft-needs-pdf-review', [
    section('meaning', 'Ecological and economic importance of land', [
      p('Land is a basic natural resource that provides space and physical support for ecosystems and human activities. Its ecological and economic value depends on soil, vegetation, water, landforms and responsible use.'),
    ]),
    section('ecological', 'Ecological importance', [
      list([
        'Provides habitats for plants, animals and microorganisms and supports biodiversity.',
        'Supports soil formation, nutrient cycling and primary production.',
        'Regulates water through infiltration, groundwater recharge and watershed functions.',
        'Stores carbon in vegetation and soil and helps regulate local climate.',
        'Maintains ecological processes such as food chains and natural succession.',
      ]),
    ]),
    section('economic', 'Economic importance', [
      list([
        'Supports agriculture, forestry, grazing and food production.',
        'Provides space and raw materials for housing, industries, roads and infrastructure.',
        'Contains minerals and other resources used in construction and manufacturing.',
        'Supports livelihoods, transport, recreation and tourism.',
      ]),
    ]),
    section('conservation', 'Conservation', [
      p('Land capability-based planning, soil-erosion control, afforestation, watershed management and prevention of pollution help maintain land productivity.'),
    ]),
  ], ['Land resources', 'Ecological importance', 'Economic importance'], 'The repository contains a topic summary rather than the exact December 2025/January 2026 question wording. This answer addresses the recorded topic; compare the original paper before academic sign-off.'),
  answer('dec-jan-2026-q1-b', 'draft-needs-pdf-review', [
    section('objectives', 'Objectives of landform conservation', [
      list([
        'Prevent erosion, slope failure and loss of fertile soil.',
        'Protect natural drainage, watersheds and groundwater recharge areas.',
        'Conserve habitats, biodiversity and scenic or geologically important features.',
        'Reduce damage caused by unplanned mining, construction and tourism.',
        'Maintain the stability and long-term productive use of land.',
      ]),
    ]),
    section('strategies', 'Strategies for conservation', [
      list([
        'Prepare land-use plans based on slope, soil, geology and ecological sensitivity.',
        'Maintain vegetation cover and undertake afforestation on degraded slopes.',
        'Use contour bunding, terracing and check dams to reduce runoff and erosion.',
        'Stabilise riverbanks, coastal dunes and landslide-prone slopes using suitable measures.',
        'Regulate quarrying, mining, road cutting and construction in fragile areas.',
        'Adopt watershed management, monitoring and community participation.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Landform conservation combines scientific land-use planning, vegetation protection and erosion control to preserve landscape stability and ecosystem services.'),
    ]),
  ], ['Landform conservation', 'Erosion control', 'Land-use planning'], 'The repository contains a topic summary rather than the exact December 2025/January 2026 question wording. This answer addresses the recorded topic; compare the original paper before academic sign-off.'),
  answer('dec-jan-2026-q2-a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of soil health', [
      p('Soil health is the continued capacity of soil to function as a living ecosystem that sustains plants, animals and humans. It depends on physical, chemical and biological properties.'),
    ]),
    section('indicators', 'Indicators of soil health', [
      table(['Group', 'Indicators'], [
        ['Physical', 'Good structure and aggregation, suitable bulk density, porosity, aeration, infiltration and water-holding capacity.'],
        ['Chemical', 'Suitable pH, balanced nutrients such as nitrogen, phosphorus and potassium, organic matter and low toxic contamination.'],
        ['Biological', 'Diverse bacteria, fungi, earthworms and insects that decompose organic matter and cycle nutrients.'],
      ]),
    ]),
    section('improvement', 'Methods to improve soil health', [
      list([
        'Add compost, farmyard manure and crop residues to improve organic matter.',
        'Practise crop rotation, cover cropping and agroforestry.',
        'Reduce excessive tillage and prevent soil compaction.',
        'Use fertilizers based on soil testing and apply pesticides judiciously.',
        'Control erosion and provide suitable irrigation and drainage to prevent salinity and waterlogging.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Soil health is more than fertility alone. Monitoring physical, chemical and biological indicators and applying sustainable practices maintain productive soil.'),
    ]),
  ], ['Soil health', 'Soil indicators', 'Soil improvement'], 'The repository contains a topic summary rather than the exact December 2025/January 2026 question wording. This answer addresses the recorded topic; compare the original paper before academic sign-off.'),
  answer('dec-jan-2026-q2-b', 'draft-needs-pdf-review', [
    section('causes', 'Causes of deforestation', [
      list([
        'Expansion of agricultural land, plantations and shifting cultivation.',
        'Commercial logging and extraction of fuelwood and other forest products.',
        'Mining, quarrying, dams, roads and other infrastructure projects.',
        'Urbanisation, industrialisation, settlements and encroachment.',
        'Forest fires, overgrazing and unsustainable resource extraction.',
      ]),
    ]),
    section('impacts', 'Impacts of deforestation', [
      list([
        'Destroys and fragments habitats, causing biodiversity loss and threatening wildlife.',
        'Exposes soil to wind and water erosion, reducing soil fertility.',
        'Increases surface runoff, flood risk, sedimentation and landslide risk in vulnerable areas.',
        'Reduces carbon storage and releases carbon dioxide, contributing to climate change.',
        'Disturbs local water cycles and may reduce groundwater recharge and dry-season flows.',
        'Affects forest-dependent communities, livelihoods and ecosystem services.',
      ]),
    ]),
    section('control', 'Control measures', [
      p('Afforestation and reforestation, sustainable forestry, protected areas, fire management, community participation and strict control of illegal felling help reduce deforestation.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Deforestation creates ecological and social impacts. Conservation and sustainable forest management are essential for biodiversity, climate regulation and livelihoods.'),
    ]),
  ], ['Deforestation', 'Forest conservation', 'Biodiversity'], 'The repository contains a topic summary rather than the exact December 2025/January 2026 question wording. This answer addresses the recorded topic; compare the original paper before academic sign-off.')
];
