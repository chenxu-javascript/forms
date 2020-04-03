import React, { useState, useEffect, useMemo } from "react";
import { isArray } from "@utils/util";
import { Select } from "antd";
import { IProps } from "./interface";

const { Option } = Select;
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
      const all_option = { [value_key]: "", [label_key]: "全部" };
      if (show_all) {
        setOptions([all_option, ...options]);
      } else {
        setOptions(options);
      }
    }
  }, [label_key, options, show_all, value_key]);

  // 渲染空数据
  const renderEmpty = () => {
    if (mode === "default") {
      const has_empty_value = !new_options.find(l => l.id === value);
      return has_empty_value && <Option value={value}>=={value}==无对应选项==</Option>;
    } else if (mode === "multiple") {
      let options_empty_array: any[] = [];
      value?.forEach((element: any) => {
        const has_value = new_options.find(l => l[value_key] === element);
        !has_value && options_empty_array.push(element);
      });
      return (
        <>
          {options_empty_array?.map((k: any) => {
            return <Option value={k}>=={k}==无对应选项==</Option>;
          })}
        </>
      );
    }
    return null;
  };

  const props_data = {
    mode,
    value,
    placeholder,
    showSearch: true,
    defaultValue: value,
    disabled: !!disabled,
    style: { width: "100%", ...style },
    filterOption: (v: any, { props = {} }) => {
      const text = props[label_key] || "";
      v = v ? v.replace(/(^\s*)|(\s*$)/g, "") : null;
      return !v || `${text}`.toLowerCase().indexOf(`${v}`.toLowerCase()) !== -1;
    }
  };

  if (!isArray(new_options)) {
    return <Select {...props_data} {...otherParams} defaultValue={undefined} />;
  }

  return (
    <Select {...props_data} {...otherParams} placeholder={placeholder}>
      {new_options.map((item, index) => {
        return (
          <Option
            {...item}
            value={`${item[value_key]}`}
            label={item[label_key]}
            disabled={!!disabled || !!item.disabled}
            key={`${item[value_key]}-${index}`}
          >
            {item[label_key]}
          </Option>
        );
      })}
      {show_empty && renderEmpty()}
    </Select>
  );
};
export default SelectCompanent;
