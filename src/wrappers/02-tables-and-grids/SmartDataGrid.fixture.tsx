import { ColumnDef } from '@tanstack/react-table';
import { SmartDataGrid } from './SmartDataGrid';
import { SafeWidgetBoundary } from '../01-resilience/SafeWidgetBoundary';

interface SampleRecord {
  id: string;
  module: string;
  category: string;
  status: 'Adopted' | 'Trialing' | 'Backlog';
  latencyMs: number;
}

const sampleData: SampleRecord[] = [
  { id: 'MOD-01', module: 'TanStack Table v8', category: 'Data Grids', status: 'Adopted', latencyMs: 12 },
  { id: 'MOD-02', module: 'React Uploady', category: 'File Ingestion', status: 'Trialing', latencyMs: 45 },
  { id: 'MOD-03', module: 'XState v5 Machine', category: 'State Machines', status: 'Adopted', latencyMs: 8 },
  { id: 'MOD-04', module: 'React Archer SVG', category: 'Diagrams', status: 'Backlog', latencyMs: 19 },
  { id: 'MOD-05', module: 'React Hook Form + Zod', category: 'Forms', status: 'Adopted', latencyMs: 5 },
];

const columns: ColumnDef<SampleRecord>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'module', header: 'Awesome-React Library' },
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
    header: 'Render Time (ms)',
    cell: ({ getValue }: any) => <span className="font-mono">{getValue<number>()} ms</span>,
  },
];

export default {
  'Standard Procurement / Triage Ledger': (
    <div className="min-h-screen bg-slate-50 p-8">
      <SafeWidgetBoundary widgetTitle="Ecosystem Matrix Table">
        <SmartDataGrid
          title="Awesome-React Evaluation Ledger"
          subtitle="Headless sorting, instant filtering, and clean light-theme styling"
          data={sampleData}
          columns={columns}
        />
      </SafeWidgetBoundary>
    </div>
  ),
  'Empty State Verification': (
    <div className="min-h-screen bg-slate-50 p-8">
      <SmartDataGrid
        title="Empty Ledger View"
        subtitle="Verifying zero-record fallback state"
        data={[]}
        columns={columns}
      />
    </div>
  ),
}