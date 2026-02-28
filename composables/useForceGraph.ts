import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';
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
import { drag, type DragBehavior } from 'd3-drag';
import type { GraphNode, GraphLink, GraphData, ArtworkCategory } from '~/types/artwork';

interface SimNode extends GraphNode, SimulationNodeDatum {}
interface SimLink extends SimulationLinkDatum<SimNode> {
  relationship: GraphLink['relationship'];
  note: string;
}

export function useForceGraph(
  svgRef: Ref<SVGSVGElement | null>,
  graphData: Ref<GraphData>,
  options?: {
    width?: number;
    height?: number;
    onNodeClick?: (node: GraphNode) => void;
    onNodeHover?: (node: GraphNode | null, event?: MouseEvent) => void;
    activeCategories?: Ref<ArtworkCategory[]>;
  }
) {
  const simulation = ref<Simulation<SimNode, SimLink> | null>(null);
  const nodes = ref<SimNode[]>([]);
  const links = ref<SimLink[]>([]);
  const isReady = ref(false);

  let zoomBehavior: ZoomBehavior<SVGSVGElement, unknown> | null = null;

  function init() {
    if (!svgRef.value) return;

    const width = options?.width ?? 1200;
    const height = options?.height ?? 800;

    const simNodes: SimNode[] = graphData.value.nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = graphData.value.links.map((l) => ({
      source: l.source as string,
      target: l.target as string,
      relationship: l.relationship,
      note: l.note,
    }));

    const sim = forceSimulation<SimNode>(simNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance(120)
      )
      .force('charge', forceManyBody().strength(-300))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collide', forceCollide(30));

    // Pre-warm: run ticks before rendering
    sim.alpha(1).restart();
    for (let i = 0; i < 300; i++) {
      sim.tick();
    }
    sim.alpha(0.3).restart();

    nodes.value = simNodes;
    links.value = simLinks;
    simulation.value = sim;

    // Set up D3 zoom
    const svg = select(svgRef.value);
    zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        svg.select('g.graph-container').attr('transform', event.transform);
      });
    svg.call(zoomBehavior);

    // Set up tick handler
    sim.on('tick', () => {
      nodes.value = [...simNodes];
      links.value = [...simLinks];
    });

    isReady.value = true;
  }

  function createDragBehavior(): DragBehavior<Element, SimNode, SimNode | d3.SubjectPosition> {
    const sim = simulation.value;
    return drag<Element, SimNode>()
      .on('start', (event, d) => {
        if (!event.active) sim?.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) sim?.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  }

  function resetZoom() {
    if (!svgRef.value || !zoomBehavior) return;
    const svg = select(svgRef.value);
    svg.transition().duration(500).call(zoomBehavior.transform, zoomIdentity);
  }

  function destroy() {
    simulation.value?.stop();
    simulation.value = null;
    isReady.value = false;
  }

  onMounted(() => {
    init();
  });

  onBeforeUnmount(() => {
    destroy();
  });

  return {
    nodes,
    links,
    simulation,
    isReady,
    createDragBehavior,
    resetZoom,
    init,
    destroy,
  };
}
