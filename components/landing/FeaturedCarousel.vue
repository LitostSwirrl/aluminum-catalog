<script setup lang="ts">
const { getFeatured } = useArtworks();
const { getCategoryColor } = useCategoryColors();

const featured = getFeatured();
const current = ref(0);
const imgErrors = ref<Set<number>>(new Set());

function next() {
  current.value = (current.value + 1) % featured.length;
}

function prev() {
  current.value = (current.value - 1 + featured.length) % featured.length;
}

const currentWork = computed(() => featured[current.value]);
</script>

<template>
  <section v-if="featured.length > 0" class="bg-catalog-surface py-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex items-end justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-catalog-muted">Featured</p>
          <h2 class="mt-2 font-serif text-2xl font-semibold text-catalog-text">Selected Works</h2>
        </div>
        <div class="flex gap-2">
          <button
            class="rounded-full border border-catalog-border p-2 text-catalog-muted transition-colors hover:border-catalog-accent hover:text-catalog-text"
            @click="prev"
            aria-label="Previous work"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            class="rounded-full border border-catalog-border p-2 text-catalog-muted transition-colors hover:border-catalog-accent hover:text-catalog-text"
            @click="next"
            aria-label="Next work"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <NuxtLink
        v-if="currentWork"
        :to="`/catalog/${currentWork.slug}`"
        class="group mt-8 grid gap-8 md:grid-cols-2"
      >
        <div class="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
          <img
            v-if="currentWork.imageUrl && !imgErrors.has(current)"
            :src="currentWork.imageUrl"
            :alt="currentWork.title"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            @error="imgErrors.add(current)"
          />
          <div
            v-else
            class="flex h-full items-center justify-center"
            :style="{ backgroundColor: getCategoryColor(currentWork.category) + '15' }"
          >
            <span class="font-serif text-5xl text-catalog-muted/30">{{ currentWork.artist.charAt(0) }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <SharedCategoryBadge :category="currentWork.category" size="sm" />
          <h3 class="mt-3 font-serif text-2xl font-semibold text-catalog-text md:text-3xl">
            {{ currentWork.title }}
          </h3>
          <p class="mt-1 text-sm text-catalog-muted">
            {{ currentWork.artist }}, {{ currentWork.year }}
          </p>
          <p class="mt-4 line-clamp-4 text-sm leading-relaxed text-catalog-text/70">
            {{ currentWork.description }}
          </p>
          <span class="mt-6 text-xs font-medium text-catalog-accent group-hover:underline">
            View full entry →
          </span>
        </div>
      </NuxtLink>

      <!-- Dots indicator -->
      <div class="mt-6 flex justify-center gap-1.5">
        <button
          v-for="(_, idx) in featured"
          :key="idx"
          class="h-1.5 rounded-full transition-all"
          :class="idx === current ? 'w-6 bg-catalog-accent' : 'w-1.5 bg-catalog-border'"
          @click="current = idx"
          :aria-label="`Go to work ${idx + 1}`"
        />
      </div>
    </div>
  </section>
</template>
