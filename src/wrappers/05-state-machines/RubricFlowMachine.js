import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @component RubricFlowMachine
 * @category 05-state-machines (awesome-react: State Machines)
 * @dependencies xstate @xstate/react lucide-react
 */
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
const rubricMachine = createMachine({
    id: 'rubric',
    initial: 'draft',
    states: {
        draft: {
            on: { NEXT: 'automatedCheck' },
        },
        automatedCheck: {
            on: { NEXT: 'humanReview', RESET: 'draft' },
        },
        humanReview: {
            on: { NEXT: 'approved', RESET: 'draft' },
        },
        approved: {
            on: { RESET: 'draft' },
        },
        rejected: {
            on: { RESET: 'draft' },
        },
    },
});
export function RubricFlowMachine(_props = {}) {
    const [state, send] = useMachine(rubricMachine);
    const steps = ['Draft', 'Automated Check', 'Human Review', 'Approved', 'Rejected'];
    const currentStep = String(state.value);
    const currentIndex = steps.findIndex((s) => s.toLowerCase() === currentStep.toLowerCase().replace('automatedcheck', 'automated check').replace('humanreview', 'human review'));
    const displayStep = currentIndex >= 0 ? steps[currentIndex] : currentStep;
    return (_jsxs("div", { className: "rounded-xl border border-slate-200 bg-white shadow-xs p-6", children: [_jsx("div", { className: "flex gap-2 justify-center mb-6", children: steps.map((step, index) => {
                    const isActive = index <= (currentIndex === -1 ? 0 : currentIndex);
                    const isCompleted = index < (currentIndex === -1 ? 0 : currentIndex);
                    return (_jsxs("div", { className: `flex flex-col items-center gap-1.5 ${isCompleted
                            ? 'text-teal-600'
                            : isActive
                                ? 'text-blue-700'
                                : 'text-slate-400'}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'bg-teal-600 border-teal-600 text-white' : isActive ? 'bg-blue-700 border-blue-700 text-white' : 'border-slate-300 text-slate-400'}`, children: index + 1 }), _jsx("span", { className: "text-xs", children: step })] }, step));
                }) }), _jsxs("div", { className: "mb-6 p-4 rounded-xl bg-slate-50 text-slate-900", children: [_jsx("p", { className: "text-lg font-medium", children: displayStep }), _jsxs("p", { className: "text-teal-600", children: [currentIndex >= 0 ? (currentIndex + 1) * 25 : 0, "% complete"] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("button", { onClick: () => send({ type: 'RESET' }), disabled: currentStep === 'draft', className: "inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-blue-700 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-40", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Reset"] }), currentStep !== 'approved' && currentStep !== 'rejected' && (_jsxs("button", { onClick: () => send({ type: 'NEXT' }), className: "inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 focus:ring-teal-500 focus:outline-none", children: ["Next", _jsx(ArrowRight, { className: "h-4 w-4" })] }))] })] }));
}
