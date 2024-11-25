/**
 * 深拷贝对象
 *
 * 深拷贝平时可能都会简单使用JSON.parse(JSON.stringify(obj))，但是这个有诸多限制
 * 1. 对一些特殊类型的值无法处理，
 *    会忽略函数类型，
 *    正则对象会变成空对象，
 *    日期对象会变成字符串，
 *    会忽略symbol类型，
 *    set,map类型会变成空对象
 * 2. 循环引用会报错
 *
 * @param {*} obj 复制对象
 */
function deepClone(obj) {
  // 处理特殊类型, undefined的typeof是undefined
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let res;
  if (Array.isArray(obj)) {
    res = [];
    for (let i = 0; i < obj.length; i++) {
      res[i] = deepClone(obj[i]);
    }
  } else {
    res = {};
    Object.keys(obj).forEach((key) => {
      res[key] = deepClone(obj[key]);
    });
  }

  return res;
}

function deepCloneWithMap(obj, map = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  let res;
  if (Array.isArray(obj)) {
    res = [];
  } else {
    res = {};
  }
  // map的设置必须在循环之前，否则会无限递归
  map.set(obj, res);

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      res[i] = deepCloneWithMap(obj[i], map);
    }
  } else {
    Object.keys(obj).forEach((key) => {
      res[key] = deepCloneWithMap(obj[key], map);
    });
  }

  return res;
}

module.exports = {
  deepClone,
  deepCloneWithMap,
};
