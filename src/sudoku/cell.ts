export class Cell {
  private _value = 0;
  uid: string;
  row: number;
  col: number;
  cornerMarks: Set<number>;
  centerMarks: Set<number>;
  isGiven: boolean;

  get value(): number {
    return this._value;
  }

  set value(digit: number) {
    if (digit < 0 || digit > 9) throw new Error('Cell value must be between 0 and 9.');
    if (!this.isGiven) this._value = digit;
  }

  constructor(row: number, col: number, value?: number, isGiven?: boolean) {
    this.uid = crypto.randomUUID();
    this.row = row;
    this.col = col;
    if (value && (value < 0 || value > 9)) {
      throw new Error('Cell value must be between 0 and 9.');
    }
    this.value = value ?? 0;
    this.cornerMarks = new Set();
    this.centerMarks = new Set();
    this.isGiven = isGiven ?? false;
  }

  clone(): Cell {
    const c = new Cell(this.row, this.col, this.value, this.isGiven);
    c.cornerMarks = new Set(this.cornerMarks);
    c.centerMarks = new Set(this.centerMarks);
    return c;
  }

  toggleCornerMark(digit: number): void {
    const next = new Set(this.cornerMarks);
    if (next.has(digit)) {
      next.delete(digit);
    } else {
      next.add(digit);
    }
    this.cornerMarks = next;
  }

  toggleCenterMark(digit: number): void {
    const next = new Set(this.centerMarks);
    if (next.has(digit)) {
      next.delete(digit);
    } else {
      next.add(digit);
    }
    this.centerMarks = next;
  }
}
