import { get, post } from "@utils/request";
import { admin } from "@utils/apiPrefix";

//
const BGADMIN = "/bg/admin";
// const GATEWAY = '/mid-end';
const GATEWAY = "/proxy/bpm-gateway";

// 获取企业列表
export async function getCommonEnterprises(params: any) {
  return get(`${admin}/common/enterprises`, params);
}

// 获取产品线
export async function getCommonProducts(params: any) {
  return get(`${admin}/common/products`, params);
}

// 表单定义分页查询
export async function postFormPage(params: any) {
  return post(`${admin}${GATEWAY}/form/page/domain-entity`, params);
}

// 表单详情-查询同名
export async function getSameName(params: any) {
  const { type, name, alias } = params || {};
  if (!type || !name || !alias) return {};
  return get(`${admin}${GATEWAY}/form/${type}/same/${name}/domain-entity/${alias}`, params);
}

// 从平台新增对象表单
export async function postPlatfromEntity(params: any) {
  return post(`${admin}${GATEWAY}/form/refer/platform/domain-entity`, params);
}

// 实例数据树形结构
export async function getFormTreePage(params: any) {
  return get(`${admin}${GATEWAY}/form/tree/entity/instance`, params);
}

// 实例数据-分页查询
export async function postFormInstance(params: any) {
  // return post(`${admin}${GATEWAY}/form/page/entity/instance`, params);
  return post(`${admin}${GATEWAY}/form-service${BGADMIN}/form/page/entity/instance`, params);
}

// 实例数据保存
export async function saveFormInstance(params: any) {
  return post(`${admin}${GATEWAY}/form-service/bg/form/save/entity/instance`, params);
}

// 实例数据查询(当前)
export async function getCurFormInstance(params: any) {
  const { entity_id } = params || {};
  if (!entity_id) return {};
  return get(`${admin}${GATEWAY}/form-service${BGADMIN}/form/get/${entity_id}/instance`, params);
}

// 实例数据批量删除
export async function deleteFormInstance(params: any) {
  return post(`${admin}${GATEWAY}/form/delete/entity/instance`, params);
}

// 添加平台实例数据
export async function addPlatformInstance(params: any) {
  return post(`${admin}${GATEWAY}/form/include/entity/instance`, params);
}
