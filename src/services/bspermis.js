import { admin } from "@utils/apiPrefix";
import { get, post, put, del } from "@utils/request";

// const BGADMIN = '/bg/admin';
// const GATEWAY = '/mid-end';
const GATEWAY = "/proxy/bpm-gateway";

// 获取合作企业列表
export async function getComEnterprises(params) {
  return get(`${admin}/bpm/enterprise/ref/list-cooperate-enterprises`, params);
}

// 获取组织机构树
export async function getOrgEnterprises(params) {
  return get(`${admin}/organizations/enterprise-tree`, params);
}

// 获取角色
export async function getAuthRoles(params) {
  return get(`${admin}/module-auth/roles/select-for-workflow`, params);
}

// 获取人员树
export async function getUserTree(params) {
  return get(`${admin}${GATEWAY}/datarule-service/content/query/user/tree/get`, params);
}

// 查询数据权限节点配置内容
export async function getDataRuleContent(params) {
  const { id } = params || {};
  if (!id) return {};
  return get(`${admin}${GATEWAY}/data-rule/common/node/content/${id}`, params);
}

// 创建数据权限节点配置内容
export async function postDataRuleContent(params) {
  return post(`${admin}${GATEWAY}/data-rule/common/node/content`, params);
}

// 修改数据权限节点配置内容
export async function putDataRuleContent(params) {
  return put(`${admin}${GATEWAY}/data-rule/common/node/content`, params);
}

// 删除数据权限节点配置内容
export async function delDataRuleContent(params) {
  const { id } = params || {};
  if (!id) return {};

  return del(`${admin}${GATEWAY}/data-rule/common/node/content/${id}`, params);
}

// 权限列表
export async function getDataRuleList(params) {
  return post(`${admin}${GATEWAY}/datarule-service/content/query/by-page`, params);
}
