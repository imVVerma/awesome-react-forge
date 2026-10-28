/**
 * @component NodeArcherCanvas
 * @category 06-spatial-and-diagrams (awesome-react: Diagrams and SVG)
 * @dependencies react-archer lucide-react
 */
import { ArcherContainer, ArcherElement } from 'react-archer';

interface Node {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface NodeArcherCanvasProps {
  nodes: Node[];
  edges: Edge[];
  showGrid?: boolean;
}

export function NodeArcherCanvas({ nodes, edges, showGrid = true }: NodeArcherCanvasProps) {
  const handleNodeClick = (nodeId: string) => {
    console.log('Node clicked:', nodeId);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden h-[400px] relative">
      <ArcherContainer strokeColor="#0d9488" strokeWidth={2}>
        {nodes.map((node) => (
          <ArcherElement
            key={node.id}
            id={node.id}
            relations={edges
              .filter((edge) => edge.from === node.id)
              .map((edge) => ({
                targetId: edge.to,
                targetAnchor: 'left',
                sourceAnchor: 'right',
              }))}
          >
            <div
              className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-center w-[150px] h-[60px] cursor-pointer hover:border-blue-700"
              style={{ position: 'absolute', left: node.x ?? 0, top: node.y ?? 0 }}
              onClick={() => handleNodeClick(node.id)}
            >
              <span className="text-sm text-slate-900">{node.label}</span>
            </div>
          </ArcherElement>
        ))}

        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <path d="M0 20L20 20M0 40L20 40M0 60L20 60M0 80L20 80M0 100L20 100M100 0L120 0M100 20L120 20M100 40L120 40M100 60L120 60M100 80L120 80M100 100L120 100" stroke="currentColor" strokeWidth={1} />
            </svg>
          </div>
        )}
      </ArcherContainer>
    </div>
  );
}