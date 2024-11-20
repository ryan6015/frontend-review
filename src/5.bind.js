/**
 * 模拟bind函数实现
 *
 * 首先想想bind函数内部做了啥，
 * 1. 绑定死函数的this指向，返回一个新的函数
 * 2. 同时接收不定量的参数，这些参数会在函数运行前放在前面传给函数
 * 3. 要注意的是：直接new的方式调用bind函数，那么this指向的是新创建的对象，
 *    而不是context
 * 4. 如果context为空，指向window
 *
 * @param {function} fn 执行函数
 * @param {object} context 执行函数的上下文
 * @param  {...any} args 参数
 */
function _bind(fn, context, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  const boundFunction = function (...argLists) {
    let ctx = context ? Object(context) : global;
    // 这里判断this是否是func的实例，如果是，那么就返回this，
    if (this instanceof boundFunction) {
      return new fn(args.concat(argLists));
    } else {
      // 要加上之前bind时传入的参数，有点像是函数柯里化
      return fn.apply(ctx, args.concat(argLists));
    }
  };

  boundFunction.prototype = Object.create(fn.prototype);
  boundFunction.prototype.constructor = boundFunction;

  return boundFunction;
}

module.exports = _bind;
