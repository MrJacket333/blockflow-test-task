import Header from '../molecules/Header';
import MainWishSelectionOrganism from '../organisms/MainWishSelectionOrganism';

type MainWishSelectionTemplateProps = {
  progress?: number;
  onBack?: () => void;
};

export default function MainWishSelectionTemplate({ progress, onBack }: MainWishSelectionTemplateProps) {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={progress} onBack={onBack} />
      <MainWishSelectionOrganism />
    </div>
  );
}
