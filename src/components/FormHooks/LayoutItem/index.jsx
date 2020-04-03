import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
const LayoutItem = props => {
  const { children, border = true, config_content, className = 'defaultItem' } = props;
  return (
    <div
      className={classnames(className, styles.defaultItem, styles.LayoutItem, {
        [styles.border]: border,
        [styles.config_content]: config_content
      })}
    >
      {children}
    </div>
  );
};

export default LayoutItem;
