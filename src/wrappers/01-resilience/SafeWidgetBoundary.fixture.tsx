import { SafeWidgetBoundary } from './SafeWidgetBoundary';

export default {
  'Healthy Render': (
    <SafeWidgetBoundary widgetTitle="Test Widget">
      <div className="p-6 bg-slate-50">
        <h3 className="text-lg font-medium text-slate-900">Widget is running healthy</h3>
        <p className="mt-2 text-slate-500">Everything is working correctly.</p>
      </div>
    </SafeWidgetBoundary>
  ),
  ' Crash Recovery': (
    <SafeWidgetBoundary widgetTitle="Demo Widget">
      <p className="text-red-600 font-mono">Component Render Error: Simulated crash</p>
    </SafeWidgetBoundary>
  ),
}