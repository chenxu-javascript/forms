const renderFiled = (options: any[]) => {
  return {
    name: "primary_key",
    label: "字段",
    is_required: 1,
    value_key: "element_id",
    input_type: "Select",
    className: "mt15",
    options: options.map(o => {
      const { id, name, element_id } = o;
      return { id, name, element_id };
    })
  };
};

const renderFiledTree = (options: any[], IconFont: JSX.Element) => {
  return {
    name: "tree_key",
    label: "树形展示字段",
    extend_text: "字段须满足条件： 固定、必填",
    is_required: 1,
    value_key: "element_id",
    input_type: "Select",
    IconFont,
    options: options.map(o => {
      const { id, name, element_id, input_type } = o;
      return { id, name, element_id, input_type };
    })
  };
};

const isCanAddEntiy = {
  input_type: "Radio",
  label: "是否带层级表单",
  name: "can_add_entity",
  is_required: 2,
  className: "mb_20",
  defaultValue: "2",
  options: [
    { id: 1, name: "是" },
    { id: 2, name: "否" }
  ]
};

const FormTypeSelect = {
  input_type: "Select",
  label: "类型",
  name: "primary_type",
  is_required: 1,
  className: "mt15",
  defaultValue: "global",
  options: [
    { id: "global", name: "全局唯一" },
    { id: "level", name: "同一层级下唯一" }
  ]
};

const isCanAddParent = {
  input_type: "Radio",
  label: "加载父类层级表单",
  name: "can_add_parent",
  is_required: 2,
  className: "mb_20",
  defaultValue: "2",
  options: [
    { id: 1, name: "是" },
    { id: 2, name: "否" }
  ]
};

const Unique_value = {
  input_type: "Checkbox",
  label: "",
  name: "unique_value",
  className: "mb_20",
  is_required: 2,
  options: [{ id: 1, name: "值唯一性校验" }]
};

export {
  Unique_value,
  isCanAddParent,
  renderFiled,
  isCanAddEntiy,
  FormTypeSelect,
  renderFiledTree
};
