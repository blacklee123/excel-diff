import React from "react";
import { HotTable } from "@handsontable/react";
import { renderDiff } from "../utils/RenderDiffTable";
import Handsontable from "handsontable";

interface DiffResult {
  data: any[][] | Handsontable.RowObject[];
}

const DiffResultHooks: React.FC<DiffResult> = ({data}) => {
  const hotDiffResultSettings = {
    minRows: 10,
    minCols: 10,
    minSpareCols: 0,
    minSpareRows: 0,
    colHeaders: false,
    contextMenu: false,
    rowHeaders: false,
    readOnly: true,
    renderAllRows: true,
    licenseKey: "non-commercial-and-evaluation",
  };

  return (
    <>
      <span style={{ fontSize: 24 }}>{"比较结果"}</span>
      <HotTable
        data={data}
        settings={hotDiffResultSettings}
        renderer={renderDiff}
        className="diffhandsontable"
        stretchH={"all"}
      />
    </>
  );
};

export default DiffResultHooks;
