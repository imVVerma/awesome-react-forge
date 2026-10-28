/**
 * @component SafeWidgetBoundary
 * @category 01-resilience (awesome-react: Error Handling)
 * @dependencies react-error-boundary lucide-react
 */
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface SafeWidgetBoundaryProps {
  children: React.ReactNode;
  widgetTitle?: string;
  onReset?: () => void;
}

function DefaultFallback({ error, resetErrorBoundary, widgetTitle }: FallbackProps & { widgetTitle?: string }) {
  const err = error as Error;
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50/50 p-5 text-slate-900 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-red-100 p-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {widgetTitle ? `${widgetTitle} failed to render` : 'Component Render Error'}
          </h3>
          <p className="mt-1 font-mono text-xs text-red-600">{err.message}</p>
        </div>
      </div>
      <button
        onClick={resetErrorBoundary}
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-blue-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Retry Component
      </button>
    </div>
  );
}

export function SafeWidgetBoundary({ children, widgetTitle, onReset }: SafeWidgetBoundaryProps) {
  return (
    <ErrorBoundary
      onReset={onReset}
      FallbackComponent={(props) => <DefaultFallback {...props} widgetTitle={widgetTitle} />}
    >
      {children}
    </ErrorBoundary>
  );
}