# SSC Sentinel — Command Center

Personal SSC preparation app built with React, Vite and an Express backend.

## Run locally

Use Node.js 24. Install the locked dependencies:

```sh
npm ci
```

Start the backend in one terminal and the frontend in another:

```sh
npm run server
```

```sh
npm run dev
```

Open the address printed by Vite. Backend port 5000 is proxied through the frontend. The flow is Sentinel entry → five daily brain games → Command Center.

The backend saves progress to `.ssc-data/` without requiring an AI key. Keep this directory backed up. Data & recovery shows save status and offers backup export/import. Browser cache alone is not a durable backup or cloud sync.

## Optional PDF extraction

Copy `.env.example` to `.env` and configure `GEMINI_API_KEY` plus a `GEMINI_MODEL` actually enabled for your provider account. Keys stay on the server. Never commit `.env`. Restart the backend after changing it.

Extraction is disabled with a clear error until both settings exist. The backend accepts local connections only; it is not ready for public deployment.

## Verify

```sh
npm test
npm run build
```

The regression suite uses synthetic records and temporary directories, not your saved progress. Existing repository-wide lint debt remains; `npm run lint` is available for cleanup.

## Upgrade scope

See [Sentinel upgrade notes](docs/SENTINEL_UPGRADE.md) for implemented changes, migration behavior and remaining release gates. This branch is based on the connected August GitHub snapshot; compare any newer laptop work before merging. Missing authored content and verified PYQs are not fabricated or automatically marked complete.
