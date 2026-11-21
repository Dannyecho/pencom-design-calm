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
grep -nE '#04140A|#0B1F10|#F2F6F0|#0E2414|#0A2E10|#FBFCF9|#F6F8F3|DarkBackdrop|Ghost|<Tilt|\{spot\}|glowDark|font-black|ring-black/5|scroll-mt-\[160px\]' <files>
```

C2 may rename or retire kit helpers. When it does, add their old names to this grep.

Paths below are relative to `src/views/` unless they start with `src/`.

| ID | Page / route | Files in scope | Status |
| --- | --- | --- | --- |
| C0 | Scaffold `themes/calm` from showcase | root files, `CLAUDE.md` | done (2026-11-21): showcase copied (no `.git`, `node_modules`, `.next`); package `pencom-theme-calm`, dev port 3013; install, typecheck and build pass (197 doc pages); `CLAUDE.md` has the calm Look and status; README updated; git baseline |
| C1 | Homepage `/` | `HomeCalm.tsx`, `homecalm/*`, `src/app/page.tsx` | pending |
| C2 | Theme kit (heading, hero, panels, dialogs, document kit) | `theme/*`, `docs/kit.tsx`, `about/primitives.tsx` | pending |
| C3 | Site chrome, placeholder, 404 | `src/components/**`, `src/app/not-found.tsx`, `src/app/[...slug]/page.tsx` | pending |
| C4 | Baseline audit, all routes | none edited | pending |
| C5a | About part 1 `/about` | `about/AboutPage.tsx`, `about/sections.tsx` (overview, mission, structure) | pending |
| C5b | About part 2 `/about` | `about/sections.tsx` (executive, history, charter) | pending |
| C6 | Service Charter `/about/service-charter` | `charter/CharterPage.tsx` | pending |
| C7 | Services `/services` | `services/ServicesPage.tsx`, `services/Calculator.tsx` | pending |
| C8 | Operators `/operators` | `operators/OperatorsPage.tsx` | pending |
| C9a | Resources part 1 `/resources` | `resources/ResourcesPage.tsx`, `resources/Guides.tsx` | pending |
| C9b | Resources part 2 `/resources`, `/resources/faq` | `resources/Library.tsx`, `resources/FaqGlossary.tsx`, `resources/compat.tsx` | pending |
| C10 | Forms + Q1 report `/resources/forms-and-checklists`, `/resources/reports/q1-2026` | `forms/FormsPage.tsx`, `report/ReportPage.tsx` | pending |
| C11a | Regulations library `/regulations` | `regulations/RegulationsPage.tsx`, `regulations/Sections.tsx`, `regulations/Library.tsx`, `regulations/DocDrawer.tsx` | pending |
| C11b | Act + regulation docs `/regulations/pension-reform-act`, `/regulations/doc/[id]` | `regulations/PensionAct.tsx`, `regulations/RegDocPage.tsx` | pending |
| C12a | Connect part 1 `/connect` | `connect/ConnectPage.tsx`, `connect/Sections.tsx` | pending |
| C12b | Connect part 2 `/connect` | `connect/CaseForm.tsx` | pending |
| C13a | News catalogue `/news` | `newsroom/NewsCatalog.tsx`, `newsroom/parts.tsx` | pending |
| C13b | News story `/news/[slug]` | `news/Article.tsx` | pending |
| C14a | Performance part 1 `/performance` | `performance/PerformancePage.tsx`, `performance/Sections.tsx` | pending |
| C14b | Performance part 2 `/performance` | `performance/charts.tsx` | pending |
| C15 | Media `/media` | `media/MediaPage.tsx` | pending |
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

**C3 Site chrome (setup).** The Header uses the calm tokens: dark green and gold, larger menu text, labelled buttons ("Menu", "Search").
The mega menus are white `rounded-3xl` panels. The Footer is a warm calm footer (`#0A4A13` inset or full-width dark green, but no spotlight, ghost
word or grid; large links with 18 px text and gold headings). Restyle NoticesBell, PromoPopup, CookieConsent, QuickLinks, LanguageSwitcher,
LanguageNotice and Chatbot launcher to the calm tokens. The `[...slug]` placeholder and `not-found.tsx` become calm cream pages
with a large gold CTA (server components: CSS only, no motion). Decide with the user whether the Notices panel should
still open by itself on the first visit; showcase left this open. Verify `/`, `/about` and a 404 at 1400 and 390 px.

**C4 Baseline audit.** No restyling. Start the dev server (port 3013), open every route at 1400 px and 390 px, run
the grep over all of `src/views` and note the counts per file. Under each session below, add a short "Audit:" line
covering grep hits, showcase effects still showing (spotlights, glass, dark bands, ghost letters), `x` animations,
text below 18 px in body copy, overflow and console errors. Fix only crashes and console errors.

**C5a About part 1.** Sections: overview (hero), mission, structure. Make the About hero the calm `PageHero` or hand-build it in its style.
`CountUp` hero figures stay as plain bold ink figures in white cards (one count-up moment is fine). Mission is the page's
green inset panel; vision is a white card with a gold left edge. Org chart: white cards with thin green connectors.

**C5b About part 2.** Sections: executive, history, charter teaser. History timeline: green year dots on a thin line,
white cards with `Rise`. Leadership cards: the photo in a rounded or arch frame, name `text-xl font-bold`, and the profile dialog
in the light `Modal` style. Charter teaser: a warm `#F1EFE8` panel with a gold CTA (the green panel is already used by
mission). No invented names or titles.

**C6 Service Charter.** Sections: promise, standards, complaints, full text. The charter text stays in English, and the signed PDF
link stays. Standard cards are white with green time badges. Complaint steps 1–4 become the gold number tiles (the green
inset panel). Values are white cards with icon tiles (no numbers). Keep the `aliases` search map and the contents highlight.

**C7 Services.** Sections: journeys, calculator, portals, help. The journey panel is a white card with a green header and steps
as gold number tiles. The calculator is the page's green inset panel (white slider card, and a white results card with plain bold
figures, readable at 390 px; the breakdown colours must keep contrast on white). Portals are white task-style cards (the homepage
TopTasks look, no tilt). Help cards follow the homepage TalkToUs style. Keep the handoff dialog and its focus.

**C8 Operators.** Sections: how, directory, funds, performance, plus the details drawer. Hero counts become white figure cards.
The directory toolbar is a white pill bar with labelled filters, and operator cards are white with hover lift. The funds selector goes in the
green inset panel; "your fund" is a white card with a gold edge. PFA returns are **sample figures** and keep their label.
The drawer gets the light header and its focus trap stays.

**C9a Resources part 1.** Hero (knowledge search: a large `min-h-16` search field with an 18 px placeholder and a labelled
Search button) and guides. `?guide=transfer-rsa` must still open the guide. Guide cards are white with icon tiles. The guide
dialog is light, with steps as gold number tiles and a checklist progress bar. Keep `canSpeak` in its effect.

**C9b Resources part 2.** Sections: publications, downloads, learning, FAQ, glossary, and the `/resources/faq` route. Keep
`#annual-reports` and `?doc=` working (`compat.tsx`). The FAQ is an accordion with large question text and no counters. Glossary flip
cards become simple cards (or an accordion) with no ghost letters. Learning is the page's green inset panel with a gold play button.
Publication covers can keep a gentle hover lift.

**C10 Forms + Q1 report.** Checklist ticks persist in `pencom:checklists` (SSR-safe, `ready` flag). The open checklist gets a
white card with a green header and a gold progress ring. Report sections: glance, dg, environment, domains,
priorities, outlook. Report text stays English and print styles stay white. Dashboard tiles are white figure cards with
plain figures. The DG quote goes in the green inset panel.

**C11a Regulations library.** Sections: latest, act, library, policies, compliance, plus facets and the document drawer.
**Always English.** Filters stay in the URL and the drawer keeps its focus trap. The Act block is the green inset panel. The library has a
labelled search and sort, with facets as large checkboxes (44 px rows). Result cards are white with hover lift (lift on an inner div
because of `layout`). Compliance self-check uses a green progress line.

**C11b Act + regulation docs.** 197 generated pages: spot-check three (short, long with tables, one with a newer
version) plus one without a web version and a missing id. The Act search is a sticky white pill. Part headers are warm `#F1EFE8`
panels (not dark). Section numbers go in green tiles, and `?s=` deep links keep the gold ring. Tables get a green header
and zebra rows. Keep build time low. English only, so no dictionary work.

**C12a Connect part 1.** Sections: contact, offices map, news, track. No invented office hours. Hero action cards follow the
homepage TalkToUs card style. The tracker is the page's green inset panel (labelled search with a large Track button, and the result as a
white card). On the map, the route line and pins share `px()`/`py()`, and the office card is white with a gold directions button.

**C12b Connect part 2.** Complaint form: labels, errors and focus order (WCAG 2.2 AA). Steps are a pill bar with gold
number tiles. Topic cards are white and turn dark green when chosen. Inputs are `min-h-14` with 18 px text. The confirmation keeps
its callback-ref focus. `#report` opens on employer and `#complaint` on PFA.

**C13a News catalogue.** The hero becomes the calm `PageHero` with the top story beside it in a white card (photo above the text,
never text on the photo). The filter bar is a white pill bar. News cards follow the homepage LatestNews style. Galleries go on white.
The media desk is the green inset panel. Keep the "drafts until the CMS" label and per-type kind colours (with checked contrast).

**C13b News story.** The calm version replaces the dark photo header: title on cream, photo below in a rounded frame
(text never on the photo). Animated or split titles keep `data-no-translate`. Figures are white cards with plain
figures; the callout is a warm `#F1EFE8` panel. Check two stories (`q1-2026-industry-report`, `48-hour-approvals`).

**C14a Performance part 1.** Sections: coverage, assets, allocation, funds, fees, compare, method. The funds band becomes
the green inset panel. Segmented controls become a white pill bar with a dark-green active pill. Sample figures keep their label.
The median line formula depends on the race row grid; keep both in step.

**C14b Performance part 2.** Charts: light tooltips (white card, ink text, green figure), dashed gridlines,
gray-600 axis, no glows. The donut gets a plain centre figure. The latest column is gold with ink text. Check contrast and 390 px fit.
Chart and table toggles are a pill bar, with labelled CSV and JSON download buttons.

**C15 Media.** Sections: photos, videos, follow, plus the lightbox. Captions stay English. Videos is the green inset panel
(player in a rounded frame, playlist as white rows). Album cards are white with a gold ring when chosen. The lightbox gets large
labelled Previous/Next/Close buttons. Arrow keys, Escape and focus return keep working.

**C16 Chronicles.** The serif masthead stays, but becomes light (cream, serif title, gold underline, gold "Read the issue"
CTA that opens the PDF, no flip-book). Inside cards are white with icon tiles. Launch is the green inset panel. The shelf is a
simple row of covers with a hover lift. Subscribe is a white card with a large email field and validation focus.

**C17 Site-wide sweep.** Run the grep over all of `src/` (it should be clean). Do a 390 px and 1400 px pass on all 20 routes (one h1, no
sideways scroll, no console errors). Check that body text is 18 px or larger across pages. Run `/i18n-pass` for any new strings (the homepage
strings first: check they are in `src/i18n/dict`, and confirm highlight phrases are substrings of the translated titles). Update
`themes/calm/CLAUDE.md` (Look, kit, status), the root `CLAUDE.md` and `docs/HANDOFF.md`.
