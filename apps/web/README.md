# Setup

Create a `.env` file with your project configuration:

```env
GOOGLE_ANALYTICS=ABC

SANITY_API=2023-05-03
SANITY_DATABASE=production
SANITY_PROJECT=xxxxxxxx

BROWSERSYNC_PORT=3000
BROWSERSYNC_PROXY=localhost:3000

TYPEKIT=xxxxxxx

KLAVIYO_API_KEY=xx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
KLAVIYO_COMPANY_ID=xxxxxx
KLAVIYO_LIST_ID=xxxxxx
```

## Environment Variables

- `GOOGLE_ANALYTICS`: Injects Google Analytics tracking when set.
- `SANITY_API`: Defines the Sanity API version.
- `SANITY_DATABASE`: Specifies the Sanity dataset to use.
- `SANITY_PROJECT`: Sets the Sanity project ID.
- `BROWSERSYNC_PORT`: Overrides the default Browsersync port.
- `BROWSERSYNC_PROXY`: Overrides the default Browsersync proxy target.
- `TYPEKIT`: Injects Adobe Typekit fonts into the site.
- `KLAVIYO_API_KEY`: API key used to connect with Klaviyo services.
- `KLAVIYO_COMPANY_ID`: Identifier for your Klaviyo company account.
- `KLAVIYO_LIST_ID`: Identifier for the Klaviyo mailing list used in forms or signups.

## Commands

- `content`: Generates the content.json file from the CMS data.
- `dev`: Starts the development server with Rollup, Express, and Nodemon.
- `build`: Compiles the Express index.js application and static assets.
- `lint`: Lints the codebase using ESLint.
- `start`: Serves the production build locally for testing.
