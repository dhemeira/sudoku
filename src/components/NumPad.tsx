import { Eraser, Pencil } from 'lucide-react';
import { type Dispatch, type SetStateAction, useRef } from 'react';

const LONG_PRESS_MS = 500;

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

const isLeftCol = (idx: number) => idx % 3 === 0;
const isRightCol = (idx: number) => idx % 3 === 2;
const isTopRow = (idx: number) => idx < 3;
const isBottomRow = (idx: number) => idx > 5;

function NumPad({
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
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClick = useRef(false);

  function startPress(digit: number) {
    pressTimer.current = setTimeout(() => {
      suppressClick.current = true;
      onLongPressDigit(digit);
    }, LONG_PRESS_MS);
  }

  function cancelPress() {
    if (pressTimer.current !== null) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }

  return (
    <div className="max-md:tall:grid-cols-3 max-md:tall:grid-rows-4 narrow:grid-cols-3 narrow:grid-rows-4 grid w-full grid-cols-5 grid-rows-3 gap-1 md:grid-cols-3 md:grid-rows-4">
      {Array.from({ length: 9 }, (_, i) => {
        const digit = i + 1;
        const isLongActive = longPressDigit === digit;
        return (
          <button
            key={digit}
            className={
              'bg-surface border-border relative flex h-12 touch-none items-center justify-center rounded-md border p-1 outline-none' +
              (isLongActive ? ' ring-accent ring-2' : '') +
              (isPencilCenterMode || isPencilCornerMode ? ' text-base' : ' font-medium') +
              (isPencilCornerMode && isLeftCol(i) ? ' justify-start' : '') +
              (isPencilCornerMode && isRightCol(i) ? ' justify-end' : '') +
              (isPencilCornerMode && isTopRow(i) ? ' items-start' : '') +
              (isPencilCornerMode && isBottomRow(i) ? ' items-end' : '')
            }
            onPointerDown={() => {
              startPress(digit);
            }}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              if (suppressClick.current) {
                suppressClick.current = false;
                return;
              }
              if (longPressDigit !== null) {
                onClearLongPress();
                return;
              }
              if (isPencilCornerMode) onCornerMark(digit);
              else if (isPencilCenterMode) onCenterMark(digit);
              else onDigit(digit);
            }}>
            {isLongActive && (
              <span className="bg-accent absolute top-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full" />
            )}
            {digit}
          </button>
        );
      })}
      <button
        className="bg-surface border-border max-md:tall:col-3 max-md:tall:row-4 narrow:col-3 narrow:row-4 flex h-12 items-center justify-center rounded-md border outline-none md:col-3 md:row-4"
        title="Erase"
        onClick={() => {
          if (longPressDigit !== null) {
            onClearLongPress();
            return;
          }
          onErase();
        }}>
        <Eraser className="h-6 w-6" />
      </button>
      <div className="max-md:tall:col-span-2 narrow:col-span-2 col-span-5 flex w-full flex-row gap-1 md:col-span-2">
        <button
          className={
            'border-border flex h-12 w-full items-end justify-end rounded-md border p-1 outline-none' +
            (isPencilCenterMode ? ' bg-accent text-white' : ' bg-surface')
          }
          title="Center"
          onClick={() => {
            if (longPressDigit !== null) {
              onClearLongPress();
              return;
            }
            setIsPencilCenterMode((prev: boolean) => !prev);
            setIsPencilCornerMode(false);
          }}>
          <Pencil className={isPencilCenterMode ? 'h-7 w-7' : 'h-6 w-6'} />
        </button>
        <button
          className={
            'border-border flex h-12 w-full items-end justify-end rounded-md border p-1 outline-none' +
            (isPencilCornerMode ? ' bg-accent text-white' : ' bg-surface')
          }
          title="Corner"
          onClick={() => {
            if (longPressDigit !== null) {
              onClearLongPress();
              return;
            }
            setIsPencilCornerMode((prev: boolean) => !prev);
            setIsPencilCenterMode(false);
          }}>
          <Pencil className={isPencilCornerMode ? 'h-7 w-7' : 'h-6 w-6'} />
        </button>
      </div>
    </div>
  );
}

export default NumPad;
