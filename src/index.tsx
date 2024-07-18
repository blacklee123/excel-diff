import React from 'react';
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'

import App from './App';
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css";
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      componentSize="middle"
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
