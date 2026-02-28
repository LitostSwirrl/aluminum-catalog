<script setup lang="ts">
useHead({ title: 'Catalog — Aluminum Extrusion Art Catalog' });

const {
  filters,
  filteredArtworks,
  activeFilterCount,
  allTags,
  toggleCategory,
  toggleTag,
  setSearch,
  clearAll,
} = useFilterState();

const showFilters = ref(false);
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-12">
    <!-- Header -->
    <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-catalog-muted">Browse</p>
        <h1 class="mt-1 font-serif text-3xl font-bold text-catalog-text md:text-4xl">Catalog</h1>
      </div>
      <div class="w-full max-w-sm">
        <CatalogSearch :model-value="filters.searchQuery" @update:model-value="setSearch" />
      </div>
    </div>

    <!-- Filter toggle (mobile) -->
    <button
      class="mt-6 flex items-center gap-2 rounded-full border border-catalog-border px-4 py-2 text-xs font-medium text-catalog-muted transition-colors hover:text-catalog-text md:hidden"
      @click="showFilters = !showFilters"
    >
      Filters
      <span
        v-if="activeFilterCount > 0"
        class="flex h-4 w-4 items-center justify-center rounded-full bg-catalog-accent text-[10px] text-white"
      >
        {{ activeFilterCount }}
      </span>
    </button>

    <div class="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
      <!-- Sidebar filters -->
      <aside :class="['lg:block', showFilters ? 'block' : 'hidden']">
        <CatalogFilters
          :active-categories="filters.categories"
          :active-tags="filters.tags"
          :all-tags="allTags"
          :active-filter-count="activeFilterCount"
          @toggle-category="toggleCategory"
          @toggle-tag="toggleTag"
          @clear-all="clearAll"
        />
      </aside>

      <!-- Grid -->
      <CatalogGrid :artworks="filteredArtworks" />
    </div>
  </div>
</template>
