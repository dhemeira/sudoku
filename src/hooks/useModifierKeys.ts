import { useEffect, useRef } from 'react';

export function useModifierKeys({
  setIsPencilCornerMode,
  setIsPencilCenterMode,
}: {
  setIsPencilCornerMode: (v: boolean) => void;
  setIsPencilCenterMode: (v: boolean) => void;
}) {
  const shiftOffTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ctrlOffTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        if (shiftOffTimer.current) {
          clearTimeout(shiftOffTimer.current);
          shiftOffTimer.current = null;
        }
        setIsPencilCornerMode(true);
        setIsPencilCenterMode(false);
      }
      // On Windows with NumLock on, the OS fires a synthetic Shift keyup before the numpad
      // keydown — cancel the pending deactivation so corner mode stays on during the keypress.
      if (e.code.startsWith('Numpad') && shiftOffTimer.current) {
        clearTimeout(shiftOffTimer.current);
        shiftOffTimer.current = null;
      }
      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        if (ctrlOffTimer.current) {
          clearTimeout(ctrlOffTimer.current);
          ctrlOffTimer.current = null;
        }
        setIsPencilCenterMode(true);
        setIsPencilCornerMode(false);
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight')
        shiftOffTimer.current = setTimeout(() => {
          setIsPencilCornerMode(false);
        }, 50);
      if (e.code === 'ControlLeft' || e.code === 'ControlRight')
        ctrlOffTimer.current = setTimeout(() => {
          setIsPencilCenterMode(false);
        }, 50);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [setIsPencilCornerMode, setIsPencilCenterMode]);
}
