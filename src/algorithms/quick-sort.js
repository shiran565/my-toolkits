/**
 * 快排的核心思想是分治，每次随机取一个基准值，然后将当前数组拆分为"大于基准值"、"等于基准值"、"小于基准值"的三个数组
 * 按照顺序重新拼接三个数组，然后在此基础上对左右两个数组递归进行同样的操作，直到每个数组都只剩下1个元素
 * @param {Array} array 
 * @returns 
 */

const quickSort = (array) => {
  if (array.length < 2) {
    //递归出口，只剩一个元素就不需要再排
    return array.slice();
  }
  //随机取一个基准值
  let pivot = array[Math.floor(Math.random() * array.length)];

  let left=[]
  let right=[]
  let middle = []

  //将数组按照基准值大小分为三个数组
  for(let i=0;i<array.length;i++){
    let val = array[i]
    if(val<pivot){
        left.push(val)
    }

    if(val == pivot){
        middle.push(val)
    }

    if(val>pivot){
        right.push(val)
    }
  }

  //按照左中右的顺序重新拼接数组，同时运用“分治”策略，递归对左右两个数组进行排序，直到它们最终只剩下一个元素
  return quickSort(left).concat(middle,quickSort(right))

};

console.log()