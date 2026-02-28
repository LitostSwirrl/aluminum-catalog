import type { Artwork, GraphData, GraphNode, GraphLink } from '~/types/artwork';

export function artworksToGraphData(artworks: Artwork[]): GraphData {
  const slugSet = new Set(artworks.map((a) => a.slug));

  const nodes: GraphNode[] = artworks.map((a) => ({
    id: a.slug,
    label: a.title,
    artist: a.artist,
    category: a.category,
    imageUrl: a.imageUrl,
  }));

  const linkMap = new Map<string, GraphLink>();

  for (const artwork of artworks) {
    for (const conn of artwork.connections) {
      if (!slugSet.has(conn.targetSlug)) continue;

      const key = [artwork.slug, conn.targetSlug].sort().join('::');
      if (!linkMap.has(key)) {
        linkMap.set(key, {
          source: artwork.slug,
          target: conn.targetSlug,
          relationship: conn.relationship,
          note: conn.note,
        });
      }
    }
  }

  return {
    nodes,
    links: [...linkMap.values()],
  };
}
