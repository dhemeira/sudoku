import { useEffect, useRef } from 'react';

const CORNER_FILL_ORDER = [0, 2, 6, 8, 1, 3, 5, 7, 4]; // TL, TR, BL, BR, TM, ML, MR, BM, C

const SLOT_ALIGN = [
  'items-start justify-start', // 0 TL
  'items-start justify-center', // 1 TM
  'items-start justify-end', // 2 TR
  'items-center justify-start', // 3 ML
  'items-center justify-center', // 4 C
  'items-center justify-end', // 5 MR
  'items-end justify-start', // 6 BL
  'items-end justify-center', // 7 BM
  'items-end justify-end', // 8 BR
];

interface MarksProps {
  marks: Set<number>;
  selectedValue?: number;
}

export function CornerMarks({ marks, selectedValue }: MarksProps) {
  const slots = Array<number | null>(9).fill(null);
  const sorted = [...marks].sort((a, b) => a - b);
  sorted.forEach((digit, i) => {
    slots[CORNER_FILL_ORDER[i]] = digit;
  });

  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-[0.10em] text-[0.5em]">
      {slots.map((digit, i) => (
        <span
          key={`slot-${String(i)}`}
          className={`flex ${SLOT_ALIGN[i]} ${digit === selectedValue ? 'text-accent font-medium' : ''}`}>
          {digit ?? ''}
        </span>
      ))}
    </div>
  );
}

export function CenterMarks({ marks, selectedValue }: MarksProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.fontSize = '';
    while (el.scrollWidth > el.clientWidth && parseFloat(getComputedStyle(el).fontSize) > 4) {
      el.style.fontSize = String(parseFloat(getComputedStyle(el).fontSize) - 0.5) + 'px';
    }
  }, [marks]);

  return (
    <div
      ref={ref}
      className="mx-auto flex h-full w-full max-w-[72%] items-center justify-center overflow-hidden text-[0.5em] whitespace-nowrap">
      {[...marks]
        .sort((a, b) => a - b)
        .map((digit) => (
          <span key={digit} className={digit === selectedValue ? 'text-accent font-medium' : ''}>
            {digit}
          </span>
        ))}
    </div>
  );
}
