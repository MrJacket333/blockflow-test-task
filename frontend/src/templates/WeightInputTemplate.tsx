import Header from '../molecules/Header';
import WeightInputOrganism from '../organisms/WeightInputOrganism';

export default function WeightInputTemplate() {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={7.06} />
      <WeightInputOrganism />
    </div>
  );
}
