import { useState } from "react";
import { Row, Col } from "antd";
import type { RcFile } from 'antd/es/upload/interface';

import { convertFileToExcel, getSheet, SampleDataLeft, SampleDataRight, BlankData } from "./utils/ExcelHelper";
import type { ExcelDomain } from "./utils/ExcelHelper";

import { diff } from "./utils/Diff";
import LeftHooks from "./components/Left";
import CenterHooks from "./components/Center";
import DiffResultHooks from "./components/DiffResult";

import { TableEnum } from './constants'


const initialData: ExcelDomain = {
  sheetname: "Sheet1",
  sheets: [],
  items: BlankData(12, 8),
  workbook: undefined,
  fileList: []
}

function DoubleDiff() {

  const [leftDomain, setLeftDomain] = useState<ExcelDomain>(initialData);
  const [rightDomain, setRightDomain] = useState<ExcelDomain>(initialData);

  const [diffData, setDiffData] = useState<[any[][], string]>([[], '']);

  const fileHandler = (file: RcFile | null, field: TableEnum) => {
    if (file === null) {
      if (field === TableEnum.local) {
        setLeftDomain(initialData)
      } else {
        setRightDomain(initialData)
      }
    } else {
      convertFileToExcel(file).then((resp) => {
        if (field === TableEnum.local) {
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
    setLeftDomain(initialData)
    setRightDomain(initialData)
    setDiffData([[], '']);
  }

  const onDiff = () => {
    setDiffData(diff(leftDomain.items, rightDomain.items))
  }

  const onSample = () => {
    setLeftDomain({ ...leftDomain, items: SampleDataLeft })
    setRightDomain({ ...rightDomain, items: SampleDataRight })
  }

  return (
    <Row gutter={[24, 24]} style={{ padding: '4px' }}>
      <Col span={11}>
        <LeftHooks
          title="Local: "
          data={leftDomain}
          onFileSelectChange={(e) => fileHandler(e, TableEnum.local)}
          onSheetSelectChange={(e) => onSheetFieldChange(e, TableEnum.local)}
        />
      </Col>
      <Col span={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CenterHooks onDiff={onDiff} onSample={onSample} onReset={onRset} />
      </Col>
      <Col span={11}>
        <LeftHooks
          title="Remote: "
          data={rightDomain}
          onFileSelectChange={(e) => fileHandler(e, TableEnum.remote)}
          onSheetSelectChange={(value) => onSheetFieldChange(value, TableEnum.remote)}
        />
      </Col>
      {
        diffData[0].length > 0 && <Col span={24}>
          <DiffResultHooks data={diffData[0]} />
        </Col>
      }
    </Row>
  );
}

export default DoubleDiff;
