import React, { useState } from "react";
import pop from "@utils/pop";
import { bsWait } from "@/utils/util";
import { generateItemConfig, copyItemInfo } from "./method";
import { IItemConfig } from "./hooks";
const useDndHooks = () => {
  // 当前项集合
  const [itemList, setItemList] = useState<any>([]);
  const [attrs, setAttrs] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [error, onSetError] = useState({});
  // tab
  const [activeKey, setActiveKey] = useState("formInfo");
  // 新增选项
  const handleAddItem = (
    input_type: number,
    parentIndex: number | undefined,
    element_id?: string
  ) => {
    const { newItem, newItemList } = addItemToItemList(input_type, parentIndex, element_id);
    // 选中新增项
    setItemList(newItemList);
    handleSelectItem(newItem);
  };

  // 处理选中信息项
  const handleSelectItem = async (item: {
    element_id: any;
    itemName?: string | undefined;
    parentId?: string;
  }) => {
    const nextSelectedItem = selectedItem?.["element_id"] === item.element_id ? null : item;
    setActiveKey("itemInfo");
    setSelectedItem(null);
    await bsWait(0);
    setSelectedItem(nextSelectedItem);
  };

  // 新增逻辑处理
  const addItemToItemList = (
    input_type: number,
    parentIndex: number | undefined,
    element_id?: string
  ) => {
    let parentId = "";
    const newItemList: any = [...itemList];
    let targetList = newItemList;
    if (parentIndex !== undefined) {
      parentId = itemList[parentIndex]["element_id"];
      targetList = itemList[parentIndex]["child"] || [];
    }
    const objInfo = element_id ? attrs.find(o => o["element_id"] === element_id) : null;
    const newItem = objInfo || generateItemConfig(input_type, parentId);
    if (parentIndex !== undefined) {
      // 表格下的字段
      targetList.push(newItem);
      newItemList[parentIndex].child = targetList;
    } else {
      newItemList.push(newItem);
    }
    console.log("新增 =>", newItem);
    return { newItem, newItemList };
  };

  // 删除选项
  const handleDeleteItem = (item: any, parentIndex: number) => {
    const { element_id, parentId } = item;
    const _error = JSON.parse(JSON.stringify(error));
    delete _error[element_id];
    // 重置校验
    onSetError(_error);
    if (!parentId) {
      const newItemList = itemList.filter(item => item["element_id"] !== element_id);
      setItemList(newItemList);
    } else {
      // 表格
      const parent: any = itemList.find((item: any) => item["element_id"] === parentId);
      if (parent) {
        const newChildren = parent.child.filter((child: any) => child.element_id !== element_id);
        handleItemChange({ ...parent, child: newChildren });
      }
    }
  };

  // 处理修改信息项
  const handleItemChange = (itemInfo: any) => {
    changeItem(itemInfo);
  };

  /**
   * 修改信息项
   * @param {Object} itemInfo 新信息项
   * @param {number} index 源信息项索引
   * @param {number} parentIndex 源信息项父级索引
   * @returns
   */
  const changeItem = (itemInfo: any) => {
    const newItemList: any = [...itemList];
    const { parentId, element_id } = itemInfo;
    let targetList = newItemList;
    if (parentId && parentId !== "-1") {
      // 表格
      const parentItemInfo = newItemList.find((l: any) => l["element_id"] === parentId);
      targetList = parentItemInfo ? parentItemInfo["child"] : [];
    }
    const index = targetList.findIndex((l: any) => l["element_id"] === element_id);
    targetList[index] = itemInfo;
    if (parentId && parentId !== "-1") {
      const parentIndex = newItemList.findIndex((l: any) => l["element_id"] === parentId);
      newItemList[parentIndex]["child"] = targetList;
    }
    setItemList(newItemList);
  };

  // 移动
  function handleMoveItem(dragItem: any, hoverItem: any) {
    console.log("move");
    let newItemList: any = [...itemList];
    const { parentId: dragParentId, index: dragIndex } = dragItem;
    const { index: hoverIndex } = hoverItem || {};
    let dragItemInfo = null;
    if (dragParentId) {
      newItemList = newItemList.map((item: any) => {
        if (item.element_id === dragParentId) {
          const newChildren = item.child;
          dragItemInfo = newChildren.splice(dragIndex, 1)[0];
          newChildren.splice(hoverIndex, 0, dragItemInfo);
          return {
            ...item,
            child: newChildren
          };
        } else {
          return item;
        }
      });
    } else {
      dragItemInfo = newItemList.splice(dragIndex, 1)[0];
      newItemList.splice(hoverIndex, 0, dragItemInfo);
    }

    setItemList(newItemList);
  }

  /**
   * 复制信息项
   * @param {Object} itemInfo 源信息项
   * @param {number} index 源信息项索引
   * @returns
   */
  const copyItem = (itemInfo: any) => {
    let newItem: any = copyItemInfo(itemInfo);
    console.log("newItem", newItem);
    const { parentId } = itemInfo;
    const newItemList: any = [...itemList];
    let targetList = newItemList;
    let parentIndex: number = 0;
    if (parentId) {
      // 组内复制
      parentIndex = newItemList.findIndex((item: any) => item["element_id"] === parentId);
      targetList = newItemList[parentIndex]["child"] || [];
    }
    // targetList.splice(++index, 0, newItem);
    if (parentId) {
      newItemList[parentIndex]["child"] = targetList;
    }
    setItemList(newItemList);
  };

  // 处理复制信息项
  const handleCopyItem = (itemInfo: any) => {
    if (error[selectedItem?.element_id]) {
      pop.warning(`请检查${activeKey === "itemInfo" ? "信息项" : "表单"}属性！`);
      return;
    }
    copyItem(itemInfo);
  };

  // 获取当前字段信息
  const getItemInfo = () => {
    let targetList = itemList.concat();
    let itemInfo = null;
    let parentInfo = null;
    let itemIndex: any;
    let parentIndex: any;
    if (!selectedItem) return { itemInfo };
    const { element_id, parentId } = selectedItem;
    if (parentId && parentId !== "-1") {
      parentIndex = itemList.findIndex((item: any) => item["element_id"] === parentId);
      parentInfo = itemList[parentIndex];
      if (!parentInfo) return { itemInfo };
      targetList = parentInfo["child"] || [];
    }
    targetList.forEach((item: any, index: number) => {
      if (item["element_id"] === element_id) {
        itemInfo = item;
        itemIndex = index;
      }
    });
    return { itemInfo, parentInfo, itemIndex, parentIndex };
  };

  return {
    error,
    setAttrs,
    itemList,
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
  };
};

export default useDndHooks;
