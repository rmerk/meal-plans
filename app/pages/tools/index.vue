<script setup lang="ts">
useSeoMeta({
  title: 'Tools',
  description: 'Access meal planning and cooking tools'
})

const tools = [
  { name: 'Shopping Helper', description: 'Generate smart shopping lists', icon: 'i-heroicons-shopping-cart' },
  { name: 'Nutrition Dashboard', description: 'Track macros and nutrition', icon: 'i-heroicons-chart-bar' },
  { name: 'Recipe Scaler', description: 'Scale recipes to any serving size', icon: 'i-heroicons-scale' },
  { name: 'Analytics', description: 'View cooking statistics', icon: 'i-heroicons-presentation-chart-line' },
  { name: 'Recipe Library', description: 'Browse all recipes', icon: 'i-heroicons-book-open' },
  { name: 'Cooking Mode', description: 'Step-by-step cooking guidance', icon: 'i-heroicons-fire' },
  { name: 'Ratings', description: 'Rate and track favorite meals', icon: 'i-heroicons-star' },
  { name: 'Settings', description: 'Customize your experience', icon: 'i-heroicons-cog-6-tooth' },
  { name: 'Meal Prep Guides', description: 'Batch cooking workflows', icon: 'i-heroicons-clipboard-document-list' }
]
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-4xl font-bold text-primary mb-6">
      Tools
    </h1>

    <p class="text-gray-700 dark:text-gray-300 mb-8">
      Meal planning and cooking utility tools. Full functionality will be implemented in Epics 3-5.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tool in tools"
        :key="tool.name"
        class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start gap-4">
          <UIcon
            :name="tool.icon"
            class="w-8 h-8 text-primary shrink-0"
          />
          <div>
            <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">
              {{ tool.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ tool.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
