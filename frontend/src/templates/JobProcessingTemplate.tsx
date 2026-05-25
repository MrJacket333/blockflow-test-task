import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import JobButtons from '../organisms/JobButtons';

export default function JobProcessingTemplate() {
  const [progress, setProgress] = useState(-1);
  const [running, setRunning] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const navigate = useNavigate();

  const resetJob = useCallback(() => {
    navigate('/mainwish');
  }, [navigate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full gap-8">
      <JobButtons
        running={running}
        onProgress={setProgress}
        onStatusChange={(status) => { setRunning(status.running); setIsPolling(status.isPolling); }}
      />
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
