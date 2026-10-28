import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SafeWidgetBoundary } from './wrappers/01-resilience/SafeWidgetBoundary';
import { SmartDataGrid } from './wrappers/02-tables-and-grids/SmartDataGrid';
import { ProofDropzone } from './wrappers/03-file-ingestion/ProofDropzone';
import { SchemaFormBuilder } from './wrappers/04-forms-and-schemas/SchemaFormBuilder';
import { RubricFlowMachine } from './wrappers/05-state-machines/RubricFlowMachine';
import { NodeArcherCanvas } from './wrappers/06-spatial-and-diagrams/NodeArcherCanvas';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';
const sampleData = [
    { id: 'MOD-01', module: 'TanStack Table v8', category: 'Data Grids', status: 'Adopted', latencyMs: 12 },
    { id: 'MOD-02', module: 'React Uploady', category: 'File Ingestion', status: 'Trialing', latencyMs: 45 },
    { id: 'MOD-03', module: 'XState v5 Machine', category: 'State Machines', status: 'Adopted', latencyMs: 8 },
    { id: 'MOD-04', module: 'React Archer SVG', category: 'Diagrams', status: 'Backlog', latencyMs: 19 },
    { id: 'MOD-05', module: 'React Hook Form + Zod', category: 'Forms', status: 'Adopted', latencyMs: 5 },
];
const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'module', header: 'Library' },
    { accessorKey: 'category', header: 'Category' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const val = getValue();
            const badgeStyles = val === 'Adopted'
                ? 'bg-teal-50 text-teal-700 border-teal-200'
                : val === 'Trialing'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200';
            return (_jsx("span", { className: `rounded-md border px-2 py-0.5 text-xs font-medium ${badgeStyles}`, children: val }));
        },
    },
    {
        accessorKey: 'latencyMs',
        header: 'Latency (ms)',
        cell: ({ getValue }) => _jsxs("span", { className: "font-mono", children: [getValue(), " ms"] }),
    },
];
const wrappers = [
    {
        id: 'safe',
        category: '01-resilience',
        name: 'SafeWidgetBoundary',
        filePath: 'src/wrappers/01-resilience/SafeWidgetBoundary.tsx',
        dependencies: 'react-error-boundary lucide-react',
        component: (_jsx(SafeWidgetBoundary, { widgetTitle: "Demo Widget", children: _jsxs("div", { className: "p-6 bg-slate-50 rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium text-slate-900", children: "Widget Preview" }), _jsx("p", { className: "mt-2 text-slate-500", children: "Wrapped inside SafeWidgetBoundary" })] }) })),
    },
    {
        id: 'grid',
        category: '02-tables-and-grids',
        name: 'SmartDataGrid',
        filePath: 'src/wrappers/02-tables-and-grids/SmartDataGrid.tsx',
        dependencies: '@tanstack/react-table lucide-react',
        component: (_jsx(SmartDataGrid, { title: "Awesome-React Evaluation Ledger", subtitle: "Headless sorting, instant filtering, and clean light-theme styling", data: sampleData, columns: columns })),
    },
    {
        id: 'drop',
        category: '03-file-ingestion',
        name: 'ProofDropzone',
        filePath: 'src/wrappers/03-file-ingestion/ProofDropzone.tsx',
        dependencies: '@rpldy/uploady @rpldy/upload-drop-zone lucide-react',
        component: (_jsx(ProofDropzone, { label: "Drop invoices, transcripts, or geotagged proof here", helperText: "Supports PDF, PNG, JPG up to 15MB", onUploadComplete: (fileName) => console.log(`Upload complete: ${fileName}`) })),
    },
    {
        id: 'form',
        category: '04-forms-and-schemas',
        name: 'SchemaFormBuilder',
        filePath: 'src/wrappers/04-forms-and-schemas/SchemaFormBuilder.tsx',
        dependencies: 'react-hook-form @hookform/resolvers zod lucide-react',
        component: (_jsx(SchemaFormBuilder, { onSubmit: (data) => console.log('Form submitted:', data), fields: [
                { id: 'title', label: 'Project Title', type: 'text' },
                { id: 'category', label: 'Category', type: 'select', options: [{ label: 'Data', value: 'data' }, { label: 'UI/UX', value: 'ui-ux' }, { label: 'State Mgmt', value: 'state-mgmt' }] },
                { id: 'complexity', label: 'Complexity', type: 'number', defaultValue: 5 },
                { id: 'approved', label: 'Approved', type: 'checkbox' },
            ] })),
    },
    {
        id: 'flow',
        category: '05-state-machines',
        name: 'RubricFlowMachine',
        filePath: 'src/wrappers/05-state-machines/RubricFlowMachine.tsx',
        dependencies: 'xstate @xstate/react lucide-react',
        component: _jsx(RubricFlowMachine, { initialStep: "Draft" }),
    },
    {
        id: 'archer',
        category: '06-spatial-and-diagrams',
        name: 'NodeArcherCanvas',
        filePath: 'src/wrappers/06-spatial-and-diagrams/NodeArcherCanvas.tsx',
        dependencies: 'react-archer lucide-react',
        component: (_jsx(NodeArcherCanvas, { nodes: [
                { id: 'node-1', label: 'Draft', x: 0, y: 100 },
                { id: 'node-2', label: 'Automated Check', x: 200, y: 100 },
                { id: 'node-3', label: 'Human Review', x: 400, y: 100 },
                { id: 'node-4', label: 'Approved', x: 600, y: 100 },
            ], edges: [
                { from: 'node-1', to: 'node-2', label: 'Pass' },
                { from: 'node-2', to: 'node-3', label: 'Review' },
                { from: 'node-3', to: 'node-4', label: 'Approve' },
            ] })),
    },
];
function App() {
    const [selectedWrapper, setSelectedWrapper] = useState(wrappers[0]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [copied, setCopied] = useState(null);
    const copyToClipboard = async (dependencies, id) => {
        try {
            await navigator.clipboard.writeText(dependencies);
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        }
        catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    const categories = Array.from(new Set(wrappers.map((w) => w.category)));
    return (_jsxs("div", { className: "flex h-screen bg-slate-50", children: [_jsxs("div", { className: `${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`, children: [_jsx("div", { className: "p-4 border-b border-slate-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [sidebarOpen && (_jsx("h1", { className: "text-lg font-semibold text-slate-900", children: "React Ecosystem Lab" })), _jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "p-1.5 rounded-lg hover:bg-slate-100", children: sidebarOpen ? _jsx(ChevronDown, { className: "h-4 w-4 text-slate-600" }) : _jsx(ChevronRight, { className: "h-4 w-4 text-slate-600" }) })] }) }), _jsx("nav", { className: "flex-1 p-4 space-y-2 overflow-y-auto", children: categories.map((category) => (_jsxs("div", { children: [sidebarOpen && (_jsx("h2", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2", children: category })), wrappers
                                    .filter((w) => w.category === category)
                                    .map((wrapper) => (_jsx("button", { onClick: () => setSelectedWrapper(wrapper), className: `w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedWrapper.id === wrapper.id
                                        ? 'bg-blue-700 text-white'
                                        : 'text-slate-700 hover:bg-slate-100'}`, children: sidebarOpen ? wrapper.name : wrapper.name.slice(0, 2) }, wrapper.id)))] }, category))) }), _jsx("div", { className: "p-4 border-t border-slate-200 text-xs text-slate-500", children: sidebarOpen && _jsxs("p", { children: ["Components: ", wrappers.length] }) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx("header", { className: "bg-white border-b border-slate-200 px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-slate-900", children: selectedWrapper.name }), _jsx("p", { className: "text-sm text-slate-500", children: selectedWrapper.filePath })] }), _jsxs("button", { onClick: () => copyToClipboard(selectedWrapper.dependencies, selectedWrapper.id), className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-700 hover:text-blue-700 transition-colors", children: [_jsx(Copy, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs font-medium", children: copied === selectedWrapper.id ? 'Copied!' : 'Copy Install Command' })] })] }) }), _jsx("main", { className: "flex-1 overflow-auto p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-sm text-slate-500 mb-2", children: "Dependencies:" }), _jsx("code", { className: "px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-800", children: selectedWrapper.dependencies })] }), _jsx("div", { className: "border border-slate-200 rounded-xl bg-white overflow-hidden", children: _jsx(SafeWidgetBoundary, { widgetTitle: selectedWrapper.name, children: _jsx("div", { className: "p-6", children: selectedWrapper.component }) }) })] }) })] })] }));
}
export default App;
