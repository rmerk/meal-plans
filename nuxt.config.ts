// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vite-pwa/nuxt'
  ],

  devtools: {
    enabled: true,
    vscode: {
      port: 4010
    }
  },

  devServer: {
    port: 4000,
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/theme-test': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },

  // Configure Nuxt Icon for offline-first PWA (no external API calls)
  icon: {
    provider: 'none', // Disable ALL external API calls - icons bundled at build time
    clientBundle: {
      scan: true, // Auto-detect icons in components
      icons: [
        // Brand icons
        'simple-icons:github',
        'simple-icons:nuxtdotjs',
        // Theme icons
        'lucide:moon',
        'lucide:sun',
        // UI component icons (UHeader mobile menu, dropdowns)
        'lucide:menu',
        'lucide:chevron-down',
        // Feature/content icons (index page)
        'lucide:arrow-right',
        'lucide:rocket',
        'lucide:palette',
        'lucide:zap',
        'lucide:blocks',
        'lucide:code-2',
        'lucide:shield-check'
      ], // Explicitly list critical icons
      sizeLimitKb: 256 // Bundle size limit
    }
  },

  // Configure Google Fonts for Mountains at Sunrise typography
  fonts: {
    families: [
      { name: 'Playfair Display', provider: 'google', weights: [400, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 600] }
    ]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // PWA Configuration
  pwa: {
    strategies: 'generateSW', // Workbox-generated service worker
    registerType: 'autoUpdate', // Auto-update until Epic 5 implements update UI (was: 'prompt')
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}']
    },
    manifest: {
      name: 'Meal Plans',
      short_name: 'Meals',
      description: 'Weekly meal planning with batch cooking strategies',
      theme_color: '#192E59', // Mountains at Sunrise Deep Blue
      background_color: '#F2CC85', // Mountains at Sunrise Gold
      display: 'standalone',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
})
