import { useState } from 'react';
import { SafeWidgetBoundary } from './wrappers/01-resilience/SafeWidgetBoundary';
import { SmartDataGrid } from './wrappers/02-tables-and-grids/SmartDataGrid';
import { ProofDropzone } from './wrappers/03-file-ingestion/ProofDropzone';
import { SchemaFormBuilder } from './wrappers/04-forms-and-schemas/SchemaFormBuilder';
import { RubricFlowMachine } from './wrappers/05-state-machines/RubricFlowMachine';
import { NodeArcherCanvas } from './wrappers/06-spatial-and-diagrams/NodeArcherCanvas';
import type { ColumnDef } from '@tanstack/react-table';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';

interface WrapperInfo {
  id: string;
  category: string;
  name: string;
  filePath: string;
  dependencies: string;
  component: React.ReactNode;
}

const sampleData = [
  { id: 'MOD-01', module: 'TanStack Table v8', category: 'Data Grids', status: 'Adopted', latencyMs: 12 },
  { id: 'MOD-02', module: 'React Uploady', category: 'File Ingestion', status: 'Trialing', latencyMs: 45 },
  { id: 'MOD-03', module: 'XState v5 Machine', category: 'State Machines', status: 'Adopted', latencyMs: 8 },
  { id: 'MOD-04', module: 'React Archer SVG', category: 'Diagrams', status: 'Backlog', latencyMs: 19 },
  { id: 'MOD-05', module: 'React Hook Form + Zod', category: 'Forms', status: 'Adopted', latencyMs: 5 },
];

const columns: ColumnDef<any>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'module', header: 'Library' },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }: any) => {
      const val = getValue<string>();
      const badgeStyles =
        val === 'Adopted'
          ? 'bg-teal-50 text-teal-700 border-teal-200'
          : val === 'Trialing'
          ? 'bg-blue-50 text-blue-700 border-blue-200'
          : 'bg-slate-100 text-slate-600 border-slate-200';
      return (
        <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${badgeStyles}`}>
          {val}
        </span>
      );
    },
  },
  {
    accessorKey: 'latencyMs',
    header: 'Latency (ms)',
    cell: ({ getValue }: any) => <span className="font-mono">{getValue<number>()} ms</span>,
  },
];

const wrappers: WrapperInfo[] = [
  {
    id: 'safe',
    category: '01-resilience',
    name: 'SafeWidgetBoundary',
    filePath: 'src/wrappers/01-resilience/SafeWidgetBoundary.tsx',
    dependencies: 'react-error-boundary lucide-react',
    component: (
      <SafeWidgetBoundary widgetTitle="Demo Widget">
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-medium text-slate-900">Widget Preview</h3>
          <p className="mt-2 text-slate-500">Wrapped inside SafeWidgetBoundary</p>
        </div>
      </SafeWidgetBoundary>
    ),
  },
  {
    id: 'grid',
    category: '02-tables-and-grids',
    name: 'SmartDataGrid',
    filePath: 'src/wrappers/02-tables-and-grids/SmartDataGrid.tsx',
    dependencies: '@tanstack/react-table lucide-react',
    component: (
      <SmartDataGrid
        title="Awesome-React Evaluation Ledger"
        subtitle="Headless sorting, instant filtering, and clean light-theme styling"
        data={sampleData}
        columns={columns}
      />
    ),
  },
  {
    id: 'drop',
    category: '03-file-ingestion',
    name: 'ProofDropzone',
    filePath: 'src/wrappers/03-file-ingestion/ProofDropzone.tsx',
    dependencies: '@rpldy/uploady @rpldy/upload-drop-zone lucide-react',
    component: (
      <ProofDropzone
        label="Drop invoices, transcripts, or geotagged proof here"
        helperText="Supports PDF, PNG, JPG up to 15MB"
        onUploadComplete={(fileName) => console.log(`Upload complete: ${fileName}`)}
      />
    ),
  },
  {
    id: 'form',
    category: '04-forms-and-schemas',
    name: 'SchemaFormBuilder',
    filePath: 'src/wrappers/04-forms-and-schemas/SchemaFormBuilder.tsx',
    dependencies: 'react-hook-form @hookform/resolvers zod lucide-react',
    component: (
      <SchemaFormBuilder
        onSubmit={(data) => console.log('Form submitted:', data)}
        fields={[
          { id: 'title', label: 'Project Title', type: 'text' },
          { id: 'category', label: 'Category', type: 'select', options: [{ label: 'Data', value: 'data' }, { label: 'UI/UX', value: 'ui-ux' }, { label: 'State Mgmt', value: 'state-mgmt' }] },
          { id: 'complexity', label: 'Complexity', type: 'number', defaultValue: 5 },
          { id: 'approved', label: 'Approved', type: 'checkbox' },
        ]}
      />
    ),
  },
  {
    id: 'flow',
    category: '05-state-machines',
    name: 'RubricFlowMachine',
    filePath: 'src/wrappers/05-state-machines/RubricFlowMachine.tsx',
    dependencies: 'xstate @xstate/react lucide-react',
    component: <RubricFlowMachine initialStep="Draft" />,
  },
  {
    id: 'archer',
    category: '06-spatial-and-diagrams',
    name: 'NodeArcherCanvas',
    filePath: 'src/wrappers/06-spatial-and-diagrams/NodeArcherCanvas.tsx',
    dependencies: 'react-archer lucide-react',
    component: (
      <NodeArcherCanvas
        nodes={[
          { id: 'node-1', label: 'Draft', x: 0, y: 100 },
          { id: 'node-2', label: 'Automated Check', x: 200, y: 100 },
          { id: 'node-3', label: 'Human Review', x: 400, y: 100 },
          { id: 'node-4', label: 'Approved', x: 600, y: 100 },
        ]}
        edges={[
          { from: 'node-1', to: 'node-2', label: 'Pass' },
          { from: 'node-2', to: 'node-3', label: 'Review' },
          { from: 'node-3', to: 'node-4', label: 'Approve' },
        ]}
      />
    ),
  },
];

function App() {
  const [selectedWrapper, setSelectedWrapper] = useState(wrappers[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (dependencies: string, id: string) => {
    try {
      await navigator.clipboard.writeText(dependencies);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const categories = Array.from(new Set(wrappers.map((w) => w.category)));

  return (
    <div className="flex h-screen bg-slate-50">
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-lg font-semibold text-slate-900">React Ecosystem Lab</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100"
            >
              {sidebarOpen ? <ChevronDown className="h-4 w-4 text-slate-600" /> : <ChevronRight className="h-4 w-4 text-slate-600" />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {categories.map((category) => (
            <div key={category}>
              {sidebarOpen && (
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {category}
                </h2>
              )}
              {wrappers
                .filter((w) => w.category === category)
                .map((wrapper) => (
                  <button
                    key={wrapper.id}
                    onClick={() => setSelectedWrapper(wrapper)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedWrapper.id === wrapper.id
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sidebarOpen ? wrapper.name : wrapper.name.slice(0, 2)}
                  </button>
                ))}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
          {sidebarOpen && <p>Components: {wrappers.length}</p>}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{selectedWrapper.name}</h2>
              <p className="text-sm text-slate-500">{selectedWrapper.filePath}</p>
            </div>
            <button
              onClick={() => copyToClipboard(selectedWrapper.dependencies, selectedWrapper.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-700 hover:text-blue-700 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span className="text-xs font-medium">
                {copied === selectedWrapper.id ? 'Copied!' : 'Copy Install Command'}
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <div className="text-sm text-slate-500 mb-2">Dependencies:</div>
              <code className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-800">
                {selectedWrapper.dependencies}
              </code>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
              <SafeWidgetBoundary widgetTitle={selectedWrapper.name}>
                <div className="p-6">
                  {selectedWrapper.component}
                </div>
              </SafeWidgetBoundary>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;