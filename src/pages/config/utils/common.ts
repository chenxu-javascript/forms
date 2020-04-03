import { isArray } from "@utils/util";

// 指定对象 和路径 获得数据
function getValueByPath(obj: any, path: string) {
  var reg = /(?:(?:^|\.)([^\.\[\]]+))|(?:\[([^\[\]]+)\])/g;
  var names: string[] = [];
  var name: null | string[] = null;
  while ((name = reg.exec(path)) != null) {
    names.push(name[1] || name[2]);
  }
  var o = obj;
  for (var i = 0; i < names.length; i++) {
    o = o?.[names[i]];
    if (o === undefined) {
      return undefined;
    }
  }
  return o;
}

// 给对象设置值
function setValueByPath(obj: { [x: string]: any }, path: string, value: any) {
  var reg = /(?:(?:^|\.)([^\.\[\]]+))|(?:\[([^\[\]]+)\])/g;
  var names: string[] = [];
  var name: null | string[] = null;
  while ((name = reg.exec(path)) != null) {
    names.push(name[1] || name[2]);
  }
  if (names.length === 0) {
    return obj;
  }
  setValues(obj);
  function setValues(obj: { [x: string]: any }) {
    const key = names[0];
    obj[names[0]] = names.length === 1 ? value : obj[names[0]] || {};
    names.shift();
    if (names.length) {
      setValues(obj[key]);
    }
  }
  return obj;
}

export { getValueByPath, setValueByPath };
