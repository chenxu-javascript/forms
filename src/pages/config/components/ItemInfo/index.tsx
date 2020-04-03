import { DefaultDiy } from "./components/index";
import { onRenderHooks } from "@config/utils/utils";
import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import { LayoutItem } from "@components/FormHooks";
import { useForm, FormContext } from "react-hook-form";
import { ConfigContext } from "@config/index";
import { getField, defaultValueByInputType } from "./methods";
import styles from "./index.less";

let count = 0;

interface IProps {
  onChange: any;
}

const ItemInfo: React.FC<IProps> = (props, ref: any) => {
  count++;
  const { onChange } = props;
  const { config_type, itemList, formInfo, itemInfo } = useContext(ConfigContext);
  const { input_type } = itemInfo;
  const [BaseForm] = useState(() => getField({ ...itemInfo, config_type }, formInfo));
  const methods = useForm({ defaultValues: itemInfo });
  const { getValues, triggerValidation, watch } = methods;

  const getData = async () => {
    const data = getValues({ nest: true });
    let resValidation = await triggerValidation();
    const new_data = Object.assign({}, defaultValueByInputType[input_type] || {}, data);
    console.log("data =>", resValidation, new_data, data);
    onChange && onChange(new_data, { [itemInfo.element_id]: !resValidation });
    return {
      data: new_data,
      [itemInfo.element_id]: !resValidation
    };
  };

  useImperativeHandle(ref, () => ({
    getData: () => getData()
  }));
  const params = {
    itemList,
    itemInfo,
    methods
  };
  const _value = watch({ nest: true }, itemInfo);
  useEffect(() => {
    console.log("itemInfo => change", _value);
  }, [_value]);
  return (
    <FormContext {...methods}>
      =={count}==
      <div className={styles.main}>
        <div className={styles.title}>{itemInfo.itemName}</div>
        <div className={styles.content}>
          <form>
            {BaseForm.map((item: any, index: number) => {
              return (
                <LayoutItem key={index}>
                  {onRenderHooks({ disabled: !!itemInfo.disabled, ...item }, itemInfo)}
                </LayoutItem>
              );
            })}
            {/* 单行默认值 */}
            {input_type === 1 && <DefaultDiy {...params} />}
          </form>
        </div>
      </div>
    </FormContext>
  );
};
export default forwardRef(ItemInfo);
