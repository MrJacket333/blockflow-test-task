type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function Select({ options, value, onChange }: SelectProps) {
  return (
    <div
      className="bg-white border-0 border-[#dad9e0] flex items-center overflow-hidden px-1.5 py-1 rounded-full"
      style={{ boxShadow: '1px 1px 8px 2px rgba(0,0,0,0.04)' }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            flex items-center justify-center pb-2 pt-1 px-6 rounded-full w-[76px]
            transition-colors duration-200
            ${value === option.value ? 'bg-[#1bb97c]' : ''}
          `}
        >
          <span
            className={`text-lg font-normal leading-[1.25] ${
              value === option.value ? 'text-white' : 'text-[#141415]'
            }`}
            style={{ fontFamily: 'Geologica, sans-serif' }}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
