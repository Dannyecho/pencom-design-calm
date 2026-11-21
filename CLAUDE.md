# Theme "calm" (Next.js): developer guide

The calm homepage design (`app/src/pages/HomeCalm.tsx` + `homecalm/`, original route `/home-retirees`), built first
for older readers and retirees (DES-41), and every inner page rebuilt to match it. **Copied from `themes/showcase`
on 21 November 2026** (not from everyone), to keep showcase's bug, contrast and focus fixes and its kit helpers:
content, routes, data, i18n and the router adapter are the same; only the look changes. Read `../../CLAUDE.md` and
`../../docs/HANDOFF.md` first. The build plan is `SESSIONS.md` (run it with `/session calm`).

## Look

Simple and modern, with a few well-chosen effects, and **calmer than the other themes**: easy on the eyes, never busy.
If a page feels busy, take an effect away.

- **Type:** body text 18 px or larger (`text-lg`), card titles `text-xl font-bold`, section titles `font-bold` (never
  `font-black`) at `text-3xl sm:text-4xl lg:text-[2.75rem]`, `leading-[1.12] tracking-tight`. Plain words, labelled
  controls (words next to icons), fewer choices on screen at once.
- **Section titles** (the calm `SectionHeading`, from `app/src/pages/about/primitives.tsx`): eyebrow pill
  (`bg-[#E8F5E9]/80`, dark-green uppercase text, `tracking-[0.18em]`) with a green gradient dot that pulses twice and
  one shimmer sweep; ink title whose `highlight` phrase has a green→gold gradient and a hand-drawn gold underline that
  draws in; with no highlight, a short green→gold bar grows in. Optional `center`; `dark` switches to light gold.
  **No numbers, no ghost words.**
- **Backgrounds:** cream page `#FBF8F1`, ink `#14261A`, white sections, warm panels `#F1EFE8`, mint `#E8F5E9`.
  At most **one dark-green inset panel per page** (`#0A4A13`, `rounded-[2rem]`, inside `max-w-7xl`, one soft gold blur
  `bg-[#CB9615]/20 blur-3xl`). No near-black bands, no grid, no glass.
- **Cards:** `rounded-3xl bg-white ring-1 ring-black/10`; hover lifts 4 px, `ring-2 ring-[#117F21]`, soft green shadow
  (`0_28px_50px_-28px_rgba(10,74,19,0.55)`), optional mint corner bubble that grows. Icon tiles `#0A4A13` with gold
  `#F4D27A` icons, tipping `-6deg` on hover. Arrow icons move 4 px inside the card.
- **Buttons:** `min-h-14 rounded-2xl px-6 text-lg`; primary gold `#F4D27A` / text `#1A1206` (hover `#FFE08F`);
  secondary `border-2 border-[#117F21]` outline that fills green. Pills white with a green ring, filling dark green on
  hover. Gold text on light backgrounds is `#7A5200`. Focus ring `#FFD84D` 3 px.
- **Motion:** `Rise` (fade + 24 px up, once), slow Ken Burns zoom on hero photos, arch-framed photo with a gold
  outline, the drawn underline, the eyebrow pulse. **Not used:** pointer spotlight, 3D tilt, ghost words, glass tiles,
  gold-gradient count-ups, drifting words, rotating arrow chips. One or two signature moments per page; reduced motion
  respected (`MotionConfig reducedMotion="user"`).
- **Page hero:** light, in the style of the homepage WelcomeBar and slider panel: cream, crumbs, eyebrow pill, bold
  title with the drawn underline, 18 px intro, large labelled actions; aside or photo in a white `rounded-[2rem]` card
  or arch frame. **Text never sits over a photo.**
- **Page pattern:** `<MotionConfig reducedMotion="user"><div className="bg-[#FBF8F1] text-[#14261A]"> light PageHero →
  SectionNav → sections alternating cream and white, one #0A4A13 inset panel at most </div></MotionConfig>`.

## Status

In progress. C0 (scaffold) done on 21 November 2026: the project is still a straight copy of showcase (homepage,
kit and pages look like showcase). The sections below about the kit, home folder and pitfalls describe the
**showcase code as copied**; C1 (homepage) and C2 (kit) rewrite them. Progress: `SESSIONS.md`.

## Run

```bash
npm install
npm run dev            # http://localhost:3013   (PORT=3023 npm run dev to change)
npm run typecheck      # tsc --noEmit
npm run build && npm start
```

Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind 3, framer-motion 12, lucide-react. No UI library.
`next.config.ts`: `reactStrictMode`, `images.unoptimized`, `devIndicators: false` (the badge covered the quick-links button).

## Layout of the code

```
src/app/                 routes only: each page.tsx exports metadata and renders a view
  page.tsx               home  → views/HomeShowcase
  [...slug]/page.tsx     "being redesigned" placeholder for pages not built yet (sections map; now only mobile, admin)
  news/[slug], regulations/doc/[id]   generateStaticParams + generateMetadata (Next 16: params is a Promise)
  resources/chronicles   redirect("/chronicles")
src/views/<page>/        everything for one page: <Name>Page.tsx (client), sections, data
src/views/theme/         the theme's look, shared by every inner page: ui.tsx, Headline.tsx, heading.tsx, Ghost.tsx
src/views/homeshowcase/  the home page: Banner, Sections (dock, search, alerts, circulars, portals, news, figures, help), Title
src/views/docs/kit.tsx   document pages (Act, regulation docs, Q1 report, forms): DocHero, Toc, ReadingBar, PdfCard…
src/views/about/primitives.tsx   scrollToId + sectionAliases (old anchors), CountUp, Spotlight, Tilt, reveal
src/components/          site chrome: layout/Layout, Header, Footer, NoticesBell, PromoPopup, CookieConsent,
                         chat/Chatbot, QuickLinks, AccessibilityWidget, LanguageSwitcher, LanguageNotice
src/lib/router.tsx       react-router-style API on top of next/navigation (see below)
src/lib/data.ts          navigation (mega menus), news list, operators summary
src/i18n/                language engine + Hausa/Yoruba/Igbo dictionaries
public/                  images, documents/text/*.json (web versions of PDFs), magazine PDF, videos
```

`src/pages` is reserved by Next.js, which is why page code lives in `src/views`.

### Routes built

`/`, `/about`, `/about/service-charter`, `/services`, `/operators`, `/resources`, `/resources/faq`,
`/resources/forms-and-checklists`, `/resources/reports/q1-2026`, `/regulations`, `/regulations/pension-reform-act`,
`/regulations/doc/[id]` (197 pages), `/connect`, `/news`, `/news/[slug]`, `/performance`, `/media`, `/chronicles`.
Still placeholders: `/mobile`, `/admin` (see HANDOFF).

## The router adapter (`src/lib/router.tsx`)

Ported pages keep react-router code. Import from `@/lib/router`, never `react-router` or raw `next/link` in views:

- `<Link to="/x#y">` (string or `{pathname, search, hash}`), `preventScrollReset` maps to `scroll={false}`.
- `useLocation()` → `{ pathname, search, hash }` (hash is tracked; `history.pushState` is patched to emit `pencom:locationchange` via `queueMicrotask`).
- `useNavigate()(to, { replace, preventScrollReset })`.
- `useSearchParams()` → `[params, set]`; `set(next, { replace: true, preventScrollReset: true })` for filters kept in the URL.

## The theme kit (what makes a page look like this theme)

`src/views/theme/ui.tsx`
- `PageHero({ id, crumbs, pill: {icon,label}, title, mark, intro, actions?, aside? })`: dark cinematic hero
  (`#04140A`, `DarkBackdrop` glows + grid), gold pill tag, `font-black` title with the `mark` phrase in the light-gold
  gradient, and the pill label as a drifting ghost word along the bottom. It translates the whole title and then finds
  the translated mark in it (case-insensitive). `actions` and `aside` default to dark ink (`text-[#0B1F10]`), so white
  cards in them read correctly; loose text in `actions` must set its own light colour (`text-white/70`).
- `FramedPanel`: white `rounded-[1.75rem]` card floating on the hero, thin gold-to-green edge, pointer spotlight.
- `DarkBackdrop`, `spot`: the near-black band background and the pointer-spotlight handler.
- `SectionNav({ sections, pillId })`: sticky rounded pill bar; active pill `#0B1F10` with gold text. About uses it too.
- `Modal`, `Drawer`: accessible dialogs (focus in and back, Escape, scroll lock).
- `Rise` (26px), `ease`, `focus` (yellow focus ring), `sectionCls` (`py-20 sm:py-28`, `overflow-x-clip`).

`src/views/theme/Headline.tsx` + `heading.tsx` + `Ghost.tsx`
- `SectionHeading({ id, eyebrow, title, highlight?, intro?, action?, dark?, stacked?, n? })` → `theme/Headline`:
  ghost word, pill tag, heavy title, green→gold gradient highlight (light gold on `dark`). **No numbers**: `n` is
  accepted and ignored. Put a section's controls in `action`. Use `stacked` in narrow columns.
- `Ghost({ word, dark?, clip? })`: the outlined drifting word. Clipped to its own box by default so it can't widen the
  page; the home page passes `clip={false}` (its sections clip). `ghostWord(kicker)` maps long kickers to one word
  (`ghostFor` table); short kickers are used as they are. Ghost words go through `t()`.

`src/views/docs/kit.tsx`: `DocHero` is the dark hero for documents (print stays white), meta in a floating white
grid; `PrimaryBtn` gold pill, `GhostBtn` white pill; `ReadingBar` at the very top of the window.

Colours: near-black `#04140A` (heroes, dark bands), ink `#0B1F10`, dark green `#0A4A13`, green `#117F21`,
gold `#CB9615`, light gold `#F4D27A`, page white, soft band `#F2F6F0`, mint `#E8F5E9`, focus `#FFD84D`.

Page pattern: `<MotionConfig reducedMotion="user"><div className="bg-white text-[#0B1F10]"> dark Hero → SectionNav →
ghost-word sections (alternating white and #F2F6F0, one near-black #04140A band per page at most, with the glow and
grid layers) </div></MotionConfig>`.
Exceptions on purpose: news stories keep a dark photo header; Chronicles has a hand-built serif masthead.

## Conventions and pitfalls (each one bit us once)

- **Server rendering:** no `window`/`localStorage`/`navigator`/`innerHeight` during render or in `useState(() => …)`.
  Initialise with a constant, read in `useEffect`, and gate saving with a `ready` flag so you don't overwrite storage.
- **Mobile overflow:** never animate cards in from the side (`initial={{ x: 20 }}` on `whileInView`): offscreen cards
  keep the offset and widen the page on phones. Use `y`.
- **Highlight phrases:** must be a substring of the title in every language (check after a translation pass).
- **Old links:** hash anchors and `sectionAliases` keep working; pages handle `#id` with two `scrollToId` calls
  (80 ms smooth, 900 ms instant) because sections render late.
- **Data honesty:** placeholders are labelled on the page (PFA returns are sample figures; news items are drafts until
  the CMS). Don't invent office hours, figures or names.
- **External libraries at run time** (pdf.js was): load with `new Function("u","return import(u)")(url)` so the bundler
  ignores them. The flip-book reader was removed at the user's request.
- **Content headings that are split into animated words/letters** (story titles, Chronicles masthead) carry
  `data-no-translate`, or the translator will translate single words.
- **Dev server goes stale:** when several files change at once (or a file is written by another tool), Turbopack can
  keep an old module: hydration errors that name an old line, `X is not a function`, or headings numbered "—".
  Fix: restart `npm run dev`, or make a real edit to the stale file. Check server HTML with
  `curl -s localhost:3013/<page>` before blaming the code.
- After changing a shared kit file, re-check two other pages that use it.

## Languages (`src/i18n`)

- English is the official version. Hausa, Yoruba and Igbo are **drafts** for review by PenCom staff
  (questionnaire DES-39). The site starts in English on the server and applies the saved language after mount.
  `?lang=ha|yo|ig|en` in the address switches and saves the choice (`localStorage pencom:lang`).
- `dom.ts` (DomTranslator) swaps whole text nodes and `aria-label/placeholder/title/alt` by exact English key
  (whitespace collapsed, curly quotes straightened), watches the DOM, and marks leftovers `lang="en"`.
  Keys may contain placeholders: `"Showing {shown} of {total} items"`, `"Call {name}"` (`{n}`,`{shown}`,`{total}`,`{count}`
  match digits; `{name}` must start with a capital; others match any text; a captured value is itself translated if
  the dictionary has it).
- Components can call `t("English", vars)` from `useI18n()`; Headline/PageHero/About hero do this for whole titles.
- `/regulations/*` is always English (`isLegalPath`). Content stays English by policy: names, addresses, dates,
  figures, document titles, news story text, the Q1 report text, the signed charter text, media captions.
- Dictionaries: `dict/ha.ts`, `yo.ts`, `ig.ts` have identical keys (1,652 each). New entries go in a marked section at
  the end. Tools and the full procedure: `tools/i18n/README.md` and `/i18n-pass`.

## Verify before you report

`npm run typecheck` → `npm run build` → open the page in a browser at desktop width and at 390 px:
every section renders, highlights and numbers are right, no horizontal scroll
(`document.documentElement.scrollWidth === clientWidth`), interactive bits work (filters update the URL, dialogs
open/close with Escape and return focus), console has no errors on a clean reload, and in one other language
(`?lang=yo`) the headings and highlights look right. Then set the browser back to English (`?lang=en`).
