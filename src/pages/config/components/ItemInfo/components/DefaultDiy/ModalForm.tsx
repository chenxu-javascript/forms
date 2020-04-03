import React, { useState, useEffect, useContext, useMemo } from "react";
import { getNewData } from "@config/components/ItemInfo/utils";
import { onRenderHooks } from "@config/utils/utils";
import { ConfigContext } from "@config/index";
import { Modal, Spin, Row, Col } from "antd";
import { useForm, FormContext } from "react-hook-form";
import classnames from "classnames";
import { connect } from "dva";
import pop from "@/utils/pop";
import styles from "./styles.less";

interface IProps {
  onCancel: () => void;
  onChange: (data: any) => void;
  treelist: any;
  onLoadData: any;
  default_values: any;
}

interface IMapProps {
  treelist: any;
  editTemplate: any;
  loading: any;
}
const ModalItems: React.FC<IProps> = props => {
  const { onCancel, onChange, treelist, onLoadData, default_values } = props;
  const { enterprise_id, entity_id, itemInfo, itemList } = useContext(ConfigContext);
  const { templateList, childdefaultList } = treelist;

  const TemplateList = getNewData(templateList, entity_id, ["LIST"]);
  const [_itemInfo, setInfo] = useState(itemInfo.extended_info || {});
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      current_entity_element: itemInfo.element_id,
      ...default_values
    }
  });

  const { watch, getValues, triggerValidation, setValue } = methods;

  const _allvalue = watch({ nest: true });
  console.log(_allvalue);
  const { refer_entity_id, condition_current_entity_element } = _allvalue;
  const onOk = async() => {
    if (itemInfo.disabled) return pop.error("温馨提示： 平台数据不允许修改");
    const isValidation = await triggerValidation();
    const _value = getValues({ nest: true });
    if (!isValidation) return pop.error("温馨提示： 请设置数据联动数据");
    onChange(_value);
    onCancel();
  };

  // 选取表单 获得子数据
  useEffect(() => {
    async function fetchData() {
      if (!refer_entity_id) return;
      setLoading(true);
      await onLoadData({ id: refer_entity_id, enterprise_id });
      setLoading(false);
    }
    fetchData();
  }, [enterprise_id, onLoadData, refer_entity_id]);

  const cb = () => {
    setValue("condition_current_entity_element", undefined);
    setValue("condition_refer_entity_element", undefined);
    setValue("refer_entity_element", undefined);
    setInfo({ ..._itemInfo, ...getValues() });
  };

  const callback = () => {
    setValue("condition_refer_entity_element", undefined);
    setInfo({ ..._itemInfo, ...getValues() });
  };

  // 获得引用对象下面的数据
  const getAppoint = () => {
    const objForm = itemList.filter(o => o.input_type === 55) || [];
    let AppointList = [];
    objForm.forEach(l => {
      let obj_child = l.extended_info?.obj_child || [];
      obj_child = obj_child.filter((l: { input_type: number }) =>
        [1, 20, 58].includes(l.input_type)
      );
      AppointList = obj_child && AppointList.concat(obj_child);
    });
    return AppointList;
  };
  const AppointList = useMemo(() => getAppoint(), [getAppoint]);

  // 当前表单选项
  const _options = [
    ...(itemList
      ?.map(l => {
        const { name, element_id, input_type } = l;
        return { name, element_id, input_type };
      })
      ?.filter(o => [1, 20, 58].includes(o.input_type) && itemInfo.element_id !== o.element_id) ||
      []),
    ...AppointList
  ];

  // 基础属性
  const commonForm = {
    border: false,
    layout: "vertical",
    config_content: false,
    rules: {
      required: true
    }
  };

  // 联动表单
  const renderForm = {
    ...commonForm,
    input_type: "Select",
    label: "联动表单",
    name: "refer_entity_id",
    is_required: 1,
    options: TemplateList?.map((o: { id: any; name: any }) => {
      return {
        id: o.id,
        name: o.name
      };
    })
  };

  console.log("_options", _options);

  // 当前表单字段（包含引用）
  const renderCurrentForm = {
    ...commonForm,
    input_type: "Select",
    label: "",
    show_required: false,
    name: "condition_current_entity_element",
    is_required: 1,
    className: "flex-item",
    value_key: "element_id",
    options: _options
  };

  // 获得选中的当前字段的 input_type
  const getInputType = () => {
    const _value = condition_current_entity_element;
    const obj = _value && _options.find(o => o.element_id === _value);
    return obj ? obj.input_type : "";
  };

  // 获取当前表单字段
  const current_input_type = useMemo(() => getInputType(), [getInputType]);

  // 联动表单字段值
  const renderFormChild = {
    ...commonForm,
    input_type: "Select",
    label: "",
    show_required: false,
    className: "flex-item",
    name: "condition_refer_entity_element",
    is_required: 1,
    options:
      childdefaultList
        ?.map((l: any) => {
          const { id, name, value, element_id, input_type } = l;
          return { id, name, value, element_id, input_type };
        })
        ?.filter((o: { input_type: number }) => o.input_type === current_input_type) || []
  };

  // 联动等于  “下拉选择、单行文本、部门选择、人员选择"-[1, 3, 20, 58]
  const renderFormLink = {
    ...commonForm,
    input_type: "Select",
    label: "",
    name: "refer_entity_element",
    is_required: 1,
    className: "ml10",
    options:
      childdefaultList
        ?.map((l: any) => {
          const { id, name, value, input_type } = l;
          return { id, name, value, input_type };
        })
        ?.filter((o: { input_type: number }) => [1, 3, 20, 58].includes(o.input_type)) || []
  };

  return (
    <Modal width={480} title="设置数据联动" visible={true} onOk={onOk} onCancel={onCancel}>
      <Spin spinning={loading}>
        <FormContext {...methods}>
          <div className={styles["flow-state"]}>
            <form>
              {onRenderHooks(renderForm, _itemInfo)}
              <Row className={styles.t_header}>
                <Col span={12}>
                  <span className={styles.red}>*</span>
                  <span className={styles.t_title}>当前表单字段值</span>
                </Col>
                <Col span={12} className={styles.before_border}>
                  <span className={styles.red}>*</span>
                  <span className={styles.t_title}>联动表单字段值</span>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <div className={styles.item}>
                    {onRenderHooks(renderCurrentForm, _itemInfo)}
                    <span className={styles.item_text}>等于</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.item}>
                    {onRenderHooks(renderFormChild, _itemInfo)}
                    <span className={styles.item_text}>时</span>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={6} className={classnames(styles.text, "text-ellipsis")}>
                  {itemInfo?.name}
                </Col>
                <Col span={4} className={classnames(styles.text, "text-ellipsis")}>
                  联动等于
                </Col>
                <Col span={13}>{onRenderHooks(renderFormLink, _itemInfo)}</Col>
              </Row>
            </form>
          </div>
        </FormContext>
      </Spin>
    </Modal>
  );
};

function mapStateToProps({ treelist = [], editTemplate = {}, loading = {} }: IMapProps) {
  const { effects, models } = loading;
  return {
    treelist,
    btnLoading: effects["editTemplate/editTemplate"],
    gLoading: models["editTemplate"]
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // 初始化业务
    onInit() {
      dispatch({
        type: "treelist/updateState",
        payload: {
          business_template_detail: {}
        }
      });
    },
    // 获得表单
    getTemplate(payload = {}) {
      dispatch({
        type: "treelist/getTemplate",
        payload
      });
    },
    //
    async onLoadData(payload = {}) {
      await dispatch({
        type: "treelist/getTemplateChildByDefault",
        payload
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalItems);
