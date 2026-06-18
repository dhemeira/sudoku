import { type ReactNode } from 'react';

type Variant = 'default' | 'tie' | 'win';

function SectionCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
}) {
  return (
    <section
      className={`bg-surface border-border flex w-full max-w-4xl flex-col rounded-2xl border p-4 sm:px-8 sm:py-7 ${className}`}>
      {children}
    </section>
  );
}

export default SectionCard;
