import Header from '../molecules/Header';
import GoalWeightSimpleOrganism from '../organisms/GoalWeightSimpleOrganism';

export default function GoalWeightSimpleTemplate() {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={7.06} />
      <GoalWeightSimpleOrganism />
    </div>
  );
}
