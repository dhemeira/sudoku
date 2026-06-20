import Cell from './Cell';
import { Grid as GridType } from '../sudoku/grid';

interface Props {
  grid: GridType;
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
}

function Grid({ grid, selectedIndex, setSelectedIndex }: Props) {
  const selectedCell = selectedIndex !== null ? grid.cells[selectedIndex] : null;
  const onlyOneMark =
    selectedCell !== null && selectedCell.cornerMarks.size + selectedCell.centerMarks.size === 1;

  return (
    <div className="bg-surface mx-auto grid aspect-square h-fit w-fit grid-cols-9 grid-rows-9 text-lg sm:text-xl md:mr-0 md:ml-auto lg:text-2xl">
      {grid.cells.map((cell, index) => (
        <Cell
          key={cell.uid}
          cell={cell}
          selected={selectedIndex === index}
          highlighted={
            selectedIndex !== null &&
            (grid.peers(selectedIndex).some((peer) => peer.uid === cell.uid) ||
              selectedIndex === index)
          }
          selectedValue={selectedCell !== null ? selectedCell.value : undefined}
          sameNumber={
            selectedCell !== null &&
            cell.value !== 0 &&
            (cell.value === selectedCell.value ||
              (selectedCell.value === 0 &&
                onlyOneMark &&
                (selectedCell.cornerMarks.has(cell.value) ||
                  selectedCell.centerMarks.has(cell.value))))
          }
          onClick={() => {
            setSelectedIndex(index);
          }}
        />
      ))}
    </div>
  );
}

export default Grid;
