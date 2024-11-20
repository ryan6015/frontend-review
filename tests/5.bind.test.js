const _bind = require("../src/5.bind");

describe("_bind 函数测试", () => {
  const originalFunction = function (lastName) {
    return `${this.firstName}-${lastName}`;
  };

  beforeEach(() => {
    global.firstName = "wang";
  });

  afterEach(() => {
    delete global.firstName;
  });

  test("当 fn 不是函数时应抛出错误", () => {
    expect(() => _bind("not a function", {})).toThrow(TypeError);
  });

  test("不绑定的时候，正常运行", () => {
    const res = originalFunction("xxx");
    expect(res).toEqual("wang-xxx");
  });

  test("正常绑定和执行函数", () => {
    const context = {
      firstName: "li",
    };
    const fn = _bind(originalFunction, context);
    const result = fn("xxx");
    expect(result).toEqual("li-xxx");
  });

  test("绑定函数时传递参数", () => {
    const context = {
      firstName: "li",
    };
    const fn = _bind(originalFunction, context, "xxx");
    const result = fn();
    expect(result).toEqual("li-xxx");
  });

  test("绑定函数时传递参数2", () => {
    const originalFunction = function (lastName, age) {
      return `${this.firstName}-${lastName}-${age}`;
    };
    const context = {
      firstName: "li",
    };
    const fn = _bind(originalFunction, context, "xxx");
    const result = fn(18);
    expect(result).toEqual("li-xxx-18");
  });

  test("当 new调用时返回 实例", () => {
    const context = {
      firstName: "li",
    };
    const fn = _bind(originalFunction, context, "xxx");
    const result = new fn();
    expect(result instanceof originalFunction).toBe(true);
  });

  test("当 new调用时返回 实例2", () => {
    function Person(name) {
      this.name = name;
    }

    const fn = _bind(Person, null, "xxx");
    const result = new fn("wang");

    const fnBound = Person.bind(null);
    const result2 = new fnBound("wang");
    expect(result2 instanceof Person).toBe(true);
    expect(result instanceof Person).toBe(true);
  });
});
