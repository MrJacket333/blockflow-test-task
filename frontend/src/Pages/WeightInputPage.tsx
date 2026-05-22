import { useNavigate } from 'react-router-dom';
import WeightInputTemplate from '../templates/WeightInputTemplate';

export default function WeightInputPage() {
  const navigate = useNavigate();
  return <WeightInputTemplate progress={55} onBack={() => navigate(-1)} />;
}
