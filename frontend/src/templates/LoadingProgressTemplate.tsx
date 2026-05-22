import Header from '../molecules/Header';
import LoadingProgressOrganism from '../organisms/LoadingProgressOrganism';

export default function LoadingProgressTemplate() {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header />
      <LoadingProgressOrganism />
    </div>
  );
}
