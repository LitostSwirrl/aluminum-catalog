<script setup lang="ts">
import type { Artwork } from '~/types/artwork';

defineProps<{
  artwork: Artwork;
}>();

const imgError = ref(false);
const { getCategoryColor } = useCategoryColors();
</script>

<template>
  <div class="relative aspect-[16/9] max-h-[70vh] w-full overflow-hidden bg-gray-100 md:aspect-[21/9]">
    <img
      v-if="artwork.imageUrl && !imgError"
      :src="artwork.imageUrl"
      :alt="artwork.title"
      class="h-full w-full object-cover"
      @error="imgError = true"
    />
    <div
      v-else
      class="flex h-full items-center justify-center"
      :style="{ backgroundColor: getCategoryColor(artwork.category) + '10' }"
    >
      <span class="font-serif text-6xl text-catalog-muted/20">{{ artwork.artist.charAt(0) }}</span>
    </div>
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <!-- Title overlay -->
    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
      <p class="text-xs font-medium uppercase tracking-widest text-white/70">
        {{ artwork.artist }}
      </p>
      <h1 class="mt-1 font-serif text-3xl font-bold text-white md:text-5xl">
        {{ artwork.title }}
      </h1>
      <p class="mt-2 text-sm text-white/80">
        {{ artwork.year }} · {{ artwork.medium }}
      </p>
    </div>
  </div>
</template>
