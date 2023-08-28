function Promise(excutor) {
    this.value = null;
    this.reson = null;
    this.status = 'pending'
    //用于暂存then方法传入的回调函数，然后在一步调用结束时候再执行
    this.onFulfilledArray = []
    this.onRejectedArray = []

    const resolve = value => {
        if(value instanceof Promise){
            return value.then(resolve,reject);
        }
        //在nextTick中执行resolve逻辑，确保Promise是microtask
        setTimeout(()=>{
            //确保状态只能从pending到fulfilled
            if(this.status === 'pending'){
                this.value = value
                this.status = "fulfilled"
                this.onFulfilledArray.forEach(func => {
                    func(this.value)
                });
            }
        })

    }

    const reject =  reson => {
        //在nextTick中执行reject逻辑，确保Promise是microtask
        setTimeout(() => {
            //确保状态只能从pending到rejected
            if(this.status === "pending"){
                this.reson = reson
                this.status = 'rejected'
    
                this.onRejectedArray.forEach(func => {
                    func(this.reson)
                })
            }
        })
    }
    try{
        //执行excutor函数，注入resolve和reject方法
        excutor(resolve,reject)
    }catch(e){
        //构造函数中出错则直接执行reject方法
        reject(e)
    }
}

Promise.prototype.then = function(onFulfilled,onRejected ){
    let that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled: data => data; //如果传入的是null，可以实现穿透
    onRejected = typeof onRejected === 'function' ? onRejected: error => {throw error};
    let promise2
    if(this.status === "fulfilled"){

        return promise2 = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                try {
                    let result = onFulfilled(this.value);
                    //用于将前一个promise的onfullfilled方法的执行结果传给后一个promise
                    //这个result可能是普通值或者一个promise，需要分情况处理
                    resolvePromise(promise2,result,resolve,reject);
                }catch(e){
                    reject(e);
                }
            })
        });
    }

    if(this.status === "rejected"){
        return promise2 = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                try {
                    let result = onRejected(this.reson);
                    resolvePromise(promise2,result,resolve,reject);
                    //resolve(result)
                }catch(e){
                    reject(e);
                }
            })
        })
    }

    //pending状态时，暂存2个回调方法，等待异步调用结束后再被执行
    if(this.status === "pending"){

        return promise2 = new Promise((resolve,reject)=>{

            //这里的意思是将promise2的决议，放到了异步调用结束后执行onFulfilledArray中的回调函数时候
            this.onFulfilledArray.push(()=>{
                try{
                    let result = onFulfilled(this.value)
                    resolvePromise(promise2,result,resolve,reject);
                }catch(e) {
                    reject(e)
                }
            })

            this.onRejectedArray.push(()=>{
                try {
                    let result = onRejected(this.reson)
                    resolvePromise(promise2,result,resolve,reject);
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}


const resolvePromise = (promise2,result,resolve,reject)=>{
    //死循环
    if(result === promise2){
        console.log("error")
        reject(new TypeError('error due to circular reference'))
    }

    let consumed = false
    let thenable = false
    
    //result本身是一个promise的情况，也就是前一个then的onFulfilled中return了一个promise
    if(result instanceof Promise){
        if(result.status === 'pending'){
            result.then(function(data){
                //递归调用
                resolvePromise(promise2,data,resolve,reject)
            },reject)
        }else{
            result.then(resolve,reject);
        }
        return;
    }

    let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null);

    if(isComplexResult(result)){
        try{
            thenable = result.then

            if(typeof thenable === 'function'){
                thenable.call(result,function(data){
                    if(consumed){
                        return
                    }
                    consumed = true
                    return resolvePromise(promise2,data,resolve,reject)
                },function(error){
                    if(consumed){
                        return
                    }
                    consumed = true
                    return reject(error)
                })
            }else{
                resolve(result)
            }
        }catch(e){
            if(consumed){
                return
            }
            consumed = true
            return reject(e)
        }
    }else{
        resolve(result)
    }
}

Promise.prototype.catch = function(catchFunc){
    return this.then(null,catchFunc);
}

Promise.resolve = function(value){
    //返回一个以给定值解析后的Promise实例
    return new Promise((resolve,reject) =>{
        resolve(value);
    })
}

Promise.reject = function(error){
    return new Promise((resolve,reject)=>{
        reject(error)
    })
}

Promise.all = function(promiseArray){
    return new Promise((resolve,reject)=>{
        try {
            let resultArray = []
            const length = promiseArray.length
            for(let i=0;i<length;i++){
                
                promiseArray[i].then(data=>{
                    resultArray.push(data)
                    //在每个promise决议时判断是否已经执行完所有的promise，如果是那么执行返回实例决议
                    if(resultArray.length === length){
                        resolve(resultArray)
                    }
                },reject)

            }
        } catch (e) {
            reject(e);
        }
    })
}

Promise.race = function(promiseArray){

    return new Promise((resolve,reject)=>{
        const length = promiseArray.length
        for(let i=0;i<length;i++){
            //只要有一个promise执行完，那么就直接决议，由于状态不可逆转，后续决议作废
            promiseArray[i].then(resolve,reject)
        }
    })

}





//以下为测试代码


const promise1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('gew1')
    }, 2000);
})


const promise2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('gew2')
    }, 1500);
})

Promise.all([promise1,promise2]).then(data=>{
    console.dir(data)
})

Promise.race([promise1,promise2]).then(data=>{
    console.log(data)
})

return


//demo
let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('resolve lucas');
        //reject("reject lucas")
    },1000)
})

promise.then(null).then(data => {
    console.log(data)
})

return 

promise.then(onfulfilled = data=>{
    console.log(`${data} in first then`)
    //显式地返回一个Promise实例
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`${data} next then`)
        },2000)
    }).then(data=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(`${data} next then`)
            },2000)
        })
    });
},onrejected = error =>{
    console.log(error)
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`${error} next then`)
        },2000)
    });
}).then(data=>{
    console.log(`${data} in last then`)
})