# Windows verification — 2026-09-10

Validated on Windows with Node.js 24.19.0, using the locked dependencies installed by `npm ci`, on `codex/pyq-authoritative-integration` after incorporating `5b5643bd`.

## Results

- `npm test`: 34 passing tests, including component workflows in JSDOM. Uncaught DOM event errors fail the suite.
- `npm run build`: production build succeeds.
- `npm run lint -- --max-warnings=0`: zero errors and zero warnings. The final pass fixes all 18 hook dependency warnings without adding suppressions or changing ESLint configuration. Existing, previously documented exceptions are unchanged.
- `npm run server` and `npm run dev -- --host 127.0.0.1`: backend and frontend start successfully. Frontend HTTP, direct backend health and proxied backend health return success. Proxied progress matches the disk revision.
- `tests/restart.test.mjs` launches the actual backend app in a child process with a fresh temporary data directory. Two HTTP saves create current and recovery snapshots; the process is terminated and relaunched. Progress, PYQ answers, practice position and synthetic question records match exactly after restart, and another save rotates recovery correctly.
- Existing `.ssc-data/progress.json` and `progress.previous.json` were backed up before updating. SHA-256 comparisons confirmed both files remained unchanged. No question datasets under `Data`, `public` or `src/data` were edited.

## Fixes

State resets now occur when the displayed question or game round changes, before children receive stale selections. Extraction queues initialize from saved records. Random sequence options are generated with their challenge, and elapsed-time reads occur during initialization or user actions. Timer notifications run outside state updater functions so Strict Mode does not duplicate them. Express error middleware keeps its required four-argument signature.

New regressions cover backend restart persistence, malformed JSON without progress mutation, Strict Mode timer notifications and duration resets, and failed PYQ images blocking answers until navigation to another question.

The final pass stabilizes context callbacks and empty-list dependencies, preserves the mission timer across unrelated study updates, and keeps keyboard handlers and topic loading tied to their intended triggers. Reaction Speed now uses a native button. Review fields and number-answer inputs have accessible labels. Achievement notifications use a polite live region and retain their dismissal deadline across unrelated rerenders.

Additional regressions cover mission start/pause/resume/stop and note updates, popup dismissal, five Reaction Speed rounds with a simulated clock, settings backup inspection/export/restore, PYQ keyboard navigation and field labels, and saving local progress after an offline retry. Backup downloads and native reload are stubbed in JSDOM; restored data and the pre-restore backup contents are checked explicitly.

## Requested flow coverage

| Step | Evidence and limits |
| --- | --- |
| Sentinel entry | Component click opens the daily warm-up gate. |
| Five brain games | Existing service test completes a five-game session and verifies a single reward. Reaction Speed is exercised through five UI rounds with a simulated clock. The complete five-game UI sequence was not played. |
| Dashboard and mission | Routes render; mission hook actions and timer continuity pass. |
| Topic learning and test | Topic/test routes render, authored question contracts pass, and practice/exam restoration and scoring are tested. |
| Revision | Route rendering, scheduling and reward-cycle tests pass. |
| PYQ practice | Answer/position restoration, HOLD exclusion and unavailable-image blocking pass using synthetic rows. The live frontend serves 20,600 rows, including 248 HOLD records. |
| Settings | Synthetic backup inspection, export, restore, retained PYQ answers, unrelated-key preservation and offline retry pass. Native download and reload are not exercised. |

These are separate component/service checks, not one continuous end-to-end browser run.

## Limits

No interactive browser or computer-use tool was available during either pass. Desktop/mobile layouts, scrolling, responsiveness, animation appearance, native keyboard/focus behavior, browser console/network traces, contrast and screen-reader behavior were not verified. JSDOM workflow tests and HTTP checks passed; these do not establish visual or full accessibility correctness. PDF extraction was unconfigured, so no provider request was made. This verifies backend process restart on Windows, not power-loss durability or a full operating-system reboot.
