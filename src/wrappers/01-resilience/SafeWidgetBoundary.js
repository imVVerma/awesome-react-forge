import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @component SafeWidgetBoundary
 * @category 01-resilience (awesome-react: Error Handling)
 * @dependencies react-error-boundary lucide-react
 */
import { ErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RotateCcw } from 'lucide-react';
function DefaultFallback({ error, resetErrorBoundary, widgetTitle }) {
    const err = error;
    return (_jsxs("div", { className: "flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50/50 p-5 text-slate-900 shadow-xs", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "rounded-lg bg-red-100 p-2 text-red-700", children: _jsx(AlertTriangle, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900", children: widgetTitle ? `${widgetTitle} failed to render` : 'Component Render Error' }), _jsx("p", { className: "mt-1 font-mono text-xs text-red-600", children: err.message })] })] }), _jsxs("button", { onClick: resetErrorBoundary, className: "inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-blue-800 focus:ring-2 focus:ring-teal-500 focus:outline-none", children: [_jsx(RotateCcw, { className: "h-3.5 w-3.5" }), "Retry Component"] })] }));
}
export function SafeWidgetBoundary({ children, widgetTitle, onReset }) {
    return (_jsx(ErrorBoundary, { onReset: onReset, FallbackComponent: (props) => _jsx(DefaultFallback, { ...props, widgetTitle: widgetTitle }), children: children }));
}
