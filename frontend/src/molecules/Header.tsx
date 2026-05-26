import ProgressBar from '@molecules/ProgressBar';

type HeaderProps = {
  progress?: number;
  onBack?: () => void;
};

export default function Header({ progress, onBack }: HeaderProps) {
  return (
    <div className="bg-white border-b border-[#dad9e0] flex gap-10 items-center w-full">
      <div className="flex items-center shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center px-4 rounded-[10px] size-12 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:pointer-events-none disabled:hover:bg-transparent"
          aria-label="Go back"
          disabled={!onBack}
        >
          <svg className="size-7" viewBox="0 0 28 28" fill="none">
            <path d="M17.5 21L10.5 14L17.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <ProgressBar progress={progress} className="flex-1 mr-[120px]" />
    </div>
  );
}
