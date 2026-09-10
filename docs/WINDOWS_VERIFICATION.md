# Windows verification — 2026-09-10

Validated on Windows with Node.js 24.19.0, using the locked dependencies installed by `npm ci`, on `codex/pyq-authoritative-integration` after incorporating `5b5643bd`.

## Results

- `npm test`: 28 passing tests, including component workflows in JSDOM.
- `npm run build`: production build succeeds.
- `npm run lint`: zero errors, 18 existing hook dependency warnings. Rules retain their existing severity; narrow comments explain external-store synchronization, shared context exports and intentional Windows filename filtering.
- `npm run server` and `npm run dev -- --host 127.0.0.1`: backend and frontend start successfully. Frontend HTTP, direct backend health and proxied backend health return success. Proxied progress matches the disk revision.
- `tests/restart.test.mjs` launches the actual backend app in a child process with a fresh temporary data directory. Two HTTP saves create current and recovery snapshots; the process is terminated and relaunched. Progress, PYQ answers, practice position and synthetic question records match exactly after restart, and another save rotates recovery correctly.
- Existing `.ssc-data/progress.json` and `progress.previous.json` were backed up before updating. SHA-256 comparisons confirmed both files remained unchanged. No question datasets under `Data`, `public` or `src/data` were edited.

## Fixes

State resets now occur when the displayed question or game round changes, before children receive stale selections. Extraction queues initialize from saved records. Random sequence options are generated with their challenge, and elapsed-time reads occur during initialization or user actions. Timer notifications run outside state updater functions so Strict Mode does not duplicate them. Express error middleware keeps its required four-argument signature.

New regressions cover backend restart persistence, malformed JSON without progress mutation, Strict Mode timer notifications and duration resets, and failed PYQ images blocking answers until navigation to another question.

## Limits

No interactive browser was available during this verification. JSDOM workflow tests and HTTP checks passed; visual layout and native browser behavior were not manually verified. PDF extraction was unconfigured, so no provider request was made. This verifies backend process restart on Windows, not power-loss durability or a full operating-system reboot.
