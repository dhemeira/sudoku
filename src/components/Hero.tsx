import { Trans } from 'react-i18next';
import SectionCard from './ui/SectionCard';

function Hero() {
  return (
    <SectionCard className="flex-1 items-center justify-center gap-4 text-center">
      <h1 className="text-text text-3xl font-medium tracking-tight">
        <Trans
          i18nKey="title"
          components={{
            color: <span className="text-accent" />,
            br: <br className="block md:hidden" />,
          }}
        />
      </h1>
    </SectionCard>
  );
}

export default Hero;
