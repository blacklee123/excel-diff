import React from "react";
import { Tabs, Space, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';

import Handsontable from 'handsontable/base';
import { HotTable } from "@handsontable/react";

import type { ExcelDomain } from "../utils/ExcelHelper";

interface Left {
  data: ExcelDomain;
  onFileSelectChange(file: RcFile|null): any;
  onSheetSelectChange(e: string): any;
}

const LeftHooks: React.FC<Left> = ({
  data,
  onFileSelectChange,
  onSheetSelectChange
}) => {
  const hotLeftSettings: Handsontable.GridSettings = {
    minRows: 12,
    minCols: 4,
    colHeaders: true,
    rowHeaders: true,
    height: 305,
    stretchH: "all",
    licenseKey: "non-commercial-and-evaluation",
  };

  const props: UploadProps = {
    fileList: data.fileList,
    maxCount: 1,
    onRemove: file=> {
      onFileSelectChange(null)
    },
    beforeUpload: file => {
      onFileSelectChange(file)
      return false;
    },
    // fileList,
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {/* <Input.Group compact>
        <input ref={fileRef} type="file" accept=".xlsx" onChange={(e) => onFileSelectChange(e)} />
      </Input.Group> */}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <div>
        <HotTable data={data.items} settings={hotLeftSettings} />
        {
          data.workbook && <Tabs
            type="card"
            tabPosition="bottom"
            items={data.sheets.map((sheet) => ({ label: sheet, key: sheet }))}
            activeKey={data.sheetname}
            onChange={(value) => onSheetSelectChange(value)}>
          </Tabs>
        }
      </div>
    </Space>
  );
};

export default LeftHooks;
