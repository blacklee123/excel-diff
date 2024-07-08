import React from "react";
import { Input, Select } from "antd";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";

interface Import {
  sheetname: string;
  sheetlist: string[];
  fileRef: React.RefObject<any>;
  onFileSelectChange(e: React.ChangeEvent<HTMLInputElement>): any;
  onSheetSelectChange(value: string): any;
}

const ImportHooks: React.FC<Import> = ({
  sheetname,
  sheetlist,
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
      <Select
        value={sheetname}
        options={sheetlist.map((sheet) => ({ value: sheet, label: sheet }))}
        onChange={(value) => onSheetSelectChange(value)}>
      </Select>
    </Input.Group>
  );
};

interface Left {
  sheetname: string;
  sheetlist: string[];
  fileRef: React.RefObject<any>;
  sheetdata: any[][] | Handsontable.RowObject[];
  onFileSelectChange(e: React.ChangeEvent<HTMLInputElement>): any;
  onSheetSelectChange(e: string): any;
}

const LeftHooks: React.FC<Left> = ({
  sheetname,
  sheetlist,
  fileRef,
  sheetdata,
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
        sheetname={sheetname}
        sheetlist={sheetlist}
        fileRef={fileRef}
        onFileSelectChange={onFileSelectChange}
        onSheetSelectChange={onSheetSelectChange}
      />
      <HotTable
        data={sheetdata}
        settings={hotLeftSettings}
        stretchH={"all"}
      />
    </>
  );
};

export default LeftHooks;
