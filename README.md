 CNR

React + Vite + Tailwind CSS + lucide-react. No backend; progress, bookmarks, theme and reading settings are stored in `localStorage`.

## Run
```bash
npm install
npm run dev        # development
npm run build      # production build in dist/ (works from any static host or by opening via a local server)
npm run preview
```

## Updating answers (content is separate from UI)
- `src/data/answers/module5.js` – Q01–Q04
- `src/data/answers/module4.js` – Q05–Q08
- `src/data/answers/module3.js` – Q09–Q10
- `src/data/questions.js` – question text, titles, module classification

Block types: `p`, `list`, `table`, `eq`, `diagram`, `note`, `key`. Wrap keywords in `**double asterisks**` to highlight.
Note kinds: `added` (explanation not in the notes) and `gap` (information missing from the notes).

## Diagrams
SVG components in `src/diagrams/` (shared helpers in `kit.jsx`), registered in `src/diagrams/index.js` and referenced by id from the answer files.

## Source mapping
Q01←M5 Q1 · Q02←M5 Q3 (+Q6 detail) · Q03←M5 Q7 · Q04←M5 Q8 (+Q9 categories) · Q05←M4 Q1 + Q7 · Q06←M4 Q2 (+M5 Q6) · Q07←M4 Q3 · Q08←M4 Q10 · Q09←M3 Q7 · Q10←M3 Q9 + Q10
The uploaded documents contain no page numbers or figures, so none are cited.
