
/**
 * 二分查找的前提是列表是有序的。
 * 核心思想是取中间值与目标值比大小，每次缩小一半查找范围
 * 二分查找的时间复杂度是O(logn)
 * @param {Array} list 
 * @param {Number} value 
 * @returns 
 */
function binary_search(list,value){
    let low = 0,
        high = list.length-1

    while(low <= high){
        let mid  = Math.floor((low+high)/2),
            guess = list[mid]
            if(guess == value){
                return mid
            }

            if(guess > value){
                high = mid-1
            }else{
                low = mid+1
            }
    }
    return -1;
}


var list1 = [1,3,5,7,9]
var list2 = [2,4,6,8,10,11,13,16,18]
console.log(list1)
console.log(binary_search(list1,7))

console.log(list2)
console.log(binary_search(list2,16))



