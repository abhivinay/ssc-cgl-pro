# Sentinel reliability upgrade — 2026-09-08

Base: `dd73d31c6a5e9d82b4610ccd67337a28ee3a8023` on `abhivinay/ssc-cgl-pro`.
This is an isolated upgrade of the connected GitHub snapshot, not a replacement for newer laptop work. Compare local changes before merging.

## Implemented

- Standalone animated Sentinel entry, daily five-game gate, and an explicit Enter Command Center action.
- Responsive collapsible navigation, skip link, keyboard focus styles, reduced-motion support, route loading and error boundaries.
- Lazy-loaded routes and content packs. The initial main JavaScript chunk fell from about 819 KB to about 287 KB, uncompressed; this is a build-size comparison, not a measured loading-time or Lighthouse score.
- Stage prerequisite checks, score evidence requirements, duplicate reward prevention, and the final-stage crash repair.
- Shared XP total and level calculation; legacy totals are conservatively reconciled by maximum, not added together, because their historical overlap cannot be established.
- Brain completion updates study state, rejects incomplete sessions, and awards once per date. Final answers are included in seven formerly stale game-summary paths. Number Memory ends after five rounds even when the last answer is wrong.
- Persisted timed assessments with an absolute deadline, reload recovery, automatic timeout submission, question navigation, mark-for-review, score review and mistakes capture.
- Persisted practice answers and explanations. Tests and practice share an answer-format normalizer without changing the authored question content.
- Existing Number System, Percentage, Ratio & Proportion, Average, Profit & Loss, and combined Simple/Compound Interest modules are connected; Ancient History remains connected. Question-contract tests cover every connected Quant practice/test module.
- Topic revisions and the Revision page now share the same records. Each later revision occurrence has a unique reward ID.
- Backend disk snapshots with optimistic revision checks, temporary-file replacement and a previous-file recovery copy. Browser cache remains usable offline, with an explicit warning that disk saving is unavailable.
- Validated backup export/import, preview and confirmation before replacement, current-data download before restoring, and explicit conflict recovery.
- Extraction uses the app's API proxy. Retry policy honors non-retryable failures, cancellation and bounded backoff. OCR confidence scale and structured provenance are preserved; incomplete records cannot be approved through the Review Center.
- Local-only backend binding, host/origin validation, extraction concurrency/rate limits, health checks without an API key, and production exclusion of developer controls.

## Verification

`npm test`: 23 passing regression tests, including component mounting of 19 main app routes, assessment timer/reload checks and actual local HTTP backend tests. No external extraction calls or real user records are used.

`npm run build`: production build passes, with routes/content split into separate bundles.

`git diff --check`: passes.

These are automated code/component checks, not visual browser, real-device, assistive-technology, load or penetration testing. Do not interpret them as a perfect quality rating.

## Storage and recovery

Run the backend alongside Vite. The backend stores `.ssc-data/progress.json` and `.ssc-data/progress.previous.json` by default; this directory is ignored by Git. `SSC_DATA_DIR` can point to a durable directory on your machine. Back up that directory separately. Browser-cache backups do not include PDFs or server API keys.

On first connection, an empty backend receives existing browser data. On a clean reconnect, the backend copy restores the browser cache. Pending local changes with a different server revision are not silently overwritten: Data & recovery offers a backup-first server restore. A stale upload receives HTTP 409. Automatic merging of simultaneous study activity is not implemented.

For a damaged server snapshot, stop the backend, preserve the damaged file for inspection, and restore a known-good exported snapshot or the previous server file. The server refuses to overwrite an unreadable current file. Files are not encrypted by this app; use operating-system access controls and encrypted backups where needed.

## Remaining release gates

1. Bring in and reconcile the newer laptop version and authoritative question dataset. The connected GitHub snapshot does **not** contain the previously reported 20,468 app-ready questions. No substitute questions or false verification labels were generated.
2. Missing authored English/Reasoning/GA modules and verified PYQs remain visibly unavailable. Sequential mastery intentionally does not advance through missing content. This means the entire syllabus is not yet completable.
3. Perform real-browser/mobile visual and interaction QA, including all nine full brain games, slow-device animation performance, focus management and long sessions. A reload resumes the daily game position; an individual unfinished memory-game round restarts.
4. Review the repository's pre-existing lint debt and duplicate legacy engines. This upgrade does not assert repository-wide lint cleanliness or complete consolidation of every unused module.
5. Configure an actually available provider model in `GEMINI_MODEL` and perform live PDF extraction QA with the user's own API key. No model availability, question accuracy or OCR verification is implied by contract tests.
6. Public/cloud or multi-user deployment needs proper server-side authentication, authorization, managed persistent storage, monitoring and a separate security review. This backend is deliberately localhost-only. Study locks are workflow controls, not tamper-proof exam security.

Do not merge over unknown local work or describe this branch as “10/10 in every aspect.” It repairs substantial verified functionality while retaining these explicit release gates.
