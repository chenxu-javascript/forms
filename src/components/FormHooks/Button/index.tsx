import React from "react";
import { Input, Icon } from "antd";
import styles from "./index.less";

const Button = (props: {
  default_text?: string | undefined;
  children?: any;
  onClick: any;
  className?: string | undefined;
}) => {
  const { default_text = "配置数据联动", children, onClick, className = "" } = props;
  return (
    <div onClick={onClick} className={className}>
      <Input
        className={styles["button_input"]}
        defaultValue={children || default_text}
        addonAfter={<Icon type="setting" />}
        readOnly
      />
    </div>
  );
};

export default Button;
