export function jsonStringify(value: any): string | undefined {
  const seen = new Set<any>();
  function stringify(val: any): any {
    if (val === null) return "null";
    const type = typeof val;
    if (type === "string") {
      return JSON.stringify(val);
    }
    if (type === "number") {
      return isFinite(val) ? String(val) : "null";
    }
    if (type === "boolean") {
      return val ? "true" : "false";
    }
    if (type === "object") {
      if (seen.has(val)) {
        throw new TypeError("Converting circular structure to JSON");
      }
      seen.add(val);
      if (Array.isArray(val)) {
        const elements: string[] = [];
        for (const item of val) {
          if (item === undefined || typeof item === "function" || typeof item === "symbol") {
            elements.push("null");
          } else {
            elements.push(stringify(item));
          }
        }
        seen.delete(val);
        return "[" + elements.join(",") + "]";
      } else {
        const keys = Object.keys(val);
        const props: string[] = [];
        for (const key of keys) {
          const v = (val as any)[key];
          if (v === undefined || typeof v === "function" || typeof v === "symbol") {
            continue;
          }
          props.push(JSON.stringify(key) + ":" + stringify(v));
        }
        seen.delete(val);
        return "{" + props.join(",") + "}";
      }
    }
    return undefined;
  }
  return stringify(value);
}
