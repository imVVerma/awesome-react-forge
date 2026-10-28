import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @component NodeArcherCanvas
 * @category 06-spatial-and-diagrams (awesome-react: Diagrams and SVG)
 * @dependencies react-archer lucide-react
 */
import { ArcherContainer, ArcherElement } from 'react-archer';
export function NodeArcherCanvas({ nodes, edges, showGrid = true }) {
    const handleNodeClick = (nodeId) => {
        console.log('Node clicked:', nodeId);
    };
    return (_jsx("div", { className: "rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden h-[400px] relative", children: _jsxs(ArcherContainer, { strokeColor: "#0d9488", strokeWidth: 2, children: [nodes.map((node) => (_jsx(ArcherElement, { id: node.id, relations: edges
                        .filter((edge) => edge.from === node.id)
                        .map((edge) => ({
                        targetId: edge.to,
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                    })), children: _jsx("div", { className: "bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-center w-[150px] h-[60px] cursor-pointer hover:border-blue-700", style: { position: 'absolute', left: node.x ?? 0, top: node.y ?? 0 }, onClick: () => handleNodeClick(node.id), children: _jsx("span", { className: "text-sm text-slate-900", children: node.label }) }) }, node.id))), showGrid && (_jsx("div", { className: "absolute inset-0 pointer-events-none", children: _jsx("svg", { className: "absolute inset-0 w-full h-full opacity-30", children: _jsx("path", { d: "M0 20L20 20M0 40L20 40M0 60L20 60M0 80L20 80M0 100L20 100M100 0L120 0M100 20L120 20M100 40L120 40M100 60L120 60M100 80L120 80M100 100L120 100", stroke: "currentColor", strokeWidth: 1 }) }) }))] }) }));
}
