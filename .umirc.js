import { resolve } from "path";
import { apiConfig } from "./cli";
// ref: https://umijs.org/config/
const config = {
  treeShaking: true,
  theme: {
    "primary-color": "#4e8ef7",
    "font-size-base": "12px",
    "border-radius-base": "1px",
    "border-color-base": "#d2e4f4",
    "border-color-inverse": "@primary-color",
    "border-color-split": "#d2e4f4"
  },
  proxy: {
    "/api": {
      target: apiConfig,
      changeOrigin: true
    }
  },
  alias: {
    "@": resolve(__dirname, "./src"),
    "@utils": resolve(__dirname, "./src/utils"),
    "@pages": resolve(__dirname, "./src/pages"),
    "@config": resolve(__dirname, "./src/pages/config"),
    "@services": resolve(__dirname, "./src/services"),
    "@components": resolve(__dirname, "./src/components")
    // "@assets": resolve(__dirname, "./src/assets"),
    // "@models": resolve(__dirname, "./src/models"),
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: "umi-project",
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//
          ]
        },
        dll: {
          include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"]
        }
      }
    ]
  ]
};

export default config;
