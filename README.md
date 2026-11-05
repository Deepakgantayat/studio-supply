# Studio Supply — product catalogue proof of concept

A small catalogue with home, category, search, product detail and enquiry flows. The React client talks only to the Node API. The API owns the Fake Store integration and can replace it without changing the client.

## Stack and why

- **Client:** React + TypeScript + Vite. The requested web experience is interactive, and this keeps local feedback and setup quick.
- **Backend:** Node.js + TypeScript + Express. It provides a clear API boundary for catalogue data and enquiry delivery.
- **Product source:** Fake Store API, accessed only from the backend. Five stable IDs (1–5) are marked as the initial featured edit; this is intentionally easy to replace with an editorial data source.
- **Enquiries:** SMTP when configured. By default, the API appends enquiries to `server/data/enquiries.jsonl`, which is a no-account local development sink. To exercise real inbox delivery locally, configure SMTP to a local SMTP catcher such as Mailpit. See `.env.example`.

## Run locally

### Recommended: Docker Compose with a local email inbox

Requirements: Docker with Compose. From this directory:

```sh
docker compose up --build
```

Open <http://localhost:5173> to use the catalogue and <http://localhost:8025> to view the local sales inbox. Enquiries submitted in the app are delivered over SMTP to Mailpit, so no external account or paid service is needed. Product data requires an internet connection to Fake Store API. Stop with `Ctrl+C`.

### Run without Docker

Requirements: Node.js 20 or newer and npm. From this directory:

First copy the example environment file. In PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Then install dependencies once:

```sh
npm install
```

Start both services together:

```sh
npm run dev
```

Or start them in separate terminals from this directory:

**Terminal 1 — backend API**

```sh
npm run dev:server
```

**Terminal 2 — frontend**

```sh
npm run dev:client
```

Open <http://localhost:5173> for the frontend. The backend health endpoint is <http://localhost:4000/api/health>. Product data requires an internet connection to Fake Store API. Without SMTP settings, enquiries are saved as JSON lines in `server/data/enquiries.jsonl`; this is a local development fallback, not inbox delivery. For actual email delivery, set `SMTP_HOST`, `SMTP_PORT`, optional `SMTP_USER`/`SMTP_PASS`, and `SALES_INBOX` in `.env` to a local SMTP catcher or an SMTP server you already have access to.

## Commands

- `npm run dev` — start API and web client.
- `npm run build` — type-check and build both workspaces.
- `npm test` — run the API product-service tests.

## API

- `GET /api/health`
- `GET /api/products` — optional `q`, `category`, and `featured=true` filters.
- `GET /api/products/:id`
- `GET /api/categories`
- `POST /api/enquiries` — JSON `{ productId, name, email, phone, message }`.

## Notes

The enquiry flow validates inputs and confirms receipt only after the selected delivery adapter succeeds. Docker Compose routes mail to a local Mailpit inbox; the no-Docker fallback appends to a local JSONL file. External email should be configured through SMTP and never committed into the repo. Product responses are cached in memory for one minute.

See [DECISIONS.md](./DECISIONS.md) and [AI_USAGE.md](./AI_USAGE.md) for assumptions, trade-offs and review notes.
