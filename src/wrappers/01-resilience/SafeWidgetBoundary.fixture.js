import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SafeWidgetBoundary } from './SafeWidgetBoundary';
export default {
    'Healthy Render': (_jsx(SafeWidgetBoundary, { widgetTitle: "Test Widget", children: _jsxs("div", { className: "p-6 bg-slate-50", children: [_jsx("h3", { className: "text-lg font-medium text-slate-900", children: "Widget is running healthy" }), _jsx("p", { className: "mt-2 text-slate-500", children: "Everything is working correctly." })] }) })),
    ' Crash Recovery': (_jsx(SafeWidgetBoundary, { widgetTitle: "Demo Widget", children: _jsx("p", { className: "text-red-600 font-mono", children: "Component Render Error: Simulated crash" }) })),
};
