import { useNavigate } from 'react-router-dom';
import Header from '@molecules/Header';
import JobProcessingTemplate from '@templates/JobProcessingTemplate';

export default function JobProcessingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f8f8fb] flex flex-col items-start min-h-screen w-full">
      <Header progress={100} onBack={() => navigate(-1)} />
      <JobProcessingTemplate />
    </div>
  );
}
