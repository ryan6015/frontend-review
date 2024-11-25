const throttle = require("../src/8.throttle");

describe("throttle 函数测试", () => {
  let fn;

  beforeEach(() => {
    fn = jest.fn();
  });

  test("首次调用立即执行", () => {
    const throttledFn = throttle(fn, 1000);
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("在延迟时间内多次调用，只执行一次", (done) => {
    const throttledFn = throttle(fn, 1000);
    throttledFn();
    throttledFn();
    throttledFn();
    throttledFn();
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    }, 1500);
  });

  test("延迟时间过后再次调用执行", (done) => {
    const throttledFn = throttle(fn, 1000);
    throttledFn();
    setTimeout(() => {
      throttledFn();
      throttledFn();
      throttledFn();
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    }, 1500);
  });

  test("参数传递正确", () => {
    const context = { name: "test" };
    const throttledFn = throttle(fn, 1000);
    throttledFn.call(context, 1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
