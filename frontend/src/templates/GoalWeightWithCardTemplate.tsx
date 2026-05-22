import Header from '../molecules/Header';
import GoalWeightWithCardOrganism from '../organisms/GoalWeightWithCardOrganism';

export default function GoalWeightWithCardTemplate() {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={7.06} />
      <GoalWeightWithCardOrganism />
    </div>
  );
}
