//插入排序的核心思想是把一个数组看成是一个有序的数组，然后把这个数组分成两个数组，一个数组是有序的，另外一个数组是无序的，然后把这个无序的数组插入到有序的数组中，这样就可以得到一个有序的数组了。
const insertSort = (array)=>{
    let i = 1;
    while(i < array.length){
        let j = i;
        while(j > 0 && array[j] < array[j-1]){
            let temp = array[j];
            array[j] = array[j-1];
            array[j-1] = temp;
            j--;
        }
        i++;
    }
    return array;
}


//a test function
const test = ()=>{
    let array = new Array(20).fill(0);
    //array.fill(0)
    array = array.map((val)=>{
        return val+  Math.floor( Math.random()*100)
    })
    console.log(array)
    console.log(insertSort(array))
}

//Create a function that accepts a single parameter, length, and returns an array of length randomly generated numbers between 1 and 100, inclusive, using Math.random().
function generateRandomArray(length,maxValue){
    let array = new Array(length).fill(0);
    for(let i=0; i<length; i++){
        array[i] = Math.floor( Math.random()*maxValue)
    }
    return array;
}

test()

