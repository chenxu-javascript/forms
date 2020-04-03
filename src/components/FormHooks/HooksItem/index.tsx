import React, { Fragment } from "react";
import * as FormItems from "@/components/FormHooks";
import styles from "./index.less";
import classnames from "classnames";
import { Tooltip } from "antd";
import { useFormContext, Controller } from "react-hook-form";

interface Iprops {
  input_type: number;
  name: string;
  id?: string;
  rules?: any;
  className?: string;
  label?: string;
  layout?: "horizontal" | "vertical";
  show_required?: boolean;
  extra_text?: string;
  extend_text?: string;
  IconFont?: React.ReactElement;
  style?: any;
  value?: any;
  disabled?: boolean;
  options?: any[];
  is_required?: number;
  [propsName: string]: any;
}
const HooksItem: React.FC<Iprops> = React.memo((props: Iprops) => {
  const {
    errors,
    control,
    formState: { dirty }
  } = useFormContext();

  const {
    id,
    rules,
    label,
    style,
    value,
    IconFont,
    input_type,
    name = "",
    extra_text = "",
    className = "",
    disabled = false,
    show_required = true,
    extend_text = "",
    is_required = 2,
    layout = "horizontal",
    options
  } = props;

  const params = {
    id,
    label,
    value,
    options,
    defaultValue: value,
    disabled
  };

  const FormItem = FormItems[input_type];
  if (!FormItem) {
    console.log(`${input_type} 当前组件不支持`);
    return null;
  }

  return (
    <Fragment>
      <div
        className={classnames(styles.formitem, className)}
        key={id || name || new Date().getTime()}
      >
        {label ? (
          <div
            className={classnames(styles["label_item"], {
              [styles.label_horizontal]: layout === "horizontal",
              [styles.label_vertical]: layout === "vertical"
            })}
          >
            <label htmlFor={name}>
              {(rules?.required || is_required === 1) && show_required ? (
                <span className={styles.required}>*</span>
              ) : (
                ""
              )}
              {label}
              {extra_text ? <span className={styles.extra_text}>{extra_text}</span> : ""}
              {extend_text && (
                <Tooltip placement="top" title={extend_text}>
                  {IconFont}
                </Tooltip>
              )}
            </label>
          </div>
        ) : (
          ""
        )}

        <div
          className={classnames(styles["components"], {
            [styles.horizontal]: layout === "horizontal",
            [styles.vertical]: layout === "vertical"
          })}
          style={style}
        >
          <Controller
            as={<FormItem {...params} />}
            defaultValue={value}
            control={control}
            rules={rules}
            name={name}
          />
        </div>
      </div>
      {errors[name] && <div className={styles.error}>{errors[name]?.["message"]}</div>}
    </Fragment>
  );
});

export default HooksItem;
