import { Routes, Route, NavLink } from 'react-router-dom';
import MainWishPage from './Pages/MainWishPage';
import WeightInputPage from './Pages/WeightInputPage';
import JobProcessingPage from './Pages/JobProcessingPage';

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
