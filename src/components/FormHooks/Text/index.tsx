import React from "react";
import styles from "./index.less";

const Text = (props: { value: any; is_select: any; options: any }) => {
  const { value, is_select, options } = props;
  const text = is_select ? options.find((l: { id: any }) => l.id === value)?.name : value;
  return <div className={styles.text}>{text}</div>;
};

export default Text;
