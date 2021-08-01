// 判断是否是对象
const isObj = (target) => target !== null && typeof target === 'object';
// 缓存hasOwnProperty属性
const hasProperty = Object.prototype.hasOwnProperty;
// 判断对象中是否有相应属性
const hasKey = (target,key) => hasProperty.call(target,key);
// 判断结果是否是对象，如果是对象则递归调用reactive函数，否则直接返回结果
const checkResult = (result) => isObj(result) ? reactive(result) : result;

// reactive函数
export function reactive(target){
    // 如果不是对象，则直接返回target
    if(!isObj(target)) return target;
    // proxy代理对象
    const handler = {
        get(target,key,receiver){
            // 收集依赖
            track(target,key)
            let result =  Reflect.get(target,key,receiver);
            return checkResult(result);
        },
        set(target,key,value,receiver){
            let oldVal = Reflect.get(target,key);
            let result = true;
            if(oldVal !== value) {
                result = Reflect.set(target,key,value,receiver);
                // 触发更新
                trigger(target,key)
            }
            return result;
        },
        deleteProperty(target,key,receiver){
            let result = true;
            if(hasKey(target,key)){
                result = Reflect.deleteProperty(target,key,receiver)
                if(result){
                    // 删除成功，触发更新
                    trigger(target,value)
                }
            };
            return result;
        }
    }

    return new Proxy(target,handler)
}
// 缓存effect的回调函数
let effectCallback = null;
export function effect(callback){
    effectCallback = callback;
    callback();
    effectCallback = null;
}

// track函数收集依赖
let targetMap = new WeakMap();
export function track(target,key){
    if(!effectCallback) return;
    let depsMap = targetMap.get(target);
    if(!depsMap){
        targetMap.set(target,(depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if(!dep){
        depsMap.set(key,(dep = new Set()))
    }
    dep.add(effectCallback)
}

// 触发更新
export function trigger(target,key){
    let depsMap = targetMap.get(target);
    if(!depsMap) return;
    let deps = depsMap.get(key);
    if(deps){
        deps.forEach((item) => item())
    }
}

export function ref(row){
    if(isObj(row) && row.__v__isRef) return;
    let value = checkResult(row);
    let r = {
        __v__isRef:true,
        get value(){
            track(r,'value')
            return value;
        },
        set value(newVal){
            if(newVal !== value){
                row = newVal;
                value = checkResult(row);
                trigger(r,'value')
            }
        }
    }
    return r;
}

export function toRefs(proxy){
    let ret = proxy instanceof Array ? new Array(proxy.length) : {};

    for(let key in proxy){
        ret[key] = toRefProxy(proxy,key)
    }

    return ret;
}

function toRefProxy(proxy,key){
    let r = {
        get value(){
            return proxy[key];
        },
        set value(newVal){
            proxy[key] = newVal;
        }
    }
    return r;
}

export function computed(getter){
    let result = ref();
    effect(() => (result.value = getter()));
    return result;
}