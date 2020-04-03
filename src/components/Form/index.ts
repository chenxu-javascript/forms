// 工程化 导入 导出

const files = require.context("./", true, /\.tsx$/);
const modules = {};
files.keys().forEach(key => {
  console.log(files(key));
  modules[key.replace(/(\.\/|\/index.tsx)/g, "")] = files(key).default;
});
export default modules;
