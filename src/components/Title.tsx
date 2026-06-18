import { useTranslation } from 'react-i18next';
import { Grid3x3 } from 'lucide-react';

function Title() {
  const { t } = useTranslation();
  return (
    <h1 className="text-text inline-flex items-center gap-1 text-3xl font-medium tracking-tight">
      <Grid3x3 />
      {t('title')}
    </h1>
  );
}

export default Title;
