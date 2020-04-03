import { admin } from "@utils/apiPrefix";
import { get, post, put, del } from "@utils/request";
//
const BGADMIN = "/bg/admin";
const GATEWAY = "/proxy/bpm-gateway";
//

// 流程模板详情
export async function getworkflowTempDetail(params) {
  const { id, wf_pattern } = params || {};
  if (!id || !wf_pattern) return {};
  return get(`${admin}${GATEWAY}/bt/business-template/workflow/template/get/${id}/${wf_pattern}`);
}
// 流程历史版本
export async function getworkflowHistory(params) {
  return get(`${admin}/wf/config/history`, params);
}
// 删除流程
export async function deleteWorkflow(params) {
  const { wf_object_id } = params || {};
  if (!wf_object_id) return {};

  return del(`${admin}/wf/config/${wf_object_id}`, params);
}
// 复制通知
export async function putNoticeCopy(params) {
  return put(`${admin}${GATEWAY}/bpm/notice/copy`, params);
}

// ==========================  流程通知start  ==============================//
// 获取流程通知列表
export async function getWfNoticeList(params) {
  return post(`${admin}${GATEWAY}/bpm/notice/config/list`, params);
}

// 新增通知
export async function postWfNotice(params) {
  return post(`${admin}${GATEWAY}/bpm/notice/config/add`, params);
}

// 根据通知id编辑通知
export async function putWfNotice(params) {
  return put(`${admin}${GATEWAY}/bpm/notice/config/edit`, params);
}

// 根据通知id删除通知
export async function delWfNotice(params) {
  const { id } = params || {};
  if (!id) return {};
  return del(`${admin}${GATEWAY}/bpm/notice/config/${id}`);
}

// 获取流程通知模板
export async function getWfNoticeTemp(params) {
  return get(`${admin}${GATEWAY}/bpm/notice/config/template`, params);
}

// 获取流程通知模板
export async function getWfNodeList(params) {
  const { wf_object_id } = params || {};
  if (!wf_object_id) return {};
  return get(`${admin}/wf/config/${wf_object_id}/node-info`, params);
}
//

// ===========================  流程通知end  ===============================//

// ==========================  通用流程start  ==============================//
// 通用流程详情
export async function getWfGeneralDetail(params) {
  const { wf_object_id } = params || {};
  return get(`${admin}${GATEWAY}/wf/config/general/wf_object_id`, { wf_object_id });
}
// 新增 通用流程 或 通用流程模板
export async function postWfGeneral(params) {
  return post(`${admin}${GATEWAY}/wf/config/general`, params);
}
// 表单定义-分页查询
export async function postFormEntity(params) {
  // return post(`${admin}${GATEWAY}/form/page/domain-entity`, params);
  return post(`${admin}${GATEWAY}/business-template/form/template/get`, params);
}
// 获取表单详情
export async function postFormEntityDetail(params) {
  const { entity_id } = params || {};
  if (!entity_id) return {};
  return get(`${admin}${GATEWAY}/form-service${BGADMIN}/form/get/${entity_id}/instance`, params);
}
// ===========================  通用流程end  ===============================//
