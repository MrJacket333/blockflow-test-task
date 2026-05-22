import { useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';

export default function JobProcessingTemplate() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const runWebSocketJob = useCallback(() => {
    setRunning(true);
    setProgress(0);

    const socket = io({ transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('initJob');
    });

    socket.on('jobProgress', (data: { jobId: string; progress: number }) => {
      setProgress(data.progress);
    });

    socket.on('jobCompleted', () => {
      setProgress(100);
      socket.disconnect();
    });

    socket.on('jobFailed', () => {
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      socketRef.current = null;
    });
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      {running ? (
        <LoadingSpinner progress={progress} />
      ) : (
        <div className="flex gap-4">
          <Button onClick={runWebSocketJob}>Run WebSocket job</Button>
          <Button>Run polling job</Button>
        </div>
      )}
    </div>
  );
}
