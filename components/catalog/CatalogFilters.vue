<script setup lang="ts">
import type { ArtworkCategory } from '~/types/artwork';
import categoriesData from '~/data/categories.json';

const props = defineProps<{
  activeCategories: ArtworkCategory[];
  activeTags: string[];
  allTags: string[];
  activeFilterCount: number;
}>();

const emit = defineEmits<{
  toggleCategory: [category: ArtworkCategory];
  toggleTag: [tag: string];
  clearAll: [];
}>();

const { getCategoryColor } = useCategoryColors();

const showTags = ref(false);
const displayedTags = computed(() => (showTags.value ? props.allTags : props.allTags.slice(0, 12)));
</script>

<template>
  <div class="space-y-6">
    <!-- Categories -->
    <div>
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Categories</h3>
        <button
          v-if="activeFilterCount > 0"
          class="text-xs text-catalog-muted underline hover:text-catalog-text"
          @click="emit('clearAll')"
        >
          Clear all
        </button>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="cat in categoriesData"
          :key="cat.slug"
          class="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all"
          :class="
            activeCategories.includes(cat.slug as ArtworkCategory)
              ? 'border-transparent text-white'
              : 'border-catalog-border text-catalog-muted hover:border-catalog-accent hover:text-catalog-text'
          "
          :style="
            activeCategories.includes(cat.slug as ArtworkCategory)
              ? { backgroundColor: getCategoryColor(cat.slug as ArtworkCategory) }
              : {}
          "
          @click="emit('toggleCategory', cat.slug as ArtworkCategory)"
        >
          <span
            v-if="!activeCategories.includes(cat.slug as ArtworkCategory)"
            class="h-2 w-2 rounded-full"
            :style="{ backgroundColor: getCategoryColor(cat.slug as ArtworkCategory) }"
          />
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Tags -->
    <div>
      <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Tags</h3>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <SharedTagPill
          v-for="tag in displayedTags"
          :key="tag"
          :label="tag"
          :active="activeTags.includes(tag)"
          clickable
          @click="emit('toggleTag', tag)"
        />
      </div>
      <button
        v-if="allTags.length > 12"
        class="mt-2 text-xs text-catalog-muted underline hover:text-catalog-text"
        @click="showTags = !showTags"
      >
        {{ showTags ? 'Show fewer' : `Show all ${allTags.length} tags` }}
      </button>
    </div>
  </div>
</template>
