import React, { useContext, useRef, useImperativeHandle, forwardRef } from "react";
import { Tabs } from "antd";
import { ConfigContext } from "@config/index";
import { FormInfo, ItemInfo } from "@config/components";

import styles from "./index.less";
import { bsWait } from "@/utils/util";

let count = 0;
interface Iprops {
  onAdd: any;
  loaded: boolean;
  itemInfo: any;
  formInfo: any;
  itemList: any[];
  activeKey: string;
  onSetError: any;
  activeItemId?: string;
  siblingItemList: any;
  onItemInfoChange: any;
  onFormInfoChange: any;
  onActiveKeyChange: any;
}
const { TabPane } = Tabs;
const AsideRight = (props: Iprops, parentref: any) => {
  const {
    onAdd,
    loaded,
    formInfo,
    itemList,
    activeKey,
    onSetError,
    onItemInfoChange,
    onFormInfoChange,
    onActiveKeyChange
  } = props;
  count++;
  const formInfoRef = useRef<any>(null);
  const itemInfoRef = useRef<any>(null);
  const { config_type, itemInfo, activeItemId } = useContext(ConfigContext);
  // 数据初始化
  if (!loaded) {
    return null;
  }

  useImperativeHandle(parentref, () => ({
    getData: async () => {
      const currentRef = activeKey === "formInfo" ? formInfoRef : itemInfoRef;
      return await currentRef?.current?.getData();
    }
  }));

  const setActiveKeyed = async (active: string) => {
    const currentRef = activeKey === "formInfo" ? formInfoRef : itemInfoRef;
    await currentRef?.current?.getData();
    await bsWait(20);
    onActiveKeyChange(active);
  };

  const renderItemInfo = () => {
    return (
      <>
        {activeItemId && itemInfo ? (
          <ItemInfo
            ref={itemInfoRef}
            onChange={(value: any, error: any) => {
              console.log({ ...itemInfo, ...value }, value);
              onItemInfoChange({ ...itemInfo, ...value });
              onSetError(error);
            }}
          />
        ) : (
          <div className="ml20">请选择字段类型</div>
        )}
      </>
    );
  };

  if (config_type === 3) {
    return (
      <>
        <div className={styles.header}>字段属性</div>
        {renderItemInfo()}
      </>
    );
  }

  return (
    <>
      =={count}==
      <Tabs activeKey={activeKey} onChange={activeKey => setActiveKeyed(activeKey)}>
        <TabPane tab="字段属性" key="itemInfo">
          <div className={styles.tabPane}>{activeKey === "itemInfo" && renderItemInfo()}</div>
        </TabPane>
        <TabPane tab="表单属性" key="formInfo">
          <div className={styles.tabPane}>
            {activeKey === "formInfo" && (
              <FormInfo
                ref={formInfoRef}
                formInfo={formInfo}
                onAdd={onAdd}
                itemList={itemList}
                onChange={(value: any, error: any) => {
                  onFormInfoChange({ ...formInfo, ...value });
                  onSetError(error);
                }}
              />
            )}
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default forwardRef(AsideRight);
