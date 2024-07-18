const daff = require("daff");

export const diff = (left: any[][], right: any[][]) :[any[][], string] => {
  console.table(left);
  console.table(right);
  const tableLeft = new daff.TableView(left);
  const tableRight = new daff.TableView(right);

  tableLeft.trim();
  tableRight.trim();


  const alignment = daff.compareTables(tableLeft, tableRight).align();
  const table_diff = new daff.TableView([]);

  const flags = new daff.CompareFlags();
  flags.show_unchanged = false;
  flags.always_show_header = true;
  flags.always_show_order = true;
  flags.never_show_order = false;
  flags.unchanged_context = 3;

  const highlighter = new daff.TableDiff(alignment, flags);
  highlighter.hilite(table_diff);

  const diff2html = new daff.DiffRender();
  diff2html.render(table_diff);
  const table_diff_html = diff2html.html();
  // console.table(table_diff.data);
  console.table(table_diff_html);
  return [table_diff.data, table_diff_html]
};
