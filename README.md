# Lisergia

[Luis Bizarro](https://bizar.ro/)'s opinative web development stack and Front End framework.

## Quick Start

```sh
git clone git@github.com:bizarro/lisergia.git
bun install
cp .env.example .env
bun run dev
```

All workspaces use the single root `.env`. Add local secrets there and run workspace commands through the root scripts so Bun passes the environment to Turbo and each app.

## Why this does exist?

> “Prioritizing animations, motion and interactions in a website shouldn't be controversial. Not adding interesting things to your web pages because of metrics will always be a downgrade.” **&mdash; Luis Bizarro.**

Lisergia is an opinionated web development stack designed to simplify the creation of interactive websites. Its primary goal is to reduce the complexity and stigma often associated with adding animations to web pages—a task that should be simple and straightforward.

Everything in this repository is intentionally opinionated and reflects what I consider the golden standard for maintainability and scalability in web applications—specifically for marketing-focused landing pages. This stack is not intended for general product engineering, and that’s by design. Lisergia is solving a different problem.

Marketing landing pages typically align with the creative vision of art directors and designers. These projects often prioritize delightful and surprising user experiences over conventional performance metrics. As such, benchmarks like LCP (Largest Contentful Paint) and FCP (First Contentful Paint) are less relevant. The real goal is to offer elegant transitions and engaging interactions that elevate the experience for site visitors.

## Front End Architecture

The Front End architecture is Lisergia itself: server-rendered TSX views, SCSS, and a TypeScript client runtime that enhances the generated pages with transitions, datasets, and animations. Preact only turns the view tree into static HTML; it does not hydrate the page or replace Lisergia's runtime. Lisergia also includes several libraries by default to streamline development and improve the developer experience:

- [Lenis](https://lenis.darkroom.engineering/): improves scroll behavior to feel smooth and natural by default.
- [MobX](https://mobx.js.org/): simplifies and streamlines application state management.
- [NanoEvents](https://github.com/ai/nanoevents): enables lightweight event handling via `.on` and `.off` methods.
- [Auto Bind](https://github.com/sindresorhus/auto-bind): eliminates the need for manual `.bind(this)` calls.
- [Tempus](https://github.com/darkroomengineering/tempus): a `requestAnimationFrame` manager for coordinated frame-based updates.

## Back End Architecture

The Back End uses [Sanity](https://www.sanity.io/) as the Content Management System. [Elysia](https://elysiajs.com/) is a deliberately thin HTTP layer running on [Cloudflare Workers](https://developers.cloudflare.com/workers/): it validates endpoints and passes content into the Lisergia view renderer, while Workers Static Assets serves the compiled frontend.

## Deployment

Run `bun run deploy:web` from the repository root to build and deploy the Elysia Worker and its static assets with Wrangler. Run `bun run deploy:studio` to deploy Sanity Studio.

## Apps

- `backend`: The local Sanity Studio, running at `http://localhost:3000/`.
- `frontend`: The local Elysia Worker and static frontend, running through Wrangler at `http://localhost:8787/`.

## Packages

- Linting is handled by [Biome](https://biomejs.dev) via the root `biome.json`.
- `@lisergia/config-typescript`: Shared `tsconfig.json` configurations used throughout the monorepo.
- `@lisergia/cli`: Command-line interface used by the `web` application to generate the Front End bundle.
- `@lisergia/core`: Core components that power the Lisergia framework.
- `@lisergia/managers`: Built-in managers that handle various application behaviors in Lisergia.
- `@lisergia/styles`: Shared styles and SCSS utilities used across projects.
- `@lisergia/utilities`: Reusable utility functions that support common development needs.
