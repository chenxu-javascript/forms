import { getUUid } from "@utils/util";
import { ItemConfigListGroup } from "@config/utils/const";
import { IItemConfig } from "./hooks";
// 新增初始化 获得对应属性
const generateItemConfig = (input_type: number, parentId: string) => {
  let itemConfig = ItemConfigListGroup.find(itemConfig => itemConfig.input_type === input_type);
  return { ...itemConfig, element_id: getUUid(), itemName: itemConfig?.name, parentId };
};

// 复制信息项
const copyItemInfo = (item: IItemConfig, parentId?: string | undefined) => {
  const newItem = { ...item, element_id: getUUid(), parentId: parentId || item.parentId };
  Object.keys(newItem).forEach(key => {
    if (["child"].includes(key) && newItem[key]?.length) {
      newItem[key] = newItem[key].map((child: IItemConfig, index: number | undefined) =>
        copyItemInfo(child, newItem.element_id)
      );
      return;
    }
    if (["element_alias", "id", "element_parent_id"].includes(key)) {
      newItem[key] = "";
    }
  });
  return newItem;
};
export { generateItemConfig, copyItemInfo };
