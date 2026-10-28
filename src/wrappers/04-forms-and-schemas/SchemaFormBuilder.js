import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @component SchemaFormBuilder
 * @category 04-forms-and-schemas (awesome-react: React Forms)
 * @dependencies react-hook-form @hookform/resolvers zod lucide-react
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Loader2 } from 'lucide-react';
export function SchemaFormBuilder({ fields, onSubmit }) {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(z.object({})),
    });
    return (_jsxs("form", { onSubmit: handleSubmit((data) => onSubmit(data)), className: "space-y-6", children: [fields.map((field) => {
                const { id, label, type, options, defaultValue } = field;
                if (type === 'text') {
                    return (_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-medium text-slate-700", htmlFor: id, children: label }), _jsx("input", { id: id, type: "text", defaultValue: String(defaultValue ?? ''), ...register(id), className: "block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-700 focus:bg-white focus:outline-none" }), errors[id] && (_jsx("span", { className: "text-xs text-red-600", children: errors[id].message }))] }, id));
                }
                if (type === 'select') {
                    const [value, setValue] = useState(String(defaultValue ?? ''));
                    return (_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-medium text-slate-700", htmlFor: id, children: label }), _jsxs("select", { id: id, value: value, onChange: (e) => setValue(e.target.value), ...register(id), className: "block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-700 focus:bg-white focus:outline-none", children: [_jsx("option", { value: "", disabled: true, children: label }), options?.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] }), errors[id] && (_jsx("span", { className: "text-xs text-red-600", children: errors[id].message }))] }, id));
                }
                if (type === 'number') {
                    const [value, setValue] = useState(defaultValue !== undefined ? String(defaultValue) : '');
                    return (_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-medium text-slate-700", htmlFor: id, children: label }), _jsx("input", { type: "number", id: id, value: value, onChange: (e) => setValue(e.target.value), ...register(id), className: "block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-700 focus:bg-white focus:outline-none" }), errors[id] && (_jsx("span", { className: "text-xs text-red-600", children: errors[id].message }))] }, id));
                }
                if (type === 'checkbox') {
                    const [value, setValue] = useState(Boolean(defaultValue));
                    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("label", { className: "flex items-center text-xs font-medium text-slate-700", children: [_jsx("input", { type: "checkbox", checked: value, onChange: (e) => {
                                            setValue(e.target.checked);
                                        }, ...register(id), className: "rounded border border-slate-300 bg-slate-50 py-1 focus:ring-2 focus:ring-blue-700 focus:outline-none" }), label] }), errors[id] && (_jsx("span", { className: "text-xs text-red-600", children: errors[id].message }))] }, id));
                }
                return null;
            }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("button", { type: "button", className: "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-700 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none", children: [_jsx(Loader2, { className: "h-4 w-4" }), "Cancel"] }), _jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 focus:ring-teal-500 focus:outline-none", children: [_jsx(Check, { className: "h-4 w-4" }), "Submit"] })] })] }));
}
