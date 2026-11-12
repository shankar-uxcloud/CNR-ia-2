<!--
  VTU ExamPrep · CNR
  A focused, interactive study workspace for VTU BCV755B.
-->

<div align="center">

# 🌿 VTU ExamPrep

### Conservation of Natural Resources · BCV755B

**Learn deeply. Visualise clearly. Practise strategically. Walk into exams prepared.**

An interactive, browser-based learning workspace built to turn CNR preparation into an active experience—not just another collection of notes.

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open_App-0ea5e9?style=for-the-badge)](https://shankar-uxcloud.github.io/CNR-ia-2/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

[Explore the app](https://shankar-uxcloud.github.io/CNR-ia-2/) · [Report a bug](https://github.com/shankar-uxcloud/CNR-ia-2/issues) · [Request an enhancement](https://github.com/shankar-uxcloud/CNR-ia-2/issues)

</div>

---

## ✨ The idea

CNR topics are easier to understand when learners can move beyond passive reading. VTU ExamPrep brings study material, visual explanations, practice activities, revision tools and exam-style preparation into one responsive interface.

The experience is designed around a simple loop:

**Understand → Explore → Practise → Review → Improve**

Whether you're revising a concept, testing your recall or exploring how an ecosystem works, the goal is to make every study session more purposeful.

## 🧭 Explore the learning workspace

| Experience | What it helps you do |
|---|---|
| **Study Dashboard** | Get a central view of your learning activity and continue where you left off. |
| **Question Library** | Browse the available module-wise questions and open structured answers. |
| **Structured Answers** | Study organised explanations with lists, tables, equations, diagrams and highlighted key terms. |
| **Bookmarks & Reading Progress** | Save useful questions and track completed study items. |
| **Practice & Quiz Centre** | Strengthen recall with interactive question-based practice. |
| **Exam Simulator** | Practise in an exam-oriented flow and review your attempts. |
| **Smart Revision** | Organise revision and revisit concepts that need more attention. |
| **Study Coach & Planner** | Bring structure to study sessions and revision tasks. |
| **Progress Analytics** | Review learning activity and practice history. |
| **Visual Learning Studio** | Explore visual explanations and guided learning activities. |
| **Environmental Science Lab** | Interact with environmental-science learning scenarios. |
| **EcoWeb Architect** | Build food-web connections and explore simplified species-loss cascades. |
| **Data Backup** | Export or restore supported study data. |

> Feature availability can evolve as the project is developed. The live application is the source of truth for the currently published experience.

## 🌎 Featured experience — EcoWeb Architect

EcoWeb Architect turns ecosystem relationships into an interactive learning activity.

- **Choose a habitat:** explore a Western Ghats rainforest, freshwater wetland or Deccan grassland scenario.
- **Build a food web:** connect organisms to represent feeding relationships and energy flow.
- **Check your model:** receive feedback as you create valid food-web pathways.
- **Explore a species-loss cascade:** simulate the removal of a species and inspect the possible knock-on effects represented by the learning model.
- **Learn the science:** connect the activity to producers, consumers, ecological relationships and ecosystem balance.

**Important:** EcoWeb Architect is an educational simplification. Its simulated outcomes are intended to explain ecological concepts; they are not field data or predictive ecological forecasts.

## 📚 Subject coverage

The current question set is organised around VTU subject **BCV755B — Conservation of Natural Resources**.

| Module | Focus areas | Questions currently mapped |
|---|---|---:|
| **Module 5** | Global warming, effects of climate change, global environmental agreements and Environmental Impact Assessment (EIA) | Q01–Q04 |
| **Module 4** | Biodiversity, threats and conservation, in-situ/ex-situ methods and biogeochemical cycles | Q05–Q08 |
| **Module 3** | Air-pollution-control equipment and ozone depletion | Q09–Q10 |

The question catalogue and answer content are maintained separately from the main interface to make subject-content updates easier.

## 🎨 A study space that adapts

- Dark and light appearance modes.
- Multiple neon accent palettes: Ultra Cyber, Arctic Neon, Purple Cyber and Eco Neon.
- Adjustable reading text size and content width.
- Responsive layouts for desktop, tablet and mobile screens.
- Keyboard-friendly controls and semantic interface elements across supported experiences.

## 💾 Your progress, your browser

The application stores supported learning state locally in the browser using `localStorage`. This includes items such as bookmarks, completion state, settings and supported practice/revision history.

- No application backend is required for the core experience.
- Your local study state is tied to the browser and device where you use the app.
- Clearing browser storage or site data can remove locally saved progress.
- Use the in-app **Data Backup** experience where available before changing devices or clearing site data.
- Local browser storage is not the same as cloud synchronisation.

## 🛠️ Built with

| Technology | Role |
|---|---|
| [React 18](https://react.dev/) | Component-based user interface |
| [Vite 5](https://vite.dev/) | Development server and production build |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Interface icons |
| JavaScript (ES modules) | Application logic and learning interactions |
| Browser APIs | Local persistence and progressive web app support |

The project includes a service worker and generated precache manifest as part of its build pipeline.

## 🚀 Run it locally

### 1. Prerequisites

- Node.js (a current LTS release is recommended)
- npm

### 2. Clone the repository

```bash
git clone https://github.com/shankar-uxcloud/CNR-ia-2.git
cd CNR-ia-2
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

### 5. Run the checks and production build

```bash
npm test
npm run build
npm run preview
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm test` | Run the Node.js test suite |
| `npm run build` | Generate the production app in `dist/` |
| `npm run preview` | Preview the production build locally |

## 🗂️ Project structure

A quick map of the codebase:

```text
CNR-ia-2/
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared UI, shell and learning components
│   ├── data/
│   │   ├── answers/        # Structured module-wise answer content
│   │   └── questions.js    # Question catalogue and module mapping
│   ├── diagrams/           # Reusable subject diagrams
│   ├── lib/                # Routing, study state and shared logic
│   ├── pages/               # Main learning experiences and screens
│   ├── pwa/                 # Service worker
│   └── App.jsx              # Application routing and composition
├── tests/                   # Automated tests
├── index.html
├── package.json
└── vite.config.js           # Vite and PWA precache build configuration
```

*The tree highlights the main application areas; individual files may change as the project grows.*

## ✍️ Updating study content

The question catalogue and answer data are intentionally separated from the UI.

- **Question text, titles and module mapping:** `src/data/questions.js`
- **Module 5 answers (Q01–Q04):** `src/data/answers/module5.js`
- **Module 4 answers (Q05–Q08):** `src/data/answers/module4.js`
- **Module 3 answers (Q09–Q10):** `src/data/answers/module3.js`
- **Reusable diagrams:** `src/diagrams/`
- **Diagram registration:** `src/diagrams/index.js`

Structured answer blocks support paragraph, list, table, equation, diagram, note and key-content patterns. Keep content changes aligned with the question's module and verify the rendered answer after editing.

## 🧪 Quality checks

Before submitting a change, run:

```bash
npm test
npm run build
```

Please also verify the affected screen at a narrow mobile width and a desktop width. For changes to study content, check that diagrams, tables and highlighted terms render correctly.

## 🤝 Contributing

Contributions, suggestions and bug reports are welcome.

1. Open an issue describing the problem or proposed improvement.
2. Create a focused branch from the appropriate base branch.
3. Keep changes small and consistent with the existing React/Vite structure.
4. Run the test suite and production build.
5. Open a pull request with a clear summary, screenshots for visual changes and any relevant test notes.

Please avoid committing secrets, personal data, generated build output or local environment files.

## 🧩 Current project principles

- **Learning first:** interactions should reinforce a subject concept.
- **Clarity over clutter:** keep explanations and navigation understandable.
- **Accessible by design:** favour semantic HTML, readable contrast and keyboard-operable controls.
- **Lightweight by default:** avoid unnecessary dependencies and backend complexity.
- **Honest simulations:** clearly distinguish educational models from real-world predictions.

## 🗺️ Road ahead

The project can continue growing through richer subject coverage, deeper visual explanations, more practice scenarios, improved revision insights and refinements driven by learner feedback.

Ideas and focused contributions are welcome through [GitHub Issues](https://github.com/shankar-uxcloud/CNR-ia-2/issues).

---

<div align="center">

### 🌱 Learn the science. Understand the systems. Make every revision count.

**VTU ExamPrep · Conservation of Natural Resources**

[Launch VTU ExamPrep](https://shankar-uxcloud.github.io/CNR-ia-2/) · [View source on GitHub](https://github.com/shankar-uxcloud/CNR-ia-2)

<sub>Built with curiosity, code and a commitment to better learning.</sub>

</div>
