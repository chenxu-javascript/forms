import React, { useState, useEffect } from "react";
import { Radio as AntdRadio } from "antd";
import { isArray } from "@utils/util";

const Radio = props => {
  const {
    options,
    onChange,
    setValue,
    disabled_all,
    disabled_options,
    value_key = "id",
    label_key = "name",
    placeholder = "请选择",
    ...other
  } = props || {};

  const [value, selectedOption] = useState(props.value || "");

  useEffect(() => {
    selectedOption(props.value);
  }, [props.value]);

  const new_disabled_options = isArray(disabled_options) ? disabled_options : [];
  if (!isArray(options)) {
    return <AntdRadio.Group {...other} placeholder={placeholder} />;
  }

  return (
    <AntdRadio.Group
      {...other}
      value={`${value}`}
      onChange={onChange}
      defaultValue={`${value}`}
      placeholder={placeholder}
    >
      {options.map((item, index) => {
        const { tip } = item || {};
        const value = item[value_key] || "";
        const name = item[label_key] || "";
        const disabled =
          item.disabled ||
          disabled_all ||
          isArray(new_disabled_options.filter(itemChildren => `${value}` === `${itemChildren}`));
        return (
          <AntdRadio key={`${value}-${index}`} value={`${value}`} disabled={disabled}>
            {name}
          </AntdRadio>
        );
      })}
    </AntdRadio.Group>
  );
};

export default Radio;
