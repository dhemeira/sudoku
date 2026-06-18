import { type ReactNode } from 'react';

function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-surface border-border rounded-2xl border ${className}`}>
      {children}
    </section>
  );
}

export default SectionCard;
