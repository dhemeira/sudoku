import NumPad from './NumPad';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {
  setIsPencilCornerMode: Dispatch<SetStateAction<boolean>>;
  setIsPencilCenterMode: Dispatch<SetStateAction<boolean>>;
  isPencilCornerMode: boolean;
  isPencilCenterMode: boolean;
  onDigit: (digit: number) => void;
  onCornerMark: (digit: number) => void;
  onCenterMark: (digit: number) => void;
  onErase: () => void;
}

function Controls({
  setIsPencilCornerMode,
  setIsPencilCenterMode,
  isPencilCornerMode,
  isPencilCenterMode,
  onDigit,
  onCornerMark,
  onCenterMark,
  onErase,
}: Props) {
  return (
    <div className="mx-auto flex w-117 max-w-full flex-col items-center justify-center gap-1 text-center text-2xl md:mr-auto md:ml-0">
      <NumPad
        setIsPencilCornerMode={setIsPencilCornerMode}
        setIsPencilCenterMode={setIsPencilCenterMode}
        isPencilCornerMode={isPencilCornerMode}
        isPencilCenterMode={isPencilCenterMode}
        onDigit={onDigit}
        onCornerMark={onCornerMark}
        onCenterMark={onCenterMark}
        onErase={onErase}
      />
    </div>
  );
}

export default Controls;
