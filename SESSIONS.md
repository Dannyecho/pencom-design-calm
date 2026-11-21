# Calm theme: build and page-styling sessions

The calm homepage (`app/src/pages/HomeCalm.tsx` + `homecalm/{Showcase,Sections}.tsx`, original route `/home-retirees`),
built first for older readers and retirees (DES-41), and every inner page rebuilt to match it. Folder `themes/calm`,
dev port **3013**. The project is **copied from `themes/showcase`** (to keep its bug, contrast and focus fixes and its
kit helpers), but section titles, page heroes and headers follow the calm homepage, not showcase.

Run the sessions in order with `/session` (next pending), `/session C5a` (a specific one) or `/session calm status`.
The command is in `.claude/commands/session.md`. C0–C3 are setup sessions: follow their notes instead of the
page-restyle steps. C4 is an audit. C5a–C16 restyle one page (or one part of a long page) each. C17 closes the theme.
After each session: verify, update its row here, commit in `themes/calm` (one commit per session, never push).

Status values: `pending`, `partial` (notes say what is left), `done (date)`.

## The target look (calm)

The goal is **simple and modern, with a few well-chosen effects, and calmer than the other themes.** It should be easy on the eyes and never busy.
If a page feels busy, take an effect away.

- **Type:** body text is 18 px or larger (`text-lg`), card titles `text-xl font-bold`, section titles `font-bold` (never
  `font-black`) at `text-3xl sm:text-4xl lg:text-[2.75rem]`, `leading-[1.12] tracking-tight`. Plain words. Labelled
  controls (words next to icons), and fewer choices on screen at once.
- **Section title** (from `SectionHeading` in `app/src/pages/about/primitives.tsx`, as used by `homecalm`): an eyebrow pill
  (`bg-[#E8F5E9]/80`, dark-green text, uppercase `tracking-[0.18em]`) with a small green gradient dot that pulses twice and one
  white shimmer sweep. Then the title in ink, with its `highlight` phrase in a green→gold gradient and a hand-drawn gold
  underline that draws in. With no highlight, a short green→gold bar grows in under the title. It can be centred (`center`).
  On the dark panel (`dark`) it switches to light gold. **No numbers and no ghost words.**
- **Backgrounds:** cream page `#FBF8F1`, ink text `#14261A`, white sections, warm panels `#F1EFE8`, mint `#E8F5E9`.
  **At most one dark-green inset panel per page:** `#0A4A13`, `rounded-[2rem]`, inside `max-w-7xl` (not full-bleed),
  one soft gold blur in a corner (`bg-[#CB9615]/20 blur-3xl`). No near-black bands, no grid, no glass.
- **Cards:** `rounded-3xl bg-white ring-1 ring-black/10`. On hover the card lifts 4 px (`hover:-translate-y-1`), gets
  `hover:ring-2 hover:ring-[#117F21]` and a soft green shadow (`0_28px_50px_-28px_rgba(10,74,19,0.55)`), and an optional
  mint corner bubble grows (`group-hover:scale-150`). Icon tiles are `#0A4A13` with gold `#F4D27A` icons and tip
  `-6deg` on hover. Arrow links move 4 px to the right **inside** the card (`group-hover:translate-x-1` on the icon only).
- **Buttons:** large (`min-h-14 rounded-2xl px-6 text-lg`). The primary is gold `#F4D27A` with text `#1A1206`, turning `#FFE08F` on hover.
  The secondary is a `border-2 border-[#117F21]` outline that fills green on hover. Pills are white with a green ring and fill
  dark green on hover. Gold text on light backgrounds is `#7A5200`. The focus ring is `#FFD84D` 3 px.
- **Motion:** `Rise` (fade + 24 px up, once), a slow Ken Burns zoom on hero photos, an arch-framed photo with a gold
  outline, the drawn underline, the eyebrow pulse. **Not used:** pointer spotlight, 3D tilt, ghost words, glass tiles,
  gold-gradient count-ups, drifting words, rotating arrow chips. Use one or two signature moments per page.
  `MotionConfig reducedMotion="user"` on every page.
- **Page hero:** light and calm, in the style of the homepage WelcomeBar and slider panel. It sits on cream with crumbs, the eyebrow pill,
  a bold title with the drawn underline, an 18 px intro and large labelled actions. The aside or photo goes in a white `rounded-[2rem]` card
  or an arch frame. **Text never sits over a photo.**
- **Page pattern:** `<MotionConfig reducedMotion="user"><div className="bg-[#FBF8F1] text-[#14261A]"> light PageHero →
  SectionNav → sections alternating cream and white (warm `#F1EFE8` for inset panels), one `#0A4A13` inset panel at most
  </div></MotionConfig>`.

### Calming down the showcase leftovers (applies in every page session)

| Showcase has | Calm uses |
| --- | --- |
| `#04140A` full-bleed band with `DarkBackdrop` | the page's one `#0A4A13` inset panel, or a white or cream section |
| ink `#0B1F10` buttons, pills, tiles | dark green `#0A4A13`, hover `#117F21` |
| `#F2F6F0` bands | white or cream `#FBF8F1` sections; `#F1EFE8` inset panels |
| pointer spotlight (`spot`, `glowLight`, `glowDark`), `Tilt` | the calm card hover (lift, green ring, bubble) |
| glass tiles (`bg-white/[0.0x]`, `backdrop-blur`) | white cards, or `bg-white/[0.07] ring-white/10` inside the green panel only |
| gold-gradient count-ups | plain bold ink figures; one count-up per page at most |
| mono counters "01", outlined numerals, ghost letters | removed; real steps become gold number tiles (`h-14 w-14 rounded-2xl bg-[#F4D27A]`) |
| `font-black` heavy titles | `font-bold` |
| text below 18 px in body copy | one size up (`text-base` → `text-lg`); small meta can stay `text-base` |
| rotating arrow chips | a plain arrow that moves 4 px |

## Grep check

Run it on the files in scope for each session. It should print nothing:

```bash
grep -nE '#04140A|#0B1F10|#F2F6F0|#0E2414|#0A2E10|#FBFCF9|#F6F8F3|DarkBackdrop|Ghost|<Tilt|<Spotlight|GridBackdrop|glowLight|\{spot\}|glowDark|font-black|ring-black/5|scroll-mt-\[160px\]' <files>
```

C2 retired `Spotlight`, `GridBackdrop` and `glowLight` (added above). In the kit files themselves the only hits are the
no-op compat exports (`Ghost`, `DarkBackdrop`, `spot`) and `GhostBtn`; those are expected. `DarkBackdrop` is still the
right call for a page's one green panel (it paints `#0A4A13` + the gold blur), so page sessions may keep it there.

Paths below are relative to `src/views/` unless they start with `src/`.

| ID | Page / route | Files in scope | Status |
| --- | --- | --- | --- |
| C0 | Scaffold `themes/calm` from showcase | root files, `CLAUDE.md` | done (2026-11-21): showcase copied (no `.git`, `node_modules`, `.next`); package `pencom-theme-calm`, dev port 3013; install, typecheck and build pass (197 doc pages); `CLAUDE.md` has the calm Look and status; README updated; git baseline |
| C1 | Homepage `/` | `HomeCalm.tsx`, `homecalm/*`, `src/app/page.tsx` | done (2026-11-21): calm homepage ported (WelcomeBar, slider, TopTasks, RetireeSteps, notices, news, help) with a local calm title in `homecalm/Title.tsx`; `HomeShowcase` + `homeshowcase/` removed; 44 px targets on slide numbers, search button and notice links |
| C2 | Theme kit (heading, hero, panels, dialogs, document kit) | `theme/*`, `docs/kit.tsx`, `about/primitives.tsx` | done (2026-11-21): calm `Headline`/`SectionHeading` (+`center`, shared `DrawnMark`), light `PageHero`/`DocHero` with `Crumbs` + `EyebrowPill`, white `FramedPanel`, green `DarkBackdrop`, white `SectionNav`, dialogs with a cream bar and labelled Close, gold/outline doc buttons; Ghost/spot/Spotlight/Tilt/GridBackdrop/glowLight are no-ops; `homecalm/Title.tsx` removed |
| C3 | Site chrome, placeholder, 404 | `src/components/**`, `src/app/not-found.tsx`, `src/app/[...slug]/page.tsx` | done (2026-11-21): calm header (larger menu, labelled Search/Menu, white rounded-3xl mega menus that also open on keyboard focus, working SiteSearch panel), dark-green footer with a cream newsletter card and 18 px links, NoticesBell/Promo/Cookie/QuickLinks/Language/Chat/A11y widget in calm tokens with 44 px targets, cream 404 and placeholder; Notices no longer opens by itself (user's choice), cookie banner waits for the promo; 17 new i18n keys |
| C4 | Baseline audit, all routes | none edited | done (2026-11-21): 22 routes at 1400/390 px: all 200, one h1 each, no sideways scroll, no console errors or hydration warnings; grep 818 matching lines in 35 files of `src/views` (worst: operators 58, Article 58, performance 57); "Audit (C4)" lines added under each session; no code changed |
| C5a | About part 1 `/about` | `about/AboutPage.tsx`, `about/sections.tsx` (overview, mission, structure) | done (2026-11-21): kit `PageHero` with gold/outline actions and the boardroom photo in a gold-outlined arch (Ken Burns) over a white figures card (the page's count-up); mandate and values as calm cards with green icon tiles; mission is the green inset panel, vision a white card with a gold edge; org chart in white cards with thin green lines; `Ghost` import gone |
| C5b | About part 2 `/about` | `about/sections.tsx` (executive, history, charter) | done (2026-11-21): history timeline with green year dots, scroll-filled green→gold line and calm cards (mint figure chips, 18 px body); leadership on white with the DG photo in a gold-outlined frame (words below, not on the photo) and team calm cards; profile dialog now uses the kit `Modal`; charter teaser is a warm `#F1EFE8` panel with plain figures in white cards, gold CTA + outline "Tell us", white visit card; `CountUp`/`spot`/`glowLight`/`DarkBackdrop` gone from the file |
| C6 | Service Charter `/about/service-charter` | `charter/CharterPage.tsx` | done (2026-11-21): cream page; hero with gold "Signed PDF" + outline complaint buttons and a white "At a glance" card with plain bold figures; standards on white (cream search tray with a 56 px field and labelled department select, white cards with green time tiles that tip, 18 px requirement lists, large print/ask buttons); complaints is the green inset panel with gold step tiles 1–4; promise on white with a warm mission panel and value cards with icon tiles; full text 18 px base (20/22 px steps), calm contents rail; `spot`/`glowLight`/dark gradients gone |
| C7 | Services `/services` | `services/ServicesPage.tsx`, `services/Calculator.tsx` | done (2026-11-21): cream page; hero picker with a gold "Show me how" and a white tile card (from `sm` up); journeys on white with a cream rail (solid green active pill, audience under each name), white panel with a green header, gold step tiles 1–n, warm eligibility check with 48 px Yes/No, warm "Where to go next" with a gold button; calculator is the green inset panel (white slider card with 28 px thumbs, white results card with plain ink figures, green chart, breakdown colours ≥3:1 on white); portals as calm task cards (tilt gone); help in the TalkToUs style; handoff dialog with a mint header and gold/outline buttons |
| C8 | Operators `/operators` | `operators/OperatorsPage.tsx` | done (2026-11-21): cream page; hero figures as white cards (plain ink count-up) and a licence check with a visible label, 56 px field and 18 px results; directory on white with a cream toolbar (white tab bar, labelled City/Layout pill groups), calm operator cards with a mint bubble and labelled Call/Email/Website/Map in a 2×2 grid; how it works in a warm panel with icon-tile cards (no "01" counters, gold dot runs once); funds is the green inset panel (white selector with large radio rows and a 28 px slider thumb, "your fund" white with a gold edge); performance a white card with a gold button, complaints card with an outline button; drawer has a mint header and dark-green detail tiles; `spot`/glows/`Chip`/`darkBtn` gone |
| C9a | Resources part 1 `/resources` | `resources/ResourcesPage.tsx`, `resources/Guides.tsx` | done (2026-11-21): cream page; hero search is a labelled `role=search` form (56→64 px field, 18 px placeholder, gold labelled Search button that moves focus to the first result), results in-flow in a white card with icon tiles and a moving arrow; "What's here" as cream rows with icon tiles and plain ink counts; guides as calm cards (mint bubble, icon tile, 18 px intro, Tilt/spot/watermark gone); guide dialog light (cream header, gold Listen, outline Print, labelled text size), checklist with a warm progress panel, steps as gold number tiles on a filling line |
| C9b | Resources part 2 `/resources`, `/resources/faq` | `resources/Library.tsx`, `resources/FaqGlossary.tsx`, `resources/compat.tsx` | done (2026-11-21): FAQ on cream as a calm accordion (20 px questions, mint category pill, no counters, labelled search field and pill filters in a warm tray, labelled Yes/No buttons, white "Still have a question?" card); glossary on white as simple cards that open (no flip, no ghost letters, 48 px letter pills); publications on cream (Q1 feature as a white card with a gold edge, three flat covers green/mint/gold with a gentle lift, solid-green tabs and year pills, white quarter and annual cards); downloads on white (calm form rows, warm "In your language" panel); learning is the page's green inset panel with a gold play button and the video title below the picture |
| C10 | Forms + Q1 report `/resources/forms-and-checklists`, `/resources/reports/q1-2026` | `forms/FormsPage.tsx`, `report/ReportPage.tsx` | done (2026-11-21): forms on cream with gold/outline hero actions; checklists on white (pill filters with a tick, calm list cards with gold/green count tiles and a progress line, open list a white card with the green header, gold blur and 96 px gold ring, 28 px boxes, 18 px items, gold Print + outline Start again); forms on cream as calm cards (mint bubble, labelled "Download", 20 px titles) with a visible "Find a form" label and 56 px field; "Applying online?" a white card with an icon tile. Report body on white at 18 px base (local `sizes`), tiles as white figure cards with plain ink figures, domain status rows 18 px, DG quote is the green inset panel, cols/priorities calm, domain tabs as pills; Tilt/spot/CountUp gone |
| C11a | Regulations library `/regulations` | `regulations/RegulationsPage.tsx`, `regulations/Sections.tsx`, `regulations/Library.tsx`, `regulations/DocDrawer.tsx` | done (2026-11-21): cream page; hero has a labelled search (56 px field, gold Search), "Try" pills and white type cards (the page's one count-up, plain ink), aside a white card with cream "Latest issued" rows and a warm Act link with an icon tile; latest rail on white as calm cards (gold ring on the newest, labelled Back/More buttons); library on cream with a solid white sticky bar (visible Search/Sort labels), 28 px facet boxes in 48 px rows, calm result cards (icon tile, 20 px titles, outline PDF), gold/outline empty state; the Act is the green inset panel (gold active tab, white provision card, warm stat with a plain figure); compliance on cream with a green progress line and 32 px boxes; policies on white as calm cards; drawer header mint with gold PDF + outline "Open full page"; fixed `?doc=` dropping `q` |
| C11b | Act + regulation docs `/regulations/pension-reform-act`, `/regulations/doc/[id]` | `regulations/PensionAct.tsx`, `regulations/RegDocPage.tsx` | done (2026-11-21): cream pages; Act search a solid white sticky pill (18 px field, labelled Clear, green count badge); popular sections as calm cards with green number tiles; part headers warm `#F1EFE8` panels with a dark-green numeral tile (no ghost numbers); section cards with green tiles, labelled 44 px Copy link / PDF page tools, `?s=` gold ring; docs: warm newer-version banner with a gold button, dark-green pill tabs, tables with a green header and cream zebra rows, calm related cards; kit `sizes` now 18/20/22 px; unknown ids answer HTTP 404 |
| C12a | Connect part 1 `/connect` | `connect/ConnectPage.tsx`, `connect/Sections.tsx` | done (2026-11-21): cream page; hero action cards in the TalkToUs style (green icon circle, 20 px title, 18 px line; a compact row under 420 px), aside a white panel with a mint header, icon-tile Call/Email/Head office rows, gold labelled chat button (`openChat`) and 44 px social pills; tracker is the green inset panel (visible "Case reference" label, 56 px field, gold Track, result as a white card with green/gold step tiles and a green→gold filling line, not-found as a white card with a red edge); offices on white (warm map panel without the dot grid, 56 px labelled state select, white office card with a green→gold top edge, icon tiles, gold Get directions); newsroom on cream (outline "Open the newsroom", lead story with the photo above the text, calm cards, media enquiries a warm panel); `spot`/`glowLight`/`darkCard`/rotating chips/ghost city name gone |
| C12b | Connect part 2 `/connect` | `connect/CaseForm.tsx` | done (2026-11-21): `#contact` is white; reassurances in a warm panel with icon tiles; form in a white `rounded-[2rem]` card with a cream step bar (gold number tiles, sliding dark-green pill, "Step n of 3" line on phones); white topic cards with mint bubble that turn dark green when chosen; 56 px inputs, 18 px labels, 16 px hints and errors; focus moves to each step heading, error summary first, confirmation keeps its callback-ref focus; reference in a warm panel with a labelled Copy button; gold Continue/Send/Track, outline Back/Send another; `spot`/`darkCard`/`glowLight` gone; 16 new i18n keys |
| C13a | News catalogue `/news` | `newsroom/NewsCatalog.tsx`, `newsroom/parts.tsx` | done (2026-11-21): cream page; hero search with a visible label, 56 px field and gold Search, figures as white cards (plain ink count-up); top story a white card with the photo above the words (Ken Burns, gold "Top story" pill, 18 px excerpt); filter bar a white two-row card (type chips; labelled Year/Sort selects and Cards/List with words), sticky from `lg` only, count line below it; news cards in the LatestNews style (`calmCard`, no overlay on photos, kind chip and PDF tag under the photo, 20 px titles, labelled Share); galleries on white with a gentle photo stack and "See the photos"; media desk is the green inset panel; outline "Show more news", drafts note in a warm panel; `spot`/`glowLight`/glass/rotating chips gone; 1 new i18n key |
| C13b | News story `/news/[slug]` | `news/Article.tsx` | done (2026-11-21): cream page; the dark photo header is gone: crumbs, category eyebrow pill, date and read time, bold title (words rise, `data-no-translate`, real spaces now) with a growing green→gold bar, 20 px excerpt, then the photo in a rounded frame with an offset gold outline (Ken Burns); story on white at 18/20/22 px (sans), labelled Listen / Text size / Print and labelled share buttons (X, Facebook, LinkedIn, WhatsApp, Copy link); facts as white cards with plain ink figures, quote on mint, callout a warm `#F1EFE8` panel with gold + outline buttons, PDF the page's one green panel with a labelled Download; contents in calm Toc style (44 px rows), media enquiries a warm card; prev/next calm cards, "More from the newsroom" on cream with LatestNews-style cards; missing story a white card with a gold button; reading bar solid white; 6 new i18n keys |
| C14a | Performance part 1 `/performance` | `performance/PerformancePage.tsx`, `performance/Sections.tsx` | done (2026-11-21): cream page; hero figures as white cards with icon tiles and plain ink figures, total-assets card with the page's one counting figure (`Ticker`), mint growth chip, warm tiles; segmented controls are a labelled white pill bar with a dark-green active pill (gold on the green panel); charts sit in plain white `rounded-[2rem]` cards; fund types is the green inset panel with the bars on a white card; coverage cards white, PPP a calm card with a gold edge and gold button, retirees a warm panel with plain figures; compare has a cream tray of labelled controls (56 px Period/Find a PFA, outline Sort button), 24 px boxes in 48 px rows, no rank counters, white "Your comparison" card; fees as calm cards with icon tiles; methodology a calm accordion (20 px questions, no numbers), open data a warm panel with a gold Download CSV; 1 new i18n key |
| C14b | Performance part 2 `/performance` | `performance/charts.tsx` | done (2026-11-21): chart/table switch is a cream pill bar (dark-green active pill, gold text, 48 px), Download CSV/JSON pills with a download icon; tables 16 px on a warm `#F1EFE8` head; area chart without the glow, dashed grid, 13 px gray-600 axis, white tooltip (ink date, green figure, green/red change) measured so it stays inside the chart; donut with a plain bold centre figure and a calm legend (green ring on the active row); columns on a warm track, latest bar gold with an ink figure chip; corporate-debt colour is ink `#14261A`; no new i18n keys |
| C15 | Media `/media` | `media/MediaPage.tsx` | done (2026-11-21): cream page; hero with a gold Watch videos and outline Browse photos button, plain-figure stat cards, slower photo wall in the white frame with a labelled pause pill below it; videos is the green inset panel (gold active topic pill, player in a soft-ringed frame with a gold labelled Play video button, white playlist rows with a gold ring on the current one, white YouTube card); album and photo cards are white with the caption below the photo, gold ring on the chosen album; light lightbox (white bars, labelled Close/Previous/Next, fades up instead of sliding on `x`); follow cards white with a mint bubble, newsroom/Chronicles cards with icon tiles; no new i18n keys |
| C16 | Chronicles `/chronicles` | `chronicles/ChroniclesPage.tsx`, `chronicles/PreviewPages.tsx` | pending |
| C17 | Site-wide sweep and close-out | any | pending |

## Session notes

**C0 Scaffold (setup).** From the workspace root:
`rsync -a --exclude node_modules --exclude .next --exclude .git --exclude 'tools/i18n/.out' --exclude tsconfig.tsbuildinfo --exclude SESSIONS.md themes/showcase/ themes/calm/`
(the `SESSIONS.md` exclude keeps this file). In `package.json` set `"name": "pencom-theme-calm"`, the description, and
port 3013 in the dev and start scripts. Run `npm install`, `npm run typecheck` and `npm run build`. All three must pass before anything changes.
Write `themes/calm/CLAUDE.md`. Copy the showcase guide, then change the title, the port, "copied from showcase on <date>" and the status (in progress). Replace its "Look" section
with "The target look" above. Leave the kit and pitfalls sections as they are for now (C2 rewrites the kit part). Then `git init` in `themes/calm`
and make a baseline commit "Calm C0: copy of showcase as baseline". Check: `npm run dev` serves `http://localhost:3013/`
(still the showcase homepage at this point).
Result: `/`, `/about`, `/regulations/pension-reform-act` return 200 on 3013 and a bad path 404s. `package-lock.json` name updated too. `CLAUDE.md` sections after "Status" (Run, Layout, kit, pitfalls, languages, verify) are still showcase's text with the port changed; C1 updates the home folder lines, C2 the kit section. `AGENTS.md` is Next's auto-generated block (kept).

**C1 Homepage (setup).** Port `HomeCalm.tsx` → `src/views/HomeCalm.tsx` and `homecalm/{Showcase,Sections}.tsx` →
`src/views/homecalm/` using the transform in `/port-page` (`@/lib/router`, SSR-safe, `"use client"`). Sections:
WelcomeBar (the page's h1), Showcase slider (words on a solid green panel, never over the photo; large labelled
Previous/Pause/Next; numbered slide buttons with a gold progress bar; 9 s; holds on hover or focus; no autoplay under reduced
motion; swipe), TopTasks (six task cards + site search + "Not retired yet? I am…" pills), RetireeSteps (the green inset panel
with the arch photo and three gold step tiles), ImportantNotices, LatestNews, TalkToUs. Keep the slide data, `go()` and
`SiteSearch`/`openChat` from the theme's `views/home/`. The `new Image()` preload sits in an effect, which is fine.
For now, give the homepage a local copy of the calm `SectionHeading` in `homecalm/Title.tsx`. C2 makes it the theme heading.
Wire `src/app/page.tsx` to `HomeCalm`. Show the AccessibilityWidget (text size) on the home route as the original
does. Remove `HomeShowcase.tsx` and `homeshowcase/` only once nothing imports them (`theme/Headline.tsx` and `Ghost.tsx`
may: leave them for C2). Check that the images used (`pencom-retiree-family-*`) exist in `public/images/opt`. Verify `/`.
Result: all homepage strings were already in the dictionaries (no i18n pass needed). `Title.tsx` ends the light highlight
gradient on `#9A6B00` (not `#CB9615`) so the phrase keeps 3:1 on white; C2 should carry that into the theme heading, and
its eyebrow is 13–14 px rather than the original 11 px. Nothing imported `homeshowcase/`, so it is gone; `Ghost.tsx` and
`Headline.tsx` stay for C2. **For C3:** the PromoPopup opens over the slider on a first visit and locks scrolling, the
Notices panel also opens by itself, the cookie banner's close button and the popup's "Show banner" dots are under 44 px,
and header/footer are still showcase. Browser checks used Playwright from the npx cache with `/usr/bin/google-chrome`
(Python Playwright is not installed; the Chrome extension was not connected).

**C2 Theme kit (setup).** This makes every inner page take on the calm look in one pass. **Keep all props and export
names** so the pages still compile.
- `theme/Headline.tsx` + `heading.tsx`: `SectionHeading({ id, eyebrow, title, highlight?, intro?, action?, dark?, stacked?, n?, center? })`
  renders the calm title (above). Drop the ghost word. `n` stays accepted and ignored, and `center` is added. The calm homepage
  then uses this one, so delete `homecalm/Title.tsx`. `Ghost.tsx` and `ghostWord` remain only as no-op exports if something
  still imports them; list the importers in C4.
- `theme/ui.tsx`: `PageHero` becomes the light calm hero (see "Page hero" above). It keeps the `mark`-in-translated-title logic
  (now drawn underline + gradient), and `pill` becomes the eyebrow pill. `actions`/`aside` are on light now, so check pages that
  put light text in them (C4 lists them). `FramedPanel` becomes a white `rounded-[2rem]` card with `ring-1 ring-black/10` and a soft
  shadow. `DarkBackdrop` becomes the calm green inset backdrop (one gold blur, no grid). `spot` becomes a no-op handler, so old
  call sites do nothing. `SectionNav` becomes a sticky white pill bar with a dark-green active pill and gold text, `min-h-12`, and 18 px labels on desktop.
  `Modal`/`Drawer` get a light header (cream, ink title, large labelled Close). `Rise` moves 24 px, `focus` stays as it is, and `sectionCls` becomes
  `py-16 sm:py-20` with `scroll-mt-[170px]` and `overflow-x-clip`.
- `docs/kit.tsx`: `DocHero` light (print stays white). `PrimaryBtn` becomes a gold `rounded-2xl min-h-14`, `GhostBtn` a green outline. `ReadingBar`
  is a green→gold line at the top. Calm versions of `glowLight` (empty string), `darkCard` (`bg-[#0A4A13]` rounded card)
  and `ArrowChip` (plain arrow tile, no rotation) keep their names.
- `about/primitives.tsx`: `Spotlight`/`Tilt` render their children without effects, and `CountUp` stays.
- Verify `/about` and `/regulations/pension-reform-act` (kit-heavy) plus `/`. Pages will still look half showcase in places; that is
  expected, and the page sessions fix it.

Result: typecheck and build pass; `/`, `/about`, `/regulations/pension-reform-act`, `/services`, `/resources/reports/q1-2026`
clean at 1400 and 390 px (no overflow, no console errors); Modal (`?guide=transfer-rsa`) and Drawer (operator details) put focus on
Close, close on Escape and return focus; `?lang=yo` headings fine. **For page sessions:** `DarkBackdrop` now paints a solid
`#0A4A13` layer, so every old `#04140A` band shows as a **full-bleed green band** until its page is restyled (several per page
in places): inset the one you keep and turn the rest white/cream. Dialog headers drawn by pages (operator drawer, guide dialog,
doc drawer) are still dark green under the kit's cream Close bar; their `pr-10`/`pr-12` padding for the old round button can go.
New kit exports to reuse: `Crumbs`, `EyebrowPill` (ui.tsx), `DrawnMark` (Headline.tsx). Still importing the no-op `Ghost`:
`chronicles/ChroniclesPage.tsx`, `about/AboutPage.tsx`, `components/layout/Footer.tsx` (remove in C3/C5a/C16). Pages calling
`Headline` directly: operators, about/sections, services (+Calculator), newsroom (+parts), charter.

**C3 Site chrome (setup).** The Header uses the calm tokens: dark green and gold, larger menu text, labelled buttons ("Menu", "Search").
The mega menus are white `rounded-3xl` panels. The Footer is a warm calm footer (`#0A4A13` inset or full-width dark green, but no spotlight, ghost
word or grid; large links with 18 px text and gold headings). Restyle NoticesBell, PromoPopup, CookieConsent, QuickLinks, LanguageSwitcher,
LanguageNotice and Chatbot launcher to the calm tokens. The `[...slug]` placeholder and `not-found.tsx` become calm cream pages
with a large gold CTA (server components: CSS only, no motion). Decide with the user whether the Notices panel should
still open by itself on the first visit; showcase left this open. Verify `/`, `/about` and a 404 at 1400 and 390 px.

Result: header stays **92 px** (28 + 64, no border) because many pages offset sticky bars by 92 px; keep it that way. The
user chose "promo only" for first visits: NoticesBell's auto-open preview is off (the preview code is still there, unused), and
CookieConsent waits for `pencom:promo-done` so the two never stack. LanguageNotice now reads sessionStorage in an effect (was
in a `useState` initialiser). Chat panel closes on Escape and returns focus to `#chat-trigger`; the header search panel
(Escape → Search button) uses `views/home/SiteSearch`. Floating buttons: Quick links bottom-left and Ask PenCom bottom-right
are labelled pills from `sm` up; the A11y widget (home only) sits above the chat button. Footer bottom has `pb-28` so the
floating buttons don't cover "Back to top". `Ghost` is still imported by `chronicles/ChroniclesPage.tsx` and `about/AboutPage.tsx`.

**C4 Baseline audit.** No restyling. Start the dev server (port 3013), open every route at 1400 px and 390 px, run
the grep over all of `src/views` and note the counts per file. Under each session below, add a short "Audit:" line
covering grep hits, showcase effects still showing (spotlights, glass, dark bands, ghost letters), `x` animations,
text below 18 px in body copy, overflow and console errors. Fix only crashes and console errors.
Result: no crashes or console errors, so no code was changed. Every inner page except forms, Q1 report and the document pages shows at least one **full-bleed green band** (old `#04140A` section + the new green `DarkBackdrop`); keep one per page as an inset panel. Most common leftovers: ink `#0B1F10` (401 lines), `{spot}` (124), `#F2F6F0` (129), `font-black` (115), `glowLight` (83). Body copy is mostly 16 px (`text-base`) in cards and document text. Audit script (Playwright, measures bands, glass, weight 900, sub-18 px text, overflow offenders) was in the session scratchpad; the one-line greps above reproduce the counts.

**C5a About part 1.** Sections: overview (hero), mission, structure. Make the About hero the calm `PageHero` or hand-build it in its style.
`CountUp` hero figures stay as plain bold ink figures in white cards (one count-up moment is fine). Mission is the page's
green inset panel; vision is a white card with a gold left edge. Org chart: white cards with thin green connectors.
Audit (C4): `AboutPage.tsx` 10 grep hits (`<Ghost word="About">` at :84 still imported), `sections.tsx` 48 (shared with C5b: `#0B1F10` 22, `{spot}` 8, `#F2F6F0` 7, `font-black` 6, `glowLight` 4, `#04140A` 3, 2 `DarkBackdrop`). Hero is still the dark photo hero with text over the photo. Page renders **2 full-bleed green bands**, 8 glass elements, 28 `font-weight:900` text elements, 48 body paragraphs/list items under 18 px. No `x` animations, no overflow, no console errors.

**C5b About part 2.** Sections: executive, history, charter teaser. *From C5a:* `sections.tsx` now has `calmCard` (class string) and `IconTile` helpers at the top: reuse them. History already got `bg-white` (sections alternate: overview white, mission cream, history white, structure cream), so executive goes white and charter cream/white with its warm panel. The charter `CountUp`s become plain figures (the hero has the page's count-up). `glowLight`/`spot` are still imported only for History, Leadership and Charter; remove them with those. History timeline: green year dots on a thin line,
white cards with `Rise`. Leadership cards: the photo in a rounded or arch frame, name `text-xl font-bold`, and the profile dialog
in the light `Modal` style. Charter teaser: a warm `#F1EFE8` panel with a gold CTA (the green panel is already used by
mission). No invented names or titles.
Result: grep check clean; only small text left is meta (role eyebrows 14 px, figure labels 16 px). The about page's only `#0A4A13` panel is mission. No new UI strings, so no i18n pass.
Audit (C4): See C5a for `sections.tsx` counts. Executive and charter-teaser sections are on the dark/`#F2F6F0` showcase pattern; the profile dialog uses the kit Modal (already light).

**C6 Service Charter.** Sections: promise, standards, complaints, full text. The charter text stays in English, and the signed PDF
link stays. Standard cards are white with green time badges. Complaint steps 1–4 become the gold number tiles (the green
inset panel). Values are white cards with icon tiles (no numbers). Keep the `aliases` search map and the contents highlight.
Audit (C4): `CharterPage.tsx` 38 hits (`#0B1F10` 15, `#F2F6F0` 8, `{spot}` 8, `font-black` 5, `glowLight` 4, `#04140A` 2). 1 full-bleed green band (complaints), 4 glass, 61 heavy-weight text elements, **147** items under 18 px (standards list and full charter text at 16 px). No overflow, no console errors.
Result: grep check clean except the expected `DarkBackdrop` on the complaints panel. Section order and backgrounds: hero cream, standards white, complaints cream with the inset panel, promise white, full text cream. Charter section numbers ("5.0") stay as content, set in `#7A5200` bold (not mono). Search aliases (`pcc`), the contents highlight, text-size control and `#complaints` hash all checked. No new UI strings (no i18n pass); `?lang=yo` headings and highlights fine.

**C7 Services.** Sections: journeys, calculator, portals, help. The journey panel is a white card with a green header and steps
as gold number tiles. The calculator is the page's green inset panel (white slider card, and a white results card with plain bold
figures, readable at 390 px; the breakdown colours must keep contrast on white). Portals are white task-style cards (the homepage
TopTasks look, no tilt). Help cards follow the homepage TalkToUs style. Keep the handoff dialog and its focus.
Audit (C4): `ServicesPage.tsx` 33 hits (`#F2F6F0` 11, `#0B1F10` 15, `<Tilt` 1) plus a **hand-rolled 3D tilt button** at :651 (rotateX/Y on mouse move + `spot`); `Calculator.tsx` 8 (2 `DarkBackdrop`). 1 full-bleed green band (calculator), 12 heavy text, 20 small. No overflow, no console errors.
Result: grep check clean except the expected `DarkBackdrop` on the calculator panel. Backgrounds: hero cream, journeys white, calculator cream with the inset panel, portals white, help cream with a warm `#F1EFE8` panel. The hero's "Most used services" card is hidden below `sm` (the picker and the journey rail give the same choices; it ran ~800 px on a phone). Help chat card now calls `openChat` from `views/home/SiteSearch`. The hand-rolled `TiltButton`, `Chip` (rotating arrow) and the local `glowLight`/`lift`/`darkBtn` are gone. Hash links `#pcc #ppp #micro #calculator #portals #ehub`, rail, picker, eligibility, handoff dialog (focus on Close, Escape, focus back to the card) and chat checked; `?lang=yo` titles and highlights fine. No new UI strings ("Ask a question" and "Open" were already in the dictionaries), so no i18n pass.

**C8 Operators.** Sections: how, directory, funds, performance, plus the details drawer. Hero counts become white figure cards.
The directory toolbar is a white pill bar with labelled filters, and operator cards are white with hover lift. The funds selector goes in the
green inset panel; "your fund" is a white card with a gold edge. PFA returns are **sample figures** and keep their label.
The drawer gets the light header and its focus trap stays.
Audit (C4): `OperatorsPage.tsx` 58 hits, the most of any page (`#0B1F10` 19, `#F2F6F0` 13, `font-black` 10, `{spot}` 8, `glowLight` 5, `glowDark` 3, 3 `DarkBackdrop`). 1 full-bleed green band (funds) plus 2 dark cards, 4 glass, 39 heavy text, 47 small. No overflow, no console errors.
Result: grep check clean except the expected `DarkBackdrop` on the funds panel. Backgrounds: hero cream, directory white, how cream (warm `#F1EFE8` panel), funds white with the inset panel, performance cream. Filters, list view, Related tab, empty state, licence check (found / not found), `#pfcs` (opens the PFC tab) and `#funds` checked; drawer puts focus on Close, sets `?op=`, closes on Escape and returns focus. 390 px checked in an iframe (the browser window stops at ~490 px): no sideways scroll. `?lang=yo` titles and highlights fine; the newly visible labels ("Company name", "City", "Layout") were already in the dictionaries, so no i18n pass. Contact pills are now always labelled (the old icon-only compact buttons are gone).

**C9a Resources part 1.** Hero (knowledge search: a large `min-h-16` search field with an 18 px placeholder and a labelled
Search button) and guides. `?guide=transfer-rsa` must still open the guide. Guide cards are white with icon tiles. The guide
dialog is light, with steps as gold number tiles and a checklist progress bar. Keep `canSpeak` in its effect.
Result: grep check clean (no `DarkBackdrop` left; the dialog header is light, so Learning in C9b can be the page's green panel). Search, Search-button focus, `?guide=transfer-rsa` deep link, card → dialog (focus on Close, `?guide=` set, Escape clears it and returns focus to the card), `#guides` hash and `?lang=yo` checked at 1400/390 px, no console errors. Small text left is meta only (crumbs, eyebrows, audience pills, "4 steps · Listen" at 16 px). No new UI strings ("Search" and the visible label were already keys).
Audit (C4): `ResourcesPage.tsx` 8 hits (`#F2F6F0` 5), `Guides.tsx` 19 (`<Tilt` 1, 2 `DarkBackdrop`, `font-black` 3). Page-wide (also `/resources/faq`): 1 full-bleed green band (learning), 1 dark block, 10 glass, 58 heavy text, 35 small. No overflow, no console errors.

**C9b Resources part 2.** Sections: publications, downloads, learning, FAQ, glossary, and the `/resources/faq` route. Keep
`#annual-reports` and `?doc=` working (`compat.tsx`). The FAQ is an accordion with large question text and no counters. Glossary flip
cards become simple cards (or an accordion) with no ghost letters. Learning is the page's green inset panel with a gold play button. *From C9a:* the page wrapper is cream now and guides are white, so go FAQ cream, glossary white, publications cream, downloads white, learning cream with the inset panel. `Guides.tsx` has local `calmCard`/`goldBtn`/`outlineBtn`/`IconTile` helpers you can copy.
Publication covers can keep a gentle hover lift.
Audit (C4): `Library.tsx` 41 hits (`font-black` 10, `{spot}` 7, `#04140A` 4, 2 `DarkBackdrop`), `FaqGlossary.tsx` 23, `compat.tsx` 0. Publication covers are dark gradient tiles; learning band is full-bleed green. `/resources/faq` renders the same page (same counts as C9a).
Result: grep check clean except the expected `DarkBackdrop` on Learning (the page's only green panel). Calm helpers `calmCard`, `goldBtn`, `pill`, `IconTile`, `Bubble` are exported from `Library.tsx` and reused by `FaqGlossary.tsx`. Checked at 1400/390 px on `/resources` and `/resources/faq` (no sideways scroll, one h1, no console errors): FAQ open/vote/search/filter, glossary card open, letter filter, show all/terms, publication tabs (monthly 8 links, annual 15), video play, `#faq` and `#annual-reports` (opens the Annual tab), `?lang=yo` headings. The video title and text moved below the picture (text never over a photo). Small text left is meta only (FAQ category pills 14 px). No new UI strings ("Yes"/"No" are now visible, already keys).

**C10 Forms + Q1 report.** Checklist ticks persist in `pencom:checklists` (SSR-safe, `ready` flag). The open checklist gets a
white card with a green header and a gold progress ring. Report sections: glance, dg, environment, domains,
priorities, outlook. Report text stays English and print styles stay white. Dashboard tiles are white figure cards with
plain figures. The DG quote goes in the green inset panel.
Audit (C4): `FormsPage.tsx` 30 hits (`#0B1F10` 19, `<Tilt` 1), `ReportPage.tsx` 24 (`#0B1F10` 18). No full-bleed bands; report has one green inset block already. Forms: 9 heavy, 20 small; report: 22 heavy, **79** small (report body at 16 px), 1 glass each. No overflow, no console errors.
Result: grep check clean. Ticks persist across reload (`pencom:checklists`, `ready` flag kept); filter, form search ("APA" → 2), `#forms` hash, report TOC, domain tabs checked; 390/1400 px no sideways scroll, one h1, no console errors (fixed a framer warning: the progress ring had no initial `strokeDashoffset`). `?lang=yo` headings and highlights fine. One new key "Download" (ha/yo/ig). The report uses its own `sizes` (18/20/22 px); the kit `sizes` (16 px base) are still used by the Act and regulation docs: C11b can raise them. Report keeps the kit `PdfCard` (small green card) next to the DG panel.

**C11a Regulations library.** Sections: latest, act, library, policies, compliance, plus facets and the document drawer.
**Always English.** Filters stay in the URL and the drawer keeps its focus trap. The Act block is the green inset panel. The library has a
labelled search and sort, with facets as large checkboxes (44 px rows). Result cards are white with hover lift (lift on an inner div
because of `layout`). Compliance self-check uses a green progress line.
Audit (C4): `RegulationsPage.tsx` 9, `Sections.tsx` 35 (`#0B1F10` 15, `font-black` 7, `{spot}` 7), `Library.tsx` 25 (`#0B1F10` 18, `#F2F6F0` 7), `DocDrawer.tsx` 15 (2 `DarkBackdrop`, dark drawer header under the kit's cream Close bar). 1 full-bleed green band (Act), 11 glass, 10 heavy, 34 small. No overflow, no console errors.

Result: grep check clean except the expected `DarkBackdrop` on the Act panel. `outlineBtn` is exported from `regulations/Sections.tsx` (used by `Library.tsx` and `DocDrawer.tsx`); gold/calm helpers come from `resources/Library`. Bug fixed: opening a document right after typing in the library search dropped `q` from the address (`openDoc` now builds from `window.location.search` in the handler). Checked at desktop and 390 px (iframe; no sideways scroll, one h1, drawer fits), checklist 5/5, type facet → `?type=Circular`, search → `q`, drawer opens with focus on Close, Escape closes and focus returns, `#act`/`#compliance` hashes, no console errors. `/regulations` is English-only, so new labels (Back, More, Sort, Clear years, "{n} of 5 done") need no dictionary keys. The year histogram bars are still narrow (≈10 px) targets, as before.

**C11b Act + regulation docs.** 197 generated pages: spot-check three (short, long with tables, one with a newer
version) plus one without a web version and a missing id. The Act search is a sticky white pill. Part headers are warm `#F1EFE8`
panels (not dark). Section numbers go in green tiles, and `?s=` deep links keep the gold ring. Tables get a green header
and zebra rows. Keep build time low. English only, so no dictionary work.
Audit (C4): `PensionAct.tsx` 17, `RegDocPage.tsx` 24 (`#0B1F10` 16, `#F2F6F0` 7; table header `thead.bg-[#0B1F10]`). Body text is 16 px (Act 564 small items, micro-pension doc 114). Missing id `/regulations/doc/no-such-doc` shows a hand-built "We can't find that document" (`font-black`, `#0B1F10`, :91) with **HTTP 200**, not 404. Wide tables scroll inside their box (no page overflow). No console errors.
Result: grep check clean (only `GhostBtn`, the kit button, matches `Ghost`). Kit `sizes` raised to 18/20/22 px (also used by the charter full text; re-checked `/about/service-charter`: no overflow, no console errors). Unknown ids now call `notFound()` in `app/regulations/doc/[id]/page.tsx` and render the calm `not-found.tsx` beside it (HTTP 404; the one console error on that route is the 404 itself). Tables whose header cells are all empty (OCR) no longer show an empty green bar. Checked at 1400/390 px: Act (`?s=7`, `?s=11` gold ring and scroll, search "penalty" → 7 sections, Clear, popular card → `?s=8`), short doc (fees 2009), long with 37 tables (revised investment), newer version (investment 2012: banner, search "equity" → 11 matches, tabs), no web version (asset-crossing circular), missing id; no sideways scroll, one h1, no console errors. `?lang=yo` leaves `/regulations/*` in English as intended; set back to `en`. Leftover small text is meta only (eyebrows 14 px, TOC sub-items 15 px, list markers 16 px, table header 14 px uppercase). Both "Replaced by" and "Related documents" can list the same newer document (unchanged behaviour).

**C12a Connect part 1.** Sections: contact, offices map, news, track. No invented office hours. Hero action cards follow the
homepage TalkToUs card style. The tracker is the page's green inset panel (labelled search with a large Track button, and the result as a
white card). On the map, the route line and pins share `px()`/`py()`, and the office card is white with a gold directions button.
Audit (C4): `ConnectPage.tsx` 13, `Sections.tsx` 29 (`#0B1F10` 13, `{spot}` 6, `#04140A` 3, 2 `DarkBackdrop`). 1 full-bleed green band (tracker) plus 1 dark block, 5 heavy, 4 small. Map pin data in `data.ts` uses `x`/`y` for positions (not animation). No overflow, no console errors.
Result: grep check clean except the expected `DarkBackdrop` on the tracker panel. Page wrapper is cream; order hero cream → contact (C12b) → tracker cream with the inset → offices white → newsroom cream. Checked at 1400/390 px (no sideways scroll after scrolling to the bottom, one h1, no console errors): sample case, unknown reference, state select → Lagos card and route line, `#report`/`#complaint` (land on `#contact`), `#track`, `#zonal-offices`, `#news`, hero card → `#contact`; `?lang=yo` headings fine, set back to `en`. Map pins stay 36 px on phones (44 px would hide labels); the city pills under the map are the phone targets. Awka's label is still partly under the Calabar pin at 390 px (same as before). No new UI strings (all visible labels were already keys).

**C12b Connect part 2.** *From C12a:* make the `#contact` section **white** (it sits between the cream hero and the cream tracker section); `ConnectPage.tsx` imports `goldBtn` from `resources/Library` and `outlineBtn` lives in `regulations/Sections`. Complaint form: labels, errors and focus order (WCAG 2.2 AA). Steps are a pill bar with gold
number tiles. Topic cards are white and turn dark green when chosen. Inputs are `min-h-14` with 18 px text. The confirmation keeps
its callback-ref focus. `#report` opens on employer and `#complaint` on PFA.
Audit (C4): `CaseForm.tsx` 28 hits (`#0B1F10` 19, `#F2F6F0` 4, `{spot}` 4, `font-black` 3).
Result: grep check clean. Checked at 1400 px and 390 px (iframe; window can't go below ~620 px): no sideways scroll, one h1, no console errors on a clean load. Empty Continue → error summary gets focus, its links focus the field; Continue/Back focus the new step heading (not on first load); consent error; Send → confirmation focused, tracker prefilled with the new reference; `#report` opens on employer, `#complaint` on PFA; `?lang=yo` heading and highlight fine, set back to `en`. The global `:focus-visible` ring is switched off on the programmatic focus targets (step headings, confirmation) so no square box shows. "There is a problem…" and "We've received your …" are now whole strings so they translate.

**C13a News catalogue.** The hero becomes the calm `PageHero` with the top story beside it in a white card (photo above the text,
never text on the photo). The filter bar is a white pill bar. News cards follow the homepage LatestNews style. Galleries go on white.
The media desk is the green inset panel. Keep the "drafts until the CMS" label and per-type kind colours (with checked contrast).
Audit (C4): `NewsCatalog.tsx` 3, `parts.tsx` 50 (`#0B1F10` 28, `{spot}` 10, `glowLight` 6, `#04140A` 4). 1 full-bleed green band (media desk), **10 dark cards at 1400 px** (dark news/video tiles), 13 glass, 24 small. No overflow, no console errors.

Result: grep check leaves only the allowed `DarkBackdrop` (media desk). Checked at 1400 px and 390 px (iframe): no sideways scroll, one h1; type chips and Cards/List update the URL (`?type=Reports&view=list`), search → empty state with gold Clear filters; `?lang=yo` heading, highlight and "See the photos" fine, set back to `en`; no console errors. Kind chips are 13–14 px; their text/background pairs were already ≥4.5:1. The filter bar stops being sticky below `lg` (three rows covered too much of a phone screen).

**C13b News story.** The calm version replaces the dark photo header: title on cream, photo below in a rounded frame
(text never on the photo). Animated or split titles keep `data-no-translate`. Figures are white cards with plain
figures; the callout is a warm `#F1EFE8` panel. Check two stories (`q1-2026-industry-report`, `48-hour-approvals`).
Audit (C4): `Article.tsx` 58 hits (`#0B1F10` 31, `{spot}` 8, `font-black` 7, `glowLight` 6, `#04140A` 4, `<Tilt` 1). Both stories still have the **dark photo header with the title over the photo** (`img.absolute.inset-0.-z-20`), a full-bleed green band, 3 dark blocks, 4 glass, ~20 heavy text. No overflow, no console errors.

Result: grep check clean (the green PDF panel uses `darkCard`, no `DarkBackdrop`). Checked `q1-2026-industry-report` (with PDF) and `48-hour-approvals` (without) at 1400 px and 390 px (iframe): no sideways scroll, one h1, no console errors; text size 18→20 px, feedback Yes → thank-you, contents link scrolls below the sticky bar and becomes active, missing slug shows the calm "We can't find that story" card; `?lang=yo` chrome and "More from the newsroom" highlight fine, story text stays English, set back to `en`. Fix: the story title had no real spaces between its animated words (screen readers read "PenCompublishes…"). The left share rail is gone; sharing is a labelled row under the byline at every width. `find-missing.py` needs playwright (not installed); leftovers were read from `[lang=en]` in the browser instead.

**C14a Performance part 1.** Sections: coverage, assets, allocation, funds, fees, compare, method. The funds band becomes
the green inset panel. Segmented controls become a white pill bar with a dark-green active pill. Sample figures keep their label.
The median line formula depends on the race row grid; keep both in step.
Audit (C4): `Sections.tsx` 57 hits (`#0B1F10` 24, `font-black` **18**, `{spot}` 13, `#F2F6F0` 9, `glowLight` 8, `glowDark` 3), `PerformancePage.tsx` 1, `data.ts` 1 (`#0B1F10` as a series colour). 1 full-bleed green band (funds) plus 2 green blocks, 6 glass, 39 heavy, 24 small. No overflow, no console errors.

Result: grep check leaves only the allowed `DarkBackdrop` (fund types). Checked at 1400 px and 390 px (iframe): no sideways scroll, one h1, no console errors; ticking PFAs fills the comparison card, the median line sits within 1 px of the bar scale (the race grid now uses a `--name` variable, 7rem on phones and 10rem from `sm`; the median formula reads the same variable), `#rsa-summary` lands on Coverage, `?lang=yo` headings and 6 highlights fine (Methodology has none), set back to `en`. New key "Name of a PFA" (placeholder) in ha/yo/ig; the sort button's label uses the existing "Sort" key. Left for C14b: `charts.tsx` (DataPanel/DataTable/Columns/AreaChart tooltips still use `#0B1F10`/`#F2F6F0`) and `data.ts` (`#0B1F10` series colour in `allocColors`, used by the donut). The funds panel no longer passes `dark` to `DataPanel`/`DataTable` (they sit on a white card), so the dark variants in `charts.tsx` may be unused now.

**C14b Performance part 2.** Charts: light tooltips (white card, ink text, green figure), dashed gridlines,
gray-600 axis, no glows. The donut gets a plain centre figure. The latest column is gold with ink text. Check contrast and 390 px fit.
Chart and table toggles are a pill bar, with labelled CSV and JSON download buttons.
Audit (C4): `charts.tsx` 18 hits (`#0B1F10` 14, `#F2F6F0` 5, `font-black` 2), 3 glass (dark tooltips).

Result: grep check on `charts.tsx` and `data.ts` prints nothing. Checked at 1400 px and 390 px (iframe): no sideways scroll, one h1, no console errors; tooltip follows the pointer, donut legend focus updates the centre figure, six RSA columns fit at 390 px, table view opens; `?lang=yo` headings, chart/table pills and the download button names translate, set back to `en`. The `dark` props on `DataPanel`/`DataTable`/`AreaChart`/`Columns` are unused on this page but kept (restyled for the green panel) so the exports stay the same. The download buttons read "Download CSV of <title>" to screen readers (the visible text is CSV/JSON).

**C15 Media.** Sections: photos, videos, follow, plus the lightbox. Captions stay English. Videos is the green inset panel
(player in a rounded frame, playlist as white rows). Album cards are white with a gold ring when chosen. The lightbox gets large
labelled Previous/Next/Close buttons. Arrow keys, Escape and focus return keep working.
Result: grep check leaves only the allowed `DarkBackdrop` (videos). Checked at desktop and 390 px (iframe): no sideways scroll, one h1, no console errors; topic filter updates the playlist count, `?photo=` opens the lightbox (focus on Close), arrow keys move, Escape closes, clears `photo` from the URL and returns focus to the photo; on phones the lightbox caption sits above Previous/Next and the thumbnail strip is hidden. `?lang=yo` headings and all four highlights fine, set back to `en`. Pre-existing gap for C17: the topic labels "Informal sector" and "Reforms and governance" have no ha/yo/ig entries. The lightbox no longer uses `x`, so the kit `Drawer` is the only `x` motion left.

Audit (C4): `MediaPage.tsx` 38 hits (`#04140A` 6, `#0B1F10` 13, `font-black` 7, `{spot}` 7, `glowDark` 4, `<Tilt` 2). 1 full-bleed green band (videos), **15 glass**, 23 heavy, 39 small. **Lightbox slides on `x`** (`MediaPage.tsx:422`, `dir * 80`): change to `y`/fade. No overflow, no console errors.

**C16 Chronicles.** The serif masthead stays, but becomes light (cream, serif title, gold underline, gold "Read the issue"
CTA that opens the PDF, no flip-book). Inside cards are white with icon tiles. Launch is the green inset panel. The shelf is a
simple row of covers with a hover lift. Subscribe is a white card with a large email field and validation focus.
Audit (C4): `ChroniclesPage.tsx` 36 (`<Ghost word="Chronicles">` at :125 still imported, `#04140A` 4, `glowDark` 4, 3 `DarkBackdrop`, `font-black` 6), `PreviewPages.tsx` 15 (`#0B1F10` 12). **2 full-bleed green bands** (masthead and launch) plus 3 dark blocks, 9 glass, 15 heavy. No overflow, no console errors.

**C17 Site-wide sweep.** Run the grep over all of `src/` (it should be clean). Do a 390 px and 1400 px pass on all 20 routes (one h1, no
sideways scroll, no console errors). Check that body text is 18 px or larger across pages. Run `/i18n-pass` for any new strings (the homepage
strings first: check they are in `src/i18n/dict`, and confirm highlight phrases are substrings of the translated titles). Update
`themes/calm/CLAUDE.md` (Look, kit, status), the root `CLAUDE.md` and `docs/HANDOFF.md`.

Audit (C4): Kit leftovers to settle here: the kit `Drawer` slides in on `x: "100%"` (`theme/ui.tsx:355`), allowed for a side drawer but the only `x` motion left once C15 is done; `about/primitives.tsx` still exports `GridBackdrop` (no-op); `theme/Ghost.tsx` can go once C5a and C16 drop their imports. Homepage (C1) still has 16 px card descriptions in TopTasks (14 items under 18 px). Placeholders `/mobile`, `/admin` and the 404 are clean.