import qs from "qs";

/**
 * 是否为空
 * @param {*} val
 */
const isEmpty = (val: any): boolean => {
  if (val == null) return true;
  if (val === "") return true;
  if (typeof val === "string" && !val["length"]) return true;
  if (val instanceof Array && !val["length"]) return true;
  if (val instanceof Object && !(val instanceof Array) && !Object.keys(val).length) return true;

  return false;
};

/**
 * 是否为数组且数组长度>0
 * @param {*} arr
 */
const isArray = (arr: any): boolean => {
  return arr && arr instanceof Array && !!arr["length"];
};

/**
 * 是否为对象 且不为空
 * @param {*} obj
 */
const isObject = (obj: any): boolean => {
  return obj && obj instanceof Object && !(obj instanceof Array) && !!Object.keys(obj).length;
};

/**
 * 是否为字符串 且不为空
 * @param {*} obj
 */
const isString = (str: any): boolean => {
  return str && typeof str === "string";
};

/**
 * 对象数组根据key去重
 * @param {*} array
 * @param {*} key
 */
const uniqWith = (arr: [], key: any = "id") => {
  if (!(arr instanceof Array)) {
    return [];
  } else {
    let result = {};
    let finalResult: any = [];
    for (let i = 0; i < arr.length; i++) {
      result[arr[i][`${key}`]] = arr[i];
    }
    for (let item in result) {
      finalResult.push(result[item]);
    }
    return finalResult;
  }
};

/**
 * 求两个数组的差集
 * @param {*} array
 * @param {*} key
 */
const subSet = (arr1: [], arr2: []) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  let subset: [] = [];

  for (let item of set1) {
    if (!set2.has(item)) {
      subset.push(item);
    }
  }

  return subset;
};

/**
 * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
 * @param {*} array
 * @param {*} key
 */
const chunk = (arr: any, size: number) => {
  size = Number(size);
  if (!isArray(arr) || size <= 0) {
    return arr;
  } else {
    let chunks = [];
    for (let i = 0; i < arr.length; i = i + size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
};

/**
 * 是否为树形结构
 * @param {*} obj
 */
const isTreeData = (data: any, son = "children") => {
  //
  if (!isObject(data) && !isArray(data)) return false;

  if (isObject(data)) {
    return isArray(data[son]);
  }

  const data_obj = arrayTile(data, son) || {};
  let has_tree = false;
  for (let key in data_obj) {
    const cur_val = data_obj[key] || {};
    if (isArray(cur_val[son])) {
      has_tree = true;
      return true;
    }
  }
  //
  return has_tree;
};

/**
 * 是否为函数
 * @param {*} obj
 */
const isFunction = (fun_name: any): boolean => {
  return fun_name && typeof fun_name === "function";
};

/**
 * 数组平铺
 * @param {*} arr
 */
const arrayTile = (arr: any, key = "id", son = "children") => {
  if (!isArray(arr)) return {};
  let obj = {};

  const deepTile = (arr: any) => {
    arr.forEach((xo: any) => {
      const new_key = xo[key];
      const new_son = xo[son];
      if (new_key) {
        obj[new_key] = xo;
      }
      if (isArray(new_son)) {
        deepTile(new_son);
      }
    });
  };

  deepTile(arr);

  return obj;
};

/**
 * 是否为有效value
 * @param {*} value
 */
const validValue = (value: any): boolean => {
  return value != null && `${value}` !== "" && `${value}` !== " ";
};

/**
 * qsParse
 * @param {*} params
 */
const qsParse = (params: any) => {
  let search = "";

  if (isString(params)) {
    search = params;
  } else if (isObject(params) && params["search"]) {
    search = params["search"];
  } else if (isObject(params) && isObject(params["location"])) {
    search = params["location"]["search"] || "";
  } else {
    search = "";
  }

  return qs.parse(search, { ignoreQueryPrefix: true });
};

/**
 * qsString
 * @param {*} params
 */
const qsString = (params: any) => {
  if (!isObject(params)) return "";

  return qs.stringify(params);
};

/**
 * 对象有key 但所有key的value都为空
 * @param {*} val
 */
const objNoValue = (val: { [x: string]: any }) => {
  if (!isObject(val) || isEmpty(val)) return true;

  let has_value = true;
  for (let key in val) {
    if (validValue(val[key])) has_value = false;
  }

  return has_value;
};

/**
 * 深度递归搜索
 * @param {Array} arr 你要搜索的数组
 * @param {Function} filterFn 回调函数，必须返回谓词，判断是否找到了。会传入(item)1个参数
 * @param {String} child 子数组的key
 */

const deepFun = (tree: { [x: string]: any }, filterFn: (arg0: any) => any, child: string) => {
  if (filterFn(tree)) {
    return {
      ...tree,
      [`${child}`]: undefined
    };
  } else {
    const deep_tree = tree[`${child}`];
    let new_tree: any[] = [];
    isArray(deep_tree) &&
      deep_tree.forEach((xo: any) => {
        const new_tree_item = deepFun(xo, filterFn, child);
        new_tree_item && new_tree.push(new_tree_item);
      });
    return isArray(new_tree)
      ? {
          ...tree,
          [`${child}`]: new_tree
        }
      : null;
  }
};

const deepFilter = (arr: any, filterFn: any, child = "children") => {
  if (!isArray(arr) || !isFunction(filterFn)) {
    return arr;
  } else {
    const old_arr = JSON.parse(JSON.stringify(arr));
    let new_arr: any[] = [];
    old_arr.forEach((item: any) => {
      const new_item = deepFun(item, filterFn, child);
      new_item && new_arr.push(new_item);
    });
    return new_arr;
  }
};

// 对象是否含有某几个属性
const objHasProp = (obj: { hasOwnProperty: (arg0: any) => any }, props: any[]) => {
  if (!isObject(obj) || !isArray(props)) {
    return false;
  }

  let has = true;
  props.forEach((xo: any) => {
    if (!obj.hasOwnProperty(xo)) {
      has = false;
      return;
    }
  });

  return has;
};

/**
 * 存入localStorage
 * @param {*} obj
 */
const saveToStorage = (id: string, value: any) => {
  if (id && localStorage && localStorage.setItem) {
    localStorage.setItem(id, JSON.stringify(value));
  } else {
    return;
  }
};

/**
 * 从localStorage取
 * @param {*} obj
 */
const getFormStorage = (id: string) => {
  if (id && localStorage && localStorage.setItem) {
    const value = localStorage.getItem(id);
    return value ? JSON.parse(value) : null;
  } else {
    return null;
  }
};

/**
 * 是否为经过JSON.stringify()
 * @param {*} str
 */
const isJSONStringify = (str: string | string[]) => {
  if (!str) return false;

  if (!(typeof str === "string")) return false;

  if (str.indexOf("{") === 0 || str.indexOf("[{") === 0) return true;

  return false;
};

/**
 * 获取Dom到页面左侧的距离
 * @param {*} element
 */
const getElementLeft = (element: { offsetLeft: any; offsetParent: any }) => {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
};

/**
 * 获取FormItem的值
 * @param {*} form_key
 * @param {*} form
 */
const getFormItemValue = (form_key: any, form: { getFieldValue: any }) => {
  if (!form_key) return null;
  const { getFieldValue } = form;

  return !getFieldValue ? null : getFieldValue(`${form_key}`);
};

/**
 * 设置FormItem的值
 * @param {*} form_key
 * @param {*} value
 * @param {*} props
 */
const setFormItemValue = (form_key: any, value: any, form: { setFieldsValue: any }) => {
  if (!form_key) return null;
  const { setFieldsValue } = form;

  setFieldsValue && setFieldsValue({ [`${form_key}`]: value });
};

/**
 * 循环检测 达成条件 回调fn
 * @param {*} fn
 * @param {*} cod
 */
const bsRunWhen = (fn: { (value?: unknown): void; (): void }, cod: () => any) => {
  if (cod()) {
    fn();
    return;
  }

  var i = 0;
  var interval = setInterval(function() {
    i++;
    if (i > 500) {
      clearInterval(interval);
    } else if (cod()) {
      fn();
      clearInterval(interval);
    }
  }, 30);
};

const bsCheck = (cod: any) => {
  return new Promise(function(resolve, reject) {
    bsRunWhen(resolve, cod);
  });
};

const bsPromise = function(data: unknown, time: any) {
  return new Promise(function(resolve) {
    if (time) {
      setTimeout(function() {
        resolve(data);
      }, time || 1);
    } else {
      resolve(data);
    }
  });
};

const bsWait = function(time: number) {
  return bsPromise(null, time);
};

/**
 * 通过event对象获取组件value，主要解决ie9兼容的问题
 * @param {Event} evt
 */
const getValueFromEvent = (evt: { target: { value: any }; currentTarget: { value: any } }) =>
  evt.target.value || evt.currentTarget.value || "";
const noop = () => {};

/**
 * 获取唯一id
 */
const generate = require("nanoid/generate");
const getUUid = () => {
  return generate("1234567890abcdefghigklmnuvwxyzABCEDFGHIJKLMNUVWXYZ", 32);
};

/**
 * 根据文件名获取文件扩展名
 * @param {string} fileName 文件名
 * @param {boolean} [widthDot=true] 返回扩展是否带.
 * @returns
 */
const getFileExtName = (fileName: string, widthDot = true) => {
  if (!fileName) return "";
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) return "";
  return fileName.substr(widthDot ? lastDotIndex : lastDotIndex + 1).toLowerCase();
};

/**
 * 交换数组元素
 * @param {Array} array 数组
 * @param {number} currentIdx 当前元素索引
 * @param {number} targetIdx 目标元素索引
 * @returns {Array} 交互后的数组
 */
const arraySwap = (
  array: string | any[],
  currentIdx: string | number,
  targetIdx: string | number
) => {
  if (!(array && array.length)) return [];
  const arrayCopy = [...array];
  [arrayCopy[currentIdx], arrayCopy[targetIdx]] = [arrayCopy[targetIdx], array[currentIdx]];
  return arrayCopy;
};

/**
 * 调整当前元素位置到指定偏移量
 * @param {Array} array 当前元素所在数组
 * @param {number} currentIdx 当前元素索引
 * @param {number} offset 元素位置偏移量 n(往后移动n位) -n(往前移动n位)
 * @returns {Array} 改变当前元素顺序后的数组
 */
const arrayItemOffset = (array: any, currentIdx: any, offset: any) => {
  const targetIdx = currentIdx + offset;
  return arraySwap(array, currentIdx, targetIdx);
};

/**
 * 防抖
 * @param {*} cb
 * @param {*} waitTime
 * @param {*} immediate
 */
const debounce = (
  cb: { apply: (arg0: any, arg1: IArguments) => void },
  waitTime: number,
  immediate = false
) => {
  var timeout: NodeJS.Timeout | null;
  return function(this: any) {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        cb.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, waitTime);
    if (callNow) {
      cb.apply(context, args);
    }
  };
};

export {
  noop,
  chunk,
  bsWait,
  subSet,
  isEmpty,
  isArray,
  getUUid,
  bsCheck,
  qsParse,
  debounce,
  uniqWith,
  isObject,
  isString,
  qsString,
  bsPromise,
  bsRunWhen,
  arrayTile,
  isTreeData,
  objHasProp,
  isFunction,
  validValue,
  objNoValue,
  deepFilter,
  saveToStorage,
  getFileExtName,
  getFormStorage,
  getElementLeft,
  isJSONStringify,
  arrayItemOffset,
  getFormItemValue,
  setFormItemValue,
  getValueFromEvent
};
