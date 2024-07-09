import React from "react";
import { Input, Select } from "antd";

import { HotTable } from "@handsontable/react";

import type { ExcelDomain } from "../utils/ExcelHelper";

interface Import {
  data: ExcelDomain
  fileRef: React.RefObject<any>;
  onFileSelectChange(e: React.ChangeEvent<HTMLInputElement>): any;
  onSheetSelectChange(value: string): any;
}

const ImportHooks: React.FC<Import> = ({
  data,
  fileRef,
  onFileSelectChange,
  onSheetSelectChange
}) => {
  return (
    <Input.Group compact>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => onFileSelectChange(e)}
        ref={fileRef}
      ></input>
      {
        data.workbook && <Select
          value={data.sheetname}
          options={data.sheets.map((sheet) => ({ value: sheet, label: sheet }))}
          onChange={(value) => onSheetSelectChange(value)}>
        </Select>
      }

    </Input.Group>
  );
};

interface Left {
  data: ExcelDomain;
  fileRef: React.RefObject<any>;
  onFileSelectChange(e: React.ChangeEvent<HTMLInputElement>): any;
  onSheetSelectChange(e: string): any;
}

const LeftHooks: React.FC<Left> = ({
  data,
  fileRef,
  onFileSelectChange,
  onSheetSelectChange
}) => {
  const hotLeftSettings = {
    minRows: 12,
    minCols: 8,
    colHeaders: true,
    rowHeaders: true,
    height: 305,
    licenseKey: "non-commercial-and-evaluation",
  };
  return (
    <>
      <ImportHooks
        data={data}
        fileRef={fileRef}
        onFileSelectChange={onFileSelectChange}
        onSheetSelectChange={onSheetSelectChange}
      />
      <HotTable
        data={data.items}
        settings={hotLeftSettings}
        stretchH={"all"}
      />
    </>
  );
};

export default LeftHooks;
