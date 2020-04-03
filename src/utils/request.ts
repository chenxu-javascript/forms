import qs from "qs";
// import fetch from "dva/fetch";
import fetch from "isomorphic-fetch"; // @issue:  https://github.com/dvajs/dva/issues/2000
import { getFormStorage } from "@utils/util";
import { TRUE_CODE, FETCT_TIME_OUT } from "./config";

function parseJSON(response: any) {
  return new Promise((resolve, reject) => {
    response
      .json()
      .then((json: any) => {
        json._SERVER_URL = response.url;
        resolve(json);
      })
      .catch((error: any) => {
        if (error instanceof SyntaxError) {
          reject({ message: "无法转为json", url: response.url || "" });
        } else {
          reject(error);
        }
      });
  });
}

function checkStatus(response: any) {
  let { url, status } = response || {};
  status = Number(status);

  if (status >= 200 && status < 300) {
    return response;
  } else {
    let error: any;
    switch (status) {
      case 401:
        error = { message: "登录已过期", url };
        break;
      case 503:
        error = { message: "模块服务不可用", url };
        break;
      default:
        error = { message: "请求服务器出错", url };
        break;
    }
    throw error;
  }
}

function checkError(response: any) {
  const { code, message, _SERVER_URL, data } = response;
  if (code !== TRUE_CODE) {
    // eslint-disable-next-line no-throw-literal
    throw { code, message, url: _SERVER_URL };
  } else if (data && data.code && data.code !== "000000") {
    const { message: cur_message, code: cur_code } = data || {};
    // eslint-disable-next-line no-throw-literal
    throw { message: cur_message || "服务异常", code: cur_code, url: _SERVER_URL };
  } else {
    return data && data.code ? data : response;
  }
}
const request = async(url: string, params: any) => {
  const { method = "GET", body, ...other } = params || {};
  let newParams = { method, credentials: "include", ...other };
  if (method !== "GET") {
    if (!(body instanceof FormData)) {
      newParams.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newParams.headers
      };
      newParams.body = JSON.stringify(body);
    }
  } else {
    // 增加时间戳 避免IE缓存 仅 GET
    const t = new Date().getTime();
    const new_query = { ...body, t };
    url = `${url}?${qs.stringify(new_query)}`;
  }
  newParams.headers = {
    ...newParams.headers,
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    credentials: "include",
    REFAPPID: getFormStorage("bizCode") || undefined
  };
  newParams.mode = "cors";
  const timeout = newParams.timeout || FETCT_TIME_OUT;
  return await Promise.race([
    fetch(url, newParams)
      .then(checkStatus)
      .then(parseJSON)
      .then(checkError)
      .catch((err: any) => {
        throw err;
      }),
    new Promise(function(resolve, reject) {
      setTimeout(reject, timeout, { message: "请求超时" });
    })
  ]);
};

export async function get(path: string, params: any) {
  return await request(path, { method: "GET", body: params });
}

export async function del(path: string, params: any) {
  return await request(path, { method: "DELETE", body: params });
}

export async function put(path: string, params: any) {
  return await request(path, { method: "PUT", body: params });
}

export async function post(path: string, params: any) {
  return await request(path, { method: "POST", body: params });
}
