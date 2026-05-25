import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';

export default function JobProcessingTemplate() {
  const [progress, setProgress] = useState(-1);
  const [running, setRunning] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const resetJob = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setProgress(-1);
    setIsPolling(false);
    navigate('/mainwish');
  }, [navigate]);

  const runWebSocketJob = useCallback(() => {
    setRunning(true);
    setProgress(0);
    setIsPolling(false);

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
      setRunning(false);
      socket.disconnect();

    });

    socket.on('jobFailed', () => {
      setRunning(false);
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      socketRef.current = null;
    });
  }, []);

  const runPollingJob = useCallback(async () => {
    setRunning(true);
    setProgress(0);
    setIsPolling(true);

    try {
      const res = await fetch('/jobs', { method: 'POST' });
      const { id } = await res.json();

      pollIntervalRef.current = setInterval(async () => {
        try {
          const pollRes = await fetch(`/jobs/${id}`);
          const data = await pollRes.json();

          setProgress(data.progress);

          if (data.status === 'done') {
            setProgress(100);
            setRunning(false);
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          } else if (data.status === 'failed') {
            setRunning(false);
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          }
        } catch {
          setRunning(false);
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
        }
      }, 1000);
    } catch {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full gap-8">

      <div className="flex gap-4">
        <Button onClick={runWebSocketJob} className="py-4 w-[220px]" disabled={running}>Run WebSocket job</Button>
        <Button onClick={runPollingJob} className="py-4 w-[220px]" disabled={running}>Run polling job</Button>
      </div>
      {progress >= 0 && (<>
        <LoadingSpinner
          progress={progress}
          indeterminate={isPolling && running}
          showPercentage={!isPolling}
        />
        <Button onClick={resetJob} className="py-4 w-[220px] mt-4">Reset</Button>
      </>)}
    </div>
  );
}
