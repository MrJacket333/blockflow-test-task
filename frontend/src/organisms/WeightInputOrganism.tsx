import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@atoms/Button';
import Input from '@atoms/Input';
import Select from '@atoms/Select';

type Unit = 'lbs' | 'kg';

export default function WeightInputOrganism() {
  const navigate = useNavigate();
  const [unit, setUnit] = useState<Unit>('lbs');
  const [weight, setWeight] = useState<string>('');

  const minWeight = unit === 'lbs' ? 22 : 10;
  const maxWeight = unit === 'lbs' ? 485 : 220;

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
            What is your weight?
          </h1>
        </div>

        <div className="flex flex-col gap-5 items-center">
          <Select
            options={unitOptions}
            value={unit}
            onChange={(v) => setUnit(v as Unit)}
          />

          <div className="flex flex-col gap-2.5 items-center justify-center">
            <Input
              value={weight}
              onChange={setWeight}
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
      </div>

      <Button disabled={!isValid} onClick={() => navigate('/jobs')} className="w-[182px]">
        Continue
      </Button>
    </div>
  );
}
