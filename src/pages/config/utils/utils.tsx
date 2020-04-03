import React from "react";
import { PlatFormTypeObj } from "./const";
import { getValueByPath, setValueByPath } from "./common";
import { HooksItem } from "@/components/FormHooks";
import BaseForm from "@/components/Form/BaseForm";
import { ItemConfigListGroup } from "./const";
import { isArray } from "@utils/util";

// 获得entuty_type 通过 config_type
const getEntityTypeByConfigType = (config_type: string): string => {
  const obj = PlatFormTypeObj.find(l => l.config_type === Number(config_type));
  return obj ? obj.entity_type : "";
};

const getResultByItem = (data: any[], condition: number | undefined | string, result: any) => {
  if (condition === 1) {
    data.push(result);
  }
  return data;
};

// 数据初始化
const getNewItems = (data: any) => {
  if (isArray(data.child)) {
    data.child = data.child.map((o: any) => {
      return getNewItems(o);
    });
  }
  let field_permissions: any[] = [];
  let number_type: any[] = [];
  const { is_required, retrieve, need_extends, extended_info } = data;
  field_permissions = getResultByItem(field_permissions, is_required, 1);
  field_permissions = getResultByItem(field_permissions, retrieve, 2);
  field_permissions = getResultByItem(field_permissions, need_extends, 3);

  number_type = getResultByItem(number_type, extended_info?.can_decimal, "can_decimal");
  number_type = getResultByItem(number_type, extended_info?.can_negative, "can_negative");
  // 数字
  if (data.input_type === 8) {
    data.extended_info = {
      ...data.extended_info,
      number_type
    };
  }
  return {
    ...data,
    itemName: data.name,
    form_type:
      ItemConfigListGroup?.find((l: any) => l.input_type === data.input_type)?.form_type || "-1",
    field_permissions,
    parentId: data.element_parent_id !== "-1" ? data.element_parent_id : ""
  };
};

// const getNewOptions = (
//   data: any[],
//   itemInfo: { input_type: any; parentId: any },
//   config_type: number,
//   itemList: any[]
// ) => {
//   const { input_type, parentId } = itemInfo;
//   if (!isArray(data)) return [];
//   const _data = data.map(
//     (o: { [x: string]: any; show?: any; hide?: any; hide_config?: any; hide_tabel?: any }) => {
//       if (
//         (o?.show?.length && !o?.show.includes(input_type)) ||
//         (o?.hide?.length && o?.hide.includes(input_type)) ||
//         o?.hide_config?.includes(config_type) ||
//         (o.hide_tabel &&
//           parentId &&
//           itemList.find(
//             (l: { element_id: any; input_type: number }) =>
//               l.element_id === parentId && l.input_type === 12
//           ))
//       ) {
//         return null;
//       } else {
//         let params = {};
//         Object.keys(o).forEach(l => {
//           params[l.toLowerCase()] = o[l];
//         });
//         return params;
//       }
//     }
//   );

//   return _data.filter((o: any) => o);
// };

const onRenderHooks = (item: any, defaultValue: any = {}, callback?: () => {}) => {
  if (!item) return null;
  if (item.is_hide) return null;
  const label_name: string = item?.name;
  const value: any = getValueByPath(defaultValue, item?.name) || item?.defaultValue;
  return (
    <HooksItem
      id={`form-${item?.element_id || ""}-${item?.name || ""}`}
      key={`form-${item?.element_id}-${item.name}`}
      disabled={defaultValue?.disabled === 1 || defaultValue?.disabled === true}
      {...item}
      name={label_name}
      value={value}
    />
  );
};

const onNewRenderHooks = (item: any, defaultValue: any = {}, callback?: () => {}) => {
  if (!item) return null;
  if (item.is_hide) return null;
  const value: any = getValueByPath(defaultValue, item?.name) || item?.defaultValue;
  return (
    <BaseForm
      id={`form-${item?.element_id || ""}-${item?.name || ""}`}
      key={`form-${item?.element_id || ""}-${item.name}`}
      disabled={defaultValue?.disabled === 1 || defaultValue?.disabled === true}
      {...item}
      value={value}
    />
  );
};
export { getEntityTypeByConfigType, onRenderHooks, getNewItems, onNewRenderHooks };
