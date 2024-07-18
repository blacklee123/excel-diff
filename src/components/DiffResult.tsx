import React from "react";
import { HotTable } from "@handsontable/react";
import { renderDiff } from "../utils/RenderDiffTable";
import Handsontable from "handsontable/base";

interface DiffResult {
  data: any[][];
}

const DiffResultHooks: React.FC<DiffResult> = ({data}) => {
  const hotDiffResultSettings : Handsontable.GridSettings = {
    // minRows: 10,
    // minCols: 10,
    minSpareCols: 0,
    minSpareRows: 0,
    colHeaders: false,
    contextMenu: false,
    rowHeaders: false,
    readOnly: true,
    renderAllRows: true,
    stretchH: "all",
    licenseKey: "non-commercial-and-evaluation",
  };

  return (
    <>
      <div style={{ fontSize: 24, textAlign: 'center' }}>{"比较结果"}</div>
      <HotTable
        data={data}
        settings={hotDiffResultSettings}
        renderer={renderDiff}
        className="diffhandsontable"
      />
      {/* <div dangerouslySetInnerHTML={{ __html: data[1] }} /> */}
    </>
  );
};

export default DiffResultHooks;
