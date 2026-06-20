import SectionCard from '~/components/ui/SectionCard';
import Controls from './Controls';
import Grid from './Grid';
import { Plus, RotateCcw } from 'lucide-react';
import { Grid as GridType } from '~/sudoku/grid';
import { Cell } from '~/sudoku/cell';
import { useState } from 'react';
import { useKeyboard } from '~/hooks/useKeyboard';
import { useModifierKeys } from '~/hooks/useModifierKeys';

function Board() {
  const [grid, setGrid] = useState(() => GridType.random());

  function mutateCell(index: number, fn: (cell: Cell) => void) {
    const next = grid.clone();
    fn(next.cells[index]);
    setGrid(next);
  }

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPencilCornerMode, setIsPencilCornerMode] = useState(false);
  const [isPencilCenterMode, setIsPencilCenterMode] = useState(false);
  const [longPressDigit, setLongPressDigit] = useState<number | null>(null);
  useModifierKeys({ setIsPencilCornerMode, setIsPencilCenterMode });

  function handleLongPressDigit(digit: number) {
    setLongPressDigit((prev) => {
      if (prev === digit) return null;
      setIsPencilCornerMode(false);
      setIsPencilCenterMode(false);
      return digit;
    });
  }

  function handleCellClick(index: number) {
    setSelectedIndex(index);
    if (longPressDigit !== null) {
      const current = grid.cells[index].value;
      mutateCell(index, (cell) => {
        cell.value = current === longPressDigit ? 0 : longPressDigit;
      });
    }
  }

  function enterDigit(digit: number) {
    if (selectedIndex === null) return;
    const current = grid.cells[selectedIndex].value;
    mutateCell(selectedIndex, (cell) => {
      cell.value = current === digit ? 0 : digit;
    });
  }

  function eraseSelected() {
    if (selectedIndex === null) return;
    const cell = grid.cells[selectedIndex];
    if (cell.value !== 0) {
      mutateCell(selectedIndex, (c) => {
        c.value = 0;
      });
    } else if (cell.centerMarks.size > 0) {
      mutateCell(selectedIndex, (c) => {
        c.centerMarks.clear();
      });
    } else if (cell.cornerMarks.size > 0) {
      mutateCell(selectedIndex, (c) => {
        c.cornerMarks.clear();
      });
    }
  }

  function cornerMarkSelected(digit: number) {
    if (selectedIndex !== null)
      mutateCell(selectedIndex, (cell) => {
        cell.toggleCornerMark(digit);
      });
  }

  function centerMarkSelected(digit: number) {
    if (selectedIndex !== null)
      mutateCell(selectedIndex, (cell) => {
        cell.toggleCenterMark(digit);
      });
  }

  useKeyboard({
    selectedIndex,
    setSelectedIndex,
    onDigit: enterDigit,
    onErase: eraseSelected,
    onCornerMark: cornerMarkSelected,
    onCenterMark: centerMarkSelected,
  });

  return (
    <SectionCard className="text-text grid-auto-rows md:grid-rows-max grid w-full flex-1 auto-rows-min grid-cols-1 items-center gap-2 px-2 py-4 md:auto-rows-auto md:grid-cols-2 md:gap-4 md:p-4 lg:gap-x-8">
      <div className="flex h-fit w-full flex-row items-start justify-end gap-1 self-start md:col-span-2">
        <button
          className="bg-surface border-border flex h-12 w-16 flex-col items-center justify-center gap-0.5 rounded-2xl border p-1 outline-none md:h-16 md:w-24"
          title="New Game">
          <Plus />
          <span className="hidden text-xs md:inline">New Game</span>
        </button>
        <button
          className="bg-surface border-border flex h-12 w-16 flex-col items-center justify-center gap-0.5 rounded-2xl border p-1 outline-none md:h-16 md:w-24"
          title="Reset">
          <RotateCcw />
          <span className="hidden text-xs md:inline">Reset</span>
        </button>
      </div>
      <Grid grid={grid} selectedIndex={selectedIndex} onCellClick={handleCellClick} />
      <Controls
        setIsPencilCornerMode={setIsPencilCornerMode}
        setIsPencilCenterMode={setIsPencilCenterMode}
        isPencilCornerMode={isPencilCornerMode}
        isPencilCenterMode={isPencilCenterMode}
        longPressDigit={longPressDigit}
        onDigit={enterDigit}
        onCornerMark={cornerMarkSelected}
        onCenterMark={centerMarkSelected}
        onErase={eraseSelected}
        onLongPressDigit={handleLongPressDigit}
        onClearLongPress={() => {
          setLongPressDigit(null);
        }}
      />
    </SectionCard>
  );
}

export default Board;
