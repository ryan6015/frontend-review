const _apply = require("../src/4.apply");

describe("_apply 函数测试", () => {
  beforeEach(() => {
    global.firstName = "wang";
  });

  afterEach(() => {
    delete global.firstName;
  });

  test("正常调用函数", () => {
    const fn = function (lastName) {
      return `${this.firstName}-${lastName}`;
    };
    const context = {
      firstName: "li",
    };

    const res = _apply(fn, context, ["xxx"]);

    expect(res).toEqual("li-xxx");
  });

  test("函数不是函数时抛出错误", () => {
    expect(() => _apply(123)).toThrow(TypeError);
  });

  test("没有提供上下文时使用 global", () => {
    const fn = function (lastName) {
      return `${this.firstName}-${lastName}`;
    };

    const res = _apply(fn, null, ["xxx"]);

    expect(res).toEqual("wang-xxx");
  });

  // test如果传入context是一个基础类型，那么会被包装成对象
  test("test如果传入context是一个基础类型，那么会被包装成对象", () => {
    const fn = function (lastName) {
      return `${this.firstName}-${lastName}`;
    };

    const res = _apply(fn, "test", ["xxx"]);

    // 这里undefined是因为test会把字符串包装成对象
    expect(res).toEqual("undefined-xxx");
  });

  // 测试传入多个参数
  test("传入多个参数", () => {
    const fn = function (lastName, age) {
      return `${this.firstName}-${lastName}-${age}`;
    };

    const context = {
      firstName: "li",
    };

    const res = _apply(fn, context, ["xxx", 18]);

    expect(res).toEqual("li-xxx-18");
  });
});
