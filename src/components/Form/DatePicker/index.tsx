import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { isObject } from "@/utils/util";
import { IProps } from "./interface";
const format = {
  year: "YYYY",
  month: "YYYY-MM",
  date: "YYYY-MM-DD",
  time: "YYYY-MM-DD HH:mm:ss"
};
const DatePickerComponent: React.FC<IProps> = props => {
  const { placeholder = "请选择", mode = "date", onChange, ...otherparams } = props;
  const { value, defaultValue } = otherparams;
  const [_value, setValue] = useState(value || defaultValue || undefined);
  const handleOnChange = (value: any) => {
    if (mode === "month") {
      value = {
        start_time: value ? `${value.format(format[mode] || "YYYY-MM-DD")}-01` : undefined,
        end_time: value
          ? `${value.format(format[mode] || "YYYY-MM-DD")}-${value.daysInMonth()}`
          : undefined
      };
    } else {
      value = value ? value.format(format[mode] || "YYYY-MM-DD") : undefined;
    }

    setValue(value);
    onChange && onChange(value);
  };
  const new_value = _value
    ? moment(new Date(isObject(value) ? value["start_time"] : value))
    : undefined;
  const all_props = {
    allowClear: false,
    placeholder,
    style: { width: "100%" },
    showTime: mode === "time",
    ...otherparams,
    value: new_value,
    onChange: handleOnChange,
    onPanelChange: handleOnChange,
    format: format[mode] || "YYYY-MM-DD"
  };
  return <DatePicker {...all_props} />;
};

export default DatePickerComponent;
