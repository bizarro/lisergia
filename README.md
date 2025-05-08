# Lisergia

[Luis Bizarro](https://bizar.ro/)'s opinative web development stack and attempt of reusable Front End framework.

## Why this does exist?

> “Prioritizing animations, motion and interactions in a website shouldn't be controversial. Not adding interesting things to your web pages because of metrics will always be a downgrade.” **&mdash; Luis Bizarro.**

## Back End Architecture

Back End uses [Sanity](https://www.sanity.io/) as the Content Management System and [Express](https://expressjs.com/) to serve the JSON file that is generated from data provided by it. Express provides the simplicity necessary to create new endpoints with 3rd party applications and integrations such as [Resend](https://resend.com/). We use a [Twig](https://twig.symfony.com/) port in Node.js as the Template Engine for the views.

## Front End Architecture

-

## Deployment

-

### Apps and Packages

- `cms`: a Sanity CMS instance running at `https://localhost:3333/` by default.
- `web`: an Express instance running at `https://localhost:3000/` by default.
- `@lisergia/config-eslint`: `eslint` configurations used throughout the monorepo.
- `@lisergia/config-typescript`: `tsconfig.json`s used throughout the monorepo.
- `@lisergia/cli`: a CLI used by the `web` application to generate the Front End bundle.
- `@lisergia/core`: the core components from Lisergia.
- `@lisergia/managers`: the managers from Lisergia.
- `@lisergia/styles`: the shared styles from Lisergia.
- `@lisergia/utilities`: the utility functions of Lisergia.
