# Premium UI validation

The shared premium stylesheet and ambient shell cover every production route, including Sentinel Entry and the standalone Brain Trainer. Navigation remains text-only. The system uses a graphite/navy canvas, cyan actions, open content sections, short entry transitions, animated metrics and progress, route transitions, desktop pointer feedback, subject insights, revision staggering, and game feedback. Reduced-motion preferences disable decorative CSS animation and JavaScript motion.

## Verified locally

- `npm run lint`: passed with no warnings or errors.
- `npm test`: 49 passed, zero failures, skipped tests, or cancellations.
- `npm run build`: passed. Vite reports an informational plugin-timing warning.
- Tests cover route rendering, keyboard controls and focus containment, stage locks, daily Brain Trainer gating and all five games, exam scoring/deadlines, persisted answers, backup/recovery, backend restart, reduced motion, bounded pointer work, and native-transition fallback.
- Palette tests verify normal-text contrast of at least 4.5:1 for the shared foreground/background tokens and primary action colors.
- Production preview returned HTTP 200 for 21 application URLs, all 43 built JS/CSS assets, and the question corpus. Route URL checks establish HTTP availability, not browser rendering.
- Route definitions are identical to the pre-change Git version.
- The authoritative corpus contains exactly 20,600 questions and is byte-identical to Git and the production build. SHA-256: `18607d969b6aa5dc6c5f5c0188295236fdc27acc4b3a6845e0f76fac59901000`.
- No corpus, backend, scoring, or storage implementation files were modified.

## Unverified

The browser runtime returned `No browser is available`, and browser discovery returned an empty list. Consequently, these checks remain outstanding:

- Visual inspection of every screen at desktop, tablet, and 390px mobile widths; rendered horizontal overflow and responsive spacing.
- Real-browser keyboard traversal, screen-reader behavior, focus visibility, and contrast of every rendered state. DOM keyboard tests and token contrast checks passed but do not replace this audit.
- Real-browser console and request-error capture across workflows. Local HTTP asset checks and backend tests passed; live extraction/OCR and external API requests were not exercised.
- Perceived motion quality, native cross-fades, cursor tracking, automatic game viewport placement, and live reduced-motion behavior in a rendered browser.
- Frame-rate and GPU/CPU profiling on an ordinary Windows laptop.
- Exhaustive visual confirmation of one primary action and absence of repetitive panels in every populated, empty, error, and dialog state.
- Hosted production deployment and post-deployment checks; this task delivers a Git branch push, not a deployment.

## Final persistence and test-harness check

- Live `.ssc-data/progress.json` remained byte-for-byte identical to the pre-edit backup. Both existing frontend and backend servers remain running and return HTTP 200.
- The SSR test server disables HMR to avoid a test-only port collision. All 49 tests passed again after this change. The malformed-JSON test intentionally logs a rejected request.
- Windows backend-process restart persistence was tested using isolated temporary storage. A Windows OS reboot and browser restoration after reboot were not performed.
- Live extraction remains unverified: the running backend reports `extractionConfigured: false`.
