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

export const FIVE_MARK_MODULE_5_ANSWERS = [
  answer('june-july-2026-q9a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of global warming', [
      p('Global warming is the long-term rise in Earth’s average surface temperature, mainly caused by the enhanced greenhouse effect due to increasing concentrations of greenhouse gases.'),
    ]),
    section('causes', 'Major causes', [
      list([
        'Carbon dioxide from burning coal, petroleum and natural gas for electricity, transport and industry.',
        'Deforestation reduces carbon absorption and can release carbon stored in vegetation and soil.',
        'Methane from livestock, rice cultivation, landfills and fossil-fuel extraction.',
        'Nitrous oxide from nitrogen fertilisers and certain industrial activities.',
        'Fluorinated gases used in refrigeration, air conditioning and industrial processes.',
      ]),
      diagram('greenhouse', 'Existing greenhouse-effect diagram showing how increased greenhouse gases trap more outgoing heat.'),
    ]),
    section('effects', 'Major effects', [
      list([
        'Rising average temperature and more frequent or intense heatwaves.',
        'Melting glaciers and ice sheets and rising sea levels.',
        'Changes in rainfall patterns, increasing flood or drought risk in different regions.',
        'Stress on ecosystems, biodiversity, agriculture and water resources.',
        'Health impacts such as heat stress, respiratory problems and increased climate-related disease risks.',
      ]),
    ]),
    section('control', 'Mitigation and adaptation', [
      list([
        'Use renewable energy and improve energy efficiency.',
        'Protect and restore forests and other carbon-rich ecosystems.',
        'Promote cleaner transport and low-emission industrial processes.',
        'Improve climate-resilient agriculture, water conservation and disaster preparedness.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Reducing greenhouse-gas emissions and adapting to unavoidable impacts are both necessary to limit global warming and protect people and ecosystems.'),
    ]),
  ], ['Global warming', 'Greenhouse gases', 'Climate change', 'Mitigation']),
  answer('june-july-2026-q9b', 'draft-needs-pdf-review', [
    section('introduction', 'Climate change and biodiversity', [
      p('Climate change alters temperature, rainfall, ocean conditions and the frequency of extreme events. These changes affect species, habitats and ecological interactions.'),
    ]),
    section('impacts', 'Impacts on biodiversity', [
      list([
        'Range shifts: species move towards cooler regions or higher elevations as their suitable climate zones change.',
        'Phenological changes: flowering, breeding, migration and seasonal activities may occur earlier or later.',
        'Habitat loss: warming, drought, sea-level rise and changing rainfall can reduce or alter suitable habitats.',
        'Marine impacts: ocean warming and marine heatwaves can cause coral bleaching and affect aquatic food webs.',
        'Population decline: species that cannot adapt or migrate may face reduced survival and greater extinction risk.',
        'Ecosystem disruption: changes in species interactions affect food webs, pollination and ecosystem services.',
      ]),
    ]),
    section('conservation', 'Conservation responses', [
      list([
        'Protect and connect habitats to allow species movement.',
        'Restore degraded ecosystems using native species.',
        'Reduce other pressures such as pollution, overexploitation and invasive species.',
        'Monitor vulnerable species and include climate risks in conservation planning.',
      ], false),
      diagram('conservation', 'Existing in-situ and ex-situ conservation diagram; climate adaptation also requires connected natural habitats.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Climate change is an additional pressure on biodiversity. Habitat protection, restoration and climate-aware conservation improve ecosystem resilience.'),
    ]),
  ], ['Climate change', 'Biodiversity', 'Habitat shifts', 'Coral bleaching']),
  answer('june-july-2026-q10a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning and importance of EIA', [
      p('Environmental Impact Assessment (EIA) is a systematic process to identify, predict and evaluate likely environmental and social impacts of a proposed project before approval. It helps decision-makers avoid or reduce adverse impacts.'),
    ]),
    section('stages', 'Main stages of EIA', [
      list([
        'Screening: determine whether the project requires EIA and identify its applicable category.',
        'Scoping: identify key issues and prepare the Terms of Reference for the study.',
        'Baseline study: collect existing data on air, water, soil, noise, ecology and socio-economic conditions.',
        'Impact prediction: assess likely direct, indirect and cumulative effects during construction and operation.',
        'Mitigation and EMP: identify alternatives and measures to avoid, minimise or compensate for impacts.',
        'Public consultation: obtain concerns of affected people and stakeholders where required.',
        'Appraisal and decision: the competent authority reviews the report and decides on clearance and conditions.',
        'Monitoring: check compliance and environmental performance after approval.',
      ]),
      diagram('eia', 'Existing EIA process flowchart.'),
    ]),
    section('benefits', 'Benefits', [
      list([
        'Improves project location, design and technology selection.',
        'Protects human health, ecosystems and natural resources.',
        'Makes environmental costs and risks visible before construction.',
        'Encourages public participation and transparent decision-making.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('EIA supports informed and responsible project decisions by integrating environmental and social safeguards into planning and implementation.'),
    ]),
  ], ['Environmental Impact Assessment', 'EIA stages', 'Environmental clearance']),
  answer('june-july-2026-q10b', 'draft-needs-pdf-review', [
    section('introduction', 'Why EIA is important for thermal power plants', [
      p('Thermal power plants can affect air, water, land, ecosystems and nearby communities. EIA identifies these impacts before construction and helps plan mitigation and monitoring.'),
    ]),
    section('impacts', 'Impacts assessed', [
      list([
        'Air emissions: particulate matter, sulphur dioxide, nitrogen oxides and greenhouse gases from fuel combustion.',
        'Water: large water demand for cooling and steam generation, wastewater discharge and possible thermal pollution.',
        'Fly ash and bottom ash: generation, storage, transport, dust and possible leaching.',
        'Land and biodiversity: land acquisition, vegetation removal and disturbance to nearby habitats.',
        'Noise and health: construction noise, transport, occupational exposure and community-health concerns.',
      ]),
    ]),
    section('mitigation', 'Mitigation measures', [
      list([
        'Use electrostatic precipitators or fabric filters for particulate control and suitable flue-gas treatment for gaseous pollutants.',
        'Treat and reuse wastewater and improve cooling-water efficiency.',
        'Utilise fly ash safely where standards permit and provide engineered disposal for unused ash.',
        'Develop greenbelts, control noise and monitor air and water quality.',
        'Prepare an Environmental Management Plan with responsibilities, budget and reporting.',
      ]),
      diagram('eia', 'Existing EIA process flowchart used to plan assessment, mitigation, approval and monitoring.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('EIA helps thermal power projects reduce pollution, protect water and land, address community concerns and comply with environmental-clearance conditions.'),
    ]),
  ], ['Thermal power plant', 'EIA', 'Air emissions', 'Fly ash', 'Environmental Management Plan']),
  answer('dec-jan-2026-9a', 'draft-needs-pdf-review', [
    section('definition', 'Definition of global warming', [
      p('Global warming is the long-term increase in Earth’s average surface temperature, mainly due to the enhanced greenhouse effect caused by rising greenhouse-gas concentrations.'),
    ]),
    section('causes', 'Causes', [
      list([
        'Burning fossil fuels for electricity, transport, industry and buildings releases carbon dioxide.',
        'Deforestation reduces carbon absorption and releases stored carbon.',
        'Livestock, rice cultivation, landfills and fossil-fuel extraction release methane.',
        'Nitrogen fertilisers and some industrial processes release nitrous oxide.',
        'Refrigeration and industrial applications release fluorinated greenhouse gases.',
      ]),
    ]),
    section('effects', 'Effects', [
      list([
        'Higher average temperatures and heatwaves.',
        'Glacier and ice-sheet loss and sea-level rise.',
        'Changes in rainfall, drought and flood patterns.',
        'Impacts on agriculture, biodiversity, water resources and human health.',
        'Economic losses, infrastructure damage and displacement in vulnerable regions.',
      ]),
      diagram('greenhouse', 'Existing greenhouse-effect diagram illustrating the enhanced greenhouse effect.'),
    ]),
    section('control', 'Control measures', [
      list([
        'Shift towards renewable energy and energy efficiency.',
        'Protect forests and restore degraded ecosystems.',
        'Use cleaner transport and industrial technology.',
        'Improve waste management and climate-resilient planning.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Human activities increase greenhouse-gas concentrations and warm the climate. Emission reduction and adaptation are required to reduce risks.'),
    ]),
  ], ['Global warming', 'Causes', 'Effects', 'Climate mitigation']),
  answer('dec-jan-2026-9b', 'draft-needs-pdf-review', [
    section('definition', 'Environmental clearance under EIA', [
      p('Environmental clearance is a prior regulatory approval for specified development projects under the EIA Notification, 2006, issued under the Environment (Protection) Act, 1986. It is intended to assess environmental and social impacts before a project proceeds.'),
    ]),
    section('project-groups', 'Major project groups', [
      list([
        'Mining and extraction projects, subject to the applicable mineral, area and capacity thresholds.',
        'River-valley, dam and hydropower projects.',
        'Thermal and nuclear power projects.',
        'Major industrial projects such as petroleum refineries, cement, metallurgical, fertiliser and chemical industries.',
        'Infrastructure projects such as airports, ports, harbours and specified highways.',
        'Industrial estates, waste-treatment facilities and specified building or township projects.',
      ]),
    ]),
    section('process', 'General clearance process', [
      list([
        'Categorise the project under the applicable Schedule and amendments.',
        'Prepare Terms of Reference and an EIA report where required.',
        'Collect baseline data and assess environmental and social impacts.',
        'Conduct public consultation where the notification requires it.',
        'Obtain appraisal and a decision from the competent central or state authority.',
        'Implement clearance conditions and post-clearance monitoring.',
      ]),
      diagram('eia', 'Existing EIA process flowchart.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Environmental clearance ensures that scheduled projects are examined before implementation. Exact applicability depends on project type, capacity, location and the current notification.'),
    ]),
  ], ['Environmental clearance', 'EIA Notification', 'Project categories']),
  answer('dec-jan-2026-10a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of EIA', [
      p('Environmental Impact Assessment is a systematic process to identify, predict and evaluate environmental and social effects of a proposed project before approval.'),
    ]),
    section('thermal-impacts', 'Importance for thermal power plants', [
      list([
        'Assesses particulate matter, sulphur dioxide, nitrogen oxides and other air emissions.',
        'Evaluates water demand, wastewater discharge and thermal pollution.',
        'Estimates fly-ash and bottom-ash generation and plans safe storage, utilisation and disposal.',
        'Identifies land acquisition, habitat disturbance, noise and effects on nearby communities.',
        'Compares alternative sites, fuels, cooling systems and pollution-control technologies.',
      ]),
    ]),
    section('management', 'Environmental management measures', [
      list([
        'Install suitable particulate and gaseous emission-control systems.',
        'Treat and reuse wastewater and conserve cooling water.',
        'Manage ash safely and promote approved beneficial use.',
        'Develop greenbelts and monitor air, water, noise and health indicators.',
        'Prepare an Environmental Management Plan and emergency-response arrangements.',
      ]),
      diagram('eia', 'Existing EIA process flowchart from project proposal through monitoring.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('EIA helps thermal power plants identify risks early, select safer alternatives and implement mitigation and monitoring before and during operation.'),
    ]),
  ], ['EIA', 'Thermal power plant', 'Environmental management']),
  answer('dec-jan-2026-10b', 'draft-needs-pdf-review', [
    section('introduction', 'Global biodiversity conservation', [
      p('Biodiversity conservation is a global responsibility because species, ecosystems and environmental pressures cross national boundaries. International agreements and organisations support cooperation among countries.'),
    ]),
    section('agreements', 'Important international agreements', [
      list([
        'Convention on Biological Diversity (CBD), 1992: promotes conservation of biodiversity, sustainable use and fair sharing of benefits from genetic resources.',
        'Kunming–Montreal Global Biodiversity Framework, 2022: sets global goals and 2030 targets for conservation, restoration, sustainable use and equitable benefit sharing, including the 30-by-30 area-based conservation target.',
        'CITES, 1973: regulates international trade in endangered wild animals and plants.',
        'Ramsar Convention, 1971: promotes conservation and wise use of wetlands.',
        'Convention on Migratory Species (CMS), 1979: supports international cooperation to conserve migratory animals and their habitats.',
        'World Heritage Convention, 1972: supports protection of natural sites of outstanding universal value.',
        'International Treaty on Plant Genetic Resources for Food and Agriculture: supports conservation and sustainable use of plant genetic resources.',
      ]),
    ]),
    section('organisations', 'Organisations and programmes', [
      list([
        'IUCN supports conservation knowledge and the Red List of Threatened Species.',
        'UNEP promotes international environmental cooperation.',
        'UNESCO supports biosphere reserves and natural World Heritage sites.',
        'FAO supports biodiversity in agriculture, forestry and fisheries.',
        'GEF provides funding for biodiversity and other global environmental projects.',
      ]),
    ]),
    section('actions', 'Global conservation actions', [
      list([
        'Establish and manage protected areas and ecological corridors.',
        'Restore degraded habitats and recover threatened species.',
        'Control illegal wildlife trade and invasive species.',
        'Maintain seed banks, gene banks and zoological collections.',
        'Support research, education, community participation and fair benefit sharing.',
      ], false),
      diagram('conservation', 'Existing in-situ and ex-situ biodiversity conservation diagram.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('International conventions, organisations, protected areas and community action combine to conserve biodiversity and promote sustainable use of biological resources.'),
    ]),
  ], ['Global biodiversity conservation', 'CBD', 'CITES', 'Ramsar', 'CMS']),
  answer('21cv654-9-a-', 'needs-source-review', [
    section('definition', 'EIA for a hydropower project', [
      p('Environmental Impact Assessment is a process used to identify and evaluate the likely environmental and social impacts of a proposed project before regulatory approval.'),
    ]),
    section('flow', 'General EIA clearance sequence', [
      list([
        'Project proposal and application.',
        'Screening and project categorisation.',
        'Scoping and preparation of Terms of Reference.',
        'Baseline data collection and impact prediction.',
        'Preparation of the EIA report and Environmental Management Plan.',
        'Public consultation where required.',
        'Appraisal and regulatory decision.',
        'Post-clearance compliance, monitoring and reporting.',
      ]),
      diagram('eia', 'Existing EIA process flowchart; the exact hydropower regulatory route must be checked for the project.'),
    ]),
    section('hydropower-impacts', 'Hydropower-specific impacts and safeguards', [
      list([
        'Reservoir submergence can affect forests, habitats and agricultural land.',
        'Dams and diversions alter river flow, sediment movement and aquatic habitats.',
        'Construction may cause erosion, slope instability and access-road impacts.',
        'Projects may displace communities and require rehabilitation and resettlement.',
        'Mitigation includes catchment treatment, compensatory afforestation, environmental-flow planning, biodiversity protection and rehabilitation measures.',
      ]),
    ]),
    section('source-note', 'Source limitation', [
      note('The supplied notes include an EIA framework and hydropower case material, but current category thresholds and every procedural requirement must be checked against the applicable EIA Notification and amendments.', 'gap'),
    ]),
  ], ['Hydropower EIA', 'Environmental clearance', 'Environmental Management Plan'], 'The source map classifies the hydropower EIA question as partially supported. Verify the applicable legal category and project-specific procedure before marking complete.'),
  answer('21cv654-9-b-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of climate-change indicators', [
      p('Climate-change indicators are measurable physical, chemical or biological changes used to detect and track long-term changes in the climate system.'),
    ]),
    section('indicators', 'Important global indicators', [
      list([
        'Rising global temperature: increase in long-term average surface temperature and hot extremes.',
        'Glacier and ice-sheet loss: retreat of mountain glaciers and loss of polar ice.',
        'Sea-level rise: caused by thermal expansion of seawater and melting land ice.',
        'Ocean warming: rising ocean heat content and sea-surface temperature, contributing to coral bleaching.',
        'Changing precipitation: shifts in rainfall patterns, heavier rainfall in some regions and drought in others.',
        'Reduced snow and sea ice: changes in the extent and duration of seasonal snow and polar sea ice.',
        'Biological changes: shifts in flowering, migration, breeding seasons and species distribution.',
        'Extreme events: changes in heatwaves, droughts, floods and wildfire conditions, interpreted with careful event attribution.',
      ]),
      diagram('greenhouse', 'Existing greenhouse-effect diagram illustrating the physical driver behind warming.'),
    ]),
    section('importance', 'Importance of monitoring', [
      p('Indicators help assess climate trends, evaluate impacts on water, agriculture and biodiversity, and plan mitigation and adaptation. Multiple indicators across atmosphere, oceans, ice and ecosystems provide stronger evidence than a single measure.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Consistent monitoring of temperature, ice, sea level, oceans, rainfall and biological responses provides evidence of long-term climate change.'),
    ]),
  ], ['Climate indicators', 'Global climate change', 'Sea-level rise', 'Glacier retreat']),
  answer('21cv654-9-c-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of zoological garden', [
      p('A zoological garden or zoo is a managed facility where wild animals are kept in protected enclosures for conservation, education, research and captive breeding. It is an ex-situ method of biodiversity conservation.'),
    ]),
    section('contributions', 'Contributions to biodiversity', [
      list([
        'Maintains threatened species outside their natural habitats.',
        'Supports carefully planned captive breeding programmes.',
        'Uses studbooks and coordinated breeding to reduce inbreeding and preserve genetic variation.',
        'Rescues and rehabilitates injured, orphaned or confiscated wildlife.',
        'Educates the public about biodiversity, habitat loss, poaching and conservation.',
        'Supports research on animal health, behaviour, nutrition and reproduction.',
        'May support reintroduction after suitable habitat and threat assessments.',
      ]),
    ]),
    section('requirements', 'Requirements and limitations', [
      p('Good zoos need species-appropriate enclosures, adequate space, enrichment, proper food and water, veterinary care, trained staff and ethical management. Captive facilities cannot replace natural habitats and must complement in-situ conservation.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Zoological gardens are useful for ex-situ conservation, education and research when animal welfare and genetic management are maintained.'),
    ]),
  ], ['Zoological gardens', 'Ex-situ conservation', 'Biodiversity'], 'This is the separately retained Q9(c) record, repeated from Q8(c) in the supplementary model paper. The answer remains separately mapped to its own source-question ID and is pending academic review.'),
  answer('21cv654-10-a-', 'draft-needs-academic-review', [
    section('introduction', 'Global warming and human health', [
      p('Global warming changes temperature, rainfall, air quality and the frequency of extreme events. These changes affect health directly and indirectly.'),
    ]),
    section('health-impacts', 'Major health impacts', [
      list([
        'Heat-related illness: heatwaves can cause dehydration, heat exhaustion, heatstroke and deaths, especially among older adults, children and outdoor workers.',
        'Vector-borne disease: changing temperature and rainfall can alter mosquito and tick habitats and influence risks of malaria, dengue and other diseases.',
        'Respiratory problems: heat, ground-level ozone, wildfire smoke and fine particles can aggravate asthma and other respiratory illness.',
        'Food insecurity: drought, floods and heat stress can reduce crop yields and increase malnutrition risk.',
        'Water-related illness: water scarcity and contamination after floods can increase risks from unsafe drinking water.',
        'Injuries and mental-health effects: storms, floods, wildfires and displacement can cause injury, death and psychological stress.',
      ]),
    ]),
    section('prevention', 'Preventive measures', [
      list([
        'Heat-action plans, early-warning systems and public-health surveillance.',
        'Safe drinking water, resilient agriculture and accessible healthcare.',
        'Cleaner energy, urban green spaces and disaster preparedness.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Global warming affects health through heat, disease, air quality, food, water and extreme events. Adaptation and greenhouse-gas reduction are both necessary.'),
    ]),
  ], ['Global warming', 'Human health', 'Heat stress', 'Climate adaptation']),
  answer('21cv654-10-b-', 'needs-source-review', [
    section('definition', 'Meaning of environmental clearance', [
      p('Environmental clearance is a prior regulatory decision for a project listed under the EIA Notification, 2006. The process evaluates environmental and social impacts before the project proceeds.'),
    ]),
    section('project-groups', 'Major project groups identified in the supplied notes', [
      list([
        'Mining and extraction projects.',
        'River-valley, dam and hydropower projects.',
        'Thermal and nuclear power projects.',
        'Specified metallurgical, cement, petroleum, fertiliser and chemical industries.',
        'Major infrastructure such as airports, ports, harbours and specified highways.',
        'Specified industrial estates, waste-management facilities and large construction or area-development projects.',
      ]),
    ]),
    section('process', 'General process', [
      list([
        'Determine project category under the applicable Schedule and amendments.',
        'Prepare the Terms of Reference and EIA study where required.',
        'Assess baseline environmental and social conditions and predict impacts.',
        'Conduct public consultation where required.',
        'Obtain appraisal and a decision from the competent central or state authority.',
        'Implement clearance conditions and post-clearance monitoring.',
      ]),
      diagram('eia', 'Existing EIA process flowchart.'),
    ]),
    section('source-note', 'Source limitation', [
      note('The supplied notes provide examples of project groups, but not a complete current Schedule with every threshold and amendment. Check the official EIA Notification before treating this as an exhaustive list.', 'gap'),
    ]),
  ], ['Environmental clearance', 'EIA Notification', 'Project groups'], 'The source map classifies the model-paper project-list question as partially supported. The complete Schedule and current thresholds require verification against the official notification.'),
  answer('21cv654-10-c-', 'needs-source-review', [
    section('definition', 'Meaning of EIA', [
      p('Environmental Impact Assessment is a systematic study to identify, predict and evaluate likely environmental and social impacts of a proposed project before approval.'),
    ]),
    section('thermal-plant', 'Importance for a thermal power plant', [
      list([
        'Assesses air emissions such as particulate matter, sulphur dioxide and nitrogen oxides.',
        'Evaluates water demand, wastewater discharge and possible thermal pollution.',
        'Estimates fly-ash and bottom-ash generation and plans safe management.',
        'Identifies land-use change, habitat disturbance, noise and community-health impacts.',
        'Compares alternative sites and technologies and specifies pollution-control measures.',
        'Prepares an Environmental Management Plan with mitigation, monitoring and responsibilities.',
      ]),
      diagram('eia', 'Existing EIA process flowchart.'),
    ]),
    section('mitigation', 'Typical mitigation measures', [
      list([
        'Use suitable particulate and gaseous emission-control equipment.',
        'Treat and reuse wastewater and manage cooling-water discharge.',
        'Utilise fly ash safely and provide engineered disposal for unused ash.',
        'Develop greenbelts and monitor air, water and noise.',
      ], false),
    ]),
    section('source-note', 'Source limitation', [
      note('The source map says the notes cover the EIA framework and hydropower case study; thermal-specific details in this answer need direct page verification before the answer is marked complete.', 'gap'),
    ]),
  ], ['Thermal power plant', 'EIA', 'Environmental Management Plan'], 'The source map classifies the thermal-power EIA model question as partially supported. Verify thermal-specific impacts and mitigation against the complete Module 5 notes before marking complete.'),
];
