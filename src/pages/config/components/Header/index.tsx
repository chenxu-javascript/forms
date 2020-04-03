import React from "react";
import { Icon, Button, Tooltip } from "antd";
import router from "umi/router";
import classnames from "classnames";

import styles from "./index.less";

const Header = ({ handleSave, formInfo, saveLoading, count }) => {
  const handleCancel = () => {
    // 处理取消
    router.goBack();
  };
  return (
    <header className={styles.header}>
      <div className={styles.action}>
        <div className={styles.actionLeft}>
          <Icon type="left" className={styles.actionBack} onClick={handleCancel} />
          <div className={styles.formInfoName}>
            <Tooltip placement="bottom" title={formInfo.name}>
              {formInfo.name}-{count}
            </Tooltip>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            loading={saveLoading}
            className={classnames(styles.actionItem, styles.saveBtn)}
            onClick={() => handleSave()}
          >
            保存
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
