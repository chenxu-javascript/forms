import React from "react";
import { Input } from "antd";
const InputCompanent = props => {
  const { value, placeholder = "请输入", range, style, onChange, ...otherParams } = props;
  const handleBlur = e => {
    e.target.value = e.target.value.trim();
    onChange(e);
  };
  return (
    <Input
      key={`${props.id}-input`}
      autoComplete="off"
      onBlur={handleBlur}
      {...otherParams}
      defaultValue={value}
      placeholder={placeholder}
      style={{ width: range ? "" : "100%", ...style }}
    />
  );
};

export default InputCompanent;
