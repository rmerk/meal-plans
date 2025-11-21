/**
 * Nuxt UI App Configuration
 *
 * Defines the Mountains at Sunrise theme for @nuxt/ui v4 components.
 * All UI components (UBadge, UButton, UCard, etc.) use these color definitions.
 *
 * Mountains at Sunrise Palette:
 * - Primary: Deep Blue #192E59 (dark mode: lighter #2A4A7C)
 * - Secondary: Warm Gold #F2CC85 (dark mode: softer #E6C07B)
 * - Background: White/Off-white (dark mode: #1a1a1a / #2a2a2a)
 *
 * References:
 * - Story 1.2: Configure Mountains at Sunrise Theme
 * - Story 2.2: UBadge components use color="primary" and color="secondary"
 * - @nuxt/ui Theme Docs: https://ui.nuxt.com/getting-started/theme
 */

export default defineAppConfig({
  ui: {
    // Mountains at Sunrise Color Palette
    colors: {
      primary: 'primary', // Mountains at Sunrise Deep Blue
      secondary: 'secondary', // Mountains at Sunrise Warm Gold
      neutral: 'gray',
      success: 'green',
      warning: 'orange',
      error: 'red',
      info: 'blue'
    },

    // Custom color definitions for Mountains at Sunrise
    // These override the default Tailwind colors
    theme: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98', // Mid-tone for dark mode primary
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#192E59', // Primary Deep Blue (light mode)
          950: '#102A4C' // Darker variant
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F2CC85', // Secondary Warm Gold (light mode)
          600: '#E6C07B', // Secondary softer gold (dark mode)
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
          950: '#78350f'
        }
      }
    },

    // Component-specific overrides
    button: {
      // Ensure minimum touch target size for mobile (44px)
      variants: {
        size: {
          lg: 'h-11 px-6 text-base' // 44px height meets WCAG 2.1 AA
        }
      }
    },

    badge: {
      // Default variant for feature/protein badges in Story 2.2
      variants: {
        variant: {
          subtle: 'bg-{color}-50 dark:bg-{color}-950/50 text-{color}-700 dark:text-{color}-300 ring-1 ring-{color}-200 dark:ring-{color}-800'
        }
      }
    }
  }
})
