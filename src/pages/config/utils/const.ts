// config_type => entity_type 印射关系
const PlatFormTypeObj = [
  { config_type: 1, entity_type: "object", name: "对象-平台" },
  { config_type: 2, entity_type: "object", name: "对象-企业" },
  { config_type: 3, entity_type: "business", name: "功能-平台-业务字段" },
  { config_type: 4, entity_type: "workflow", name: "功能-平台-通用" },
  { config_type: 5, entity_type: "level_extra", name: "对象-企业-层级" },
  { config_type: 6, entity_type: "level_extra", name: "对象-平台-层级" },
  { config_type: 7, entity_type: "workflow", name: "功能-企业表单" }
];

const ItemTypes = {
  1: "Input",
  2: "TextArea",
  3: "Select",
  8: "InputNumber",
  5: "Image",
  6: "Date",
  17: "Upload",
  11: "Video",
  12: "Table",
  20: "Dept",
  55: "ObjForm",
  58: "User"
};
const ItemConfigListGroup = [
  {
    u_id: 1,
    name: "单行文本",
    input_type: 1,
    form_type: "Input",
    type: "base",
    icon: "icondanhangwenben1"
  },
  {
    u_id: 2,
    name: "多行文本",
    input_type: 2,
    form_type: "TextArea",
    type: "base",
    icon: "iconduohangwenben"
  },
  {
    u_id: 3,
    name: "下拉选择",
    input_type: 3,
    form_type: "Select",
    type: "base",
    icon: "iconxiala"
  },
  {
    u_id: 4,
    name: "数值输入",
    input_type: 8,
    form_type: "InputNumber",
    type: "base",
    icon: "iconshuzhishuru"
  },
  {
    u_id: 5,
    name: "图片",
    input_type: 5,
    form_type: "Image",
    type: "base",
    icon: "icontupian"
  },
  {
    u_id: 6,
    name: "日期时间",
    input_type: 6,
    form_type: "Date",
    type: "base",
    icon: "iconshijianriqi"
  },
  {
    u_id: 7,
    name: "文件上传",
    input_type: 17,
    form_type: "Upload",
    type: "base",
    icon: "iconwenjianshangchuan"
  },
  {
    u_id: 8,
    name: "语音",
    input_type: 11,
    form_type: "Video",
    type: "base",
    ishide: [1, 2, 5, 6],
    icon: "iconyinpin"
  },
  {
    u_id: 10,
    name: "人员选择",
    input_type: 58,
    form_type: "User",
    type: "enterprise",
    icon: "iconrenyuanxuanze"
  },
  {
    u_id: 9,
    name: "部门选择",
    input_type: 20,
    form_type: "Dept",
    type: "enterprise",
    icon: "iconbumenxuanze"
  },

  {
    u_id: 11,
    name: "引用对象",
    input_type: 55,
    form_type: "ObjFrom",
    type: "high",
    ishide: [2, 5, 6, 7],
    icon: "iconyinyongduixiang"
  },
  {
    u_id: 12,
    name: "表格",
    input_type: 12,
    form_type: "Table",
    type: "high",
    ishide: [1, 2, 5, 6],
    icon: "iconbiaoge1",
    child: []
  }
];

const ItemGroupList = [
  {
    name: "基础字段",
    type: "base"
  },
  {
    name: "高级字段",
    type: "high"
  },
  {
    name: "企业字段",
    type: "enterprise"
  }
];

// 拖拽类型
const DragTypes = "item";

const BaseForm = [
  {
    input_type: "Input",
    label: "名称",
    name: "name",
    is_required: 1
  },
  {
    input_type: "Checkbox",
    label: "字段权限",
    name: "field_permissions",
    options: [
      { id: 1, name: "必填" },
      { id: 2, name: "检索" },
      { id: 3, name: "固定" }
    ]
  }
];

// 平台-表单属性
// Attribute.TierType

export { BaseForm, ItemTypes, DragTypes, ItemGroupList, PlatFormTypeObj, ItemConfigListGroup };
