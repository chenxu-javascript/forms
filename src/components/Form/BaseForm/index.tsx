import React, { Fragment } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { IProps } from "./interface";
import classnames from "classnames";
import FormItems from "./../index";
import styles from "./index.less";

const BaseForm: React.FC<IProps> = props => {
  const { errors, control } = useFormContext();
  const {
    rules,
    label,
    value,
    input_type,
    name = "",
    className = "",
    disabled = false,
    show_required = true,
    extend_text = "",
    is_required = 2,
    ...otherparams
  } = props;

  const params = {
    ...otherparams,
    value,
    defaultValue: value,
    disabled
  };

  const FormItem = FormItems[input_type];
  if (!FormItem) {
    console.log(`${input_type} 当前组件不支持`);
    return null;
  }

  return (
    <div className="hooks-row hooks-form-item" key={name || new Date().getTime()}>
      {!!label && (
        <div className="hooks-col hooks-form-item-label">
          <label htmlFor={name}>
            {show_required && (rules?.required || is_required === 1) && (
              <span className={styles.required}>*</span>
            )}
            {label}
          </label>
        </div>
      )}
      <div className="hooks-col hooks-form-item-wrapper">
        <Controller
          as={<FormItem {...params} />}
          defaultValue={value}
          control={control}
          rules={rules}
          name={name}
        />
        <div className={styles.error}> {errors[name] && errors[name]?.["message"]}</div>
      </div>
    </div>
  );
};

export default BaseForm;
