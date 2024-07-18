import * as XLSX from "xlsx";
import type { WorkBook } from "xlsx";
import type { RcFile, UploadFile } from "antd/lib/upload";

export interface ExcelDomain {
  sheetname: string;
  items: any[][];
  sheets: string[];
  workbook: XLSX.WorkBook | undefined;
  fileList: UploadFile[]
}

export const convertFileToExcel = (file: RcFile): Promise<ExcelDomain> => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      /* Parse data */
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];

      const data: ExcelDomain = {
        sheetname: wb.SheetNames[0],
        items: XLSX.utils.sheet_to_json(ws, { header: 1 }),
        sheets: wb.SheetNames,
        workbook: wb,
        fileList: [file as UploadFile ]
      };

      resolve(data);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const getSheet = (wb: WorkBook, sheetname: string): Promise<any[]> => {
  return new Promise(function (resolve, reject) {
    var ws = wb.Sheets[sheetname];
    /* Convert array of arrays */
    var items = XLSX.utils.sheet_to_json(ws, { header: 1 });
    resolve(items);
  });
};

export const BlankData = (row: number, col: number): string[][] => {
  return new Array(row).fill("").map(() => new Array(col).fill(""));
};

export const SampleDataParent  = [
  ["Date", "High", "Low", "Close", "Volume", "ask", "cash"],
  [
    "2019-07-08 00:00:00",
    "11546.33",
    "11469.53",
    "11506.43",
    "10.77073088",
    "0",
    "100000000",
  ],
  [
    "2019-07-07 19:00:00",
    "11610.0",
    "11432.32",
    "11547.98",
    "67.915214697",
    "0",
    "100000000",
  ],
  [
    "2019-07-07 18:00:00",
    "11525.0",
    "11426.74",
    "11470.47",
    "31.1094771869",
    "0",
    "100000000",
  ],
  [
    "2019-07-07 16:00:00",
    "11254.97",
    "11135.01",
    "11201.6",
    "23.5194946648",
    "0",
    "100000000",
  ],
  [
    "2019-07-07 15:00:00",
    "11408.02",
    "11189.0",
    "11254.97",
    "64.0821938629",
    "0",
    "100000000",
  ],
];

export const SampleDataLeft  = [
    ["Date", "High", "Low", "Close", "Volume", "ask", "cash"],
    [
      "2019-07-08 00:00:00",
      "11540.33",
      "11469.53",
      "11506.43",
      "10.77073088",
      "0",
      "100000000",
    ],
    [
      "2019-07-07 19:00:00",
      "11610.0",
      "11432.32",
      "11547.98",
      "67.915214697",
      "0",
      "100000000",
    ],
    [
      "2019-07-07 18:00:00",
      "11525.0",
      "11426.74",
      "11470.47",
      "31.1094771869",
      "0",
      "100000000",
    ],
    [
      "2019-07-07 16:00:00",
      "11254.97",
      "11135.01",
      "11201.6",
      "23.5194946648",
      "0",
      "100000000",
    ],
    [
      "2019-07-07 15:00:00",
      "11408.02",
      "11189.0",
      "11254.97",
      "64.0821938629",
      "0",
      "100000000",
    ],
  ];

export const SampleDataRight = [
    ["Date", "High", "Low", "Close", "Volume", "bid", "ask", "Buy"],
    [
      "2019-07-08 00:00:00",
      "11549.33",
      "11469.53",
      "11506.43",
      "10.77073088",
      "0",
      "100000000",
    ],
    [
      "2019-07-07 23:00:00",
      "11482.72",
      "11423.0",
      "11475.07",
      "32.99655899",
      "6",
      "0",
      "3",
    ],
    [
      "2019-07-07 19:00:00",
      "11610.0",
      "11432.32",
      "11547.98",
      "67.915214697",
      "6",
      "0",
      "9",
    ],
    [
      "2019-07-07 18:10:00",
      "11525.0",
      "11426.74",
      "11470.47",
      "31.1094771869",
      "6",
      "0",
      "9",
    ],
    [
      "2019-07-07 17:20:00",
      "11566.23",
      "11211.56",
      "11503.4",
      "121.5246740453",

      "0",
      "9",
    ],
    [
      "2019-07-07 16:00:00",
      "11254.97",
      "11135.01",
      "11200.6",
      "23.5194946648",
      "6",
      "0",
      "9",
    ],
    [
      "2019-07-07 15:00:00",
      "11408.02",
      "11189.0",
      "11254.97",
      "64.0821938629",
      "6",
      "1",
      "9",
    ],
  ]