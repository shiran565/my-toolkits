import { track, trigger,effect } from "./Effective";

export function computed(getter) {
  //用于缓存上一次计算的值
  let value;
  //用于标记是否需要重新计算，避免不必要的计算开销，true表示需要计算
  let dirty = true;

  //将getter作为副作用函数传给effect
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        //在调度器中将dirty重置为true
        dirty = true;
        //依赖数据变化时，手动调用trigger函数触发外部的响应
        trigger(obj, "value");
      }
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 读取value时，手动调用track函数追踪compute外部的依赖，实现effect的嵌套
      track(obj, "value");
      return value;
    },
  };
  return obj;
}
