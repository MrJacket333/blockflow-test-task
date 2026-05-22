import Header from '../molecules/Header';
import JobProcessingTemplate from '../templates/JobProcessingTemplate';

export default function JobProcessingPage() {
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header />
      <JobProcessingTemplate />
    </div>
  );
}
