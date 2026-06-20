import { Cell as CellType } from '../sudoku/cell';
import { CornerMarks, CenterMarks } from './CellMarks';

interface Props {
  cell: CellType;
  selected?: boolean;
  highlighted?: boolean;
  selectedValue?: number;
  sameNumber?: boolean;
  onClick?: () => void;
}

function Cell({ cell, selected, highlighted, selectedValue, sameNumber, onClick }: Props) {
  const top =
    ' border-t' +
    (cell.row % 3 === 0 ? ' border-t-text' + (cell.row === 0 ? ' border-t-2' : '') : '');
  const left =
    ' border-l' +
    (cell.col % 3 === 0 ? ' border-l-text' + (cell.col === 0 ? ' border-l-2' : '') : '');
  const right =
    cell.col % 3 === 2 ? ' border-r border-r-text' + (cell.col === 8 ? ' border-r-2' : '') : '';
  const bottom =
    cell.row % 3 === 2 ? ' border-b border-b-text' + (cell.row === 8 ? ' border-b-2' : '') : '';

  const inset = {
    top: cell.row % 3 === 0 ? (cell.row === 0 ? 0 : 1) : 1,
    left: cell.col % 3 === 0 ? (cell.col === 0 ? 0 : 1) : 1,
    right: cell.col % 3 === 2 ? (cell.col === 8 ? 0 : 1) : 2,
    bottom: cell.row % 3 === 2 ? (cell.row === 8 ? 0 : 1) : 2,
  };

  return (
    <button
      className={
        'border-text-muted/50 relative flex aspect-square w-13 max-w-full items-center justify-center font-medium text-blue-700 outline-none md:w-16' +
        top +
        left +
        right +
        bottom +
        (selected ? ' bg-accent/75' : '') +
        (highlighted ? ' bg-accent/15' : '') +
        (sameNumber ? ' bg-accent/45' : '')
      }
      onClick={onClick}>
      {cell.value !== 0 ? (
        <span className={cell.isGiven ? 'text-text' : ''}>{cell.value}</span>
      ) : (
        <>
          <div
            className="absolute"
            style={{ top: inset.top, left: inset.left, right: inset.right, bottom: inset.bottom }}>
            <CornerMarks marks={cell.cornerMarks} selectedValue={selectedValue} />
          </div>
          <div
            className="absolute"
            style={{ top: inset.top, left: inset.left, right: inset.right, bottom: inset.bottom }}>
            <CenterMarks marks={cell.centerMarks} selectedValue={selectedValue} />
          </div>
        </>
      )}
    </button>
  );
}

export default Cell;
