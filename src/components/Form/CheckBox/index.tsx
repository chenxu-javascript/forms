import React, { useState, useEffect, useMemo } from "react";
import { isArray } from "@utils/util";
import { Checkbox } from "antd";
import { IProps } from "./interface";

const { Group } = Checkbox;
const SelectCompanent: React.FC<IProps> = props => {
  const {
    name,
    style,
    value,
    options,
    disabled,
    mode = "default",
    show_all = false,
    value_key = "id",
    show_empty = false,
    label_key = "name",
    placeholder = "请选择",
    ...otherParams
  } = props;

  const [new_options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    if (isArray(options)) {
      setOptions(options);
    }
  }, [label_key, options, show_all, value_key]);

  // 渲染空数据
  const renderEmpty = () => {
    if (mode === "default") {
      const has_empty_value = !new_options.find(l => l.id === value);
      return has_empty_value && <Checkbox value={value}>=={value}==无对应选项==</Checkbox>;
    } else if (mode === "multiple") {
      let options_empty_array: any[] = [];
      value?.forEach((element: any) => {
        const has_value = new_options.find(l => l[value_key] === element);
        !has_value && options_empty_array.push(element);
      });
      return (
        <>
          {options_empty_array?.map((k: any) => {
            return <Checkbox value={k}>=={k}==无对应选项==</Checkbox>;
          })}
        </>
      );
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
          <Checkbox
            {...item}
            value={`${item[value_key]}`}
            label={item[label_key]}
            disabled={!!disabled || !!item.disabled}
            key={`${item[value_key]}-${index}`}
          >
            {item[label_key]}
          </Checkbox>
        );
      })}
      {show_empty && renderEmpty()}
    </Group>
  );
};
export default SelectCompanent;
