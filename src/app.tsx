import { useTranslation } from 'react-i18next';
import LanguagePicker from './components/LanguagePicker';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';

const Hero = lazy(() => import('./components/Hero'));

function App() {
  useTranslation();

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-7">
      <LanguagePicker />
      <ErrorBoundary>
        <Suspense>
          <Hero />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
