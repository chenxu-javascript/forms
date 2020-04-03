import React, { useState, useEffect, useMemo, useCallback } from "react";
import { isArray } from "@utils/util";
import { Select } from "antd";

const SelectCompanent = props => {
  const {
    name,
    mode,
    style,
    options,
    disabled,
    onChange,
    allowClear,
    has_repeat = false,
    value_key = "id",
    show_all = false,
    label_key = "name",
    placeholder = "请选择",
    onDropdownVisibleChange,
    ...otherParams
  } = props;

  const getNewOptions = useCallback(() => {
    if (mode === "multiple") {
      isArray(value) &&
        value.forEach((o: any) => {
          if (!options.find((l: any) => `${l[value_key]}` === `${o}`)) {
            options.unshift({ [value_key]: o, className: "has_remove", [label_key]: "--已删除--" });
          }
        });
    } else if (value && !options.find(l => `${l[value_key]}` === `${value}`)) {
      options.unshift({
        [value_key]: value,
        className: "has_remove",
        [label_key]: "--已删除--",
        disabled: true
      });
    }
    if (!show_all) return options;
    const all_option = [{ [value_key]: "", [label_key]: "全部" }];
    if (!isArray(options)) return all_option;
    const list = [...all_option, ...options];
    return list;
  }, [label_key, mode, options, show_all, value, value_key]);

  const [new_options, setOptions] = useState(getNewOptions());
  useEffect(() => {
    setOptions(getNewOptions());
  }, [options, options.length, setOptions, getNewOptions]);

  const onInitGetValue = useMemo(() => {
    if (mode === "multiple") {
      return props?.value?.concat() || undefined;
    } else {
      const init_value = show_all ? "" : undefined;
      return props.value ? `${props.value}` : init_value;
    }
  }, [mode, props, show_all]);

  const _value = onInitGetValue;
  const [value, selectedOption] = useState(_value || undefined);

  useEffect(() => {
    const _value = onInitGetValue;
    selectedOption(_value);
  }, [onInitGetValue, props.value]);
  const _check_options = new_options.find(o => `${o[value_key]}` === `${value}`);
  if (has_repeat && value && !_check_options && mode !== "multiple") {
    onChange({
      value: undefined
    });
  }

  const my_props = {
    mode,
    placeholder,
    showSearch: true,
    defaultValue: value,
    value,
    disabled: !!disabled,
    allowClear,
    style: { width: "100%", ...style },
    onDropdownVisibleChange,
    filterOption: (v, { props = {} }) => {
      const text = props["label"] || "";
      v = v ? v.replace(/(^\s*)|(\s*$)/g, "") : null;
      return !v || `${text}`.toLowerCase().indexOf(`${v}`.toLowerCase()) !== -1;
    }
  };

  if (!isArray(new_options)) {
    return <Select {...otherParams} {...my_props} defaultValue={undefined} />;
  }
  console.log(my_props);
  return (
    <Select
      {...otherParams}
      {...my_props}
      placeholder={placeholder}
      onChange={e => {
        console.log(e, onChange);
        onChange(e);
      }}
    >
      {new_options.map((item, index) => {
        return (
          <Select.Option
            {...item}
            value={`${item[value_key]}`}
            label={item[label_key]}
            disabled={!!disabled || !!item.disabled}
            key={`${item[value_key]}-${index}`}
          >
            {item[label_key]}
          </Select.Option>
        );
      })}
    </Select>
  );
};
export default SelectCompanent;
