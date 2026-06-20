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
    this.isGiven = isGiven ?? false;
    this._value = value ?? 0;
    this.cornerMarks = new Set();
    this.centerMarks = new Set();
  }

  clone(): Cell {
    const c = new Cell(this.row, this.col, this.value, this.isGiven);
    c.cornerMarks = new Set(this.cornerMarks);
    c.centerMarks = new Set(this.centerMarks);
    return c;
  }

  private toggleMark(set: Set<number>, digit: number): Set<number> {
    const next = new Set(set);
    if (next.has(digit)) next.delete(digit);
    else next.add(digit);
    return next;
  }

  toggleCornerMark(digit: number): void {
    if (this.isGiven) return;
    this.cornerMarks = this.toggleMark(this.cornerMarks, digit);
  }

  toggleCenterMark(digit: number): void {
    if (this.isGiven) return;
    this.centerMarks = this.toggleMark(this.centerMarks, digit);
  }
}
