import Input from '@atoms/Input';
import Select from '@atoms/Select';

type Unit = 'lbs' | 'kg';

type WeightInputProps = {
  unit: Unit;
  weight: string;
  minWeight: number;
  maxWeight: number;
  isValid: boolean;
  onUnitChange: (unit: Unit) => void;
  onWeightChange: (weight: string) => void;
};

const unitOptions = [
  { value: 'lbs', label: 'lbs' },
  { value: 'kg', label: 'kg' },
];

export default function WeightInput({
  unit,
  weight,
  minWeight,
  maxWeight,
  isValid,
  onUnitChange,
  onWeightChange,
}: WeightInputProps) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Select
        options={unitOptions}
        value={unit}
        onChange={(v) => onUnitChange(v as Unit)}
      />

      <div className="flex flex-col gap-2.5 items-center justify-center">
        <Input
          value={weight}
          onChange={onWeightChange}
          placeholder="Weight"
          unit={unit}
          className={weight !== '' && !isValid ? 'border-[#e42d2d]' : ''}
        />
        {weight !== '' && !isValid && (
          <p
            className="text-base font-light leading-[1.25] text-[#e42d2d] text-center whitespace-nowrap"
            style={{ fontFamily: 'Geologica, sans-serif' }}
          >
            Please enter a value between{' '}
            <span className="text-[#e42d2d]">{minWeight} {unit}</span> and{' '}
            <span className="text-[#e42d2d]">{maxWeight} {unit}</span>
          </p>
        )}
      </div>
    </div>
  );
}
