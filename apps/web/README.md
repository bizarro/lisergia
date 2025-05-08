## Setup

Create `.env` file with project information:

```
GOOGLE_ANALYTICS=ABC

SANITY_API=2023-05-03
SANITY_DATABASE=production
SANITY_PROJECT=xxxxxxxx

BROWSERSYNC_PORT=3000
BROWSERSYNC_PROXY=localhost:3000
```

- `GOOGLE_ANALITYCS`: automatically injects Google Analytics data in the website when declared.
- `SANITY_API`: declares Sanity API version.
- `SANITY_DATABASE`: declares Sanity database.
- `SANITY_PROJECT`: declare Sanity project ID.
- `BROWSERSYNC_PORT`: allows override of Browsersync port.
- `BROWSERSYNC_PROXY`: allows override of Browsersync proxy.

## Commands

- `content`: generate `content.json` file with CMS data.
- `dev`: start the Lisergia with Rollup and Express with Nodemon.
- `build`: generate Express `index.js` application and static assets.
- `lint`: lint application.
- `start`: simulate production build.
