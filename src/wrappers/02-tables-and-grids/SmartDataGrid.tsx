/**
 * @component SmartDataGrid
 * @category 02-tables-and-grids (awesome-react: React Tables and Grids)
 * @dependencies @tanstack/react-table lucide-react
 */
import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface SmartDataGridProps<TData> {
  title: string;
  subtitle?: string;
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
  pageSize?: number;
}

export function SmartDataGrid<TData>({
  title,
  subtitle,
  data,
  columns,
  searchPlaceholder = 'Filter records...',
  pageSize = 5,
}: SmartDataGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  } as any);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
      {/* Header & Global Search Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 placeholder-slate-400 transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Table Surface */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            {(table as any).getHeaderGroups?.().map((headerGroup: any) => (
              <tr key={headerGroup.id} className="border-b border-slate-200 bg-slate-50/80">
                {headerGroup.headers.map((header: any) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-5 py-3 text-xs font-semibold tracking-wider text-slate-600 uppercase select-none hover:text-blue-700"
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(table as any).getRowModel?.().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8 text-center text-xs text-slate-400">
                  No matching records found.
                </td>
              </tr>
            ) : (
              (table as any).getRowModel?.().rows.map((row: any) => (
                <tr key={row.id} className="transition-colors hover:bg-teal-50/30">
                  {row.getVisibleCells().map((cell: any) => (
                    <td key={cell.id} className="px-5 py-3.5 text-xs text-slate-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
        <span>
          Page <strong className="text-slate-900">{(table as any).getState?.().pagination.pageIndex + 1}</strong> of{' '}
          <strong className="text-slate-900">{(table as any).getPageCount?.() || 1}</strong>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (table as any).previousPage()}
            disabled={!(table as any).getCanPreviousPage()}
            className="inline-flex items-center rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:border-blue-700 hover:text-blue-700 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => (table as any).nextPage()}
            disabled={!(table as any).getCanNextPage()}
            className="inline-flex items-center rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:border-blue-700 hover:text-blue-700 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}