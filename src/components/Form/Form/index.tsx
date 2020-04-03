import React, { Children } from "react";
import { useForm, FormContext } from "react-hook-form";
import { onNewRenderHooks } from "@config/utils/utils";
import IProps from "./interface";
import "./index.less";
const Form: React.FC<IProps> = props => {
  const {
    data,
    children,
    defaultValues,
    layout = "inline",
    labelAlign = "right",
    hideRequiredMark = false
  } = props;
  const renderForm = () => {
    return (
      <>
        {data.map((l: any) => {
          return onNewRenderHooks(l, defaultValues);
        })}
      </>
    );
  };
  const className = `hooks-form hooks-form-${layout} label-${labelAlign} ${
    hideRequiredMark ? "hide_require" : ""
  }`;
  return <form className={className}>{children ? children : renderForm()}</form>;
};

export default Form;
