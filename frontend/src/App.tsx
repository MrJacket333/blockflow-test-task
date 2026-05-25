import { Routes, Route } from 'react-router-dom';
import MainWishPage from '@pages/MainWishPage';
import WeightInputPage from '@pages/WeightInputPage';
import JobProcessingPage from '@pages/JobProcessingPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/mainwish" element={<MainWishPage />} />
          <Route path="/weight" element={<WeightInputPage />} />
          <Route path="/jobs" element={<JobProcessingPage />} />
          <Route path="*" element={<MainWishPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
