import { useNavigate } from 'react-router-dom';
import MainWishSelectionTemplate from '@templates/MainWishSelectionTemplate';

export default function MainWishPage() {
  const navigate = useNavigate();
  return <MainWishSelectionTemplate progress={10} onBack={() => navigate(-1)} />;
}
