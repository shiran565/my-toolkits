/**
 * watch 过期调用示例
 */
watch(obj, async (newValue, oldValue, onInvalidate) => {
  let expired = false;
  //注册过期函数，每次执行副作用函数的时候都会先被调用
  //这样就会保证前面没有返回的调用都被抛弃，从而只保存最后一次执行的结果
  onInvalidate(() => {
    expired = true;
  });

  const res = await fetch("path/to/request");

  if (!expired) {
    finalData = res;
  }
});
