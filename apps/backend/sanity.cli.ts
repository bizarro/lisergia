import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT,
    dataset: 'production',
  },

  autoUpdates: true,
})
