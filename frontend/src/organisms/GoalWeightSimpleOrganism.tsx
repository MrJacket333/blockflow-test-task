import { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

type Unit = 'lbs' | 'kg';

export default function GoalWeightSimpleOrganism() {
  const [unit, setUnit] = useState<Unit>('lbs');
  const [weight, setWeight] = useState<string>('');

  const minWeight = unit === 'lbs' ? 22 : 10;
  const maxWeight = unit === 'lbs' ? 485 : 200;

  const isValid = weight !== '' && Number(weight) >= minWeight && Number(weight) <= maxWeight;

  const unitOptions = [
    { value: 'lbs', label: 'lbs' },
    { value: 'kg', label: 'kg' },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-[120px] py-14 w-full">
      <div className="flex flex-col gap-16 items-center w-[792px]">
        <div className="flex flex-col items-center w-full">
          <h1
            className="text-[36px] font-normal leading-[1.1] text-[#141415] text-center w-full"
            style={{ fontFamily: 'Geologica, sans-serif' }}
          >
            What is your <span className="text-[#099678]">goal</span> weight?
          </h1>
        </div>

        <div className="flex flex-col gap-5 items-center">
          <Select
            options={unitOptions}
            value={unit}
            onChange={(v) => setUnit(v as Unit)}
          />

          <div className="flex flex-col gap-3 items-center justify-center">
            <Input
              value={weight}
              onChange={setWeight}
              placeholder="Weight"
              unit={unit}
            />
            <p
              className="text-base font-light leading-[1.25] text-[#82818c] text-center whitespace-nowrap"
              style={{ fontFamily: 'Geologica, sans-serif' }}
            >
              Please enter a value from{' '}
              <span className="text-[#141415]">{minWeight} {unit}</span> to{' '}
              <span className="text-[#141415]">{maxWeight} {unit}</span>
            </p>
          </div>
        </div>
      </div>

      <Button disabled={!isValid} className="w-[182px]">
        Continue
      </Button>
    </div>
  );
}
