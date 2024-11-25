const { deepClone, deepCloneWithMap } = require("../src/6.clone");

describe("deepClone 函数测试", () => {
  test("克隆基本类型", () => {
    const num = 123;
    const clonedNum = deepClone(num);
    expect(clonedNum).toEqual(num);
  });

  test("克隆数组", () => {
    const arr = [1, 2, 3];
    const clonedArr = deepClone(arr);
    expect(clonedArr).toEqual(arr);
  });

  test("克隆对象", () => {
    const obj = { a: 1, b: 2 };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
  });

  test("克隆包含子对象的对象", () => {
    const obj = { a: 1, b: { c: 2 } };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj.b).toEqual(obj.b);

    obj.b.c = 3;
    expect(clonedObj.b.c).not.toEqual(obj.b.c);
    expect(clonedObj.b.c).toEqual(2);
  });

  test("克隆空对象", () => {
    const obj = {};
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
  });

  test("克隆空数组", () => {
    const arr = [];
    const clonedArr = deepClone(arr);
    expect(clonedArr).toEqual(arr);
  });

  test("克隆 null", () => {
    const nullValue = null;
    const clonedNull = deepClone(nullValue);
    expect(clonedNull).toEqual(nullValue);
  });

  test("克隆 undefined", () => {
    const undefinedValue = undefined;
    const clonedUndefined = deepClone(undefinedValue);
    expect(clonedUndefined).toEqual(undefinedValue);
  });

  test("测试循环引用 deepCloneWithMap", () => {
    const originalObj = {
      name: "John",
      age: 30,
      hobbies: [
        "reading",
        {
          book: "abc",
          self: this,
        },
      ],
      address: {
        city: "New York",
        street: "Main St",
      },
    };

    // 制造循环引用
    originalObj.self = originalObj;

    const clonedOriginalObj = deepCloneWithMap(originalObj);
    expect(clonedOriginalObj).toEqual(originalObj);
  });
});
