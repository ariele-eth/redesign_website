const {defineCliConfig} = require('sanity/cli')

module.exports = defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lmw06xbm',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
