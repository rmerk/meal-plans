<script setup lang="ts">
/**
 * Global Error Page
 *
 * Catches all errors thrown by Nuxt (404, 500, etc.) and displays
 * a user-friendly error message with navigation options.
 *
 * Used by Story 2.2 for 404 handling when invalid meal plan weeks are accessed.
 * Supports dark mode via Mountains at Sunrise palette.
 *
 * Features:
 * - User-friendly error messages
 * - Navigation back to dashboard
 * - Mountains at Sunrise theme colors
 * - Dark mode support
 * - Different messages for 404 vs other errors
 *
 * References:
 * - Nuxt Error Handling: https://nuxt.com/docs/getting-started/error-handling
 * - Architecture.md lines 479-501 (Error Handling Pattern)
 */

interface ErrorProps {
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
    url?: string
  }
}

const props = defineProps<ErrorProps>()

// Compute user-friendly error message based on status code
const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return props.error.message || 'Meal plan not found'
    case 500:
      return 'Internal Server Error'
    default:
      return 'Something went wrong'
  }
})

const errorDescription = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'The meal plan or recipe you\'re looking for doesn\'t exist. Try browsing from the dashboard.'
    case 500:
      return 'We encountered an unexpected error. Please try again later.'
    default:
      return 'An error occurred while loading this page. Please try again.'
  }
})

// Navigation
const router = useRouter()
const goHome = () => {
  router.push('/').catch(() => {})
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Code -->
      <div class="text-8xl font-bold text-primary dark:text-primary-400 mb-4">
        {{ error.statusCode }}
      </div>

      <!-- Error Title -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {{ errorTitle }}
      </h1>

      <!-- Error Description -->
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {{ errorDescription }}
      </p>

      <!-- Navigation Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          size="lg"
          color="primary"
          @click="goHome"
        >
          Back to Dashboard
        </UButton>

        <UButton
          v-if="error.statusCode !== 404"
          size="lg"
          color="primary"
          variant="outline"
          @click="() => router.back()"
        >
          Go Back
        </UButton>
      </div>

      <!-- Debug Info (Development Only) -->
      <div
        v-if="$config.public.dev"
        class="mt-8 text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
      >
        <p class="text-sm text-gray-700 dark:text-gray-300 font-mono">
          <strong>Debug Info:</strong><br>
          Status: {{ error.statusCode }}<br>
          Message: {{ error.message }}<br>
          URL: {{ error.url }}
        </p>
      </div>
    </div>
  </div>
</template>
