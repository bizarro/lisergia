# Lisergia

[Luis Bizarro](https://bizar.ro/)'s opinative web development stack and Front End framework.

## Quick Start

```sh
git clone git@github.com:bizarro/lisergia.git
npm i
npm run dev
```

## Why this does exist?

> “Prioritizing animations, motion and interactions in a website shouldn't be controversial. Not adding interesting things to your web pages because of metrics will always be a downgrade.” **&mdash; Luis Bizarro.**

Lisergia is an opinionated web development stack designed to simplify the creation of interactive websites. Its primary goal is to reduce the complexity and stigma often associated with adding animations to web pages—a task that should be simple and straightforward.

Everything in this repository is intentionally opinionated and reflects what I consider the golden standard for maintainability and scalability in web applications—specifically for marketing-focused landing pages. This stack is not intended for general product engineering, and that’s by design. Lisergia is solving a different problem.

Marketing landing pages typically align with the creative vision of art directors and designers. These projects often prioritize delightful and surprising user experiences over conventional performance metrics. As such, benchmarks like LCP (Largest Contentful Paint) and FCP (First Contentful Paint) are less relevant. The real goal is to offer elegant transitions and engaging interactions that elevate the experience for site visitors.

## Front End Architecture

The Front End architecture is primarily composed of [Twig](https://twig.symfony.com/) for HTML markup, [SCSS](https://sass-lang.com/) for styling and [TypeScript](https://www.typescriptlang.org/) for JavaScript transpilation. Lisergia also includes several libraries by default to streamline development and improve the developer experience:

- [Lenis](https://lenis.darkroom.engineering/): improves scroll behavior to feel smooth and natural by default.
- [MobX](https://mobx.js.org/): simplifies and streamlines application state management.
- [NanoEvents](https://github.com/ai/nanoevents): enables lightweight event handling via `.on` and `.off` methods.
- [Auto Bind](https://github.com/sindresorhus/auto-bind): eliminates the need for manual `.bind(this)` calls.
- [Tempus](https://github.com/darkroomengineering/tempus): a `requestAnimationFrame` manager for coordinated frame-based updates.

## Back End Architecture

The Back End uses [Sanity](https://www.sanity.io/) as the Content Management System, with [Express](https://expressjs.com/) serving a JSON file generated from its structured content. Express offers the simplicity and flexibility needed to create custom endpoints and integrate with third-party services such as [Resend](https://resend.com/). For rendering views, we use a Node.js port of [Twig](https://twig.symfony.com/) as the template engine.

## Deployment

Just plug this on [Vercel](https://vercel.com/) and your application is going to be available automatically through [Vercel Functions](https://vercel.com/docs/functions).

## Apps

- `cms`: A local Sanity CMS instance, running at `https://localhost:3333/` by default.
- `web`: A local Express server, running at `https://localhost:3000/` by default.

## Packages

- `@lisergia/config-eslint`: Shared `eslint` configuration used across the monorepo.
- `@lisergia/config-typescript`: Shared `tsconfig.json` configurations used throughout the monorepo.
- `@lisergia/cli`: Command-line interface used by the `web` application to generate the Front End bundle.
- `@lisergia/core`: Core components that power the Lisergia framework.
- `@lisergia/managers`: Built-in managers that handle various application behaviors in Lisergia.
- `@lisergia/styles`: Shared styles and SCSS utilities used across projects.
- `@lisergia/utilities`: Reusable utility functions that support common development needs.
