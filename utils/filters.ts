import type { Artwork, FilterState } from '~/types/artwork';

export function filterByCategories(artworks: Artwork[], categories: string[]): Artwork[] {
  if (categories.length === 0) return artworks;
  return artworks.filter((a) => categories.includes(a.category));
}

export function filterByTags(artworks: Artwork[], tags: string[]): Artwork[] {
  if (tags.length === 0) return artworks;
  return artworks.filter((a) => tags.some((t) => a.tags.includes(t)));
}

export function filterByYearRange(artworks: Artwork[], range: [number, number]): Artwork[] {
  return artworks.filter((a) => a.yearSort >= range[0] && a.yearSort <= range[1]);
}

export function filterBySearch(artworks: Artwork[], query: string): Artwork[] {
  if (!query.trim()) return artworks;
  const q = query.toLowerCase().trim();
  return artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.artist.toLowerCase().includes(q) ||
      a.medium.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.description.toLowerCase().includes(q)
  );
}

export function applyFilters(artworks: Artwork[], filters: FilterState): Artwork[] {
  let result = artworks;
  result = filterByCategories(result, filters.categories);
  result = filterByTags(result, filters.tags);
  result = filterByYearRange(result, filters.yearRange);
  result = filterBySearch(result, filters.searchQuery);
  return result;
}

export function getAllTags(artworks: Artwork[]): string[] {
  const tagSet = new Set<string>();
  for (const a of artworks) {
    for (const t of a.tags) {
      tagSet.add(t);
    }
  }
  return [...tagSet].sort();
}

export function getYearBounds(artworks: Artwork[]): [number, number] {
  if (artworks.length === 0) return [1900, 2025];
  const years = artworks.map((a) => a.yearSort);
  return [Math.min(...years), Math.max(...years)];
}
