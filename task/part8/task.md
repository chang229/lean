#### 1,Vue 3.0 性能提升主要是通过哪几方面体现的？
1，响应式系统升级
* vue2中的响应式系统的核心：Object.defineProperty, defineProperty劫持整个对象，然后进行深度遍历所有属性，给每个属性添加getter和setter，实现响应式
* vue3中使用Proxy对象重写响应式系统：proxy可以对整个对象进行监听，所以不需要深度遍历;可以监听动态新增的属性；可以监听删除的属性；可以监听数组的索引和length属性

2，编译优化
* vue2中通过标记静态根节点，优化diff的过程；
* vue3中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容：
* Fragments(升级vetur插件):新引入Fragments（片段）特性：Vue 3.x 模板中不需要再创建一个唯一的根节点，模板里可以直接放文本内容或者很多同级的标签, Vue2.x 需要唯一的节点
* 静态提升:静态节点都会被提升到render 的外部，只有初始化时会被创建，再次调用render时不会再次创建，可以直接重用这些静态节点对应的vnode
* Patch flag标记
* 缓存事件处理函数

3，优化打包体积
* vue3中移除了一些不常用的API：例如：inline-template , filter等
* 提供更好的Tree-shaking:依赖 ES2015 模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记。

#### 2,Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
1，options API：在一个vue文件中data，methods，computed，watch中定义属性和方法，共同处理页面逻辑
* 包含一个描述组件选项(data,methods,props等)的对象
* Options API开发复杂组件，同一个功能逻辑的代码被拆分到不同选项

2，Composition API：
* vue3新增的一组API
* 一组基于函数的API
* 可以更灵活的组织组件的逻辑
* 在vue3 Composition API 中，代码是根据逻辑功能来组织的，一个功能的所有api会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有API，而不像vue2 Options API 中一个功能所用到的API都是分散的，需要改动，到处找API的过程是很费时间的

#### 3,Proxy 相对于 Object.defineProperty 有哪些优点？
* Proxy 可以直接监听对象而非属性；
* Proxy 可以直接监听数组的变化；
* Proxy 可以监听动态新增的属性；可以监听删除的属性;
* Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
* Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；

#### 4,Vue 3.0 在编译方面有哪些优化？
* vue3中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容：
* Fragments(升级vetur插件):新引入Fragments（片段）特性：Vue 3.x 模板中不需要再创建一个唯一的根节点，模板里可以直接放文本内容或者很多同级的标签, Vue2.x 需要唯一的节点
* 静态提升:静态节点都会被提升到render 的外部，只有初始化时会被创建，再次调用render时不会再次创建，可以直接重用这些静态节点对应的vnode
* Patch flag标记
* 缓存事件处理函数

#### 5,Vue.js 3.0 响应式系统的实现原理？
vue3响应式原理
* Proxy对象实现属性监听
* 多层属性嵌套，在访问属性过程中处理下一级属性
* 默认监听动态添加的属性
* 默认监听属性的删除操作
* 默认监听数组索引和length属性
* 可以作为单独的模块使用
* proxy在set和deleteProperty中需要返回布尔类型的值，在严格模式下，如果返回false的话会出现Type error的异常
核心方法：
* reactive / ref / toRefs / computed
* effect 
* track
* trigger
reactive函数：
1. 接收一个参数，判断这个参数是否是对象，不是对象则直接返回这个参数
2. 创建拦截器对象handler，设置get/set/deleteProperty
3. 返回Proxy对象
```
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
```
ref
reactive对比ref:
* ref可以把基本数据类型数据，转成响应式对象
* ref返回的对象，重新赋值成对象也是响应式的
* reactive返回的对象，重新赋值丢失响应式
* reactive返回的对象不可以解构
```
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
```
toRefs:将reactive创建的响应式数据进行处理，返回可以进行结构的响应式数据
```
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
```
computed计算属性
```
export function computed(getter){
    let result = ref();
    effect(() => (result.value = getter()));
    return result;
}
```


