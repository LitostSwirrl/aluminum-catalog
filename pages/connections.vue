<script setup lang="ts">
import type { Artwork, ArtworkCategory, GraphNode } from '~/types/artwork';

interface GraphExposed {
  resetZoom: () => void;
}

definePageMeta({ layout: 'fullscreen' });
useHead({ title: 'Connections Map - Aluminum Extrusion Art Catalog' });

const { artworks } = useArtworks();

const activeCategories = ref<ArtworkCategory[]>([]);
const hoveredNode = ref<GraphNode | null>(null);
const hoverPos = ref({ x: 0, y: 0 });
const selectedArtwork = ref<Artwork | null>(null);
const graphRef = ref<GraphExposed | null>(null);

function toggleCategory(cat: ArtworkCategory) {
  const idx = activeCategories.value.indexOf(cat);
  if (idx >= 0) {
    activeCategories.value.splice(idx, 1);
  } else {
    activeCategories.value.push(cat);
  }
}

function handleNodeClick(artwork: Artwork) {
  selectedArtwork.value = artwork;
}

function handleNodeHover(node: GraphNode | null, event: MouseEvent | null) {
  hoveredNode.value = node;
  if (event) {
    hoverPos.value = { x: event.clientX, y: event.clientY };
  }
}

function resetZoom() {
  graphRef.value?.resetZoom();
}
</script>

<template>
  <div class="relative h-full w-full">
    <ClientOnly>
      <ConnectionsForceGraph
        ref="graphRef"
        :artworks="artworks"
        :active-categories="activeCategories"
        @node-click="handleNodeClick"
        @node-hover="handleNodeHover"
      />
    </ClientOnly>

    <ConnectionsGraphControls
      :active-categories="activeCategories"
      @toggle-category="toggleCategory"
      @reset-zoom="resetZoom"
      @clear-filters="activeCategories = []"
    />

    <ConnectionsGraphTooltip
      :node="hoveredNode"
      :x="hoverPos.x"
      :y="hoverPos.y"
    />

    <ConnectionsGraphDetailPanel
      :artwork="selectedArtwork"
      @close="selectedArtwork = null"
    />

    <!-- Legend -->
    <div class="absolute bottom-4 left-4 z-10 rounded-lg border border-catalog-border bg-catalog-surface/95 p-3 text-[10px] shadow-sm backdrop-blur-sm">
      <p class="font-semibold uppercase tracking-widest text-catalog-muted">Edge Types</p>
      <div class="mt-2 space-y-1">
        <div class="flex items-center gap-2">
          <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#6366F1" stroke-width="1.5" /></svg>
          <span class="text-catalog-muted">Material Affinity</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="8,4" /></svg>
          <span class="text-catalog-muted">Conceptual Parallel</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#EF4444" stroke-width="2.5" /></svg>
          <span class="text-catalog-muted">Direct Influence</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#10B981" stroke-width="1.5" /></svg>
          <span class="text-catalog-muted">Shared Process</span>
        </div>
      </div>
    </div>
  </div>
</template>
