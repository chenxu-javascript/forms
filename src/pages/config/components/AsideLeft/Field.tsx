import React, { useContext } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import classnames from "classnames";
import { DragTypes } from "@config/utils/const";
import { ConfigContext } from "@config/index";
import IconFont from "@config/components/IconFontForm";
import styles from "./index.less";

interface IProps {
  item: any;
  type: 1 | 2;
  onAdd: (type: number, parentIndex: number | undefined, element_id: string) => void;
  children?: () => React.ReactNode;
}

const Field = React.memo((props: IProps) => {
  const { item, type, onAdd } = props;
  const { element_id, config_type, icon, form_type, input_type } = item;
  const exampleImg: string = require(`./image/${form_type}.png`);
  const { itemList } = useContext(ConfigContext);
  const has_selected: boolean = element_id && !!itemList.find(o => o["element_id"] === element_id);
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DragTypes, itemType: item.input_type, element_id: item.element_id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag()
    }),
    canDrag: () => !(config_type === 2 && has_selected)
  });
  return (
    <div
      onClick={() => {
        if (type === 2 && has_selected) return;
        onAdd(input_type, undefined, element_id);
      }}
    >
      <DragPreviewImage src={exampleImg} connect={preview} />
      <div
        ref={drag}
        className={classnames(styles.field, {
          [styles.active]: isDragging,
          [styles.disabled]: type === 2 && has_selected
        })}
      >
        {icon && <IconFont type={icon} className={styles.icon} />}
        {item.name}
      </div>
    </div>
  );
});

export default Field;
