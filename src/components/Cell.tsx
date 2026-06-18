interface Props {
  row: number; // 0–8
  col: number; // 0–8
}

function Cell({ row, col }: Props) {
  return (
    <button
      data-row={row}
      data-col={col}
      className="border-border flex aspect-square items-center justify-center border p-1 text-lg">
      {row},{col}
    </button>
  );
}

export default Cell;
