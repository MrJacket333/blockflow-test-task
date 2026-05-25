import WebSocketJobButton from '../molecules/WebSocketJobButton';
import PollingJobButton from '../molecules/PollingJobButton';

interface JobButtonsProps {
  running: boolean;
  onProgress: (progress: number) => void;
  onStatusChange: (status: { running: boolean; isPolling: boolean }) => void;
}

export default function JobButtons({ running, onProgress, onStatusChange }: JobButtonsProps) {
  return (
    <div className="flex gap-4">
      <WebSocketJobButton
        disabled={running}
        onProgress={onProgress}
        onStatusChange={onStatusChange}
      />
      <PollingJobButton
        disabled={running}
        onProgress={onProgress}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
