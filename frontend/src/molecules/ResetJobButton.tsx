import { useNavigate } from 'react-router-dom';
import Button from '@atoms/Button';

export default function ResetJobButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/mainwish')} className="py-4 w-[220px] mt-4">Reset</Button>
  );
}
