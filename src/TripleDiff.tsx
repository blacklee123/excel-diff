import { useState } from "react";
import { Row, Col, Layout } from "antd";
import type { RcFile } from 'antd/es/upload/interface';

import * as XLSX from "xlsx";

import { convertFileToExcel, getSheet, SampleDataParent, SampleDataLeft, SampleDataRight, BlankData } from "./utils/ExcelHelper";
import type { ExcelDomain } from "./utils/ExcelHelper";

import { diff3 } from "./utils/Diff";
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

function App() {

  const [parentDomain, setParentDomain] = useState<ExcelDomain>(initialData);
  const [localDomain, setLocalDomain] = useState<ExcelDomain>(initialData);
  const [remoteDomain, setRemoteDomain] = useState<ExcelDomain>(initialData);

  const [diffData, setDiffData] = useState<[any[][], string]>([[], '']);

  const fileHandler = (file: RcFile | null, field: TableEnum) => {
    if (file === null) {
      switch (field) {
        case TableEnum.local:
          setLocalDomain(initialData)
          break;
        case TableEnum.remote:
          setRemoteDomain(initialData)
          break;
        case TableEnum.parent:
          setParentDomain(initialData)
          break;
      }
    } else {
      convertFileToExcel(file).then((resp) => {
        switch (field) {
          case TableEnum.local:
            setLocalDomain(resp)
            break;
          case TableEnum.remote:
            setRemoteDomain(resp)
            break;
          case TableEnum.parent:
            setParentDomain(resp)
            break;
        }
      });
    }
  };

  const onSheetFieldChange = (selectedSheetName: string, field: string) => {
    let wb: XLSX.WorkBook | undefined
    switch (field) {
      case TableEnum.local:
        wb = localDomain.workbook
        break;
      case TableEnum.remote:
        wb = remoteDomain.workbook
        break;
      case TableEnum.parent:
        wb = parentDomain.workbook
        break;
    }

    if (wb) {
      getSheet(wb, selectedSheetName).then((resp) => {
        switch (field) {
          case TableEnum.local:
            setLocalDomain({ ...localDomain, sheetname: selectedSheetName, items: resp })
            break;
          case TableEnum.remote:
            setRemoteDomain({ ...remoteDomain, sheetname: selectedSheetName, items: resp })
            break;
          case TableEnum.parent:
            setParentDomain({ ...parentDomain, sheetname: selectedSheetName, items: resp })
            break;
        }
      }
      );
    }
  };

  const onRset = () => {
    setParentDomain(initialData)
    setLocalDomain(initialData)
    setRemoteDomain(initialData)
    setDiffData([[], '']);
  }

  const onDiff = () => {
    setDiffData(diff3(parentDomain.items, localDomain.items, remoteDomain.items))
  }

  const onSample = () => {
    setParentDomain({ ...parentDomain, items: SampleDataParent })
    setLocalDomain({ ...localDomain, items: SampleDataLeft })
    setRemoteDomain({ ...remoteDomain, items: SampleDataRight })
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content>
        <Row gutter={[24, 24]} style={{ padding: '4px' }}>
          <Col span={8}>
            <LeftHooks
              title="Parent: "
              data={parentDomain}
              onFileSelectChange={(e) => fileHandler(e, TableEnum.parent)}
              onSheetSelectChange={(e) => onSheetFieldChange(e, TableEnum.parent)}
            />
          </Col>
          <Col span={8}>
            <LeftHooks
              title="Local: "
              data={localDomain}
              onFileSelectChange={(e) => fileHandler(e, TableEnum.local)}
              onSheetSelectChange={(e) => onSheetFieldChange(e, TableEnum.local)}
            />
          </Col>
          <Col span={8}>
            <LeftHooks
              title="Remote: "
              data={remoteDomain}
              onFileSelectChange={(e) => fileHandler(e, TableEnum.remote)}
              onSheetSelectChange={(value) => onSheetFieldChange(value, TableEnum.remote)}
            />
          </Col>
          <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CenterHooks onDiff={onDiff} onSample={onSample} onReset={onRset} />
          </Col>
          {
            diffData[0].length > 0 && <Col span={24}>
              <DiffResultHooks data={diffData[0]} />
            </Col>
          }
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default App;
