import effect from "./Effective";

export default function watch(source, cb, options = {}) {
  //用于处理source是一个getter函数的情况
  let getter;
  //如果source是一个function,说明传入的是一个getter函数，用户可以自定义依赖收集，那么则通过getter函数来收集它制定的依赖
  if (typeof source === "function") {
    getter = source;
  } else {
    //非getter函数的情况
    //在包裹的副作用函数中，递归读取source的属性，用于收集依赖
    getter = () => traverse(source);
  }

  let oldValue, newValue;
  //存储用户传入的过期回调，用于实现竟态问题
  let clean;

  function onInvalidate(fn) {
    //将过期回调存储到clean中
    clean = fn;
  }

  /**
   * 提取scheduler中的调度函数为一个独立的job函数，用户在不同时机来进行调度
   */
  const job = () => {
    //在scheduler中重新执行副作用函数，得到的是新值
    newValue = effectFn();

    //如果存在过期回调，则执行这个回调，将前面的回调执行抛弃
    if (clean) {
      clean();
    }

    //响应数据变化时调用回调函数
    //onInvalidate作为回调的第三个参数传给用户，其实是将定义过期函数的入口传给了用户，用户定义的过期函数会存储在前面的clean中
    cb(newValue, oldValue, onInvalidate);
    //将旧值更新为当前的新值，以便于下次使用
    oldValue = newValue;
  };

  //开启lazy选项，并把返回值存储到effectFn中以便后续手动调用
  const effectFn = effect(() => getter(), {
    //开启lazy选项，将返回值存储到
    lazy: true,
    scheduler: () => {
      //判断如果设置了post，则将回调添加到微任务队列，异步执行
      if (options.flush === "post") {
        const p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    },
  });
  //如果设置immediate,则触发立即执行回调
  if (options.immediate) {
    job();
  } else {
    //这里第一次手动调用副作用函数，将初始的旧值存在oldValue中
    oldValue = effectFn();
  }

  /**
   *
   * @param {*} value
   * @param {*} seen
   * @returns
   */
  function traverse(value, seen = new Set()) {
    //如果读取的是原始值，或者已经被读取过，则什么都不做
    if (typeof value !== object || value === null || seen.has(value)) return;
    //将数据添加到seen中，表示已经读取过了，避免循环引用引起死循环
    seen.add(value);
    //暂不考虑数组等其他结构，假设value就是一个对象
    for (const k in value) {
      traverse(value[k], seen);
    }
    return value;
  }
}
