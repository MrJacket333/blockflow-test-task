import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Button from '@atoms/Button';

interface WebSocketJobButtonProps {
  disabled: boolean;
  onProgress: (progress: number) => void;
  onStatusChange: (status: { running: boolean; isPolling: boolean }) => void;
}

export default function WebSocketJobButton({ disabled, onProgress, onStatusChange }: WebSocketJobButtonProps) {
  const socketRef = useRef<Socket | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runWebSocketJob = useCallback(() => {
    setError(null);
    onStatusChange({ running: true, isPolling: false });
    onProgress(0);

    const socket = io({
      transports: ['websocket'],
      reconnection: false,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('initJob');
    });

    socket.on('jobProgress', (data: { jobId: string; progress: number }) => {
      onProgress(data.progress);
    });

    socket.on('jobCompleted', () => {
      onProgress(100);
      onStatusChange({ running: false, isPolling: false });
      socket.disconnect();
    });

    socket.on('jobFailed', () => {
      onStatusChange({ running: false, isPolling: false });
      socket.disconnect();
    });

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err.message);
      setError(err.message);
      onStatusChange({ running: false, isPolling: false });
    });

    socket.on('disconnect', () => {
      socketRef.current = null;
    });
  }, [onProgress, onStatusChange]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={runWebSocketJob} className="py-4 w-[250px]" disabled={disabled}>Run WebSocket job</Button>
      {error && <p className="text-red-500 text-sm">Connection failed: {error}</p>}
    </div>
  );
}
