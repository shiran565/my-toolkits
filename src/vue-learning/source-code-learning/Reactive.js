import { track, trigger } from "./Effective";

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      //建立联系
      track(target, key);
      //返回属性值
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newVal, reveiver) {
      //设置值
      const res = Reflect.set(target, key, newVal, reveiver);
      //触发响应
      trigger(target, key);

      return res;
    },
  });
}
