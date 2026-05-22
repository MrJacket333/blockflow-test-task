type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({ children, onClick, disabled = false, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r from-[#1fa9c7] to-[#1bb97c]
        flex gap-1 h-12 items-center justify-center px-6 py-2.5
        rounded-xl text-white text-lg font-normal
        transition-all duration-200
        ${disabled ? 'from-[#cbecf4] to-[#d0f2e3] cursor-not-allowed' : 'hover:shadow-lg cursor-pointer'}
        ${className}
      `}
      style={{ fontFamily: 'Geologica, sans-serif' }}
    >
      {children}
    </button>
  );
}
