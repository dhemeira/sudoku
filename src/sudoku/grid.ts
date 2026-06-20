import { Cell } from './cell';

const ROWS: number[][] = Array.from({ length: 9 }, (_, r) =>
  Array.from({ length: 9 }, (_, c) => r * 9 + c)
);

const COLS: number[][] = Array.from({ length: 9 }, (_, c) =>
  Array.from({ length: 9 }, (_, r) => r * 9 + c)
);

const BOXES: number[][] = Array.from({ length: 9 }, (_, b) => {
  const startRow = Math.floor(b / 3) * 3;
  const startCol = (b % 3) * 3;
  const indices: number[] = [];
  for (let dr = 0; dr < 3; dr++)
    for (let dc = 0; dc < 3; dc++) indices.push((startRow + dr) * 9 + (startCol + dc));
  return indices;
});

const PEERS: Set<number>[] = Array.from({ length: 81 }, (_, i) => {
  const r = Math.floor(i / 9);
  const c = i % 9;
  const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
  const peers = new Set([...ROWS[r], ...COLS[c], ...BOXES[b]]);
  peers.delete(i);
  return peers;
});

export class Grid {
  readonly cells: Cell[];

  private constructor(cells: Cell[]) {
    this.cells = cells;
  }

  static getRow(index: number): number {
    if (index < 0 || index > 80) {
      throw new Error('Row index must be between 0 and 80.');
    }
    return Math.floor(index / 9);
  }

  static getCol(index: number): number {
    if (index < 0 || index > 80) {
      throw new Error('Col index must be between 0 and 80.');
    }
    return index % 9;
  }

  static empty(): Grid {
    return new Grid(
      Array.from(
        { length: 81 },
        (_, index) => new Cell(this.getRow(index), this.getCol(index), 0, false)
      )
    );
  }

  static random(): Grid {
    const cells = Array.from({ length: 81 }, (_, index) => {
      const value = Math.floor(Math.random() * 10);
      return new Cell(this.getRow(index), this.getCol(index), value, value !== 0);
    });
    return new Grid(cells);
  }

  row(r: number): Cell[] {
    return ROWS[r].map((i) => this.cells[i]);
  }
  col(c: number): Cell[] {
    return COLS[c].map((i) => this.cells[i]);
  }
  box(b: number): Cell[] {
    return BOXES[b].map((i) => this.cells[i]);
  }
  peers(i: number): Cell[] {
    return [...PEERS[i]].map((idx) => this.cells[idx]);
  }

  clone(): Grid {
    return new Grid(this.cells.map((c) => c.clone()));
  }
}
