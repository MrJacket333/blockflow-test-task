import { useCallback, useEffect, useRef } from 'react';
import Button from '@atoms/Button';

interface PollingJobButtonProps {
  disabled: boolean;
  onProgress: (progress: number) => void;
  onStatusChange: (status: { running: boolean; isPolling: boolean }) => void;
}

export default function PollingJobButton({ disabled, onProgress, onStatusChange }: PollingJobButtonProps) {
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runPollingJob = useCallback(async () => {
    onStatusChange({ running: true, isPolling: true });
    onProgress(0);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs`, { method: 'POST' });
      const { id } = await res.json();

      pollIntervalRef.current = setInterval(async () => {
        try {
          const pollRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`);
          const data = await pollRes.json();

          onProgress(data.progress);

          if (data.status === 'done') {
            onProgress(100);
            onStatusChange({ running: false, isPolling: true });
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          } else if (data.status === 'failed') {
            onStatusChange({ running: false, isPolling: true });
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          }
        } catch {
          onStatusChange({ running: false, isPolling: true });
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
        }
      }, 1000);
    } catch {
      onStatusChange({ running: false, isPolling: true });
    }
  }, [onProgress, onStatusChange]);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return (
    <Button onClick={runPollingJob} className="py-4 w-[250px]" disabled={disabled}>Run polling job</Button>
  );
}
