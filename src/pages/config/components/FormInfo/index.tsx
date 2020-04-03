import React, { useContext, useMemo, useEffect, useImperativeHandle, forwardRef } from "react";
import { renderFiled } from "./methods";
import { Attribute } from "./const";
import IconFont from "../IconFontForm";
import { ConfigContext } from "@config/index";
import { onRenderHooks } from "@config/utils/utils";
import { useForm, FormContext } from "react-hook-form";
import { LayoutItem } from "@/components/FormHooks";
import {
  isCanAddEntiy,
  FormTypeSelect,
  renderFiledTree,
  isCanAddParent,
  Unique_value
} from "./methods";
import styles from "./index.less";

import { getSingNumberByInputType, fixedList as getFixedList } from "./utils";

let count = 0;

const FormInfo = (
  props: { onChange: any; formInfo: any; itemList: any[]; onAdd: any },
  ref: any
) => {
  count++;
  const { config_type } = useContext(ConfigContext);
  const { onChange, formInfo, itemList, onAdd } = props;
  const methods = useForm({ defaultValues: formInfo });
  const { getValues, triggerValidation, watch } = methods;

  const { limit_extended } = formInfo;
  const TextAndNumberList = getSingNumberByInputType(itemList);
  const FixedList = getFixedList(TextAndNumberList);

  const getData = async() => {
    const data = getValues({ nest: true });
    const resValidation = await triggerValidation();
    console.log("data =>", resValidation, data);
    onChange &&
      onChange({ ...data, primary_key: data.primary_key || "" }, { formInfo: !resValidation });
  };

  const watchValues = watch({ nest: true }, formInfo);

  useEffect(() => {
    console.log("FormInfo => change", watchValues);
  }, [watchValues]);

  useImperativeHandle(ref, () => ({
    getData: () => getData()
  }));

  const _IconFont = <IconFont className={styles._IconFont} type="icontishi"></IconFont>;
  const renderhooks = (item: any) => {
    return onRenderHooks({ ...item, disabled: config_type === 2 ? true : item.disabled }, formInfo);
  };

  const isTree = watchValues.data_structure === "TREE";
  const isUnique = watchValues.unique_value?.length > 0;

  switch (config_type) {
    case 7:
      return <ChildSeven formInfo={formInfo} />;
    case 5:
    case 6:
      return <ChildType props={props} />;
    case 4:
    case 3:
      return <ChildThree />;
    case 2:
      return <ChildTwo {...props} FixedList={FixedList}></ChildTwo>;
    default:
      return (
        <FormContext {...methods}>
          =={count}==
          <div className={styles.content}>
            {![3, 4].includes(config_type) && (
              <LayoutItem>{renderhooks(Attribute.TierType)}</LayoutItem>
            )}
            <LayoutItem>{renderhooks(Attribute.FieldLimitNumber)}</LayoutItem>
            {![3, 4].includes(config_type) && (
              <LayoutItem>{renderhooks(Attribute.Remark)}</LayoutItem>
            )}
            {isTree && ![3, 4].includes(config_type) && (
              <LayoutItem>{renderhooks(isCanAddEntiy)}</LayoutItem>
            )}
            {isTree && ![3, 4].includes(config_type) && (
              <LayoutItem>{renderhooks(renderFiledTree(FixedList, _IconFont))}</LayoutItem>
            )}
            {![3, 4].includes(config_type) && (
              <LayoutItem>
                {renderhooks(Unique_value)}
                {isUnique && renderhooks(renderFiled(FixedList))}
                {isUnique && isTree && renderhooks(FormTypeSelect)}
              </LayoutItem>
            )}
          </div>
        </FormContext>
      );
  }
};
export default forwardRef(FormInfo);

const ChildType = (props: any) => {
  const { formInfo, itemList } = props;
  if (!formInfo.parent_entity_id || formInfo.parent_entity_id === "-1")
    return <div className="text-center mt20"> 当前无父级表单，暂无表单属性配置</div>;
  const new_list = itemList.filter((o: { is_extends: number }) => Number(o.is_extends === 1));
  return (
    <LayoutItem>
      {onRenderHooks({ ...isCanAddParent, disabled: formInfo.id && new_list?.length })}
    </LayoutItem>
  );
};

const ChildTwo = (props: any) => {
  const { FixedList, formInfo } = props;
  const {
    primary_key,
    data_structure,
    limit_extended,
    remark,
    can_add_entity,
    tree_key,
    primary_type
  } = formInfo;
  const isTree = data_structure === "TREE";
  const has_tree_key = FixedList.find((o: { element_id: any }) => o.element_id === tree_key);
  const has_primary_key = FixedList.find((o: { element_id: any }) => o.element_id === primary_key);
  return (
    <div>
      <LayoutItem>
        <div>层级类型</div>
        <div className="mt5">{data_structure === "LIST" ? "单层级" : "多层级"}</div>
      </LayoutItem>

      <LayoutItem>
        <div>企业自定义字段个数限制(最多10个)</div>
        <div className="mt5">{limit_extended} 个</div>
      </LayoutItem>

      <LayoutItem>
        <div>描述</div>
        <div className="mt5">{remark || "-"}</div>
      </LayoutItem>

      {data_structure === "TREE" && (
        <LayoutItem>
          <div>是否带层级表单</div>
          <div className="mt5">{`${can_add_entity}` === "1" ? "是" : "否"}</div>
        </LayoutItem>
      )}

      {data_structure === "TREE" && (
        <LayoutItem>
          <div>树形展示字段</div>
          <div className="mt5">{(has_tree_key && has_tree_key.name) || "-"}</div>
        </LayoutItem>
      )}

      {has_primary_key && (
        <LayoutItem>
          <div>值唯一性校验</div>
          <div className="mt15">
            <div>字段</div>
            <div className="mt5">{(has_primary_key && has_primary_key.name) || "-"}</div>
          </div>

          {isTree && (
            <div className="mt15">
              <div>类型</div>
              <div className="mt5">{primary_type === "global" ? "全局唯一" : "同一层级下唯一"}</div>
            </div>
          )}
        </LayoutItem>
      )}
    </div>
  );
};

const ChildSeven = (props: any) => {
  const { formInfo } = props;
  return (
    <>
      <LayoutItem>
        <div>显示方式</div>
        <div className="mt5">表单式</div>
      </LayoutItem>

      <LayoutItem>
        <div>企业自定义字段个数限制(最多10个)</div>
        <div className="mt5">{formInfo.limit_extended} 个</div>
      </LayoutItem>
    </>
  );
};

const ChildThree = (props: any) => {
  return (
    <div className={styles.content}>
      <LayoutItem>
        <div>显示方式</div>
        <div className="mt5">表单式</div>
      </LayoutItem>
    </div>
  );
};
