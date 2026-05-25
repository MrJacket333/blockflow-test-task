import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@atoms/Button';
import WeightInput from '@molecules/WeightInput';

type Unit = 'lbs' | 'kg';

export default function WeightInputOrganism() {
  const navigate = useNavigate();
  const [unit, setUnit] = useState<Unit>('lbs');
  const [weight, setWeight] = useState<string>('');

  const minWeight = unit === 'lbs' ? 22 : 10;
  const maxWeight = unit === 'lbs' ? 485 : 220;

  const isValid = weight !== '' && Number(weight) >= minWeight && Number(weight) <= maxWeight;

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

        <WeightInput
          unit={unit}
          weight={weight}
          minWeight={minWeight}
          maxWeight={maxWeight}
          isValid={isValid}
          onUnitChange={setUnit}
          onWeightChange={setWeight}
        />

      </div>

      <Button disabled={!isValid} onClick={() => navigate('/jobs')} className="w-[182px]">
        Continue
      </Button>
    </div>
  );
}
