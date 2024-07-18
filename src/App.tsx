import { Tabs, Layout } from "antd";

import DoubleDiff from "./DoubleDiff";
import TripleDiff from "./TripleDiff";

import "./App.css";


function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content>
        <Tabs centered type="card">
          <Tabs.TabPane tab="Double Diff" key="1" >
            <DoubleDiff />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Triple Diff" key="2" >
            <TripleDiff />
          </Tabs.TabPane>
        </Tabs>
      </Layout.Content>
    </Layout>
  );
}

export default App;
