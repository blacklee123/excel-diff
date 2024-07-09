const daff = require("daff");

export const diff = (left: [][], right: [][]) => {
  const tableLeft = new daff.TableView(left);
  const tableRight = new daff.TableView(right);

  tableLeft.trim();
  tableRight.trim();

  const ct = daff.compareTables(tableLeft, tableRight);

  const align = ct.align();
  const output = new daff.TableView([]);
  const flags = new daff.CompareFlags();
  flags.show_unchanged = false;
  flags.always_show_header = true;
  flags.always_show_order = true;
  flags.never_show_order = false;
  flags.unchanged_context = true;

  const td = new daff.TableDiff(align, flags);
  td.hilite(output);

  if (output.height !== 0) {
    return output.data;
  }
  return [];
};
