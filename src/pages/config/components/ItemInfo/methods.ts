const BaseForm = ({ config_type, need_extends, is_extends, tree_key, primary_key, element_id }) => {
  return [
    {
      input_type: "Input",
      label: "名称",
      name: "name",
      is_required: 1,
      rules: {
        required: "名称为必填",
        maxLength: { value: 30, message: "名称最大限制是30个字符" }
      }
    },
    {
      input_type: "Checkbox",
      label: "字段权限",
      name: "field_permissions",
      defaultValue: [],
      className: "mb_20",
      disabled:
        (config_type === 2 && need_extends === 1) ||
        config_type === 3 ||
        (config_type === 5 && Number(is_extends) === 1),
      options: [
        {
          id: 1,
          name: "必填",
          hide: [12],
          disabled:
            (config_type === 2 && need_extends === 1) ||
            [tree_key, primary_key].includes(element_id)
        },
        {
          id: 2,
          name: "检索",
          hide_tabel: true,
          show: [1, 3, 6, 8, 20, 58],
          disabled: config_type === 2 && Number(is_extends) === 1
        },
        {
          id: 3,
          name: "固定",
          hide_tabel: true,
          hide_config: [2, 5, 6, 7],
          disabled: [tree_key, primary_key].includes(element_id)
        }
      ]
    }
  ];
};

const Defaults = {
  input_type: "Select",
  label: "默认值",
  name: "default_type",
  options: [
    { id: "custom", name: "自定义" },
    { id: "link", name: "数据联动" }
  ]
};

const CameraType = ({ config_type }) => {
  return {
    input_type: "Radio",
    label: "图片来源",
    name: "extended_info.picture_type",
    disabled: [1, 2, 5, 6].includes(config_type),
    defaultValue: [1, 2, 5, 6].includes(config_type) ? "camera" : "photo",
    options: [
      { id: "photo", name: "相机" },
      { id: "camera", name: "相机+照片" }
    ]
  };
};

const TimeType = id => {
  return {
    input_type: "Radio",
    label: "类型",
    name: "extended_info.date_type",
    is_required: 2,
    defaultValue: "date",
    disabled: !!id,
    options: [
      { id: "date", name: "日期" },
      { id: "time", name: "日期 时间" }
    ]
  };
};

const NumberLimit = id => {
  return {
    input_type: "Checkbox",
    label: "数值约束",
    name: "extended_info.number_type",
    is_required: 2,
    disabled: !!id,
    options: [
      { id: "can_decimal", name: "允许小数" },
      { id: "can_negative", name: "允许负数" }
    ]
  };
};

// 选择类型
const SelectType = id => {
  return {
    input_type: "Radio",
    label: "选择方式",
    name: "extended_info.select_type",
    is_required: 2,
    className: "mb_20",
    defaultValue: "single",
    disabled: !!id,
    options: [
      { id: "single", name: "单选" },
      { id: "multiple", name: "多选" }
    ]
  };
};

// 选择方式
const SelectDefault = disabled => {
  return {
    input_type: "Select",
    label: "选项",
    name: "extended_info.selectDefault",
    is_required: 1,
    defaultValue: 1,
    disabled,
    options: [
      { id: 1, name: "自定义" },
      { id: 2, name: "关联其他表单数据" }
    ]
  };
};

const IsCascade = {
  input_type: "Radio",
  label: "是否级联其层级表单",
  name: "extended_info.need_refer_ins_ext_form",
  is_required: 2,
  defaultValue: 2,
  className: "mb_20",
  options: [
    { id: 1, name: "是" },
    { id: 2, name: "否" }
  ]
};

const Tierselection = {
  input_type: "Radio",
  label: "层级选择控制",
  name: "extended_info.tree_option_control",
  is_required: 2,
  defaultValue: "end",
  className: "mb_20",
  options: [
    { id: "end", name: "最末级" },
    { id: "all", name: "各级均可" }
  ]
};

const AssociateForms = {
  input_type: "Checkbox",
  label: "关联",
  name: "is_associateForms",
  className: "mb_20",
  options: [{ id: 1, name: "关联其他表单数据" }]
};

const PickOptions = id => {
  return {
    input_type: "Radio",
    label: "数据录入方式",
    name: "extended_info.select_type",
    is_required: 1,
    className: "mb_20",
    disabled: !!id,
    defaultValue: "single",
    options: [
      { id: "single", name: "单选" },
      { id: "multiple", name: "多选" }
    ]
  };
};

const getField = (
  { input_type, parentId, element_id, config_type = 1, need_extends, is_extends, id },
  { tree_key, primary_key }
) => {
  let array: any = [];
  config_type = Number(config_type);
  const params = { config_type, need_extends, is_extends, tree_key, primary_key, element_id };
  switch (input_type) {
    case 1: // 输入框
      array = [...BaseForm(params)];
      break;
    case 2: // textArea
      array = [...BaseForm(params)];
      break;
    case 3: // select
      array = [...BaseForm(params), SelectType(id)];
      break;
    case 8: // 数字输入框
      array = [...BaseForm(params), NumberLimit(id)];
      break;
    case 5: // 相册
      array = [...BaseForm(params), CameraType(params)];
      break;
    case 6: // 日期
      array = [...BaseForm(params), TimeType(id)];
      break;
    case 12: // 表格
      array = [...BaseForm(params)];
      break;
    case 20: // 部门
      array = [...BaseForm(params), PickOptions(id)];
      break;
    case 58: // 人员
      array = [...BaseForm(params), PickOptions(id)];
      break;
    case 55: // 引用
      array = [...BaseForm(params)];
      break;
    default:
      array = [...BaseForm(params)];
  }
  return array;
};

const defaultValues = {
  input_type: "Input",
  label: "",
  name: "default_values[0]",
  className: "mt8",
  defaultValue: undefined,
  rules: {
    maxLength: { value: 30, message: "默认值最大限制是30个字符" }
  }
};

const defaultValueByInputType = {
  1: {
    default_values: [],
    extended_info: undefined
  },
  3: {
    child: [],
    extended_info: {
      refer_entity_id: undefined,
      refer_entity_elementsId: undefined,
      refer_entity_elements: undefined,
      need_refer_ins_ext_form: undefined,
      tree_option_control: undefined,
      refer_entity_instances: undefined
    }
  },
  12: {
    extended_info: undefined
  }
};

export {
  defaultValueByInputType,
  AssociateForms,
  SelectDefault,
  Defaults,
  getField,
  defaultValues,
  IsCascade,
  Tierselection
};
