import { admin } from "@utils/apiPrefix";
import { post, put, get, del } from "@utils/request";

const GATEWAY = "/proxy/bpm-gateway";
const TEMPLATE = "/proxy/business-template";

// 获取产品业务线
export async function getBusinessTemplate(params) {
  return await post(`${admin}${TEMPLATE}/business-template/business/code/get`, params);
}
// 获取业务模版
export async function getBusinessList(params) {
  return await post(`${admin}${TEMPLATE}/business-template/business/template/get`, params);
}
// 获取业务模版
export async function getBusinessListAll(params) {
  return await get(`${admin}${TEMPLATE}/business-template/business/template/get`, params);
}
// 创建业务模板
export async function createTemplate(params) {
  return await post(`${admin}${TEMPLATE}/business-template/business/template`, params);
}
// 更新业务模板
export async function updateTemplate(params) {
  return await put(`${admin}${TEMPLATE}/business-template/business/template`, params);
}
// 根据ID获取业务模版
export async function getTemplateByID(params) {
  return await get(`${admin}${TEMPLATE}/business-template/business/template/get-by-id`, params);
}
// 获取表单列表
export async function getBusindessTemplate(params) {
  return await post(`${admin}${TEMPLATE}/business-template/form/template/get`, params);
}

// 复制流程模版
export async function onCopyTemplate(params) {
  return await del(`${admin}${TEMPLATE}/business-template/workflow/template/copy`, params);
}
// 获取流程模板列表
export async function getWithBusinessTempList(params) {
  return await post(
    `${admin}${TEMPLATE}/business-template/workflow/template/get-with-business-template`,
    params
  );
}
// 获取流程模板列表 get
export async function getWorkFlowTemplate(params) {
  return await get(`${admin}${TEMPLATE}/business-template/workflow/template/get`, params);
}
// 获取流程模板列表 post
export async function postWorkFlowTemplate(params) {
  return await post(`${admin}${TEMPLATE}/business-template/workflow/template/get`, params);
}
//  删除流程模版
export async function delWorkFlowTemplate(params) {
  const { id } = params || {};
  if (!id) return {};
  return await del(`${admin}${TEMPLATE}/business-template/workflow/template/${id}`);
}
// 新增流程模板配置
export async function saveWorkflowTemplate(params) {
  return await post(`${admin}${GATEWAY}/bt/business-template/workflow/template/save`, params);
}
//  根据流程主键ID查看当前流程详情
export async function getWorkflowTemplateDetail(params) {
  const { id } = params || {};
  if (!id) return {};
  return await get(`${admin}${GATEWAY}/bt/business-template/workflow/template/get/${id}`);
}
//  获取业务编码列表
export async function getWorkflowTemplateBusiness(params) {
  return await post(`${admin}${TEMPLATE}/business-template/business/code/get`, params);
}
//  根据业务编码获取功能编码列表
export async function getWorkflowTemplatefunction(params) {
  return await get(
    `${admin}${TEMPLATE}/business-template/business/function/get-by-business-code`,
    params
  );
}
// 按钮触发业务
export async function getBusinessParaList(params) {
  return await get(`${admin}${GATEWAY}/bpm/business/para-config`, params);
}
