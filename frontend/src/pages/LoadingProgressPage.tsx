import { useEffect, useState } from 'react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoadingProgressPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header />

      <div className="flex flex-1 flex-col items-center px-[120px] py-14 w-full">
        <div className="flex flex-1 flex-col items-center justify-between w-[792px]">
          <div className="flex flex-col gap-6 items-center w-full">
            <LoadingSpinner progress={progress} />

            {/* Text */}
            <div className="flex flex-col gap-2 items-center text-center w-full">
              <p
                className="text-2xl font-normal leading-[1.25] text-[#141415] w-full"
                style={{ fontFamily: 'Geologica, sans-serif' }}
              >
                Creating something good for you…
              </p>
              <p
                className="text-lg font-extralight leading-[1.25] text-[#555557] w-full"
                style={{ fontFamily: 'Geologica, sans-serif' }}
              >
                This will only take a moment — your item is almost ready.
              </p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#eaf9e3] border border-[#d1eec4] flex flex-col gap-3 p-3 rounded-xl w-[538px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1 items-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-6" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p
                className="text-base font-semibold leading-[1.25] text-[#141415] whitespace-nowrap"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                John
              </p>
            </div>
            <p
              className="text-sm font-normal leading-[1.2] text-[#141415] w-full"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              "I love this website! It makes practicing so easy and relaxing."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
