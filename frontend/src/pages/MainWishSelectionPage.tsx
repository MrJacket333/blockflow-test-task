import { useState } from 'react';
import Header from '../components/Header';

type SelectOption = {
  id: string;
  emoji: string;
  label: string;
};

const options: SelectOption[] = [
  { id: '1', emoji: '😌', label: 'Become stronger' },
  { id: '2', emoji: '😴', label: 'Become smarter' },
  { id: '3', emoji: '⚖️', label: 'Become popular' },
  { id: '4', emoji: '💚', label: 'Become rich' },
  { id: '5', emoji: '😊', label: 'Become happier' },
];

export default function MainWishSelectionPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={7.06} />

      <div className="flex flex-1 flex-col items-center px-[120px] py-14 w-full">
        <div className="flex flex-col gap-10 items-center w-[588px]">
          <div className="flex flex-col items-center">
            <h1
              className="text-[36px] font-normal leading-[1.1] text-[#141415] whitespace-nowrap"
              style={{ fontFamily: 'Geologica, sans-serif' }}
            >
              What is your main wish?
            </h1>
          </div>

          <div className="flex flex-col gap-4 items-start w-full">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`
                  bg-white border border-[#f1f0f6]
                  flex gap-3 items-center
                  rounded-2xl w-full
                  transition-all duration-200
                  hover:shadow-md hover:border-[#1bb97c]
                  ${selectedOption === option.id ? 'border-[#1bb97c] shadow-md' : ''}
                `}
                style={{ boxShadow: '1px 1px 4px rgba(0,0,0,0.04)', padding: '12px 16px' }}
              >
                <div className="flex flex-1 gap-3 items-start">
                  <p className="text-[22px] font-normal leading-[1.25]">
                    {option.emoji}
                  </p>
                  <div className="flex flex-1 flex-col gap-0.5 items-start justify-center">
                    <p
                      className="text-[22px] font-normal leading-[1.25] text-[#141415]"
                      style={{ fontFamily: 'Geologica, sans-serif' }}
                    >
                      {option.label}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
