import React, { useRef, Fragment, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import classnames from "classnames";
import { Button, Input, Select, DatePicker } from "antd";
import pop from "@utils/pop";
import { ConfigContext } from "@config/index";
import Group from "./Group";
import Voice from "./Voice";
import Picture from "./Picture";
import Upload from "./Upload";
import { ItemTypes, DragTypes } from "@config/utils/const";
import IconFont from "@config/components/IconFontForm";
import styles from "./index.less";
const { TextArea } = Input;

interface IitemInfo {
  default_values: string | number | Array<string> | undefined;
  element_id: any;
  name: string;
  remark: string;
  parentId: string;
  is_extends: string | number;
  form_type: string | number;
  input_type: number;
  need_extends: string | number;
}

interface IProps {
  itemInfo: IitemInfo;
  index: number;
  length: number | undefined;
  active: boolean;
  onAdd: (type: any, parentIndex: number | undefined, element_id?: string) => void;
  onSelect: any;
  onCopy: any;
  onDelete: any;
  onMove: any;
  children?: (theme: any) => React.ReactNode;
}
const Item = React.memo(
  ({
    itemInfo,
    index,
    length,
    active,
    onAdd,
    onSelect,
    onCopy,
    onDelete,
    onMove,
    ...otherProps
  }: IProps) => {
    const {
      element_id,
      name,
      remark,
      parentId,
      is_extends,
      form_type,
      input_type,
      need_extends
    } = itemInfo;
    const { config_type, error, hassave, itemList } = useContext(ConfigContext);
    const parent_input_type: number | undefined = itemList.find(
      l => l["element_id"] === parentId
    )?.["input_type"];
    const ref = useRef<HTMLInputElement>(null);
    const [initData, setData] = useState({});
    const [, drop] = useDrop({
      accept: DragTypes,
      drop: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) return;
      },
      hover(item: any, monitor) {
        if (!ref.current) return;
        const { element_id: dragId, parentId: dragParentId, index: dragIndex } = item;
        const hoverId = element_id;
        const hoverParentId = parentId;
        const hoverIndex = index;
        if (dragId === hoverId) return;
        if (dragParentId && dragParentId !== hoverParentId) return;
        const hoverBoundingRect = ref["current"].getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
        if (dragParentId === hoverParentId) {
          // 同组内排序
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        }
        if (
          initData["element_id"] === element_id &&
          initData["hoverId"] === item["element_id"] &&
          initData["index"] === index &&
          initData["parentId"] === parentId
        ) {
          return false;
        }
        console.log("move");
        setData({ element_id, hoverId: item["element_id"], parentId, index });
        onMove(item, { element_id, parentId, index });
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    });

    const [{ isDragging }, drag] = useDrag({
      item: { type: DragTypes, itemType: form_type, element_id, parentId, index },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    // 处理新增子字段
    const handleAddChild = (type: number) => {
      if (![1, 2, 3, 8, 14, 5, 6].includes(type)) {
        pop.warning(
          "表格下只能包含单行文本, 多行文本, 下拉选择, 数值输入, 图片, 日期时间等6种类型"
        );
        return;
      }
      onAdd(type, index);
    };

    const renderTitle = title => (
      <label className={styles.title} title={title}>
        {title}
        {renderCompany()}
      </label>
    );
    // default_values
    const renderContent = (type: string) => {
      switch (type) {
        case "ObjFrom":
        case "Table":
          return (
            <Group
              is_can={type === "Table"}
              remark={remark}
              type={type}
              onAddChild={handleAddChild}
              {...otherProps}
            />
          );
        case "Input":
        case "InputNumber":
          return (
            <Input
              disabled
              placeholder="请输入"
              value={itemInfo?.default_values}
              style={{ width: "100%" }}
            />
          );
        case "Date":
          return <DatePicker disabled placeholder="请选择" style={{ width: "100%" }} />;
        case "Upload":
          return <Upload />;
        case "Dept":
        case "User":
        case "Select":
          return <Select disabled placeholder="请选择" style={{ width: "100%" }} />;
        case "Image":
          return <Picture />;
        case "TextArea":
          return <TextArea disabled placeholder="请输入" autoSize={{ minRows: 3, maxRows: 6 }} />;
        case "Video":
          return <Voice />;
        default:
          return null;
      }
    };

    const renderAction = () => {
      return (
        <Fragment>
          {([1, 3].includes(config_type) ||
            ([2, 5, 7].includes(config_type) && is_extends !== 1) ||
            ([6].includes(config_type) && need_extends !== 1 && is_extends !== 1)) && (
            <Button
              className={styles.copyBtn}
              onClick={event => {
                onCopy();
                event.stopPropagation();
              }}
            >
              复制
            </Button>
          )}

          {([1, 3].includes(config_type) ||
            ([2, 7].includes(config_type) && need_extends !== 1) ||
            ([5].includes(config_type) && is_extends !== 1) ||
            ([4].includes(config_type) && parent_input_type !== 12) ||
            ([6].includes(config_type) && need_extends !== 1 && is_extends !== 1)) && (
            <Button
              className={styles.deleteBtn}
              onClick={event => {
                onDelete();
                event.stopPropagation();
              }}
            >
              删除
            </Button>
          )}
        </Fragment>
      );
    };
    const renderCompany = () => {
      if (![2, 7].includes(Number(config_type))) return null;
      return (
        <>
          {is_extends === 1 ? (
            <div className={styles.itemicon}>
              <IconFont type="iconpingtai" className={styles.icon}></IconFont>
              <span>平台</span>
            </div>
          ) : (
            ""
          )}
          {need_extends === 1 ? (
            <div className={styles.itemicon}>
              <IconFont type="iconguding" className={styles.icon}></IconFont>
              <span>固定</span>
            </div>
          ) : (
            ""
          )}
        </>
      );
    };
    return (
      <div ref={ref} className={styles.item} style={{ opacity }}>
        <div
          className={classnames(styles.content, {
            [styles.active]: active,
            [styles.error]: error[element_id] && element_id && hassave.includes(element_id)
          })}
        >
          {renderTitle(name)}
          {renderContent(form_type || ItemTypes[input_type])}
        </div>
        {active && <div className={styles.action}>{renderAction()}</div>}
      </div>
    );
  }
);

export default Item;
