import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @component ProofDropzone
 * @category 03-file-ingestion (awesome-react: File Upload / Forms)
 * @dependencies @rpldy/uploady @rpldy/upload-drop-zone lucide-react
 */
import React, { useState } from 'react';
import Uploady, { useItemProgressListener, useItemFinishListener } from '@rpldy/uploady';
import UploadDropZone from '@rpldy/upload-drop-zone';
import { UploadCloud, CheckCircle2, FileText } from 'lucide-react';
function DropzoneInner({ label, helperText, onUploadComplete, }) {
    const [items, setItems] = useState({});
    useItemProgressListener((item) => {
        setItems((prev) => ({
            ...prev,
            [item.id]: {
                id: item.id,
                name: item.file.name,
                size: item.file.size,
                status: 'uploading',
                progress: Math.round(item.completed),
            },
        }));
    });
    useItemFinishListener((item) => {
        setItems((prev) => ({
            ...prev,
            [item.id]: {
                ...prev[item.id],
                status: 'completed',
                progress: 100,
            },
        }));
        onUploadComplete?.(item.file.name, item.uploadResponse);
    });
    return (_jsxs("div", { className: "rounded-xl border border-slate-200 bg-white p-5 shadow-xs", children: [_jsxs(UploadDropZone, { onDragOverClassName: "border-teal-600 bg-teal-50/40", className: "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-6 py-8 text-center transition hover:border-blue-700 hover:bg-blue-50/20", children: [_jsx("div", { className: "mb-3 rounded-full bg-blue-100/80 p-3 text-blue-700", children: _jsx(UploadCloud, { className: "h-6 w-6" }) }), _jsx("p", { className: "text-sm font-semibold text-slate-900", children: label }), _jsx("p", { className: "mt-1 text-xs text-slate-500", children: helperText })] }), Object.values(items).length > 0 && (_jsx("div", { className: "mt-4 space-y-2", children: Object.values(items).map((file) => (_jsxs("div", { className: "flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(FileText, { className: "h-4 w-4 text-blue-700" }), _jsx("span", { className: "font-medium text-slate-800", children: file.name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-mono text-teal-700", children: [file.progress, "%"] }), file.status === 'completed' && (_jsx(CheckCircle2, { className: "h-4 w-4 text-teal-600" }))] })] }, file.id))) }))] }));
}
export function ProofDropzone({ uploadUrl = 'https://httpbin.org/post', label = 'Drop invoices, transcripts, or geotagged proof here', helperText = 'Supports PDF, PNG, JPG up to 15MB', extraMeta = {}, onUploadComplete, }) {
    return (_jsx(Uploady, { destination: { url: uploadUrl, params: extraMeta }, children: _jsx(DropzoneInner, { label: label, helperText: helperText, onUploadComplete: onUploadComplete }) }));
}
