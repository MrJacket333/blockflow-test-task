interface LoadingSpinnerProps {
  progress?: number;
  indeterminate?: boolean;
  showPercentage?: boolean;
}

export default function LoadingSpinner({ progress, indeterminate = false, showPercentage = true }: LoadingSpinnerProps) {
  return (
    <div className="relative size-[220px]">
      <svg
        className={`size-full ${indeterminate ? 'spinner-animation' : '-rotate-90'}`}
        viewBox="0 0 220 220"
      >
        <circle
          cx="110"
          cy="110"
          r="100"
          fill="none"
          stroke="#f1f0f6"
          strokeWidth="8"
        />
        <circle
          cx="110"
          cy="110"
          r="100"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={indeterminate ? '314' : `${2 * Math.PI * 100}`}
          strokeDashoffset={indeterminate ? '0' : `${2 * Math.PI * 100 * (1 - (progress ?? 0) / 100)}`}
          style={indeterminate ? undefined : { transition: 'stroke-dashoffset 0.3s ease' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1fa9c7" />
            <stop offset="100%" stopColor="#1bb97c" />
          </linearGradient>
        </defs>
      </svg>
      {!indeterminate && showPercentage && progress !== undefined && (
        <p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[56px] font-normal leading-[1.1] text-[#099678] text-center whitespace-nowrap"
          style={{ fontFamily: 'Geologica, sans-serif' }}
        >
          {progress}%
        </p>
      )}
    </div>
  );
}
