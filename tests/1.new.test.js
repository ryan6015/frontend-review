// 导入待测函数
const _new = require("../src/1.new");

describe("_new 函数测试", () => {
  test("传入非函数参数时应抛出错误", () => {
    expect(() => _new(123)).toThrow(TypeError);
  });

  test("创建对象并设置原型", () => {
    function Person(name) {
      this.name = name;
    }

    const obj = _new(Person, "张三");
    expect(obj.__proto__).toEqual(Person.prototype);
    expect(obj.name).toEqual("张三");
  });

  test("构造函数返回对象时返回该对象", () => {
    function ReturnObj() {
      return { a: 1 };
    }

    const obj = _new(ReturnObj);
    expect(obj).toEqual({ a: 1 });
  });

  test("构造函数返回非对象时返回创建的对象", () => {
    function ReturnValue() {
      return 123;
    }

    const obj = _new(ReturnValue);
    expect(obj).toEqual({});
  });
});
