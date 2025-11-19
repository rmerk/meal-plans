<script setup lang="ts">
const route = useRoute()

// Navigation items for desktop
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/plans', label: 'Meal Plans' },
  { to: '/tools', label: 'Tools' },
  { to: '/favorites', label: 'Favorites' }
]

// Check if route is active
const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md"
    >
      Skip to main content
    </a>

    <!-- Desktop Top Navigation (hidden on mobile < 640px) -->
    <header class="hidden sm:block sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <!-- Logo / Brand -->
        <NuxtLink
          to="/"
          class="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <div class="flex items-center gap-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            :class="{ 'font-bold text-primary': isActive(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- Color Mode Toggle -->
          <UColorModeButton />
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main
      id="main-content"
      class="flex-1 pb-16 sm:pb-0"
    >
      <slot />
    </main>

    <!-- Mobile Bottom Navigation (hidden on desktop >= 640px) -->
    <MobileNav class="sm:hidden" />
  </div>
</template>
