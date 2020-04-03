const argh = require("argh");
const { HOST } = process.env || {};
const { admin, bize } = argh(process.argv) || {};

/**
 * 用户后台相关配置
 */
const bizeServer = {
  dev: "http://client-app.yunsom.space",
  test: "http://scm3.yunsom.cn",
  test2: "http://scm3-2.yunsom.cn",
  "dev-mid.yunsom.space": { env: "dev", api: "http://client-app.yunsom.space" },
  "dev-mid.yunsom.cn": { env: "test", api: "http://scm3.yunsom.cn" },
  "dev-mid2.yunsom.cn": { env: "test", api: "http://scm3-2.yunsom.cn" }
};

/**
 * 运营后台相关配置
 * */
const adminServer = {
  dev: "http://admin.scm3.yunsom.space",
  test: "http://admin.scm3.yunsom.cn",
  test2: "http://admin.scm3-2.yunsom.cn",
  "dev-mid.scm3.yunsom.space": { env: "dev", api: "http://admin.scm3.yunsom.space" },
  "dev-mid.scm3.yunsom.cn": { env: "test", api: "http://admin.scm3.yunsom.cn" },
  "dev-mid.scm3-2.yunsom.cn": { env: "test", api: "http://admin.scm3-2.yunsom.cn" }
};

/**
 * 相关环境匹配
 * */
const theme = {
  "font-size-base": "14px",
  "primary-color": "#4e8ef7",
  "border-radius-base": "1px",
  "border-color-base": "#d2e4f4",
  "border-color-split": "#d2e4f4",
  "tree-node-selected-bg": "#7ab2ff",
  "border-color-inverse": "@primary-color"
};
let define = { "process.env.NODE_ENV": "test" };
let apiConfig = "http://admin.scm3.yunsom.cn";
// argh命名匹配
define = { "process.env.NODE_ENV": admin || bize || "dev" };
let bizeApiConfig = bizeServer[bize] || "http://scm3.yunsom.cn";
let adminApiConfig = adminServer[admin] || "http://admin.scm3.yunsom.cn";
if (admin) {
  apiConfig = adminApiConfig;
} else if (bize) {
  apiConfig = bizeApiConfig;
}
// HOST命令匹配
if (HOST) {
  let curServer = {};
  if (HOST.indexOf("scm3") > -1) {
    curServer = adminServer[HOST] || {};
  } else {
    curServer = bizeServer[HOST] || {};
  }
  const { api, env } = curServer;
  apiConfig = api;
  define = { "process.env.NODE_ENV": env };
}

module.exports = { apiConfig, define, theme };
