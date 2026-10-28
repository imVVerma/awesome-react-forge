// React import removed - JSX transform handles it
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Loader2 } from 'lucide-react';

type FieldType = 'text' | 'select' | 'number' | 'checkbox';

interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  defaultValue?: unknown;
}

interface SchemaFormBuilderProps {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, unknown>) => void;
}

export function SchemaFormBuilder({ fields, onSubmit }: SchemaFormBuilderProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(z.object({})),
  } as any);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="space-y-6"
    >
      {fields.map((field) => {
        const { id, label, type, options, defaultValue } = field;

        if (type === 'text') {
          return (
            <div key={id} className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700" htmlFor={id}>
                {label}
              </label>
              <input
                id={id}
                type="text"
                defaultValue={String(defaultValue ?? '')}
                {...register(id)}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-700 focus:bg-white focus:outline-none"
              />
              {errors[id] && (
                <span className="text-xs text-red-600">{(errors[id] as any).message}</span>
              )}
            </div>
          );
        }

        if (type === 'select') {
          return (
            <div key={id} className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700" htmlFor={id}>
                {label}
              </label>
              <select
                id={id}
                {...register(id)}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-700 focus:bg-white focus:outline-none"
              >
                <option value="" disabled>{label}</option>
                {options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors[id] && (
                <span className="text-xs text-red-600">{(errors[id] as any).message}</span>
              )}
            </div>
          );
        }

        if (type === 'number') {
          return (
            <div key={id} className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700" htmlFor={id}>
                {label}
              </label>
              <input
                type="number"
                id={id}
                {...register(id)}
                className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-700 focus:bg-white focus:outline-none"
              />
              {errors[id] && (
                <span className="text-xs text-red-600">{(errors[id] as any).message}</span>
              )}
            </div>
          );
        }

        if (type === 'checkbox') {
          return (
            <div key={id} className="flex items-center space-x-2">
              <label className="flex items-center text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  {...register(id)}
                  className="rounded border border-slate-300 bg-slate-50 py-1 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
                {label}
              </label>
              {errors[id] && (
                <span className="text-xs text-red-600">{(errors[id] as any).message}</span>
              )}
            </div>
          );
        }

        return null;
      })}

      <div className="flex gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-700 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <Loader2 className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        >
          <Check className="h-4 w-4" />
          Submit
        </button>
      </div>
    </form>
  );
}