import Header from '../molecules/Header';
import MainWishSelectionOrganism from '../organisms/MainWishSelectionOrganism';

export default function MainWishSelectionTemplate() {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={7.06} />
      <MainWishSelectionOrganism />
    </div>
  );
}
