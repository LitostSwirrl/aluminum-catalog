import artworksData from '~/data/artworks.json';
import type { Artwork } from '~/types/artwork';

const artworks = artworksData as Artwork[];

export function useArtworks() {
  function getAll(): Artwork[] {
    return artworks;
  }

  function getBySlug(slug: string): Artwork | undefined {
    return artworks.find((a) => a.slug === slug);
  }

  function getByCategory(category: string): Artwork[] {
    return artworks.filter((a) => a.category === category);
  }

  function getFeatured(): Artwork[] {
    return artworks.filter((a) => a.featured);
  }

  function getConnectedWorks(slug: string): Artwork[] {
    const artwork = getBySlug(slug);
    if (!artwork) return [];
    const connectedSlugs = artwork.connections.map((c) => c.targetSlug);
    return artworks.filter((a) => connectedSlugs.includes(a.slug));
  }

  function getByIds(ids: number[]): Artwork[] {
    return artworks.filter((a) => ids.includes(a.id));
  }

  return {
    artworks,
    getAll,
    getBySlug,
    getByCategory,
    getFeatured,
    getConnectedWorks,
    getByIds,
  };
}
