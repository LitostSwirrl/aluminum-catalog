<script setup lang="ts">
import type { ArtworkCategory } from '~/types/artwork';
import categoriesData from '~/data/categories.json';

const props = defineProps<{
  activeCategories: ArtworkCategory[];
}>();

const emit = defineEmits<{
  toggleCategory: [category: ArtworkCategory];
  resetZoom: [];
  clearFilters: [];
}>();

const { getCategoryColor } = useCategoryColors();
const showPanel = ref(true);
</script>

<template>
  <div class="absolute left-4 top-4 z-10">
    <button
      class="rounded-lg border border-catalog-border bg-catalog-surface px-3 py-2 text-xs font-medium text-catalog-text shadow-sm transition-colors hover:bg-catalog-bg"
      @click="showPanel = !showPanel"
    >
      {{ showPanel ? 'Hide' : 'Filters' }}
    </button>

    <div
      v-if="showPanel"
      class="mt-2 w-64 rounded-lg border border-catalog-border bg-catalog-surface p-4 shadow-lg"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Filter by Category</h3>
        <button
          v-if="activeCategories.length > 0"
          class="text-[10px] text-catalog-muted underline hover:text-catalog-text"
          @click="emit('clearFilters')"
        >
          Clear
        </button>
      </div>
      <div class="mt-3 space-y-1.5">
        <button
          v-for="cat in categoriesData"
          :key="cat.slug"
          class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors hover:bg-catalog-bg"
          :class="
            activeCategories.length > 0 && !activeCategories.includes(cat.slug as ArtworkCategory)
              ? 'opacity-40'
              : ''
          "
          @click="emit('toggleCategory', cat.slug as ArtworkCategory)"
        >
          <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: getCategoryColor(cat.slug as ArtworkCategory) }" />
          <span class="text-catalog-text">{{ cat.name }}</span>
        </button>
      </div>

      <div class="mt-4 border-t border-catalog-border pt-3">
        <button
          class="w-full rounded bg-catalog-bg px-3 py-1.5 text-xs font-medium text-catalog-muted transition-colors hover:text-catalog-text"
          @click="emit('resetZoom')"
        >
          Reset View
        </button>
      </div>
    </div>
  </div>
</template>
