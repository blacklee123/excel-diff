import Handsontable from "handsontable";
import Cell from "../components/Cell";
const daff = require("daff");

export function renderDiff(
  instance: any,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: Handsontable.CellValue,
  cellProperties: Handsontable.CellProperties
) {
  const tt = new Cell(value, instance);
  const view = new daff.coopy.SimpleView();
  const cell = daff.coopy.DiffRender.renderCell(tt, view, col, row);
  const className = cell.category;
  const value2 = cell.pretty_value;
  if (className !== "") {
    td.className = className;
  }

  td.innerHTML = value2;
  return value2;
}
