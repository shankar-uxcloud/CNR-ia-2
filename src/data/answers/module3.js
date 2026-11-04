// MODULE 3 – Air Pollution, Control Equipment and Ozone Depletion
// Source: "BCV755B_Module_3_Q6_to_Q10_VTU_10_Mark.docx"
// Website Q09 ← source Q7 ; Website Q10 ← source Q9 + Q10

const M3 = 'Module 3 notes (BCV755B_Module_3_Q6_to_Q10_VTU_10_Mark.docx)';

export const q09 = {
  source: { doc: M3, refs: ['Module 3 – Q7'] },
  keywords: ['Electrostatic precipitator', 'Electrostatic force', 'Baghouse filter', 'Fabric filtration', 'Cyclone separator', 'Centrifugal force', 'Wet scrubber', 'Liquid scrubbing', 'Fly ash', 'Hopper', 'Particulate matter'],
  sections: [
    {
      id: 'intro', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Air-pollution-control equipment** removes **particles or gases** from industrial exhaust **before release into the atmosphere**. The four devices discussed here are the **ESP, baghouse filter, cyclone separator and wet scrubber**.' },
        { type: 'note', kind: 'added', text: 'The notes describe each device in a few lines. The four working diagrams were drawn from those descriptions; standard component names (e.g. discharge electrode, tube sheet, vortex finder, spray nozzle) are used as labels for clarity.' },
      ],
    },
    {
      id: 'esp', title: '1. Electrostatic Precipitator (ESP)',
      blocks: [
        { type: 'p', text: '**Principle:** electrostatic force.' },
        { type: 'p', text: '**Working mechanism:**' },
        { type: 'list', ordered: true, items: [
          'Polluted gas passes through a **high-voltage electric field**.',
          'Particles become **electrically charged** and move towards the **collecting plates**.',
          'Dust accumulates on the plates and is **removed periodically**.',
          'Cleaned gas exits.',
        ] },
        { type: 'diagram', id: 'esp', caption: 'Electrostatic precipitator: charging of particles, migration to collecting plates, dust removal through the hopper.' },
        { type: 'p', text: '**Applications:** thermal power plants (**fly ash**), cement factories, steel mills and large industrial exhaust systems.' },
        { type: 'p', text: '**Advantage:** efficient for **fine particles and large gas volumes**.' },
        { type: 'p', text: '**What happens to the collected dust?** Dust deposited on the collecting plates is dislodged periodically and falls into the hopper for collection. The gas stream therefore leaves after the charged particles have been separated from it.' },
      ],
    },
    {
      id: 'baghouse', title: '2. Baghouse Filter',
      blocks: [
        { type: 'p', text: '**Principle:** fabric filtration.' },
        { type: 'p', text: '**Working mechanism:**' },
        { type: 'list', ordered: true, items: [
          'Dust-laden air passes through **fabric bags**.',
          'The fabric **retains dust** while cleaner air passes through.',
          'Accumulated dust is removed by **shaking, reverse air or pulse-jet cleaning** and collected in a **hopper**.',
        ] },
        { type: 'diagram', id: 'baghouse', caption: 'Baghouse filter: dust-laden air is filtered through fabric bags; collected dust falls into the hopper during cleaning.' },
        { type: 'p', text: '**Applications:** metalworking, woodworking, pharmaceutical and cement industries.' },
        { type: 'p', text: '**Advantage:** high dust-removal efficiency.' },
        { type: 'p', text: '**What happens to the collected dust?** The dust cake retained on the fabric is periodically removed by shaking, reverse-air flow or pulse-jet cleaning. The released dust falls into the hopper, while the filter bags are used again.' },
      ],
    },
    {
      id: 'cyclone', title: '3. Cyclone Separator',
      blocks: [
        { type: 'p', text: '**Principle:** centrifugal force.' },
        { type: 'p', text: '**Working mechanism:**' },
        { type: 'list', ordered: true, items: [
          'Dust-laden gas enters a **cylindrical or conical chamber tangentially**.',
          'The **rotating gas** drives particles towards the **outer wall**.',
          'Particles **fall into a hopper**, while cleaned gas leaves through the **central outlet**.',
        ] },
        { type: 'diagram', id: 'cyclone', caption: 'Cyclone separator: tangential entry produces a spinning flow; particles are thrown to the wall and fall to the hopper.' },
        { type: 'p', text: '**Applications:** pre-cleaning of exhaust gases, woodworking and grain-processing industries.' },
        { type: 'p', text: '**Separation path:** the heavier particles move towards the chamber wall and lose momentum, then fall into the hopper. The cleaned gas follows the inner upward path and leaves through the central outlet.' },
        { type: 'p', text: '**Advantage:** simple, low-cost construction. **Limitation:** less effective for very fine particles when used alone.' },
      ],
    },
    {
      id: 'scrubber', title: '4. Wet Scrubber',
      blocks: [
        { type: 'p', text: '**Principle:** liquid scrubbing.' },
        { type: 'p', text: '**Working mechanism:**' },
        { type: 'list', ordered: true, items: [
          'Polluted gas **contacts sprayed water or a suitable scrubbing solution**.',
          '**Droplets capture particles**; soluble gases are absorbed, and an **alkaline liquid can neutralise acidic gases**.',
          'Contaminated liquid is **collected for treatment** and cleaned gas exits.',
        ] },
        { type: 'diagram', id: 'scrubber', caption: 'Wet scrubber: spray liquid captures particles and absorbs gases; contaminated liquid leaves for treatment.' },
        { type: 'p', text: '**Applications:** chemical plants, acid manufacturing, power plants and processes producing dust and absorbable gases.' },
        { type: 'p', text: '**Advantage:** can remove particles and selected gases. **Limitation:** produces wastewater or sludge requiring treatment.' },
        { type: 'p', text: '**After scrubbing:** captured particles and absorbed pollutants remain in the liquid stream. This contaminated liquid must be collected and treated rather than being discharged untreated.' },
      ],
    },
    {
      id: 'selection', title: '5. How the Four Devices Differ',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**ESP:** uses an electric field to charge particles and attract them to collecting plates.',
          '**Baghouse filter:** uses fabric bags as a physical filter that retains dust.',
          '**Cyclone separator:** uses the spinning motion of gas and centrifugal force to separate particles.',
          '**Wet scrubber:** brings polluted gas into contact with liquid so particles are captured and selected gases are absorbed.',
        ] },
        { type: 'key', title: 'Quick memory cue', text: 'ESP – electric charge; Baghouse – fabric; Cyclone – centrifugal force; Wet scrubber – liquid contact.' },
      ],
    },
    {
      id: 'comparison', title: '6. Comparison of the Equipment',
      blocks: [
        { type: 'table', head: ['Equipment', 'Principle', 'Main pollutant / application', 'Advantage', 'Limitation'], rows: [
          ['**ESP**', 'Electrostatic force', 'Fine particles and fly ash', 'Efficient for fine particles and large gas volumes', '—'],
          ['**Baghouse filter**', 'Fabric filtration', 'Dust and particulates', 'High dust-removal efficiency', '—'],
          ['**Cyclone separator**', 'Centrifugal force', 'Larger dust particles', 'Simple, low-cost construction', 'Less effective for very fine particles when used alone'],
          ['**Wet scrubber**', 'Liquid scrubbing', 'Particles and absorbable gases', 'Removes particles and selected gases', 'Produces wastewater or sludge needing treatment'],
        ] },
        { type: 'note', kind: 'gap', text: 'The notes list no limitation for the ESP or the baghouse filter, so none is stated in the table.' },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'These devices **reduce industrial emissions**. A **combination of devices** may be used when different pollutants must be removed.' },
      ],
    },
  ],
};

export const q10 = {
  source: { doc: M3, refs: ['Module 3 – Q9 (definition, causes, effects, control)', 'Module 3 – Q10 (photochemical mechanism, ozone hole)'] },
  keywords: ['Ozone depletion', 'CFCs', 'Halons', 'UV-B', 'Photodissociation', 'Chlorine radical', 'Bromine radical', 'Catalytic destruction', 'Polar stratospheric clouds', 'Ozone hole', 'Montreal Protocol 1987'],
  sections: [
    {
      id: 'definition', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Ozone depletion** is the **thinning or reduction of ozone concentration in the stratospheric ozone layer**, which absorbs much of the Sun’s harmful **ultraviolet radiation**.' },
        { type: 'p', text: '**Photochemical changes** are reactions initiated by light. Ozone is naturally formed and destroyed in the stratosphere, but **chlorine- and bromine-containing substances accelerate ozone loss**.' },
      ],
    },
    {
      id: 'causes', title: '1. Causes of Ozone Depletion',
      blocks: [
        { type: 'table', head: ['Substance', 'Uses (from the notes)', 'How it contributes'], rows: [
          ['**CFCs (chlorofluorocarbons)**', 'Historically refrigerants, aerosol propellants, solvents, foam-blowing agents', 'UV radiation in the stratosphere releases **chlorine radicals**'],
          ['**Halons**', 'Fire-extinguishing systems', 'Release ozone-destroying **bromine radicals**'],
          ['**Carbon tetrachloride**', 'Industrial solvent; chemical manufacturing', 'Can release chlorine-containing species'],
          ['**Methyl chloroform**', 'Cleaning and degreasing solvent', 'Its breakdown contributes chlorine to ozone-depleting reactions'],
          ['**Other ozone-depleting substances**', '—', 'Long-lived chlorine- or bromine-containing chemicals reach the stratosphere and release reactive atoms under UV radiation'],
        ] },
      ],
    },
    {
      id: 'photochemistry', title: '2. Photochemical Changes Involved',
      blocks: [],
      subsections: [
        { title: '2.1 Photodissociation of ozone', blocks: [
          { type: 'p', text: 'Ozone absorbs UV radiation and splits into oxygen and an oxygen atom. The oxygen atom can then react with ozone. These are **natural atmospheric reactions**.' },
          { type: 'eq', lines: ['O₃ + hν → O₂ + O', 'O + O₃ → 2O₂'] },
        ] },
        { title: '2.2 Release of chlorine and bromine radicals', blocks: [
          { type: 'p', text: 'CFCs and halons are **stable in the lower atmosphere** and can reach the stratosphere. UV radiation breaks them down, releasing **reactive chlorine or bromine radicals**. A simplified CFC example:' },
          { type: 'eq', lines: ['CF₂Cl₂ + hν → CF₂Cl• + Cl•'] },
          { type: 'p', text: 'The dot (•) indicates a **reactive radical**.' },
        ] },
        { title: '2.3 Catalytic destruction of ozone by chlorine', blocks: [
          { type: 'eq', lines: ['Step 1:  Cl• + O₃ → ClO• + O₂', 'Step 2:  ClO• + O → Cl• + O₂', 'Overall:  O₃ + O → 2O₂'] },
          { type: 'p', text: 'Chlorine is **regenerated**, so **one radical can take part in repeated ozone-destroying reactions**.' },
        ] },
        { title: '2.4 Catalytic destruction of ozone by bromine', blocks: [
          { type: 'eq', lines: ['Step 1:  Br• + O₃ → BrO• + O₂', 'Step 2:  BrO• + O → Br• + O₂', 'Overall:  O₃ + O → 2O₂'] },
          { type: 'p', text: 'Bromine is also **regenerated** and can participate in repeated catalytic cycles.' },
        ] },
        { title: '2.5 Reactive oxygen species', blocks: [
          { type: 'p', text: 'Oxygen atoms produced by photodissociation take part in further reactions that can **form or destroy ozone**. The outcome depends on atmospheric conditions and the reactions involved.' },
        ] },
      ],
    },
    {
      id: 'mechanism', title: '3. Ozone-Depletion Mechanism (Diagram)',
      blocks: [
        { type: 'diagram', id: 'ozone', caption: 'Ozone-depletion mechanism: ODS reach the stratosphere, UV releases Cl•/Br•, catalytic cycle destroys O₃, polar conditions produce the ozone hole.' },
        { type: 'key', title: 'Flow sequence for revision', text: 'CFCs / halons / ODS → reach stratosphere → UV radiation releases Cl and Br radicals → catalytic reactions destroy O₃ → severe seasonal ozone depletion (ozone hole).' },
      ],
    },
    {
      id: 'hole', title: '4. Formation of the Ozone Hole',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Cold polar winter:** very low temperatures favour **polar stratospheric clouds (PSCs)**.',
          '**Cloud-surface reactions:** these convert reservoir chlorine compounds into forms that can release reactive chlorine.',
          '**Sunlight returns in spring:** photochemical reactions release **chlorine radicals**.',
          '**Rapid ozone destruction:** catalytic cycles destroy ozone quickly.',
          '**Ozone hole:** severe seasonal ozone depletion occurs over **Antarctica during Southern Hemisphere spring**. It is a region of very low ozone, **not a literal hole**.',
        ] },
      ],
    },
    {
      id: 'effects', title: '5. Effects of Ozone Depletion',
      blocks: [
        { type: 'table', head: ['Area affected', 'Effects'], rows: [
          ['Human health', 'Increased UV-B radiation at the surface; higher risk of **skin cancer, cataracts and immune suppression**'],
          ['Agriculture', 'Damage to sensitive crops; reduced growth, yield or quality'],
          ['Marine ecosystems', 'Harm to **phytoplankton**, aquatic food chains and terrestrial ecosystems'],
          ['Materials', 'Faster deterioration of **plastics, rubber, paints and textiles**'],
          ['Atmosphere', 'Stratospheric cooling and possible changes in atmospheric circulation'],
        ] },
      ],
    },
    {
      id: 'control', title: '6. International Measures for Controlling Ozone Depletion',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Montreal Protocol (1987):** international agreement to **phase out production and consumption** of controlled ozone-depleting substances; implement the Protocol and its amendments.',
          '**Phase-out and regulation:** enforce restrictions on CFCs, halons and other controlled ODS.',
          '**Alternatives:** adopt suitable substitutes for refrigerants, solvents and propellants, considering **safety and climate impacts**.',
          '**Monitoring and cooperation:** continue ozone monitoring, research, technology transfer and compliance checks.',
          '**Prevent releases:** recover and properly manage refrigerants during servicing and disposal.',
        ] },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: '**UV-driven release of chlorine and bromine** from ozone-depleting substances leads to **catalytic ozone destruction**. Polar stratospheric clouds and returning spring sunlight intensify ozone loss over Antarctica. **Phasing out ODS under the Montreal Protocol and maintaining international cooperation** are essential for ozone-layer recovery.' },
      ],
    },
  ],
};
