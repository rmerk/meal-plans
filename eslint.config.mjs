// @ts-check
import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: [
      // Old vanilla JS files from previous app (not part of Nuxt 4 migration)
      'analytics-tracker.js',
      'mobile-utils.js',
      'notifications.js',
      'sw.js',
      'meals/**'
    ]
  }
)
