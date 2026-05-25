import Header from '@molecules/Header';
import WeightInputOrganism from '@organisms/WeightInputOrganism';

type WeightInputTemplateProps = {
  progress?: number;
  onBack?: () => void;
};

export default function WeightInputTemplate({ progress, onBack }: WeightInputTemplateProps) {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={progress} onBack={onBack} />
      <WeightInputOrganism />
    </div>
  );
}
