import React from "react";
import { Input } from "antd";
import { IProps } from "./interface";
const InputCompanent: React.FC<IProps> = props => {
  const { value, placeholder = "请输入", style, ...otherParams } = props;
  return (
    <Input
      key={`${props.id}-input`}
      autoComplete="off"
      {...otherParams}
      defaultValue={value}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default InputCompanent;
