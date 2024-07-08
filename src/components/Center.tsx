import React from "react";
import { Button, Space } from "antd";

interface DiffBtn {
  onDiff(): any;
  onSample(): any;
  onReset(): any;
}

const CenterHooks:React.FC<DiffBtn> = ({onDiff, onSample, onReset}) => {
  return (
    <Space direction="vertical">
      <Button onClick={onSample} > {"< Sample >"} </Button>
      <Button ref={React.createRef()} type="primary" onClick={onDiff} > {">> Diff <<"} </Button>
      <Button ref={React.createRef()} type="default" onClick={onReset} > {" << reset >> "} </Button>
    </Space>
  );
};

export default CenterHooks;
