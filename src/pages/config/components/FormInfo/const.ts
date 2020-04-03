const Attribute = {
  // 是否继承父类层级表单
  ExtendsParentForm: {
    is_required: 2,
    options: [
      { id: 1, name: "是" },
      { id: 2, name: "否" }
    ],
    input_type: "SELECT",
    initialValue: 1
  },
  // 是否平台固定字段
  PlatformFixedFields: {
    is_required: 2,
    options: [
      { id: 1, name: "是" },
      { id: 2, name: "否" }
    ],
    input_type: "RADIO"
  },
  // 平台字段
  PlatFormField: {
    is_required: 2,
    input_type: "PlatFormField"
  },
  // 企业自定义字段个数限制
  FieldLimitNumber: {
    is_required: 2,
    label: "企业自定义字段个数限制",
    input_type: "InputNumber",
    name: "limit_extended",
    type_genre: "Integer",
    step: 1,
    defaultValue: 0,
    max: 10,
    min: 0
  },
  // 层级类型
  TierType: {
    is_required: 2,
    options: [
      { id: "LIST", name: "单层级" },
      { id: "TREE", name: "多层级" }
    ],
    input_type: "Text",
    is_select: true,
    label: "层级类型",
    disabled: true,
    name: "data_structure",
    defaultValues: "LIST"
  },
  // 表单模版
  FormTemplate: {
    is_required: 2,
    options: "formtemplate",
    input_type: "Select",
    initialValue: 1
  },
  // 描述
  Remark: {
    is_required: 2,
    label: "描述",
    name: "remark",
    input_type: "TextArea"
  }
};

export { Attribute };
