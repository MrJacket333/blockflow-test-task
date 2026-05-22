import { useEffect, useState } from 'react';
import LoadingSpinner from '../atoms/LoadingSpinner';

export default function LoadingProgressOrganism() {
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
    <div className="flex flex-1 flex-col items-center px-[120px] py-14 w-full">
      <div className="flex flex-1 flex-col items-center justify-between w-[792px]">
        <div className="flex flex-col gap-6 items-center w-full">
          <LoadingSpinner progress={progress} />

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
      </div>
    </div>
  );
}
