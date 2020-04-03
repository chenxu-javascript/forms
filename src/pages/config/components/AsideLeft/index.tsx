import React, { useContext } from "react";
import Field from "./Field";
import { ConfigContext } from "@config/index";
import classnames from "classnames";
import { isArray } from "@/utils/util";
import { ItemConfigListGroup, ItemGroupList } from "@config/utils/const";

import styles from "./index.less";

interface IProps {
  groupFiledList: any;
  onAdd: (type: any, parentIndex: number | undefined, element_id: string) => void;
  children?: (theme: any) => React.ReactNode;
}

const AsideLeft = (props: IProps) => {
  const { groupFiledList = [], onAdd } = props;
  const { config_type, data_structure } = useContext(ConfigContext);
  /**
   *
   * @param selected
   * @param item 每一项数据  type 1 原有类型  2 从接口请求回来的类型
   * @description 渲染每一项数据
   */
  const renderField = (item: any, type: 1 | 2 = 1, index?: number) => {
    return (
      <li
        className={styles.item}
        key={`${item.u_id || 0}-${index}-${item.id || 99}-filed-${item.input_type || 87}`}
      >
        <Field item={item} type={type} onAdd={onAdd} />
      </li>
    );
  };

  // 过滤不展示的数据
  const getNewArrayByType = (type: string) => {
    const new_array = ItemConfigListGroup.filter(o => o.type === type) || [];
    return new_array
      .map(l => {
        // 对象表单 - 平台-单层级-不展示 引用
        if (l.input_type === 55 && config_type === 1 && data_structure === "TREE") {
          return null;
        }
        // 过滤数据
        if (l.ishide && l.ishide.includes(config_type)) {
          return null;
        }
        return l;
      })
      .filter(l => l);
  };

  const renderItem = (data: { name: string; type: string }, index: number) => {
    const { name, type } = data;
    const newFieldArray = getNewArrayByType(type);
    if (!isArray(newFieldArray)) return null;
    return (
      <div className={styles.group} key={index}>
        <p className={styles.groupName}>{name}</p>
        <ul>{newFieldArray.map((o, _index) => renderField(o, 1, _index))}</ul>
      </div>
    );
  };

  const renderCustom = () => {
    if (config_type !== 2) return null;
    return <p className={styles.custom}>自定义字段</p>;
  };

  return (
    <div className={styles.filedList}>
      {config_type !== 4 ? (
        <>
          {renderCustom()}
          {ItemGroupList.map((o, index) => renderItem(o, index))}
        </>
      ) : (
        ""
      )}
      {isArray(groupFiledList) ? (
        <div className={classnames(styles.group, styles.bordertop)}>
          <p className={styles.groupName}>{config_type === 4 ? "已配置业务字段" : "平台字段"}</p>
          <ul>{groupFiledList.map((o: any) => renderField(o, 2))}</ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default AsideLeft;
