<script setup lang="ts">
import type { Artwork } from '~/types/artwork';

defineProps<{
  artwork: Artwork;
}>();

const { getCategoryColor } = useCategoryColors();
const imgError = ref(false);
</script>

<template>
  <NuxtLink
    :to="`/catalog/${artwork.slug}`"
    class="group block overflow-hidden rounded-lg border border-catalog-border bg-catalog-surface transition-all hover:border-catalog-accent/30 hover:shadow-lg"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        v-if="artwork.imageUrl && !imgError"
        :src="artwork.imageUrl"
        :alt="artwork.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imgError = true"
      />
      <SharedArtworkPlaceholder
        v-else
        :title="artwork.title"
        :artist="artwork.artist"
        :year="artwork.year"
        :category="artwork.category"
        size="md"
      />
      <!-- Category dot -->
      <span
        class="absolute left-3 top-3 h-2.5 w-2.5 rounded-full ring-2 ring-white"
        :style="{ backgroundColor: getCategoryColor(artwork.category) }"
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      <p class="text-xs font-medium uppercase tracking-wider text-catalog-muted">
        {{ artwork.artist }}
      </p>
      <h3 class="mt-1 font-serif text-base font-semibold leading-snug text-catalog-text line-clamp-2">
        {{ artwork.title }}
      </h3>
      <p class="mt-1 text-xs text-catalog-muted">
        {{ artwork.year }} · {{ artwork.medium }}
      </p>
      <div class="mt-3 flex flex-wrap gap-1">
        <span
          v-for="tag in artwork.tags.slice(0, 3)"
          :key="tag"
          class="rounded-full bg-catalog-bg px-2 py-0.5 text-[10px] text-catalog-muted"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
