import Handsontable from "handsontable";
import Cell from "../components/Cell";
const daff = require("daff");

export function renderDiff(
  instance: Handsontable.Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: Handsontable.CellValue,
  cellProperties: Handsontable.CellProperties
): void {
  const daffTable = new Cell(value, instance);
  const view = new daff.SimpleView();
  const cellInfo = daff.DiffRender.renderCell(daffTable, view, col, row);
  td.className = cellInfo.category;
  td.innerHTML = cellInfo.pretty_value;
}
