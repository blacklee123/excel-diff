import Handsontable from "handsontable";

class Cell {
  value: string;
  instance: Handsontable.Core;

  constructor(value: string, instance: Handsontable.Core) {
    this.value = value;
    this.instance = instance;
  }

  getCell(x: number, y: number): any {
    const v = this.instance.getDataAtCell(y, x);
    if (v === null) return v;
    else if (v === undefined) return "";
    return "" + v;
  }

  getValue() {
    return this.value;
  }
}

export default Cell;
