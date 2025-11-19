<script setup lang="ts">
const route = useRoute()

// Mobile bottom navigation tabs
const tabs = [
  { to: '/', label: 'Home', icon: 'i-heroicons-home' },
  { to: '/plans', label: 'Plans', icon: 'i-heroicons-document-text' },
  { to: '/tools', label: 'Tools', icon: 'i-heroicons-wrench-screwdriver' },
  { to: '/favorites', label: 'Favorites', icon: 'i-heroicons-star' }
]

// Check if tab is active
const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    aria-label="Mobile navigation"
  >
    <div class="flex justify-around items-center h-16">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex flex-col items-center justify-center w-full h-full min-w-[44px] min-h-[44px] transition-colors"
        :class="isActive(tab.to) ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-400'"
        :aria-label="tab.label"
        :aria-current="isActive(tab.to) ? 'page' : undefined"
      >
        <UIcon :name="tab.icon" class="w-6 h-6 mb-1" />
        <span class="text-xs">{{ tab.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
