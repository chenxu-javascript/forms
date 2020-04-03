import React from "react";
import IconFont from "@config/components/IconFontForm";
import styles from "./index.less";

const Picture = () => {
  return (
    <div className={styles.picture}>
      <IconFont type="iconxiangjix" className={styles.pictureIcon} />
      <p className={styles.desc}>相机/照片</p>
    </div>
  );
};

export default Picture;
