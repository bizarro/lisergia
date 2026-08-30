# Setup

Use the single `.env` at the repository root (copy `.env.example` if needed). The Studio reads the shared Sanity configuration from it:

```
SANITY_PROJECT=xxxxxxxx
SANITY_STUDIO_PREVIEW_URL=http://localhost:8787
```

`SANITY_STUDIO_PREVIEW_URL` is the frontend origin opened by Sanity's Presentation tool. Set it to the deployed frontend URL in the deployed Studio environment.

## Cloudflare deployment

The production Studio is deployed as a separate static-assets Worker at `https://studio.lisergia.dev`. Its Wrangler configuration provides SPA fallback routing, and the production build points Presentation at `https://lisergia.dev`.

```sh
bun run deploy:studio
```

## Commands

- `dev`: Run locally.
- `start`: Preview static build.
- `build`: Build into `dist` folder.
- `build:cloudflare`: Build the Studio with the production preview URL.
- `deploy`: Deploy to `project.sanity.studio`.
- `deploy:cloudflare`: Build and deploy the Studio to Cloudflare.
