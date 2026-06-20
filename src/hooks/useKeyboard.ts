import { useEffect, useRef } from 'react';

const ARROW_DELTA: Partial<Record<string, number>> = {
  ArrowUp: -9,
  w: -9,
  ArrowDown: 9,
  s: 9,
  ArrowLeft: -1,
  a: -1,
  ArrowRight: 1,
  d: 1,
};

function getDigit(e: KeyboardEvent): number | null {
  const code = e.code;
  if (code.startsWith('Digit') || code.startsWith('Numpad')) {
    const n = parseInt(code.replace('Digit', '').replace('Numpad', ''));
    if (!isNaN(n) && n >= 1 && n <= 9) return n;
  }
  return null;
}

export function useKeyboard({
  selectedIndex,
  setSelectedIndex,
  onDigit,
  onErase,
  onCornerMark,
  onCenterMark,
}: {
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  onDigit: (digit: number) => void;
  onErase: () => void;
  onCornerMark: (digit: number) => void;
  onCenterMark: (digit: number) => void;
}) {
  const shiftHeld = useRef(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') shiftHeld.current = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') shiftHeld.current = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      const digit = getDigit(e);
      if (digit !== null) {
        e.preventDefault();
        // With NumLock on, Windows consumes Shift before the browser sees keydown,
        // so detect it via e.key not matching the digit (e.g. Numpad1 → 'End').
        // Without NumLock, numpad keys already produce navigation e.key values, so skip this check.
        const numLockOn = e.getModifierState('NumLock');
        const isShifted =
          shiftHeld.current ||
          (numLockOn && e.code.startsWith('Numpad') && e.key !== String(digit));
        if (isShifted) onCornerMark(digit);
        else if (e.ctrlKey) onCenterMark(digit);
        else onDigit(digit);
        return;
      }

      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0' || e.code === 'Numpad0') {
        e.preventDefault();
        onErase();
        return;
      }

      const delta = ARROW_DELTA[e.key];
      if (delta !== undefined) {
        e.preventDefault();
        const next = selectedIndex + delta;
        if (next >= 0 && next < 81) setSelectedIndex(next);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, setSelectedIndex, onDigit, onErase, onCornerMark, onCenterMark]);
}
