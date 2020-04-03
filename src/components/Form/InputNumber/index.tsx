import React from "react";
import { InputNumber } from "antd";
import { IProps } from "./iinterface";
const InputNumberComponent: React.FC<IProps> = props => {
  const { placeholder = "请输入", ...otherparams } = props;
  return <InputNumber {...otherparams} placeholder={placeholder} />;
};

export default InputNumberComponent;
