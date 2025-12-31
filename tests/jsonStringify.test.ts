import { jsonStringify } from '../src/jsonStringify';

describe('jsonStringify', () => {
  test('primitives', () => {
    expect(jsonStringify("hi")).toBe("\"hi\"");
    expect(jsonStringify(1)).toBe("1");
    expect(jsonStringify(true)).toBe("true");
    expect(jsonStringify(null)).toBe("null");
  });

  test('arrays', () => {
    expect(jsonStringify([1, "a", null])).toBe('[1,"a",null]');
    expect(jsonStringify([1, undefined, 3])).toBe('[1,null,3]');
  });

  test('objects', () => {
    expect(jsonStringify({ a: 1 })).toBe('{"a":1}');
    expect(jsonStringify({ a: undefined, b: 2 })).toBe('{"b":2}');
  });

  test('nested structures', () => {
    expect(
      jsonStringify({ a: [1, { b: "x" }] })
    ).toBe('{"a":[1,{"b":"x"}]}');
  });

  test('circular reference', () => {
    const obj: any = {};
    obj.self = obj;
    expect(() => jsonStringify(obj)).toThrow(TypeError);
  });
});
