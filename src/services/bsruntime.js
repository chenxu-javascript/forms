import { admin } from "@utils/apiPrefix";
import { get, post } from "@utils/request";

// const BGADMIN = '/bg/admin';
// const GATEWAY = '/mid-end';
const GATEWAY = "/proxy/bpm-gateway";

// 查询开始节点详情
export async function getGnrWfInsStartDetail(params) {
  return get(`${admin}${GATEWAY}/general/process/wf/ins/node/start/detail`, params);
}

// 查询待办节点详情
export async function getGnrWfInsWaitDetail(params) {
  return get(`${admin}${GATEWAY}/general/process/wf/ins/node/start/detail`, params);
}

// 查询下一步节点处理人或指派人
export async function getGnrWfTaskNodeHandler(params) {
  return get(`${admin}${GATEWAY}/general/process/wf/task/next-node/handler`, params);
}

// 运行时数据提交
export async function postInsNodesOperation(params) {
  return post(`${admin}${GATEWAY}/wf/ins/nodes-operation`, params);
}
