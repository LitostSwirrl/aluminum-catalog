<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type Simulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom';
import { drag } from 'd3-drag';
import type { Artwork, ArtworkCategory, GraphNode, GraphLink } from '~/types/artwork';
import { artworksToGraphData } from '~/utils/graph';

const props = defineProps<{
  artworks: Artwork[];
  activeCategories: ArtworkCategory[];
}>();

const emit = defineEmits<{
  nodeClick: [artwork: Artwork];
  nodeHover: [node: GraphNode | null, event: MouseEvent | null];
}>();

interface SimNode extends GraphNode, SimulationNodeDatum {}
interface SimLink extends SimulationLinkDatum<SimNode> {
  relationship: GraphLink['relationship'];
  note: string;
}

const svgRef = ref<SVGSVGElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const width = ref(1200);
const height = ref(800);
const isReady = ref(false);

let simulation: Simulation<SimNode, SimLink> | null = null;
let zoomBehavior: ZoomBehavior<SVGSVGElement, unknown> | null = null;
const simNodes = ref<SimNode[]>([]);
const simLinks = ref<SimLink[]>([]);

const { getCategoryColor, getConnectionColor, getConnectionDash, getConnectionWidth } = useCategoryColors();
const { getBySlug } = useArtworks();

function getNodeOpacity(node: SimNode): number {
  if (props.activeCategories.length === 0) return 1;
  return props.activeCategories.includes(node.category) ? 1 : 0.1;
}

function getLinkOpacity(link: SimLink): number {
  if (props.activeCategories.length === 0) return 0.6;
  const s = link.source as SimNode;
  const t = link.target as SimNode;
  if (props.activeCategories.includes(s.category) && props.activeCategories.includes(t.category)) return 0.6;
  return 0.05;
}

function initGraph() {
  if (!svgRef.value || !containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  width.value = rect.width;
  height.value = rect.height;

  const graphData = artworksToGraphData(props.artworks);

  const nodes: SimNode[] = graphData.nodes.map((n) => ({ ...n }));
  const links: SimLink[] = graphData.links.map((l) => ({
    source: l.source as string,
    target: l.target as string,
    relationship: l.relationship,
    note: l.note,
  }));

  simulation = forceSimulation<SimNode>(nodes)
    .force(
      'link',
      forceLink<SimNode, SimLink>(links)
        .id((d) => d.id)
        .distance(100)
    )
    .force('charge', forceManyBody().strength(-250))
    .force('center', forceCenter(width.value / 2, height.value / 2))
    .force('collide', forceCollide(25));

  // Pre-warm
  simulation.alpha(1);
  for (let i = 0; i < 300; i++) {
    simulation.tick();
  }

  simNodes.value = nodes;
  simLinks.value = links;

  // Set up zoom
  const svg = select(svgRef.value);
  zoomBehavior = zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.15, 4])
    .on('zoom', (event) => {
      svg.select('g.graph-container').attr('transform', event.transform);
    });
  svg.call(zoomBehavior);

  // Set up drag
  const dragBehavior = drag<SVGGElement, SimNode>()
    .on('start', (event, d) => {
      if (!event.active) simulation?.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on('drag', (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on('end', (event, d) => {
      if (!event.active) simulation?.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });

  svg.selectAll<SVGGElement, SimNode>('g.node').call(dragBehavior);

  // Tick handler
  simulation.alpha(0.3).restart();
  simulation.on('tick', () => {
    simNodes.value = [...nodes];
    simLinks.value = [...links];
  });

  isReady.value = true;
}

function resetZoom() {
  if (!svgRef.value || !zoomBehavior) return;
  const svg = select(svgRef.value);
  svg.transition().duration(500).call(zoomBehavior.transform, zoomIdentity);
}

function handleNodeClick(node: SimNode) {
  const artwork = getBySlug(node.id);
  if (artwork) emit('nodeClick', artwork);
}

function handleNodeMouseEnter(node: SimNode, event: MouseEvent) {
  emit('nodeHover', node, event);
}

function handleNodeMouseLeave() {
  emit('nodeHover', null, null);
}

// Re-apply drag after reactivity updates
watch([simNodes], () => {
  if (!svgRef.value || !simulation) return;
  const svg = select(svgRef.value);
  const dragBehavior = drag<SVGGElement, SimNode>()
    .on('start', (event, d) => {
      if (!event.active) simulation?.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on('drag', (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on('end', (event, d) => {
      if (!event.active) simulation?.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
  svg.selectAll<SVGGElement, SimNode>('g.node').data(simNodes.value, (d) => d.id).call(dragBehavior);
});

defineExpose({ resetZoom });

onMounted(() => {
  initGraph();
});

onBeforeUnmount(() => {
  simulation?.stop();
});
</script>

<template>
  <div ref="containerRef" class="h-full w-full">
    <svg ref="svgRef" :width="width" :height="height" class="h-full w-full">
      <g class="graph-container">
        <!-- Links -->
        <line
          v-for="(link, idx) in simLinks"
          :key="'link-' + idx"
          :x1="(link.source as SimNode).x ?? 0"
          :y1="(link.source as SimNode).y ?? 0"
          :x2="(link.target as SimNode).x ?? 0"
          :y2="(link.target as SimNode).y ?? 0"
          :stroke="getConnectionColor(link.relationship)"
          :stroke-width="getConnectionWidth(link.relationship)"
          :stroke-dasharray="getConnectionDash(link.relationship)"
          :opacity="getLinkOpacity(link)"
          class="transition-opacity duration-300"
        />

        <!-- Nodes -->
        <g
          v-for="node in simNodes"
          :key="node.id"
          class="node cursor-pointer"
          :transform="`translate(${node.x ?? 0}, ${node.y ?? 0})`"
          :opacity="getNodeOpacity(node)"
          @click="handleNodeClick(node)"
          @mouseenter="handleNodeMouseEnter(node, $event)"
          @mouseleave="handleNodeMouseLeave"
        >
          <!-- Background circle -->
          <circle
            r="18"
            :fill="getCategoryColor(node.category)"
            :opacity="0.15"
            class="transition-all duration-300"
          />
          <!-- Border circle -->
          <circle
            r="18"
            fill="none"
            :stroke="getCategoryColor(node.category)"
            stroke-width="1.5"
            class="transition-all duration-300"
          />
          <!-- Center dot -->
          <circle
            r="4"
            :fill="getCategoryColor(node.category)"
          />
          <!-- Label -->
          <text
            dy="30"
            text-anchor="middle"
            class="pointer-events-none fill-current text-[9px] font-medium text-catalog-text"
          >
            {{ node.artist.split(' ').pop() }}
          </text>
        </g>
      </g>
    </svg>

    <!-- Loading state -->
    <div
      v-if="!isReady"
      class="absolute inset-0 flex items-center justify-center bg-catalog-bg/80"
    >
      <div class="text-center">
        <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-catalog-border border-t-catalog-accent" />
        <p class="mt-3 text-xs text-catalog-muted">Computing layout...</p>
      </div>
    </div>
  </div>
</template>
