/**
 * 防抖
 * @param {*} fn 函数
 * @param {*} delay 延迟时间
 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      timer = null;
      fn.apply(context, args);
    }, delay);
  };
}

module.exports = debounce
