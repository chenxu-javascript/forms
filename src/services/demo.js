import { admin, bize } from "@utils/apiPrefix";

import { get } from "@utils/request";

// 查询企业列表
export async function getEnterprises(params) {
  return get(`${admin}/common/enterprises`, params);
}

// 查询合作企业列表
export async function getCooEnterprises(params) {
  return get(`${bize}/enterprises/cooperate-enterprises`, params);
}
