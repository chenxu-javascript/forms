import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Spin } from "antd";
import pop from "@utils/pop";
import { connect } from "dva";
import { bsCheck } from "utils-common-fn";
import { qsParse } from "@/utils/util";
import { DndProvider } from "react-dnd";
import useDnd from "./components/DndHooks";
import HTML5Backend from "react-dnd-html5-backend";
import { getEntityTypeByConfigType } from "@config/utils/utils";
import { mapStateToProps, mapDispatchToProps } from "./state";
import { Header, AsideLeft, AsideMain, AsideRight } from "@config/components";
import styles from "./index.less";

let count = 0;
interface FormInfoInter {
  parent_entity_id: string;
  tenant_type: string;
  primary_type: string;
  data_structure: string;
  name: string;
  entity_type: string;
  config_type: number;
  entity_name: string;
  entity_id: string;
  enterprise_id: string;
  primary_key?: string | undefined;
  tree_key?: string | undefined;
}

interface IProps {
  location: {
    search: string;
  };
  saveLoading: boolean;
  entity_id: string;
  enterprise_id: string;
  onPostTemplate: (data: any) => void;
  getTemplate: (data: any) => void;
  onInit: () => void;
}

interface IContext {
  error?: any;
  itemList: any[];
  entity_id: number;
  itemInfo: any;
  hassave: any[];
  formInfo: any;
  formInfoCopy: any;
  data_structure: string;
  enterprise_id: string;
  config_type: number;
  activeItemId?: string;
}

const ConfigContext = React.createContext<IContext>({
  error: {},
  itemList: [],
  entity_id: 1,
  itemInfo: undefined,
  hassave: [""],
  formInfo: {},
  formInfoCopy: {},
  data_structure: "LIST",
  enterprise_id: "",
  config_type: 1,
  activeItemId: undefined
});

const Bsentity = (props: IProps) => {
  const { onInit, location, saveLoading, onPostTemplate, getTemplate } = props;
  console.log("ff", bsCheck);
  const query = qsParse(location.search) || {};
  const {
    entity_id,
    entity_name,
    tenant_type,
    enterprise_id,
    config_type = 1,
    parent_entity_id,
    data_structure = "LIST",
    ...otherparams
  } = query;

  const [formInfo, setFormInfo] = useState<FormInfoInter>({
    ...otherparams,
    entity_id,
    tenant_type,
    data_structure,
    parent_entity_id,
    primary_type: "global",
    name: entity_name || entity_id,
    entity_type: getEntityTypeByConfigType(config_type),
    config_type: Number(config_type),
    entity_name: entity_name || entity_id,
    enterprise_id: Number(enterprise_id) > 0 ? enterprise_id : "0"
  });

  const [groupFiledList, setGroupFiledList] = useState([]); // 左侧可选属性
  const [formInfoCopy, setFormInfoCopy] = useState({}); // formInfo 备份一份
  const [hassave, setSave] = useState<any>([]); // 是否有保存过
  const [loaded, setLoaded] = useState(!formInfo.entity_id); // 是否加载完成
  const itemInfoRef = useRef<any>(null);

  // 页面初始化 清空数据
  useEffect(() => {
    onInit();
    // 获得初始化数据
    getTemplate({ enterprise_id, tenant_type, entity_type: "object" });
  }, [onInit, getTemplate, enterprise_id, tenant_type]);

  const {
    error,
    itemList,
    setAttrs,
    activeKey,
    onSetError,
    setItemList,
    getItemInfo,
    selectedItem,
    setActiveKey,
    handleAddItem,
    handleCopyItem,
    handleMoveItem,
    handleSelectItem,
    handleDeleteItem,
    handleItemChange
  } = useDnd();

  const { itemInfo } = useMemo(() => getItemInfo(), [getItemInfo]);

  // ---== utils ==---//
  const _handleAddItem = async(
    type: any,
    parentIndex: number | undefined,
    element_id?: string
  ) => {
    if (
      [5, 6].includes(formInfo.config_type) &&
      itemList?.filter((l: { [x: string]: number }) => l["is_extends"] !== 1).length > 4
    ) {
      return pop.error("温馨提示：层级自定义字段不超过5个");
    }
    await beforeGetItem();
    handleAddItem(type, parentIndex, element_id);
  };

  const beforeHandleSelectItem = async(item: any) => {
    await beforeGetItem();
    handleSelectItem(item);
  };

  const beforeGetItem = async() => {
    const data = await itemInfoRef.current.getData();
    console.log(data);
    return data;
  };

  // 处理表单属性改变
  const handleFormInfoChange = (newFormInfo: React.SetStateAction<FormInfoInter>) => {
    setFormInfo({ ...formInfo, ...newFormInfo });
  };

  // 页面 错误信息搜集
  const handleSetError = (info: React.SetStateAction<{}>) => {
    onSetError({ ...error, ...info });
  };

  // 是否继承平台数据
  const handleExtentdItem = (value: string | number | undefined) => {
    // const new_array = [...parentItem, ...itemList];
    const new_array = [...itemList];
    if (Number(value) === 1) {
      setItemList(new_array);
    } else {
      setItemList(itemList.filter((o: any) => !o.is_parent_id));
    }
  };

  count++;

  // ---== utils ==---//
  // 保存

  const handleSave = useCallback(async() => {
    await beforeGetItem();
    console.log(itemList, "itemList");
    console.log(formInfo, "formInfo");
    console.log(error, "error");
    setSave(itemList.map((l: { element_id: string }) => l.element_id));
  }, [itemList, formInfo]);

  return (
    <ConfigContext.Provider
      value={{
        error,
        hassave,
        itemInfo,
        formInfo,
        itemList,
        entity_id,
        formInfoCopy,
        data_structure,
        activeItemId: itemInfo?.["element_id"],
        enterprise_id: formInfo.enterprise_id,
        config_type: Number(formInfo.config_type)
      }}
    >
      <Spin spinning={false}>
        <DndProvider backend={HTML5Backend}>
          <div>
            <Header
              count={count}
              handleSave={handleSave}
              formInfo={formInfo}
              saveLoading={saveLoading}
            />
            <main className={styles.main}>
              <AsideLeft groupFiledList={groupFiledList} onAdd={_handleAddItem} />
              <div className={styles.AsideMain}>
                <AsideMain
                  onAdd={_handleAddItem}
                  onSelect={beforeHandleSelectItem}
                  onCopy={handleCopyItem}
                  onDelete={handleDeleteItem}
                  onMove={handleMoveItem}
                />
              </div>

              <div className={styles.AsideRight}>
                <AsideRight
                  ref={itemInfoRef}
                  loaded={loaded}
                  activeKey={activeKey}
                  itemList={itemList}
                  formInfo={formInfo}
                  onAdd={handleExtentdItem}
                  onSetError={handleSetError}
                  onActiveKeyChange={setActiveKey}
                  onItemInfoChange={handleItemChange}
                  onFormInfoChange={handleFormInfoChange}
                />
              </div>
            </main>
          </div>
        </DndProvider>
      </Spin>
    </ConfigContext.Provider>
  );
};

export { ConfigContext };
export default connect(mapStateToProps, mapDispatchToProps)(Bsentity);
