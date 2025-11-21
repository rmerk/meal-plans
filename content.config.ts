/**
 * Nuxt Content Configuration
 *
 * Defines content collections and sources for the Meal Plans PWA.
 * This configuration suppresses the @nuxt/content warning about missing config
 * and provides explicit structure for meal plan content.
 *
 * References:
 * - @nuxt/content docs: https://content.nuxt.com/docs/getting-started/installation
 * - Story 2.2: Meal Plan Overview Page
 * - Epic 2: Content Discovery & Browsing
 */

import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Meal plans collection - content/meals/
    meals: defineCollection({
      type: 'page',
      source: 'meals/**/*.md'
    })
  }
})
