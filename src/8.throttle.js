/**
 * 节流
 * @param {*} fn 函数
 * @param {*} delay 延迟时间
 */
function throttle(fn, delay) {
  let timer = null;
  // 这里设置成0，首次调用会立即执行
  // 如果希望首次调用也要满足延时时间，就设置成Date.now()
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    const context = this;
    // 空闲，但是还没到时间，重新设置定时器
    if (!timer && remaining > 0) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
        lastTime = now;
      }, remaining);
    } else if (!timer && remaining <= 0) {
      // 空闲，并且时间到了
      fn.apply(context, args);
      lastTime = now;
    }
  };
}

module.exports = throttle;
