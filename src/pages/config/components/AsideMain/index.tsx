import React, { useCallback, useContext } from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";
import pop from "@utils/pop";
import { DragTypes } from "@config/utils/const";
import { ConfigContext } from "@config/index";
import Item from "./Item";

import styles from "./index.less";
import { isArray } from "@/utils/util";

interface IProps {
  itemList: [];
  onSelect: (item: {
    element_id: any;
    itemName?: string | undefined;
    parentId?: string | undefined;
  }) => Promise<void>;
  onDelete: (item: any) => void;
  onAdd: (type: any, parentIndex: number | undefined, element_id?: string) => void;
  onMove: (item: any, index: number) => void;
  onCopy: (dragItem: any) => void;
  onChange?: (itemInfo: any, index: number, parentIndex?: number | undefined) => void;
}

const PreviewContainer = ({ onSelect, onDelete, onAdd, onMove, onCopy }: IProps) => {
  const { formInfo, itemList, activeItemId } = useContext(ConfigContext);
  const [, drop] = useDrop({
    accept: DragTypes,
    drop: (item: any, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      const { itemType, element_id } = item;
      onAdd(itemType, undefined, element_id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  const handleDelete = useCallback((item: any, index: number) => {
    if (item.element_id === formInfo["primary_key"]) {
      return pop.warning("温馨提示：配置了“值唯一性校验”的字段不能删除");
    }
    if (item.element_id === formInfo["tree_key"]) {
      return pop.warning("温馨提示：树形字段不能删除");
    }
    onDelete(item);
  }, []);

  const renderItemChild = (item: any, index: number) => {
    const { input_type, child, extended_info } = item;
    /* 表格 */
    if (input_type === 12 && isArray(child)) {
      return item.child.map(
        (item: { element_id: string | number | undefined }, childIndex: number) => {
          <div className={styles.itemChild} key={item.element_id}>
            {renderItem(item, childIndex)}
          </div>;
        }
      );
    }
    /* 引用 */

    return null;
  };
  const renderItem = (item: any, index: number) => (
    <div
      className={classnames(styles.item)}
      onClick={e => {
        onSelect(item);
        e.stopPropagation();
      }}
      key={item.element_id}
    >
      <Item
        itemInfo={item}
        index={index}
        length={itemList.length}
        active={activeItemId === item.element_id}
        onSelect={onSelect}
        onCopy={() => onCopy(item)}
        onDelete={() => onDelete(item)}
        onAdd={onAdd}
        onMove={onMove}
      >
        {renderItemChild(item, index)}
      </Item>
    </div>
  );

  return (
    <div ref={drop} className={classnames(styles.previewContainer)}>
      {isArray(itemList) ? (
        itemList.map((item, index) => renderItem(item, index))
      ) : (
        <div className={styles.placeholderWrapper}>
          <p className={styles.placeholder}>请添加字段类型</p>
        </div>
      )}
    </div>
  );
};

export default PreviewContainer;
