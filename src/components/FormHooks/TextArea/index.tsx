import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

interface Iprops {
  name: string;
  range?: string;
  value?: any;
  style?: any;
  onChange?: any;
  showCount?: boolean;
  placeholder?: string;
  conutTotal?: number;
}
const _TextArea: React.FC<Iprops> = React.memo(props => {
  const {
    name,
    range,
    value,
    style,
    onChange,
    showCount,
    placeholder,
    conutTotal = 300,
    ...other
  } = props;

  return (
    <div className="uTextArea">
      <TextArea
        {...other}
        rows={3}
        placeholder={placeholder}
        defaultValue={value}
        value={value}
        style={{ width: range ? "" : "100%", ...style }}
        onChange={e => {
          onChange(e);
        }}
      />
      {showCount ? (
        <span className="maxNum">
          {!value ? 0 : value["length"]}/{conutTotal}
        </span>
      ) : (
        ""
      )}
    </div>
  );
});

export default _TextArea;
