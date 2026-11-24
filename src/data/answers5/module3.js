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

export const FIVE_MARK_MODULE_3_ANSWERS = [
  answer('june-july-2026-q5a', 'draft-needs-pdf-review', [
    section('definition', 'Definition of air pollution', [
      p('Air pollution is the contamination or alteration of the atmosphere by harmful gases, particles or other substances at concentrations that can affect living organisms and the environment.'),
    ]),
    section('sources', 'Sources of air pollutants', [
      table(['Natural sources', 'Human-made sources'], [
        ['Volcanoes, forest fires, dust storms and biological decay.', 'Industries, thermal power plants, motor vehicles, construction and agricultural activities.'],
        ['Release ash, smoke, gases and natural particles.', 'Release gases and particles through fuel combustion, industrial processes and land use.'],
      ]),
    ]),
    section('classification', 'Classification of air pollutants', [
      list([
        'Primary pollutants are emitted directly, such as carbon monoxide (CO), sulphur dioxide (SO₂), nitrogen oxides (NOx) and particulate matter.',
        'Secondary pollutants form in the atmosphere through reactions; ground-level ozone is formed through reactions involving NOx and volatile organic compounds in sunlight.',
        'Gaseous pollutants include CO, SO₂, NOx and hydrocarbons.',
        'Particulate pollutants include suspended solid particles and liquid droplets such as PM₁₀ and PM₂.₅.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Identifying pollutant sources and classes helps select suitable emission-prevention and air-pollution-control measures.'),
    ]),
  ], ['Air pollution', 'Natural sources', 'Anthropogenic sources', 'Primary pollutants', 'Secondary pollutants']),
  answer('june-july-2026-q5b', 'draft-needs-pdf-review', [
    section('health', 'Effects on human health', [
      list([
        'Respiratory effects: particulate matter, SO₂ and NO₂ irritate airways and contribute to asthma, bronchitis and chronic obstructive pulmonary disease.',
        'Cardiovascular effects: fine particles contribute to inflammation and are associated with heart attacks, strokes and irregular heartbeat.',
        'Nervous-system effects: lead exposure can harm the nervous system, especially in children.',
        'Cancer risk: long-term exposure to pollutants such as benzene and polycyclic aromatic hydrocarbons is linked with increased cancer risk.',
        'Irritation: smoke, ozone and other pollutants can cause burning eyes, sore throat and headaches.',
      ]),
    ]),
    section('economic', 'Effects on the economy', [
      list([
        'Healthcare costs increase due to illness, hospitalisation and treatment.',
        'Absenteeism and reduced worker productivity cause economic losses.',
        'Ground-level ozone can damage crops and reduce agricultural yield.',
        'Acid-rain-related pollutants can corrode buildings, bridges and monuments, increasing repair costs.',
        'Poor air quality can reduce tourism and outdoor economic activity.',
      ]),
    ]),
    section('control', 'Control measures', [
      list([
        'Use cleaner fuels and improve combustion efficiency.',
        'Control industrial emissions with suitable pollution-control equipment.',
        'Maintain vehicles and promote public transport.',
        'Prevent open burning and monitor ambient air quality.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Air pollution creates health burdens and economic losses. Prevention at source and effective emission controls protect people, agriculture and infrastructure.'),
    ]),
  ], ['Air pollution effects', 'Human health', 'Economic impacts']),
  answer('june-july-2026-q6a', 'draft-needs-pdf-review', [
    section('equipment', 'Major air-pollution-control equipment', [
      list([
        'Electrostatic precipitator (ESP): electrically charges particles and collects them on oppositely charged plates.',
        'Cyclone separator: uses centrifugal force to move heavier dust particles towards the chamber wall and into a hopper.',
        'Fabric filter or baghouse: passes polluted gas through fabric bags that retain dust while cleaned gas passes through.',
        'Wet scrubber: contacts polluted gas with liquid droplets to capture particles and, with suitable liquid chemistry, some gases.',
        'Absorption and adsorption: transfer gaseous pollutants into a liquid or trap them on a porous solid such as activated carbon.',
        'Catalytic converter: uses catalysts to convert selected harmful exhaust gases into less harmful products.',
      ]),
      diagram('esp', 'Existing ESP diagram: charged particles are collected on plates.'),
      diagram('cyclone', 'Existing cyclone separator diagram: centrifugal action removes dust.'),
      diagram('scrubber', 'Existing wet-scrubber diagram: liquid droplets contact polluted gas.'),
    ]),
    section('bag-filter', 'Working of a bag filter', [
      list([
        'Dust-laden gas enters a housing containing fabric filter bags.',
        'As gas passes through the fabric, dust is retained on the bag surface.',
        'Cleaned gas passes through the fabric and leaves through the clean-gas outlet.',
        'Accumulated dust is periodically removed from the bags and collected in a hopper.',
        'The method is useful for collecting fine particulate matter.',
      ]),
      diagram('baghouse', 'Existing baghouse diagram: dust is retained on filter bags and removed to a hopper.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('The choice of control equipment depends on pollutant type, particle size and concentration. A baghouse removes particulate matter by filtration through fabric bags.'),
    ]),
  ], ['Air-pollution control', 'ESP', 'Cyclone separator', 'Bag filter', 'Wet scrubber']),
  answer('june-july-2026-q6b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of ozone depletion', [
      p('Ozone depletion is the thinning of the protective ozone layer in the stratosphere, which absorbs much of the Sun’s harmful ultraviolet radiation.'),
    ]),
    section('causes', 'Cause and mechanism', [
      list([
        'Chlorofluorocarbons (CFCs), halons and other ozone-depleting substances were used in refrigerants, aerosols and other applications.',
        'These stable compounds can reach the stratosphere, where ultraviolet radiation breaks them down and releases chlorine or bromine radicals.',
        'A chlorine radical reacts with ozone: Cl + O₃ → ClO + O₂.',
        'ClO reacts with atomic oxygen: ClO + O → Cl + O₂. The chlorine radical is regenerated and can destroy more ozone.',
      ]),
      diagram('ozone', 'Existing ozone-depletion diagram showing catalytic ozone destruction.'),
    ]),
    section('impacts', 'Impacts', [
      list([
        'Human health: greater UV-B exposure increases the risk of skin damage, skin cancer and cataracts and can affect immune function.',
        'Marine life: UV-B can damage phytoplankton and affect aquatic food webs.',
        'Plants: excess UV-B can affect photosynthesis, growth and crop productivity.',
        'Materials: UV radiation can accelerate degradation of plastics and paints.',
      ]),
    ]),
    section('control', 'Control', [
      p('The Montreal Protocol (1987) and its amendments control and phase out ozone-depleting substances. Safe refrigerant servicing and recovery help prevent releases.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Ozone depletion increases harmful ultraviolet exposure. Phasing out ozone-depleting chemicals is essential for protecting health and ecosystems.'),
    ]),
  ], ['Ozone depletion', 'CFCs', 'Ultraviolet radiation', 'Montreal Protocol']),
  answer('dec-jan-2026-5a', 'draft-needs-pdf-review', [
    section('definition', 'Definition', [
      p('Air pollution is the presence of harmful substances in the atmosphere at concentrations that can adversely affect living organisms, property and the environment.'),
    ]),
    section('sources', 'Sources', [
      list([
        'Natural: volcanoes, forest fires, dust storms and biological decay.',
        'Human-made: industries, power plants, vehicles, construction and agricultural activities.',
      ]),
    ]),
    section('classification', 'Classification', [
      list([
        'Primary pollutants are emitted directly, for example CO, CO₂, SO₂, NOx and particulate matter.',
        'Secondary pollutants form in the atmosphere through chemical reactions; ground-level ozone is an example.',
        'Gaseous pollutants include CO, SO₂, NOx and hydrocarbons.',
        'Particulate pollutants include suspended solid particles and liquid droplets such as PM₁₀ and PM₂.₅.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Classification by origin and physical state helps identify sources and select appropriate pollution-control measures.'),
    ]),
  ], ['Air pollution', 'Pollutant classification', 'Primary pollutants', 'Secondary pollutants']),
  answer('dec-jan-2026-5b', 'draft-needs-pdf-review', [
    section('health-effects', 'Effects on human health', [
      list([
        'Respiratory: PM₂.₅, SO₂ and NO₂ can irritate airways and contribute to asthma, bronchitis and COPD.',
        'Cardiovascular: fine particles contribute to inflammation and increase the risk of heart attacks and strokes.',
        'Nervous system: lead exposure can harm brain and nervous-system development, particularly in children.',
        'Cancer: long-term exposure to benzene and some polycyclic aromatic hydrocarbons is linked with cancer risk.',
        'Eye and throat irritation: smoke and irritant gases can cause burning eyes, sore throat and headaches.',
      ]),
    ]),
    section('protection', 'Prevention and protection', [
      list([
        'Reduce emissions from vehicles and industries.',
        'Use cleaner fuels and maintain pollution-control equipment.',
        'Avoid open burning and monitor air quality.',
        'Sensitive groups should follow air-quality advisories and reduce exposure during severe pollution episodes.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Air pollution affects several body systems and can cause both immediate and long-term illness. Source control is the most effective prevention.'),
    ]),
  ], ['Air pollution', 'Health impacts', 'Respiratory disease', 'Cardiovascular disease']),
  answer('dec-jan-2026-6a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of ozone depletion', [
      p('Ozone depletion is the reduction in the concentration of protective ozone in the stratosphere, allowing more harmful ultraviolet radiation to reach Earth.'),
    ]),
    section('mechanism', 'Mechanism', [
      list([
        'CFCs and halons can reach the stratosphere because they are relatively stable in the lower atmosphere.',
        'Ultraviolet radiation breaks them down and releases chlorine or bromine radicals.',
        'The radicals react with ozone and are regenerated, allowing repeated catalytic destruction of ozone molecules.',
      ]),
      p('Example reactions: Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂.'),
      diagram('ozone', 'Existing diagram of catalytic ozone destruction by chlorine radicals.'),
    ]),
    section('effects', 'Impacts on humans and nature', [
      list([
        'Higher UV-B exposure increases skin-cancer risk and causes sunburn and premature skin ageing.',
        'UV exposure can increase cataract risk and affect immune-system function.',
        'Phytoplankton and aquatic organisms can be harmed, affecting marine food webs.',
        'Sensitive plants may experience reduced photosynthesis, growth and crop productivity.',
        'Plastics, paints and other exposed materials may degrade faster.',
      ]),
    ]),
    section('control', 'Control', [
      p('The Montreal Protocol and its amendments phase out controlled ozone-depleting substances. Safe recovery and disposal of refrigerants reduce releases.'),
    ]),
  ], ['Ozone depletion', 'Human health', 'Environmental impacts', 'Montreal Protocol']),
  answer('dec-jan-2026-6b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of NAAQS', [
      p('National Ambient Air Quality Standards (NAAQS) are prescribed limits for concentrations of specified pollutants in outdoor air. In India, the standards are administered by the Central Pollution Control Board under the Air (Prevention and Control of Pollution) Act, 1981.'),
    ]),
    section('purpose', 'Objectives', [
      list([
        'Protect public health, including sensitive groups.',
        'Protect vegetation, ecosystems and materials.',
        'Provide common limits for monitoring and comparing ambient air quality.',
        'Guide pollution-control planning and regulatory action.',
      ]),
    ]),
    section('pollutants', 'Pollutants covered', [
      p('India’s 2009 NAAQS cover 12 pollutants: PM₁₀, PM₂.₅, SO₂, NO₂, ammonia, CO, ozone, lead, benzene, benzo(a)pyrene, arsenic and nickel.'),
    ]),
    section('selected-limits', 'Selected limits quoted in the supplied notes', [
      table(['Pollutant', 'Selected limit'], [
        ['PM₁₀', 'Annual 60 µg/m³; 24-hour 100 µg/m³'],
        ['PM₂.₅', 'Annual 40 µg/m³; 24-hour 60 µg/m³'],
        ['SO₂', 'Annual 50 µg/m³; 24-hour 80 µg/m³'],
        ['NO₂', 'Annual 40 µg/m³; 24-hour 80 µg/m³'],
        ['Ozone', '8-hour 100 µg/m³; 1-hour 180 µg/m³'],
        ['CO', '8-hour 2 mg/m³; 1-hour 4 mg/m³'],
      ]),
      note('The complete 12-pollutant schedule contains pollutant-specific averaging periods and additional limits. The values above are selected examples, not the full table.', 'gap'),
    ]),
    section('conclusion', 'Conclusion', [
      p('NAAQS provide measurable targets for ambient air quality and support monitoring, public-health protection and pollution management.'),
    ]),
  ], ['NAAQS', 'CPCB', 'Ambient air quality', 'Air pollution standards']),
  answer('21cv654-5-a-', 'draft-needs-academic-review', [
    section('definition', 'Effects of air pollution on human health', [
      p('Air pollution contains harmful gases and particles. The effects depend on pollutant type, concentration and duration of exposure.'),
    ]),
    section('effects', 'Major health effects', [
      list([
        'Respiratory: PM₂.₅, PM₁₀, SO₂ and NO₂ can cause airway irritation, asthma, bronchitis and COPD.',
        'Cardiovascular: fine particles are associated with inflammation, heart attacks, strokes and irregular heartbeat.',
        'Nervous system: lead can harm brain development and cognitive function, especially in children.',
        'Cancer: long-term exposure to benzene and some PAHs is linked with increased cancer risk.',
        'Eye and throat irritation: ozone and smoke can cause burning eyes, sore throat and headaches.',
      ]),
    ]),
    section('prevention', 'Prevention', [
      list([
        'Reduce emissions from transport and industries.',
        'Use cleaner fuels and effective control equipment.',
        'Avoid open burning and monitor ambient air quality.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Air pollution harms several body systems. Emission reduction and exposure prevention are essential for public health.'),
    ]),
  ], ['Air pollution', 'Human health', 'Health effects']),
  answer('21cv654-5-b-', 'needs-source-review', [
    section('definition', 'Meaning and purpose of NAAQS', [
      p('National Ambient Air Quality Standards are prescribed limits for concentrations of selected pollutants in outdoor air. They provide a basis for protecting health and managing ambient air pollution.'),
    ]),
    section('purpose', 'Main purposes', [
      list([
        'Protect human health and sensitive groups.',
        'Protect vegetation, ecosystems and materials.',
        'Provide a reference for air-quality monitoring and comparison.',
        'Guide pollution-control planning and enforcement.',
      ]),
    ]),
    section('pollutants', 'Selected pollutants and limits', [
      p('The supplied notes explicitly reproduce selected annual limits: PM₁₀ 60 µg/m³, PM₂.₅ 40 µg/m³, SO₂ 50 µg/m³, NO₂ 40 µg/m³ and lead 0.5 µg/m³. The notes also identify ozone as a pollutant with an 8-hour limit of 100 µg/m³.'),
      note('The existing source audit and notes do not reproduce the complete pollutant-wise table in one place. This answer remains a partial draft until the complete 12-pollutant schedule and averaging periods are checked against the official standard.', 'gap'),
    ]),
  ], ['NAAQS', 'Air quality standards', 'CPCB'], 'The notes support the definition, purpose and selected pollutant limits, but the complete 12-pollutant schedule requires manual source verification.'),
  answer('21cv654-5-c-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of Air Quality Index', [
      p('The Air Quality Index (AQI) is a public communication tool that converts measured pollutant concentrations into a single index value and category to explain possible health effects.'),
    ]),
    section('categories', 'AQI categories and health concerns', [
      table(['AQI range', 'Category', 'General health concern'], [
        ['0–50', 'Good', 'Minimal impact; air quality is satisfactory.'],
        ['51–100', 'Satisfactory', 'Minor breathing discomfort may occur in sensitive people.'],
        ['101–200', 'Moderately polluted', 'Breathing discomfort may affect people with lung disease and children.'],
        ['201–300', 'Poor', 'Prolonged exposure may cause breathing discomfort to many people.'],
        ['301–400', 'Very poor', 'Prolonged exposure may lead to respiratory illness.'],
        ['401–500', 'Severe', 'Serious respiratory risk and significant health effects.'],
      ]),
    ]),
    section('use', 'How AQI is used', [
      list([
        'Monitoring stations measure particulate matter and gaseous pollutants.',
        'Measured concentrations are converted into pollutant sub-indices using prescribed breakpoints.',
        'The overall AQI is communicated as a number and category.',
        'Authorities issue advisories and the public can reduce outdoor exposure when pollution is high.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('AQI makes air-monitoring information easier to understand and supports public precautions and government pollution-control action.'),
    ]),
  ], ['Air Quality Index', 'AQI categories', 'Health concerns']),
  answer('21cv654-6-a-', 'needs-source-review', [
    section('definition', 'Meaning of ozone depletion', [
      p('Ozone depletion is the thinning of the stratospheric ozone layer, which normally absorbs much of the Sun’s harmful ultraviolet radiation.'),
    ]),
    section('mechanism', 'Causes and mechanism', [
      list([
        'CFCs and halons used in refrigeration, aerosols and other applications can reach the stratosphere.',
        'Ultraviolet radiation releases chlorine or bromine radicals from these substances.',
        'The radicals take part in catalytic reactions that convert ozone into oxygen and are regenerated.',
      ]),
      p('Example: Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂.'),
      diagram('ozone', 'Existing diagram of the ozone-depletion mechanism.'),
    ]),
    section('health', 'Human-health impacts', [
      list([
        'Increased UV-B exposure raises the risk of skin cancer and sunburn.',
        'UV exposure can increase cataract risk and affect immune-system function.',
        'Premature skin ageing and other skin damage may increase.',
      ]),
    ]),
    section('environment', 'Environmental impacts and control', [
      list([
        'UV-B can damage phytoplankton and aquatic food webs.',
        'Sensitive plants may experience effects on photosynthesis and growth.',
        'The Montreal Protocol supports the phase-out of ozone-depleting substances.',
      ]),
    ]),
    section('source-note', 'Source limitation', [
      note('The supplied notes support the ozone-depletion mechanism and selected impacts, but this model-paper question requires a human-health-focused answer. The draft needs manual checking against the complete Module 3 notes before it is marked complete.', 'gap'),
    ]),
  ], ['Ozone depletion', 'UV-B', 'Human health'], 'The source map classifies this question as partially supported. Manual review is required before marking the answer complete.'),
  answer('21cv654-6-b-', 'needs-source', [], ['Rock-forming minerals', 'Quartz', 'Mica', 'Feldspar', 'Amphibole'], 'The supplied BCV755B notes do not explain the listed rock-forming minerals. A verified geology reference is required before authoring this answer.'),
  answer('21cv654-6-c-', 'needs-source', [], ['Weathering', 'Physical weathering', 'Biogeochemical weathering'], 'The supplied BCV755B notes do not develop physical and biogeochemical weathering. A verified reference is required before authoring this answer.'),
];
