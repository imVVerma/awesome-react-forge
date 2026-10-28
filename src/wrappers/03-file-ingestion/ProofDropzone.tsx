/**
 * @component ProofDropzone
 * @category 03-file-ingestion (awesome-react: File Upload / Forms)
 * @dependencies @rpldy/uploady @rpldy/upload-drop-zone lucide-react
 */
import { useState } from "react";
import Uploady, { useItemProgressListener, useItemFinishListener } from '@rpldy/uploady';
import UploadDropZone from '@rpldy/upload-drop-zone';
import { UploadCloud, CheckCircle2, FileText } from 'lucide-react';

interface UploadedFileSummary {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'completed';
  progress: number;
}

interface ProofDropzoneProps {
  uploadUrl?: string;
  label?: string;
  helperText?: string;
  extraMeta?: Record<string, string | number>;
  onUploadComplete?: (fileName: string, response: unknown) => void;
}

function DropzoneInner({
  label,
  helperText,
  onUploadComplete,
}: Omit<ProofDropzoneProps, 'uploadUrl' | 'extraMeta'>) {
  const [items, setItems] = useState<Record<string, UploadedFileSummary>>({});

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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      <UploadDropZone
        onDragOverClassName="border-teal-600 bg-teal-50/40"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-6 py-8 text-center transition hover:border-blue-700 hover:bg-blue-50/20"
      >
        <div className="mb-3 rounded-full bg-blue-100/80 p-3 text-blue-700">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      </UploadDropZone>

      {Object.values(items).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.values(items).map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 text-blue-700" />
                <span className="font-medium text-slate-800">{file.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-teal-700">{file.progress}%</span>
                {file.status === 'completed' && (
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProofDropzone({
  uploadUrl = 'https://httpbin.org/post',
  label = 'Drop invoices, transcripts, or geotagged proof here',
  helperText = 'Supports PDF, PNG, JPG up to 15MB',
  extraMeta = {},
  onUploadComplete,
}: ProofDropzoneProps) {
  return (
    <Uploady destination={{ url: uploadUrl, params: extraMeta }}>
      <DropzoneInner
        label={label}
        helperText={helperText}
        onUploadComplete={onUploadComplete}
      />
    </Uploady>
  );
}