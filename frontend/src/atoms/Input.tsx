type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  unit?: string;
  className?: string;
};

export default function Input({ value, onChange, placeholder = "", unit, className = "" }: InputProps) {
  return (
    <div className={`border-b border-[#555557] flex justify-center items-center py-3 w-[255px] ${className}`}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-[180px] text-center bg-transparent outline-none text-[#141415] placeholder:text-[#b3b2bc] text-[44px] font-normal leading-[1.1]"
        style={{ fontFamily: 'Geologica, sans-serif' }}
      />
      {unit && (
        <span
          className="text-[#141415] text-[44px] font-normal leading-[1.1]"
          style={{ fontFamily: 'Geologica, sans-serif' }}
        >
          {unit}
        </span>
      )}
    </div>
  );
}
