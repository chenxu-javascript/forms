import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import classnames from "classnames";
import { DragTypes } from "@config/utils/const";
import styles from "./index.less";
import pop from "@/utils/pop";

interface IProps {
  remark: string;
  type: string;
  children?: React.ReactNode;
  onAddChild?: (type: any) => void;
  is_can?: boolean;
}

const ObjType = {
  Table: 0,
  ObjFrom: 1
};
const Group: React.FC<IProps> = ({ remark, type, children, onAddChild, is_can = true }) => {
  const [{ canDrop }, drop] = useDrop({
    accept: DragTypes,
    drop: (item, monitor) => {
      const list = children?.[0];
      if (list.length === 7) {
        return pop.error("温馨提示：表格内最多添加7个字段");
      }
      const type = item["itemType"];
      onAddChild && onAddChild(type);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: !!monitor.canDrop() && is_can
    })
  });

  // const array = useMemo(() => children[ObjType[type]], [type, children]);

  return (
    <div ref={drop} className={styles.group}>
      <div className={styles.header}>
        <p className={styles.remark}>{remark}</p>
      </div>
      {children ? (
        <div className={classnames(styles.content, { [styles.contentCanDrop]: canDrop })}>
          {children}
        </div>
      ) : (
        <div className={styles.dropArea}>{type === "Table" ? "拖拽并放置" : "选取引用字段"} </div>
      )}
    </div>
  );
};
export default Group;
