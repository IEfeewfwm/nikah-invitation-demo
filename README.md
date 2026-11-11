# NIKAH — digital invitation demo

**Live website:** https://iefeewfwm.github.io/nikah-invitation-demo/

A fictional Nikah invitation for Amina and Timur, 24 July 2027. Portfolio demonstration with an ivory and emerald editorial design, responsive layouts, local fonts, generated imagery, a live countdown, programme, location placeholder and a clearly labelled RSVP preview.

The design, Russian invitation content, animations and interactions are preserved from the original project. All event identities and location details are fictional.

## Technology and structure

Static HTML5, CSS3 and vanilla JavaScript. No runtime dependencies, backend, database, paid APIs or external asset services. All images, fonts, styles and scripts are bundled in this repository and use relative paths compatible with the GitHub Pages repository subpath.

```text
index.html          Complete invitation and metadata
styles.css          Responsive layout, animations and reduced motion
script.js           Configuration, countdown, navigation and demo validation
config.js           Central event configuration
assets/             WebP images, SVG favicon, fonts and their licences
sync-meta.mjs       Synchronize SEO/Open Graph from config.js
scripts/build.mjs   Prepare and validate the static production site
scripts/check.mjs   Asset, syntax, configuration and independence checks
scripts/serve.mjs   Local preview including the repository subpath
.nojekyll           Serve the static files without Jekyll processing
```

## Local preview and production checks

Open `index.html` directly in a browser, or use Node.js 22+:

```sh
node scripts/serve.mjs
```

Then open http://127.0.0.1:4174/nikah-invitation-demo/ .

Run the production preparation and checks before publishing:

```sh
node scripts/build.mjs
```

Equivalent npm commands are `npm start`, `npm run build` and `npm run check`. No installation step is needed because there are no dependencies. The build synchronizes SEO/Open Graph metadata and validates JavaScript syntax, local asset references, anchor targets, configuration, reduced-motion support, absence of previous-host dependencies and common secret patterns. There is no compilation step; the production website consists of the files already in the repository root.

## GitHub Pages and automatic deployment

GitHub Pages is configured with **Deploy from a branch → main → /(root)**. Each push to `main` automatically triggers GitHub's Pages build and deployment. No custom deployment workflow, personal access token or repository secret is required. Keep `.nojekyll` in the publishing root.

After editing the invitation, run `node scripts/build.mjs`, commit the changes, and push `main`. GitHub publishes the new static files automatically. Check the repository Actions tab and Settings → Pages for deployment status. Site settings are managed in GitHub; they are not stored as credentials or local configuration in this repository.

## Personalization

Change event data in `config.js`:

| Setting | Purpose |
|---|---|
| `names` | Couple names, initials and signatures |
| `date` | ISO event datetime with explicit UTC offset |
| `timeZone`, `timeZoneLabel` | Display timezone and its caption |
| `arrivalTime` | Guest arrival time |
| `venue`, `city`, `address` | Venue and location text |
| `locationReady` | Enable the map link only after a real address is configured |
| `heroMessage`, `invitation` | Introduction and invitation paragraphs |
| `schedule` | Event timeline |
| `palette`, `images` | Colours and image paths |
| `rsvp.show`, `rsvp.maxGuests` | Demo form visibility and guest choices |
| `portfolio.show`, `portfolio.basePrice` | Commercial portfolio block |
| `demo` | Fictional event notices |
| `siteUrl` | Public URL used by Open Graph metadata |

The event uses `2027-07-24T16:00:00+04:00`, `Europe/Astrakhan`, UTC+4. Update schedule and arrival times separately when changing the ceremony time. Keep `locationReady: false` until the real city/address are available. Runtime content is centralized in `config.js`; run the build to update metadata before pushing. Static HTML remains a fictional fallback when JavaScript is disabled. When delivering an actual client event with no-JavaScript support, update that fallback too.

Images can be replaced under the existing filenames. Update image alt text in `index.html` if their subject changes. `ASSETS.md` describes the generated visuals; SIL Open Font License notices are in `assets/fonts/`.

## RSVP and commercial scope

The basic **1,000 RUB invitation** includes the existing template, names, date/time, invitation text, venue details and basic colour/content customization. RSVP collection, individual design, additional sections, custom animations and integrations are separate paid features.

The current RSVP form is a preview: it validates the name, attendance and guest count, then states that sending is disabled. It does not submit or persist guest data. Guest count is disabled when declining. Without JavaScript, the submit button is disabled. The browser may offer its own name autofill. Set `rsvp.show: false` for a basic invitation without the preview. Real RSVP collection requires a separately implemented integration.

## Validation and limits

Browser validation covers 360, 390, 768, 1024 and 1440 px, loaded images/fonts, no horizontal overflow, headings and anchors, console errors, countdown and timezone calculation, elapsed date, empty/whitespace form validation, valid demo response, decline behaviour, disabled demo map, configuration customization and reduced motion.

All runtime requests must resolve to GitHub Pages; the website does not require sign-in or the original hosting environment. The content is fictional and the RSVP remains a demonstration. GitHub's CDN may briefly cache older content after an update. Physical iOS/Android devices and a full WCAG audit are outside these checks.
