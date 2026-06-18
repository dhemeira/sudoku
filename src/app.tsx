import { useTranslation } from 'react-i18next';
import LanguagePicker from './components/LanguagePicker';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Title from './components/Title';

const Grid = lazy(() => import('./components/Grid'));

function App() {
  useTranslation();

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-6">
      <LanguagePicker />
      <Title />
      <ErrorBoundary>
        <Suspense>
          <Grid />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
