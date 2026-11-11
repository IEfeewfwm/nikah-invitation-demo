# GitHub Pages deployment validation

Validated on 11 November 2026 against the public URL:

https://iefeewfwm.github.io/nikah-invitation-demo/

## Deployment

- Public repository: https://github.com/IEfeewfwm/nikah-invitation-demo
- GitHub Pages source: `main`, repository root (`/`), branch publishing.
- HTTPS enforced. Unauthenticated request returned HTTP 200 and the invitation HTML.
- Initial production commit: `e5ae9100114181b8e66c28fcfe789b99f75606c1`.
- Initial Pages workflow completed successfully: https://github.com/IEfeewfwm/nikah-invitation-demo/actions/runs/43072243540
- New pushes to `main` automatically trigger the built-in GitHub Pages workflow.

## Production preparation

`node scripts/build.mjs` passed. This synchronizes public SEO/Open Graph metadata, validates JavaScript syntax and local asset paths, verifies anchor targets and configuration, and scans the public source for common token/private-key patterns. No compilation or dependency installation is required for this static website. No credentials, original hosting manifest or machine-specific settings are part of the repository.

The invitation CSS and runtime JavaScript match the original project's files. The only runtime configuration change for deployment is `siteUrl`; the generated Open Graph image URL uses GitHub Pages. Photography, fonts, content, animation rules and form behaviour are preserved.

## Browser checks — 32 passed locally and on the public site

At **360, 390, 768, 1024 and 1440 px** (20 checks):

- No horizontal overflow; headings remain within two lines; all navigation fragments have targets; images and both local font families load.
- No JavaScript runtime exceptions.
- All observed HTTP resources load from the GitHub Pages repository subpath; no requests depend on the original hosting environment.
- No HTTP asset errors.

Functional checks (12):

1. Real click on the programme navigation link changes the fragment and scrolls to the programme.
2. Countdown returns exactly 1 day and 1 hour with a fixed test time before the UTC+4 ceremony.
3. Empty RSVP shows field errors and focuses the name.
4. Whitespace-only name is rejected.
5. Valid RSVP shows the disabled-submission message without query parameters or actual submission.
6. Declining attendance hides and disables guest count.
7. Demo map has no active destination.
8. Past event clamps the countdown to zero and changes its caption.
9. Configuration-only changes update names, date/time, text, schedule, guest choices, location and section visibility.
10. The personalized test configuration has no mobile overflow.
11. Local files open directly through the filesystem.
12. Without JavaScript, the form's submit button stays disabled.

Responsive screenshots were reviewed on the deployed website. Reduced-motion layouts were tested; the normal-motion invitation was also opened in the browser. The production page works in an isolated browser session without authentication.

## Intentional limitations

- Event identities, venue and address are fictional portfolio content.
- RSVP is a demo. It validates but does not transmit or persist responses; actual collection is a separate feature.
- No real map is linked until an actual address is configured.
- Testing used browser viewport emulation, not physical iOS/Android devices. This is not a full WCAG audit.
