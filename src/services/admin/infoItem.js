// 信息项配置
import { post, get } from "@utils/request";
import { admin } from "@utils/apiPrefix";
const PROXY = "/proxy/business-template";
// 信息项模板列表
export async function getInfoItemTemplates(params) {
  return post(`${admin}${PROXY}/business-template/form/template/get`, params);
}

// 信息项模板编辑
export async function putInfoItemTemplates(params) {
  return post(`${admin}${PROXY}/business-template/form/template`, params);
}

// 信息项模板基本信息
export async function getInfoItemTemplatesInfo({ tempalteId, enterprise_id = "0" }) {
  return get(`${admin}${PROXY}/business-template/form/template/get/${tempalteId}`, {
    enterprise_id: enterprise_id || "0"
  });
}

// 信息项模板配置信息
export async function getInfoItemTemplatesConfigs({ id, ...other }) {
  return get(`/info-item/templates/${id}/configs`, other);
}

// 信息项模板数据源列表
export async function getInfoItemDatasources(params) {
  return get("/info-item/data-sources", params);
}
