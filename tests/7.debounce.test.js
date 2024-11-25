const debounce = require("../src/7.debounce");

// 时间模拟
jest.useFakeTimers();
describe("debounce function", () => {
  let fn;

  beforeEach(() => {
    fn = jest.fn();
  });

  test("should debounce the function", () => {
    const debouncedFn = debounce(fn, 100);

    // 触发多次调用
    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // 等待一段时间，确保防抖生效
    jest.advanceTimersByTime(150);

    // 断言只被调用一次
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should clear the timer on subsequent calls", () => {
    const debouncedFn = debounce(fn, 300);

    // 触发调用并设置定时器
    debouncedFn();

    // 再次触发调用，清除定时器
    debouncedFn();

    jest.advanceTimersByTime(150);

    // 断言没有被调用
    expect(fn).toHaveBeenCalledTimes(0);

    // 等待一段时间，确保防抖生效
    jest.advanceTimersByTime(350);
    // 断言只被调用一次
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
