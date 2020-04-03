import React, { useState, useEffect } from "react";
import { Checkbox, Row, Col } from "antd";
import { isArray } from "@utils/util";

interface Iprops {
  row: undefined | number;
  options: any[];
  onChange: () => {};
  setValue: any;
  disabled_all: any;
  disabled_options: any;
  value_key: string;
  label_key: string;
  defaultValue: any[];
  value: any[];
  id: string | number | undefined;
}

const CheckBox = (props: Iprops) => {
  const {
    row,
    options,
    onChange,
    setValue,
    disabled_all,
    disabled_options,
    value_key = "id",
    label_key = "name",
    defaultValue = [],
    ...other
  } = props || {};

  const getValue = (data: any) => {
    return isArray(data) ? data : [data];
  };

  const _value = getValue(props.value);
  const [value, selectedOption] = useState(_value || []);

  useEffect(() => {
    const _value = getValue(props.value);
    selectedOption(_value);
  }, [props.value, props.value?.length, selectedOption]);

  const new_disabled_options = isArray(disabled_options) ? disabled_options : [];
  if (!isArray(options)) {
    return <Checkbox.Group {...other} />;
  }

  const renderRow = (data: {} | null | undefined, key: string | number | undefined) => {
    if (!row) {
      return;
    }
    return (
      <Row key={key}>
        <Col span={24 / row}>{data}</Col>
      </Row>
    );
  };
  return (
    <Checkbox.Group
      key={`${props.id}-checkbox`}
      className="mb20"
      {...other}
      defaultValue={isArray(defaultValue) ? defaultValue : [defaultValue]}
      value={value}
      onChange={onChange}
    >
      {options.map((item: { [x: string]: string; disabled?: any }, index: any) => {
        const { tip } = item || {};
        const value = item[value_key] || "";
        const name = item[label_key] || "";
        const disabled =
          disabled_all ||
          isArray(
            new_disabled_options.filter((itemChildren: any) => `${value}` === `${itemChildren}`)
          );
        const children = (
          <Checkbox key={`${value}-${index}`} value={value} disabled={item.disabled || disabled}>
            {name}
          </Checkbox>
        );
        if (row) {
          return renderRow(children, `${value}-${index}`);
        } else {
          return children;
        }
      })}
    </Checkbox.Group>
  );
};

export default CheckBox;
