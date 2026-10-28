import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @component SmartDataGrid
 * @category 02-tables-and-grids (awesome-react: React Tables and Grids)
 * @dependencies @tanstack/react-table lucide-react
 */
import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
export function SmartDataGrid({ title, subtitle, data, columns, searchPlaceholder = 'Filter records...', pageSize = 5, }) {
    const [sorting, setSorting] = useState([]);
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
    });
    return (_jsxs("div", { className: "rounded-xl border border-slate-200 bg-white shadow-xs", children: [_jsxs("div", { className: "flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-slate-900", children: title }), subtitle && _jsx("p", { className: "text-xs text-slate-500", children: subtitle })] }), _jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute top-2.5 left-3 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", value: globalFilter ?? '', onChange: (e) => setGlobalFilter(e.target.value), placeholder: searchPlaceholder, className: "w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 placeholder-slate-400 transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:outline-none" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse text-left text-sm", children: [_jsx("thead", { children: table.getHeaderGroups?.().map((headerGroup) => (_jsx("tr", { className: "border-b border-slate-200 bg-slate-50/80", children: headerGroup.headers.map((header) => (_jsx("th", { onClick: header.column.getToggleSortingHandler(), className: "cursor-pointer px-5 py-3 text-xs font-semibold tracking-wider text-slate-600 uppercase select-none hover:text-blue-700", children: _jsxs("div", { className: "flex items-center gap-1.5", children: [flexRender(header.column.columnDef.header, header.getContext()), header.column.getCanSort() && (_jsx(ArrowUpDown, { className: "h-3.5 w-3.5 text-slate-400" }))] }) }, header.id))) }, headerGroup.id))) }), _jsx("tbody", { className: "divide-y divide-slate-100", children: table.getRowModel?.().rows.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: "px-5 py-8 text-center text-xs text-slate-400", children: "No matching records found." }) })) : (table.getRowModel?.().rows.map((row) => (_jsx("tr", { className: "transition-colors hover:bg-teal-50/30", children: row.getVisibleCells().map((cell) => (_jsx("td", { className: "px-5 py-3.5 text-xs text-slate-700", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) })] }) }), _jsxs("div", { className: "flex items-center justify-between border-t border-slate-200 px-5 py-3 text-xs text-slate-500", children: [_jsxs("span", { children: ["Page ", _jsx("strong", { className: "text-slate-900", children: table.getState?.().pagination.pageIndex + 1 }), " of", ' ', _jsx("strong", { className: "text-slate-900", children: table.getPageCount?.() || 1 })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), className: "inline-flex items-center rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:border-blue-700 hover:text-blue-700 disabled:opacity-40", children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), className: "inline-flex items-center rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:border-blue-700 hover:text-blue-700 disabled:opacity-40", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] })] })] }));
}
