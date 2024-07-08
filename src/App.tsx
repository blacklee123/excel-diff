import React, { useState, useRef } from "react";
import { WorkBook } from "xlsx/types";
import { Row, Col } from "antd";

import { ExcelHelper } from "./utils/ExcelHelper";
import { diff } from "./utils/Diff";
import LeftHooks from "./components/Left";
import CenterHooks from "./components/Center";
import DiffResultHooks from "./components/DiffResult";

import "handsontable/dist/handsontable.full.css";
import "./App.css";

function App() {
  var excelHelper = new ExcelHelper();
  const [leftsheetname, setLeftSheetname] = useState("Sheet1");
  const [leftsheetlist, setLeftSheetlist] = useState<string[]>([]);
  const [leftsheetdata, setLeftSheetData] = useState(JSON.parse(JSON.stringify(ExcelHelper.BlankData(12, 8))));
  const [leftWorkbook, setLeftWorkbook] = useState<WorkBook>();
  const leftFileSelectRef = useRef<any>(null);

  const [rightsheetname, setRightSheetname] = useState("Sheet1");
  const [rightsheetlist, setRightSheetlist] = useState<string[]>([]);
  const [rightsheetdata, setRightSheetData] = useState(JSON.parse(JSON.stringify(ExcelHelper.BlankData(12, 8))));
  const [rightWorkbook, setRightWorkbook] = useState<WorkBook>();
  const rightFileSelectRef = useRef<any>(null);

  const [diffData, setDiffData] = useState<[][]>([[]]);

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    event.persist();
    if (event.target.files) {
      let fileObj = event.target.files[0];

      if (fileObj) {
        excelHelper.convertFileToExcel(fileObj).then((resp) => {
          if (field === "left") {
            setLeftSheetname(resp.sheets[0]);
            setLeftSheetlist(resp.sheets);
            setLeftSheetData(resp.items);
            setLeftWorkbook(resp.workbook);
          } else {
            setRightSheetname(resp.sheets[0]);
            setRightSheetlist(resp.sheets);
            setRightSheetData(resp.items);
            setRightWorkbook(resp.workbook);
          }
        });
      }
    }
  };

  const onSheetFieldChange = (selectedSheetName: string, field: string) => {
    var wb = field === "left" ? leftWorkbook : rightWorkbook;

    if (wb) {
      excelHelper.getSheet(wb, selectedSheetName).then((resp) => {
        if (field === "left") {
          setLeftSheetname(selectedSheetName);
          setLeftSheetData(resp.items);
        } else {
          setRightSheetname(selectedSheetName);
          setRightSheetData(resp.items);
        }
      }
      );
    }
  };

  const onRset = () => {
    leftFileSelectRef.current.value = "";
    rightFileSelectRef.current.value = "";
    setLeftSheetlist([]);
    setRightSheetlist([]);
    setLeftSheetname("Sheet1");
    setRightSheetname("Sheet1");
    setLeftSheetData(JSON.parse(JSON.stringify(ExcelHelper.BlankData(12, 8))));
    setRightSheetData(JSON.parse(JSON.stringify(ExcelHelper.BlankData(12, 8))));
    setDiffData([[]]);
  }

  const onDiff = () => {
    setDiffData(diff(leftsheetdata, rightsheetdata))
  }

  const onSample = () => {
    setLeftSheetData(ExcelHelper.SampleDataLeft);
    setRightSheetData(ExcelHelper.SampleDataRight);
  }

  return (
    <Row gutter={[24, 24]} style={{ padding: "48px" }}>
      <Col span={11}>
        <LeftHooks
          sheetname={leftsheetname}
          sheetlist={leftsheetlist}
          onFileSelectChange={(e) => fileHandler(e, "left")}
          onSheetSelectChange={(e) => onSheetFieldChange(e, "left")}
          sheetdata={leftsheetdata}
          fileRef={leftFileSelectRef}
        />
      </Col>
      <Col span={2}>
        <CenterHooks onDiff={onDiff} onSample={onSample} onReset={onRset}/>
      </Col>
      <Col span={11}>
        <LeftHooks
          sheetname={rightsheetname}
          sheetlist={rightsheetlist}
          onFileSelectChange={(e) => fileHandler(e, "right")}
          onSheetSelectChange={(value) => onSheetFieldChange(value, "right")}
          sheetdata={rightsheetdata}
          fileRef={rightFileSelectRef}
        />
      </Col>
      <Col span={24} style={{ textAlign: "center" }}>
        <DiffResultHooks data={diffData} />
      </Col>
    </Row>
  );
}

export default App;
