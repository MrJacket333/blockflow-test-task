import { useState } from 'react';
import LoadingSpinner from '../atoms/LoadingSpinner';
import JobButtons from '../organisms/JobButtons';
import ResetJobButton from '../molecules/ResetJobButton';

export default function JobProcessingTemplate() {
  const [progress, setProgress] = useState(-1);
  const [running, setRunning] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

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
        <ResetJobButton />
      </>)}
    </div>
  );
}
