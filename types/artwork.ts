export type ArtworkCategory =
  | 'aluminum-extrusion'
  | 'industrial-materials'
  | 'modularity-systems'
  | 'readymade-recontextualization'
  | 'material-craft'
  | 'architecture-furniture'
  | 'seriality-repetition'
  | 'material-biography';

export type ConnectionType =
  | 'material-affinity'
  | 'conceptual-parallel'
  | 'direct-influence'
  | 'formal-similarity'
  | 'shared-process'
  | 'same-movement'
  | 'response-to';

export interface ArtworkConnection {
  targetSlug: string;
  relationship: ConnectionType;
  note: string;
}

export interface ArtworkSource {
  title: string;
  url: string;
  author?: string;
  publication?: string;
  year?: number;
}

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  artist: string;
  artistNationality: string;
  artistBorn: number;
  artistDied?: number;
  year: string;
  yearSort: number;
  medium: string;
  dimensions: string;
  location: string;
  sourceUrl: string;
  imageUrl: string;
  category: ArtworkCategory;
  tags: string[];
  description: string;
  relevance: string;
  connections: ArtworkConnection[];
  featured: boolean;
  sources: ArtworkSource[];
}

export interface GraphNode {
  id: string;
  label: string;
  artist: string;
  category: ArtworkCategory;
  imageUrl: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relationship: ConnectionType;
  note: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface FilterState {
  categories: ArtworkCategory[];
  tags: string[];
  yearRange: [number, number];
  searchQuery: string;
}

export interface CategoryMeta {
  slug: ArtworkCategory;
  name: string;
  description: string;
  count: number;
}
