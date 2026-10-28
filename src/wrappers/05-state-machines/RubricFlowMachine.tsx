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

interface RubricFlowMachineProps {
  initialStep?: string;
}

export function RubricFlowMachine(_props: RubricFlowMachineProps = {}) {
  const [state, send] = useMachine(rubricMachine);

  const steps = ['Draft', 'Automated Check', 'Human Review', 'Approved', 'Rejected'];
  const currentStep = String(state.value);
  const currentIndex = steps.findIndex((s) => s.toLowerCase() === currentStep.toLowerCase().replace('automatedcheck', 'automated check').replace('humanreview', 'human review'));
  const displayStep = currentIndex >= 0 ? steps[currentIndex] : currentStep;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs p-6">
      <div className="flex gap-2 justify-center mb-6">
        {steps.map((step, index) => {
          const isActive = index <= (currentIndex === -1 ? 0 : currentIndex);
          const isCompleted = index < (currentIndex === -1 ? 0 : currentIndex);
          return (
            <div
              key={step}
              className={`flex flex-col items-center gap-1.5 ${
                isCompleted
                  ? 'text-teal-600'
                  : isActive
                  ? 'text-blue-700'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  isCompleted ? 'bg-teal-600 border-teal-600 text-white' : isActive ? 'bg-blue-700 border-blue-700 text-white' : 'border-slate-300 text-slate-400'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="mb-6 p-4 rounded-xl bg-slate-50 text-slate-900">
        <p className="text-lg font-medium">{displayStep}</p>
        <p className="text-teal-600">{currentIndex >= 0 ? (currentIndex + 1) * 25 : 0}% complete</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => send({ type: 'RESET' })}
          disabled={currentStep === 'draft'}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-blue-700 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Reset
        </button>
        {currentStep !== 'approved' && currentStep !== 'rejected' && (
          <button
            onClick={() => send({ type: 'NEXT' })}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}