/**
 * 实现一个函数，模拟call方法实现
 *
 * call函数改变了this的指向，并且执行了函数
 * 想要改变函数中this的指向，我们可以把函数放到某个对象中，然后在对象中执行函数
 * 
 * @param {funtion} fn 执行函数
 * @param {object} context 执行函数的上下文
 * @param  {...any} args 参数
 */
function _call(fn, context, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }
  // 如果context为null，那么就指向window
  // 这里jest运行在node环境上，所以没有window，用global代替
  // 如果context是一个基本类型，那么就把它转换成对象类型
  const ctx = context ? Object(context) : global;
  // 把函数放到对象中, 这里会有重名的风险，简单写下，重要的是是原理
  // 所以忽略这个问题，在实际开发中，不要这样做
  ctx._fn = fn;
  // 执行函数
  const result = ctx._fn(...args);
  // 删除函数
  delete ctx._fn;
  // 返回结果
  return result;
}

module.exports = _call;
