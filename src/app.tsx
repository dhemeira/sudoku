import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';
import TopBar from './components/TopBar';

const Board = lazy(() => import('./components/Board'));

function App() {
  useTranslation();

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-2 sm:gap-6 sm:p-4">
      <TopBar />
      <ErrorBoundary>
        <Suspense>
          <Board />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
