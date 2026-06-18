import Cell from './Cell';
import SectionCard from './ui/SectionCard';

function Grid() {
  return (
    <SectionCard className="grid aspect-square w-auto grid-cols-9 grid-rows-9 p-4">
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => <Cell key={r * 9 + c} row={r} col={c} />)
      )}
    </SectionCard>
  );
}

export default Grid;
