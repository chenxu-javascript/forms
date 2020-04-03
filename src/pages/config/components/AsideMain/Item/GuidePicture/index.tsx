import React from "react";
import classnames from "classnames";
// import Thumbnail from "@components/Thumbnail";
import IconFont from "@config/components/IconFontForm";

import styles from "./index.less";

const GuidePicture = ({ guidePicture = [] }) => {
  return (
    <div className={styles.guidePicture}>
      {/* {guidePicture.map(item => (
        <Thumbnail
          src={item["url"]}
          title={item["name"]}
          alt={item["name"]}
          className={styles.guidePictureItem}
        />
      ))} */}
      {guidePicture.length < 8 && (
        <div className={classnames(styles.guidePictureItem, styles.placeholder)}>
          <IconFont type="iconshangchuanyindaotux" className={styles.placeholderIcon} />
          <p className={styles.placeholderDesc}>上传图片</p>
        </div>
      )}
    </div>
  );
};

export default GuidePicture;
