/**
 * 实现一个函数模拟new操作符
 *
 * 首先想清楚在new的过程中，有哪些操作
 * 1. 创建一个空对象
 * 2. 对象的原型指向函数的prototype对象
 * 3. 执行构造函数，
 * 4. 返回对象(构造函数一般不会返回东西，但是也有可能，如果返回的是对象的话，那么就返回这个对象)
 * 
 * @param {*} fn 构造函数
 * @param  {...any} args 参数
 */
function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }
  const obj = {};
  // 对象的原型指向函数的prototype对象
  Object.setPrototypeOf(obj, fn.prototype)
  // 执行构造函数，将this指向obj
  const res = fn.apply(obj, args);
  // 如果构造函数返回的是一个对象，那么就返回这个对象，否则返回obj
  return typeof res === "object" ? res : obj;
}

module.exports = _new;
