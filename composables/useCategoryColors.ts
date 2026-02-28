import type { ArtworkCategory, ConnectionType } from '~/types/artwork';

const CATEGORY_COLORS: Record<ArtworkCategory, string> = {
  'aluminum-extrusion': '#6366F1',
  'industrial-materials': '#475569',
  'modularity-systems': '#0EA5E9',
  'readymade-recontextualization': '#D946EF',
  'material-craft': '#D97706',
  'architecture-furniture': '#059669',
  'seriality-repetition': '#3B82F6',
  'material-biography': '#F43F5E',
};

const CATEGORY_LABELS: Record<ArtworkCategory, string> = {
  'aluminum-extrusion': 'Aluminum & Extrusion',
  'industrial-materials': 'Industrial Materials',
  'modularity-systems': 'Modularity & Systems',
  'readymade-recontextualization': 'Readymade & Recontextualization',
  'material-craft': 'Material Craft & Joinery',
  'architecture-furniture': 'Architecture-Furniture Hybrid',
  'seriality-repetition': 'Seriality & Repetition',
  'material-biography': 'Material Biography & Circularity',
};

const CONNECTION_COLORS: Record<ConnectionType, string> = {
  'material-affinity': '#6366F1',
  'conceptual-parallel': '#8B5CF6',
  'direct-influence': '#EF4444',
  'formal-similarity': '#F59E0B',
  'shared-process': '#10B981',
  'same-movement': '#3B82F6',
  'response-to': '#EC4899',
};

const CONNECTION_LABELS: Record<ConnectionType, string> = {
  'material-affinity': 'Material Affinity',
  'conceptual-parallel': 'Conceptual Parallel',
  'direct-influence': 'Direct Influence',
  'formal-similarity': 'Formal Similarity',
  'shared-process': 'Shared Process',
  'same-movement': 'Same Movement',
  'response-to': 'Response To',
};

const CONNECTION_DASH: Record<ConnectionType, string> = {
  'material-affinity': '',
  'conceptual-parallel': '8,4',
  'direct-influence': '',
  'formal-similarity': '8,4',
  'shared-process': '',
  'same-movement': '4,4',
  'response-to': '12,4,4,4',
};

const CONNECTION_WIDTH: Record<ConnectionType, number> = {
  'material-affinity': 1.5,
  'conceptual-parallel': 1,
  'direct-influence': 2.5,
  'formal-similarity': 1,
  'shared-process': 1.5,
  'same-movement': 1,
  'response-to': 1.5,
};

export function useCategoryColors() {
  function getCategoryColor(category: ArtworkCategory): string {
    return CATEGORY_COLORS[category];
  }

  function getCategoryLabel(category: ArtworkCategory): string {
    return CATEGORY_LABELS[category];
  }

  function getConnectionColor(type: ConnectionType): string {
    return CONNECTION_COLORS[type];
  }

  function getConnectionLabel(type: ConnectionType): string {
    return CONNECTION_LABELS[type];
  }

  function getConnectionDash(type: ConnectionType): string {
    return CONNECTION_DASH[type];
  }

  function getConnectionWidth(type: ConnectionType): number {
    return CONNECTION_WIDTH[type];
  }

  return {
    CATEGORY_COLORS,
    CATEGORY_LABELS,
    CONNECTION_COLORS,
    CONNECTION_LABELS,
    getCategoryColor,
    getCategoryLabel,
    getConnectionColor,
    getConnectionLabel,
    getConnectionDash,
    getConnectionWidth,
  };
}
