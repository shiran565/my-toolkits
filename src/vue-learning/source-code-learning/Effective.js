//全局变量，用于标记当前活跃的副作用函数
let activeEffect;
//effect栈，用于实现副作用函数嵌套，避免覆盖
const effectStack = [];
//存储副作用函数的桶
const bucket = new WeakMap()

function effect(fn,options={}){
    //fn才是真正的副作用函数，effectFn只是fn的一个包裹
    const effectFn = ()=>{
        //调用cleanup清除依赖，
        cleanup(effectFn);
        //将当前活跃的副作用函数标记到全局
        activeEffect = effectFn;

        //使用栈结构实现副作用函数的嵌套
        effectStack.push(effectFn);
        const res = fn();
        effectStack.pop()

        //还原全局标记
        activeEffect = effectStack[effectStack.length-1];
        //将函数执行结果作为返回值，手动调用可以拿到返回值，可用于实现compute、watch等功能
        return res;
    }
    //将options挂在到副作用函数上，供触发的时候调度
    effectFn.options = options;
    //用来存储所有与该副作用函数相关联的依赖
    effectFn.deps = [];
    //如果没有指定lazy，则立即执行副作用函数，否则不执行
    if(!options.lazy){
        effectFn();
    }
    //将包裹后的副作用函数返回，用于后续某些场景下手动调用
    return effectFn;
}

/**
 * 用于在get拦截函数内调用函数，追踪变化进行依赖收集
 * @param {*} target 
 * @param {*} key 
 * @returns 
 */
function track(target,key){
    if(!activeEffect) return;
    let depsMap = buket.get(target);
    if(!depsMap){
        bucket.set(target,(depsMap = new Map()));
    }
    //type:Set
    let deps = depsMap.get(key);
    if(!deps){
        depsMap.set(key,(deps = new Set()));
    }
    // 把当前激活的副作用函数添加到依赖集合中，此时的deps就是与当前副作用函数关联的依赖集合
    deps.add(activeEffect);
    // 将其添加到activeEffect.deps数组中
    activeEffect.deps.push(deps);
}

/**
 * 用于在set函数内调用，触发副作用函数重新执行
 * @param {*} target 
 * @param {*} key 
 * @returns 
 */
function trigger(target,key) {
    const depsMap = bucket.get(target);
    if(!depsMap)return;
    const effects = depsMap.get(key);
    //另外构造一个Set,避免forEach无限循环
    const effectsToRun = new Set();

    effects && effects.forEach(effectFn =>{
        //如果trigger将要触发的副作用函数与当前正在执行的副作用函数是同一个，那么就不触发执行，避免无限循环
        if(effectFn !== activeEffect){
            effectsToRun.add(effectFn);
        }
    });
    effectsToRun.forEach(effectFn => {
        //如果定义了scheduler调度器，那么执行该调度器，并将副作用函数作为参数传递给它
        if(effectFn.options.scheduler){
            effectFn.options.scheduler(effectFn);
        }else{
            effectFn();
        }
    });
}

function cleanup(effectFn) {
    for (let i=0;i<effectFn.deps.length;i++){
        //deps的数据类型是Set，就是
        const deps = effectFn.deps[i];
        //将effectFn从依赖集合中移除
        deps.delete(effectFn);
    }
    //重置依赖数组的长度
    effectFn.deps.length = 0;
}

export {
    effect,
    trigger,
    track
}