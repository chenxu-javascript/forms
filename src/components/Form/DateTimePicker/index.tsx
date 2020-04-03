import React from "react";
import DatePicker from "./../DatePicker";
import { IProps } from "./../DatePicker/interface";

const DatetimePicker: React.FC<IProps> = props => {
  return <DatePicker {...props} mode="time" />;
};

export default DatetimePicker;
