import { post, get } from "@utils/request";
import { admin } from "@utils/apiPrefix";

// const GATEWAY = '/proxy/bpm-gateway';
const TEMPLATE = "/proxy/business-template";
const PROXY = "/proxy/form";
const GATEWAY = "/proxy/bpm-gateway";

// 保存信息项模板基本信息
export async function postTemplate(params: any) {
  return post(`${admin}${PROXY}/form/define/domain-entity`, params);
}

// 保存信息项模板基本信息
export async function postTemplateBusiness(params: any) {
  return post(`${admin}${TEMPLATE}/business-template/form/template/save/entity`, params);
}

// 获取表单
export async function getTemplate(params: any) {
  return post(`${admin}${PROXY}/form/page/domain-entity`, params);
}
// 获取表单字段
export async function getTemplateField(params: any) {
  const { enterprise_id, entity_id } = params || {};
  return post(
    `${admin}${PROXY}/form/detail/edit/${enterprise_id || 0}/domain-entity/${entity_id}`,
    params
  );
}

// 获取表单字段
export async function getEntityInstance(params: any) {
  return get(`${admin}${PROXY}/form/tree/entity/instance`, params);
}

// 获取组织架构
export async function getOrganizationsTree(params: any) {
  return get(`${admin}${GATEWAY}/user-service/organizations/trees`, params);
}

// 用户获得通过组织架构
export async function getOrganizationsUsers(params: any) {
  return get(`${admin}${GATEWAY}/user-service/organizations/users`, params);
}
// 用户获得通过角色
export async function getRoleUsers(params: any) {
  return get(`${admin}${GATEWAY}/user-service/all/roles`, params);
}

// 用户获得通过角色
export async function getAllUsers(params: any) {
  return post(`${admin}${GATEWAY}/form-service/from/php/get/user/name`, params);
}
