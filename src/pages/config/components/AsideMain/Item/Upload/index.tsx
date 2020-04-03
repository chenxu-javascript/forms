import React from "react";
import IconFont from "@config/components/IconFontForm";
import styles from "./index.less";

const Picture = () => {
  return (
    <div className={styles.picture}>
      <IconFont type="iconshangchuanwenjian" className={styles.pictureIcon} />
      <p className={styles.desc}>上传文件</p>
    </div>
  );
};

export default Picture;
