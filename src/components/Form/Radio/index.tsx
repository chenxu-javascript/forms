import React, { useState, useEffect, useMemo } from "react";
import { isArray } from "@utils/util";
import { Radio } from "antd";
import { IProps } from "./interface";

const { Group } = Radio;
const SelectCompanent: React.FC<IProps> = props => {
  const {
    name,
    style,
    value,
    options,
    disabled,
    mode = "default",
    value_key = "id",
    show_empty = false,
    label_key = "name",
    ...otherParams
  } = props;

  const [new_options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    if (isArray(options)) {
      setOptions(options);
    }
  }, [label_key, options, value_key]);

  // 渲染空数据
  const renderEmpty = () => {
    if (mode === "default") {
      const has_empty_value = !new_options.find(l => l.id === value);
      return has_empty_value && <Radio value={value}>=={value}==无对应选项==</Radio>;
    }
    return null;
  };

  const props_data = {
    mode,
    value,
    defaultValue: value,
    disabled: !!disabled,
    style: { width: "100%", ...style }
  };

  if (!isArray(new_options)) {
    return <Group {...props_data} {...otherParams} />;
  }

  return (
    <Group {...props_data} {...otherParams}>
      {new_options.map((item, index) => {
        return (
          <Radio
            {...item}
            value={`${item[value_key]}`}
            label={item[label_key]}
            disabled={!!disabled || !!item.disabled}
            key={`${item[value_key]}-${index}`}
          >
            {item[label_key]}
          </Radio>
        );
      })}
      {show_empty && renderEmpty()}
    </Group>
  );
};
export default SelectCompanent;
