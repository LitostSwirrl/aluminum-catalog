import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ArtworkCategory, FilterState } from '~/types/artwork';
import { useArtworks } from '~/composables/useArtworks';
import { applyFilters, getAllTags, getYearBounds } from '~/utils/filters';

export function useFilterState() {
  const route = useRoute();
  const router = useRouter();
  const { artworks } = useArtworks();

  const allTags = getAllTags(artworks);
  const [minYear, maxYear] = getYearBounds(artworks);

  const filters = ref<FilterState>({
    categories: parseArrayParam(route.query.categories as string),
    tags: parseArrayParam(route.query.tags as string),
    yearRange: [
      Number(route.query.yearFrom) || minYear,
      Number(route.query.yearTo) || maxYear,
    ],
    searchQuery: (route.query.q as string) || '',
  });

  const filteredArtworks = computed(() => applyFilters(artworks, filters.value));

  const activeFilterCount = computed(() => {
    let count = 0;
    if (filters.value.categories.length > 0) count++;
    if (filters.value.tags.length > 0) count++;
    if (filters.value.yearRange[0] !== minYear || filters.value.yearRange[1] !== maxYear) count++;
    if (filters.value.searchQuery.trim()) count++;
    return count;
  });

  watch(
    filters,
    (val) => {
      const query: Record<string, string> = {};
      if (val.categories.length > 0) query.categories = val.categories.join(',');
      if (val.tags.length > 0) query.tags = val.tags.join(',');
      if (val.yearRange[0] !== minYear) query.yearFrom = String(val.yearRange[0]);
      if (val.yearRange[1] !== maxYear) query.yearTo = String(val.yearRange[1]);
      if (val.searchQuery.trim()) query.q = val.searchQuery;
      router.replace({ query });
    },
    { deep: true }
  );

  function toggleCategory(cat: ArtworkCategory) {
    const idx = filters.value.categories.indexOf(cat);
    if (idx >= 0) {
      filters.value.categories.splice(idx, 1);
    } else {
      filters.value.categories.push(cat);
    }
  }

  function toggleTag(tag: string) {
    const idx = filters.value.tags.indexOf(tag);
    if (idx >= 0) {
      filters.value.tags.splice(idx, 1);
    } else {
      filters.value.tags.push(tag);
    }
  }

  function setSearch(query: string) {
    filters.value.searchQuery = query;
  }

  function setYearRange(range: [number, number]) {
    filters.value.yearRange = range;
  }

  function clearAll() {
    filters.value = {
      categories: [],
      tags: [],
      yearRange: [minYear, maxYear],
      searchQuery: '',
    };
  }

  return {
    filters,
    filteredArtworks,
    activeFilterCount,
    allTags,
    minYear,
    maxYear,
    toggleCategory,
    toggleTag,
    setSearch,
    setYearRange,
    clearAll,
  };
}

function parseArrayParam(param: string | undefined): ArtworkCategory[] {
  if (!param) return [];
  return param.split(',').filter(Boolean) as ArtworkCategory[];
}
