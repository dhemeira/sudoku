import NumPad from './NumPad';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {
  setIsPencilCornerMode: Dispatch<SetStateAction<boolean>>;
  setIsPencilCenterMode: Dispatch<SetStateAction<boolean>>;
  isPencilCornerMode: boolean;
  isPencilCenterMode: boolean;
  longPressDigit: number | null;
  onDigit: (digit: number) => void;
  onCornerMark: (digit: number) => void;
  onCenterMark: (digit: number) => void;
  onErase: () => void;
  onLongPressDigit: (digit: number) => void;
  onClearLongPress: () => void;
}

function Controls({
  setIsPencilCornerMode,
  setIsPencilCenterMode,
  isPencilCornerMode,
  isPencilCenterMode,
  longPressDigit,
  onDigit,
  onCornerMark,
  onCenterMark,
  onErase,
  onLongPressDigit,
  onClearLongPress,
}: Props) {
  return (
    <div className="mx-auto flex w-117 max-w-full flex-col items-center justify-center gap-1 text-center text-2xl md:mr-auto md:ml-0">
      <NumPad
        setIsPencilCornerMode={setIsPencilCornerMode}
        setIsPencilCenterMode={setIsPencilCenterMode}
        isPencilCornerMode={isPencilCornerMode}
        isPencilCenterMode={isPencilCenterMode}
        longPressDigit={longPressDigit}
        onDigit={onDigit}
        onCornerMark={onCornerMark}
        onCenterMark={onCenterMark}
        onErase={onErase}
        onLongPressDigit={onLongPressDigit}
        onClearLongPress={onClearLongPress}
      />
    </div>
  );
}

export default Controls;
