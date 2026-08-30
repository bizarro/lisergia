# Setup

Copy the repository root `.env.example` to `.env` at the repository root. The frontend and Studio share that one local file:

```env
POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
POSTHOG_HOST=https://us.i.posthog.com

SANITY_API=2023-05-03
SANITY_DATABASE=production
SANITY_PROJECT=xxxxxxxx
SANITY_STUDIO_URL=http://localhost:3000
SANITY_API_READ_TOKEN=sk...

VITE_PORT=3002

TYPEKIT=xxxxxxx

KLAVIYO_API_KEY=xx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
KLAVIYO_COMPANY_ID=xxxxxx
KLAVIYO_LIST_ID=xxxxxx
```

## Environment Variables

- `POSTHOG_KEY`: Public project token used to initialize PostHog when paired with `POSTHOG_HOST`.
- `POSTHOG_HOST`: PostHog ingestion host for the project's region (for example, `https://us.i.posthog.com` or `https://eu.i.posthog.com`).
- `SANITY_API`: Defines the Sanity API version.
- `SANITY_DATABASE`: Specifies the Sanity dataset to use.
- `SANITY_PROJECT`: Sets the Sanity project ID.
- `SANITY_STUDIO_URL`: Base URL of the Sanity Studio used by visual-editing links.
- `SANITY_API_READ_TOKEN`: Server-only Viewer token used to validate preview sessions and fetch drafts. Never expose this value to browser code.
- `VITE_PORT`: Overrides the default Vite client asset port.
- `TYPEKIT`: Injects Adobe Typekit fonts into the site.
- `KLAVIYO_API_KEY`: API key used to connect with Klaviyo services.
- `KLAVIYO_COMPANY_ID`: Identifier for your Klaviyo company account.
- `KLAVIYO_LIST_ID`: Identifier for the Klaviyo mailing list used in forms or signups.

## Deployment

The production Worker is routed to `https://lisergia.dev`, and its Sanity Studio URL is `https://studio.lisergia.dev`. Authenticate once with `bunx wrangler login`, then configure `POSTHOG_KEY`, `POSTHOG_HOST`, `TYPEKIT`, and optional `ASSET_VERSION` as Worker variables. The PostHog project token is safe to expose in the browser; do not use a PostHog personal API key. The non-secret Sanity production settings are defined in `wrangler.jsonc`. Store the Sanity read token and Klaviyo values as encrypted secrets. These Cloudflare secrets are separate from the root `.env`:

```sh
bunx wrangler secret put KLAVIYO_API_KEY
bunx wrangler secret put KLAVIYO_LIST_ID
bunx wrangler secret put SANITY_API_READ_TOKEN
bun run deploy:web
```

The deploy command retains dashboard-managed variables. Cloudflare serves files in `build` through Workers Static Assets, while page routes and `/signup` execute in the Elysia Worker.

For local visual previews, run the Studio on port `3000` and the frontend Worker on port `8787`, then open **Presentation** in Sanity Studio. Add the frontend origins (for example, `http://localhost:8787` and the deployed site) as credentialed CORS origins in the Sanity project settings.

## Commands

- `content`: Generates the content.json file from the CMS data.
- `dev`: Downloads content, prepares static assets, then starts the Elysia Worker in Wrangler alongside Vite client HMR.
- `dev:assets`: Starts the Vite client asset watcher.
- `dev:worker`: Starts the local Elysia Worker with Wrangler.
- `build`: Downloads content and builds the static frontend assets.
- `build:client`: Builds the static frontend assets without downloading content.
- `check-types`: Checks the server, views, and client TypeScript without emitting files.
- `deploy`: Downloads content, builds the frontend, and deploys the Cloudflare Worker.
- `lint`: Lints the codebase using Biome.
- `types`: Regenerates the Worker environment types from `wrangler.jsonc`.
