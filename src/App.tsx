import React, { useState, useRef } from "react";
import { Row, Col } from "antd";

import { convertFileToExcel, getSheet, SampleDataLeft, SampleDataRight, BlankData } from "./utils/ExcelHelper";
import type { ExcelDomain } from "./utils/ExcelHelper";

import { diff } from "./utils/Diff";
import LeftHooks from "./components/Left";
import CenterHooks from "./components/Center";
import DiffResultHooks from "./components/DiffResult";

import "./App.css";


function App() {

  const [leftDomain, setLeftDomain] = useState<ExcelDomain>({
    sheetname: "Sheet1",
    sheets: [],
    items: BlankData(12, 8),
    workbook: undefined,
  });
  const [rightDomain, setRightDomain] = useState<ExcelDomain>({
    sheetname: "Sheet1",
    sheets: [],
    items: BlankData(12, 8),
    workbook: undefined,
  });
  const leftFileSelectRef = useRef<any>(null);
  const rightFileSelectRef = useRef<any>(null);

  const [diffData, setDiffData] = useState<[any[][], string]>([[['']],'']);

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    event.persist();
    if (event.target.files) {
      convertFileToExcel(event.target.files[0]).then((resp) => {
        if (field === "left") {
          setLeftDomain(resp);
        } else {
          setRightDomain(resp);
        }
      });
    }
  };

  const onSheetFieldChange = (selectedSheetName: string, field: string) => {
    var wb = field === "left" ? leftDomain.workbook : rightDomain.workbook;

    if (wb) {
      getSheet(wb, selectedSheetName).then((resp) => {
        if (field === "left") {
          setLeftDomain({ ...leftDomain, sheetname: selectedSheetName, items: resp })
        } else {
          setRightDomain({ ...rightDomain, sheetname: selectedSheetName, items: resp })
        }
      }
      );
    }
  };

  const onRset = () => {
    setLeftDomain({
      sheetname: "Sheet1",
      sheets: [],
      items: BlankData(12, 8),
      workbook: undefined,
    })
    setRightDomain({
      sheetname: "Sheet1",
      sheets: [],
      items: BlankData(12, 8),
      workbook: undefined,
    })
    setDiffData([[['']], '']);
  }

  const onDiff = () => {
    setDiffData(diff(leftDomain.items, rightDomain.items))
  }

  const onSample = () => {
    setLeftDomain({ ...leftDomain, items: SampleDataLeft })
    setRightDomain({ ...rightDomain, items: SampleDataRight })
  }

  return (
    <Row gutter={[24, 24]} style={{ padding: "48px" }}>
      <Col span={11}>
        <LeftHooks
          data={leftDomain}
          fileRef={leftFileSelectRef}
          onFileSelectChange={(e) => fileHandler(e, "left")}
          onSheetSelectChange={(e) => onSheetFieldChange(e, "left")}
        />
      </Col>
      <Col span={2}>
        <CenterHooks onDiff={onDiff} onSample={onSample} onReset={onRset} />
      </Col>
      <Col span={11}>
        <LeftHooks
          data={rightDomain}
          fileRef={rightFileSelectRef}
          onFileSelectChange={(e) => fileHandler(e, "right")}
          onSheetSelectChange={(value) => onSheetFieldChange(value, "right")}
        />
      </Col>
      <Col span={24} style={{ textAlign: "center" }}>
        <DiffResultHooks data={diffData} />
      </Col>
    </Row>
  );
}

export default App;
