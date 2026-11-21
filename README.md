# PenCom website: "calm" theme (Next.js)

The calm homepage design (built first for older readers and retirees; original route `/home-retirees`) as its own
Next.js project, copied from the showcase theme. Pages are restyled session by session (see `SESSIONS.md`).

## Run

```bash
npm install
npm run dev          # http://localhost:3013 (PORT=3023 npm run dev to change)
npm run build && npm start   # production; listens on $PORT
```

## Layout

- `src/app` – routes (Next.js App Router). `page.tsx` is the home page.
- `src/views` – page sections (home: `HomeCalm.tsx`, `homecalm/` from session C1).
- `src/components` – header, footer, notices bell, assistant, popups, accessibility.
- `src/i18n` – English, Hausa, Yoruba and Igbo (drafts for review).
- `src/lib/router.tsx` – lets the shared components use react-router style links on Next.js.
# pencom-theme-calm
