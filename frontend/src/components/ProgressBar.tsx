type ProgressBarProps = {
  progress?: number;
  className?: string;
};

export default function ProgressBar({ progress = 7.06, className = "" }: ProgressBarProps) {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex-1 h-2 relative rounded-lg">
        <div className="absolute bg-[#f1f0f6] h-2 left-0 right-0 rounded top-0" />
        <div
          className="absolute bg-gradient-to-r from-[#1fa9c7] to-[#1bb97c] h-2 left-0 rounded top-0"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
