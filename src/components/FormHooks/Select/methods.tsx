import React from "react";
import { Select } from "antd";
import { isArray } from "@utils/util.js";

const getNewOptions = props => {
  const { options, value_key = "id", label_key = "name", show_all } = props || {};

  if (!show_all) return options;

  const all_option = [{ [value_key]: "", [label_key]: "全部" }];

  if (!isArray(options)) return all_option;

  return [...all_option, ...options];
};

const renderOption = ({ xo, x, props }) => {
  const { value_key = "id", label_key = "name", disabled_all, disabled_options } = props || {};
  const value = xo[value_key] ? `${xo[value_key]}` : "";
  const label = xo[label_key] ? xo[label_key] : "";

  const new_disabled_options = isArray(disabled_options) ? disabled_options : [];
  const disabled = disabled_all
    ? true
    : !!isArray(new_disabled_options.filter(xoxo => `${value}` === `${xoxo}`));

  return (
    <Select.Option {...xo} value={value} label={label} disabled={disabled} key={`${value}-${x}`}>
      {label}
    </Select.Option>
  );
};

const renderGroup = ({ xo, x, props }) => {
  const { is_group = {} } = props || {};
  const { group_value = "id", group_label = "text", group_option = "options" } = is_group || {};

  const value = xo[`${group_value}`] ? xo[`${group_value}`] : "";
  const label = xo[`${group_label}`] ? xo[`${group_label}`] : "";
  const options = xo[`${group_option}`] ? xo[`${group_option}`] : "";

  return (
    <Select.OptGroup label={label} key={`${label}-${x}`}>
      {isArray(options)
        ? options.map((xoxo, xx) =>
            renderOption({
              xo: { ...xoxo, first_parent_value: value },
              x: xx,
              props
            })
          )
        : ""}
    </Select.OptGroup>
  );
};
export { getNewOptions, renderOption, renderGroup };
