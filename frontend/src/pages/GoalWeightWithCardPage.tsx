import { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

type Unit = 'lbs' | 'kg';

export default function GoalWeightWithCardPage() {
  const [unit, setUnit] = useState<Unit>('kg');
  const [weight, setWeight] = useState<string>('56');

  const minWeight = unit === 'lbs' ? 22 : 10;
  const maxWeight = unit === 'lbs' ? 485 : 200;

  const isValid = weight !== '' && Number(weight) >= minWeight && Number(weight) <= maxWeight;

  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={7.06} />

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

          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-5 items-center">
              {/* Segmented Control */}
              <div
                className="bg-white border-0 border-[#dad9e0] flex items-center overflow-hidden px-1.5 py-1 rounded-full"
                style={{ boxShadow: '1px 1px 8px 2px rgba(0,0,0,0.04)' }}
              >
                <button
                  onClick={() => setUnit('lbs')}
                  className={`
                    flex items-center justify-center pb-2 pt-1 px-6 rounded-full w-[76px]
                    transition-colors duration-200
                    ${unit === 'lbs' ? 'bg-[#1bb97c]' : ''}
                  `}
                >
                  <span
                    className={`text-lg font-normal leading-[1.25] ${
                      unit === 'lbs' ? 'text-white' : 'text-[#141415]'
                    }`}
                    style={{ fontFamily: 'Geologica, sans-serif' }}
                  >
                    lbs
                  </span>
                </button>
                <button
                  onClick={() => setUnit('kg')}
                  className={`
                    flex items-center justify-center pb-2 pt-1 px-6 rounded-full w-[76px]
                    transition-colors duration-200
                    ${unit === 'kg' ? 'bg-[#1bb97c]' : ''}
                  `}
                >
                  <span
                    className={`text-lg font-normal leading-[1.25] ${
                      unit === 'kg' ? 'text-white' : 'text-[#141415]'
                    }`}
                    style={{ fontFamily: 'Geologica, sans-serif' }}
                  >
                    kg
                  </span>
                </button>
              </div>

              {/* Input */}
              <div className="flex flex-col gap-3 items-center justify-center">
                <div className="border-b border-[#555557] flex items-center justify-center px-4 py-3 w-[255px]">
                  <div className="flex gap-4 items-center text-[44px] font-normal leading-[1.1] whitespace-nowrap">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="flex-1 text-center bg-transparent outline-none text-[#555557]"
                      style={{ fontFamily: 'Geologica, sans-serif' }}
                    />
                    <span
                      className="text-[#141415]"
                      style={{ fontFamily: 'Geologica, sans-serif' }}
                    >
                      {unit}
                    </span>
                  </div>
                </div>
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

            {/* Info Card */}
            <div className="bg-white border border-[#dad9e0] flex flex-col gap-2 px-4 py-5 rounded-xl w-[566px]">
              <div className="flex gap-2 items-center justify-center w-full">
                <div className="bg-white border border-[#dad9e0] flex items-center p-[3px] rounded-md">
                  <svg className="size-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8h5M9 8h5M8 2v5M8 9v5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p
                  className="text-base font-normal leading-[1.25] text-[#141415] text-center whitespace-nowrap"
                  style={{ fontFamily: 'Geologica, sans-serif' }}
                >
                  Goal: Lose 5% of your weight
                </p>
              </div>
              <p
                className="text-sm font-light leading-[1.3] text-[#555557] text-center w-full"
                style={{ fontFamily: 'Geologica, sans-serif' }}
              >
                Even small, steady changes can make a meaningful difference. We'll support you with
                a balanced plan to help you feel lighter, healthier, and more confident over time.
              </p>
            </div>
          </div>
        </div>

        <Button disabled={!isValid} className="w-[182px]">
          Continue
        </Button>
      </div>
    </div>
  );
}
