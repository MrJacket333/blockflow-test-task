import { useState } from 'react';
import MainWishSelectionPage from './pages/MainWishSelectionPage';
import WeightInputPage from './pages/WeightInputPage';
import LoadingProgressPage from './pages/LoadingProgressPage';
import GoalWeightWithCardPage from './pages/GoalWeightWithCardPage';
import GoalWeightSimplePage from './pages/GoalWeightSimplePage';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    { id: 1, name: 'Main Wish Selection', component: MainWishSelectionPage },
    { id: 2, name: 'Weight Input', component: WeightInputPage },
    { id: 3, name: 'Loading Progress', component: LoadingProgressPage },
    { id: 4, name: 'Goal Weight with Card', component: GoalWeightWithCardPage },
    { id: 5, name: 'Goal Weight Simple', component: GoalWeightSimplePage },
  ];

  const CurrentPageComponent = pages.find((p) => p.id === currentPage)?.component || MainWishSelectionPage;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <h1 className="text-xl font-semibold">Onboarding Pages Demo</h1>
        <div className="flex gap-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  currentPage === page.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              {page.id}. {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Page */}
      <div className="flex-1">
        <CurrentPageComponent />
      </div>
    </div>
  );
}

export default App;
