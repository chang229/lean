#### virtual DOM
virtual Dom(虚拟DOM),是由普通的js对象来描述DOM对象,因为不是真实的DOM,所有叫做virtual DOM;
使用virtual DOM来描述DOM的实例：
```
{
    sel:"div",
    data:{},
    children:undefined,
    text:"hello world",
    elm:undefined,
    key:undefined
}
```
相比于真实的DOM,virtual Dom非常的简洁。

为什么要使用virtual DOM?
1,手动操作DOM比较麻烦，还有考虑浏览器兼容问题，虽然有jquery等库简化DOM操作，但是随着项目的复杂，DOM操作复杂提升；
2，为了简化DOM的复杂操作于是出现了各种MVVM框架,MVVM框架解决了视图和状态的同步问题；
3，为了简化视图的操作我们可以使用模板引擎，但模板引擎没有解决跟踪状态变化的问题，于是virtual DOM出现了；
4，virtual DOM的好处是当状态发生变化时不需要立即更新DOM，只需要创建一个虚拟数来描述DOM，virtual Dom内部将弄清楚如何有效（diff）的更新DOM；
5，参考github上virtual-dom的描述：虚拟DOM可以维持程序的状态，跟踪上一次状态；通过比较前后两次状态的差异更新真是DOM；

虚拟DOM的作用：
1，维护视图和状态的关系；
2，复制视图情况下提升渲染性能；
3，除了渲染DOM以外，还可以实现SSR(nuxt.js/next.js),原生应用(weex/react native),小程序(mpvue/uni-app)等；

virtual Dom库：
snabbdom:
vue2.x内部使用的virtual dom就是基于snabbdom改造的；
大约只有200行代码；
通过模块可扩展；
源码使用typescript开发；
最快的virtual dom之一；
virtual-dom：最早的virtual dom库；

#### snabbdom基本使用
1，创建项目
```
创建项目目录：md snabbdom-demo;
初始化package.json文件：cd snabbdom-demo && yarn init -y;
安装parcel:yarn add parcel-bundler --sae-dev;
创建scripts命令：
"scripts":{
    "dev":"parcel index.html --open",
    "build":"parcel build index.html"
}
创建index.html文件
创建src目录并创建index.js文件,将index.js文件引入index.html文件中；
```

2，导入snabbdom
安装：yarn add snabbdom --save;
引入：impotr { h, thunk, init } from 'snabbdom';
最新版本引入会有问题，使用0.7.4版本
init()是一个高阶函数，返回pah();
h()返回虚拟节点vnode,这个函数在vue.js中被用到；
```
new Vue({
    router,
    store,
    render:h => h(App)
}).$mount("#app")
```
thunk()是一种优化策略，可以在处理不可变数据时使用；

3，基本用法：
1,hello world 案例
```
import {h,init} from 'snabbdom';
// init方法接受一个数组参数， 返回path方法，用于对比两个vnode的差异更新到真实dom中；
let path = init([])
// h方法接受两个参数，用于创建vnde，返回值就是创建好的vnode,第一个参数是标签加选择器；第二个参数如果是字符串则表示标签中的内容，如果是数组，则表示子元素；
let vnode = h('div#counter.classname','hello world');
// 获取app节点
let app = document.getElementById('app');
// path接受两个参数，用于对比vnode变化，更新真实dom,并且返回一个vnode;第一个参数，可以是一个真实的dom元素，内部会把dom元素转化为vnode;第二个参数是一个vnode;
let oldvode = path(app,vnode);
// 更新div
vnode = h('div','hello snabbdom');
path(oldvode,vnode);
```
2,在div中放置子元素好h1,p
```
import { h, init } from 'snabbdom';

let path = init([]);

let vnode = h('div#conter',[
    h('h1','hello world'),
    h('p','snabbdom')
]);
let app = document.getElementById('app');

let oldvnode = path(app,vnode);

```
3,清空页面上的元素
```
//官方文档方法
path(oldvode,null);这种方法是错误的

//通过创建一个注释标签，清空页面上的元素
path(oldvnode,h('!'))
```

#### 模块
snabbdom的核心库并不能处理元素的属性，样式，事件等，如果要处理的话，可以使用模块；
常用模块：官方提供了6个模块
1，attributes:设置DOM元素的属性，使用setAttribute();处理boolean类型的属性；
2，props:和attributes模块类似，设置DOM元素的属性element[attr] = value;不处理boolean类型的属性；
3，class:切换类样式；注意：给元素设置类样式是通过sel选择器；
4，dataset:设置data-*自定义属性；
5，eventlisteners:注册和移除事件；
6，style:设置行内样式，支持动画；delayed/remove/destory

模块使用：
1，导入需要的模块；
2，init()中注册所需要的模块；
3，使用h()函数创建vnode的时候，可以把第二个参数设置为对象，其他参数往后移；

```
import { init,h } from 'snabbdom';
import style from 'snabbdom/modules/style';
import eventlisteners from 'snabbdom/modules/eventlisteners';

let path = init([style,eventlisteners]);

let vnode = h('div',{
    style:{
        background:'red'
    },
    on:{
        click:() => console.log('click here')
    }
},[
    h('h1','hello world'),
    h('p','ppppp')
])

let app = document.getElementById('app');

path(app,vnode)
```

#### snabbdom源码学习
如何学习源码：
1，先宏观了解；2，带着目标看源码；3，看源码的过程要不求甚解；4，调试；5，参考资料；
snabbdom核心：
1，使用h()函数创建javascript对象（vnode）描述真实DOM；
2，init()设置模块，创建patch();
3,patch()比较两个新旧vnode;
4,把变化的内容更新到真实DOM上。

#### h()函数
h()函数介绍：
在使用vue的时候见过h()函数：
```
new Vue({
    router,
    store,
    render:h => h(App)
}).$mount('#app')
```
h()函数最早见于hyperscript,使用javascript创建超文本；
snabbdom中h()函数不是用来创建超文本，而是创建Vnode;

函数重载的概念：
1，参数个数或者类型不同的函数；
2，javascript中没有重载的概念；
3，Typescript中有重载，不过重载的实现还是通过代码调整参数；
重载的示意：
```
function add(a,b){
    return a + b;
};
function add(a,b,c){
    return a + b + c;
};
add(1,2);
add(1,2,3);
```

#### patch的整体过程
patch(oldvnode,newvnode);
打补丁，把新节点中变化的内容渲染到真实dom,最后返回新节点作为下一次处理的旧节点；
对比新旧vnode是否相同节点（节点的key和sel相同）;
如果不是相同节点，删除之前的内容，重新渲染；
如果是相同的节点，再判断新的vnode是否有text,如果有并且和oldvnode的text不同，直接更新文本内容；
如果新的vnode有children,判断子节点是否有变化，判断子节点的过程使用的就是diff算法；
diff过程只进行同层级的比较；

#### creatElm函数
1，触发用户钩子函数init;
2,把vnode转换成dom对象，存储到vnode.elm中，注意此时并没有渲染到页面上；
2.1,sel是!,创建注释节点；
2.2,sel不为空,创建对于的dom对象；触发模块的钩子函数crat;创建所有子节点对于的dom对象;触发用户的钩子函数creat;如果vnode有insert钩子函数，追加到队列；
2.3,sel为空，创建文本节点;
3,返回vnode.elm;

#### patchVnode函数
1,触发prepatch钩子函数；
2,触发update钩子函数；
3,新节点有text属性，且不等于旧节点的text属性，如果老节点有children属性，移除老节点children对应的dom元素；设置新节点对应dom元素的textcontent;
4,新老节点都有children，且不相等，调用updateChildren()函数，对比子节点，并且更新子节点的差异；
5,只有新节点有children属性，如果老节点有text属性，清空对应dom元素的textcontent;添加所以的子节点；
6,只有老节点有children属性，移除所以的老节点；
7,只有老节点有text属性,清空对应dom元素的textcontent;
8,触发postpatch钩子函数;

#### 数据驱动
数据响应式，双向绑定，数据驱动
数据响应式：数据模型仅仅是普通的jsvascript对象，而当我们修改数据时，视图会进行更新，避免了繁琐的DOM操作，提高开发效率；
双向绑定：数据改变，视图改变；视图改变，数据也随之改变；我们可以使用v-model在表单元素上创建双向数据绑定；
数据驱动是vue最独特的特性之一：开发过程中只需要关注数据本身，不需要关心数据是如何渲染到页面上的。

#### vue响应式核心原理
vue2.x的核心原理是基于Object.defineProperty;
vue3.0使用Proxy实现，直接监听对象，而非属性；ES6新增，IE不支持，性能由浏览器优化；

#### 发布订阅者模式
订阅者，发布者，信号中心；
假定，存在一个信号中心，某个任务执行完成，就向信号中心'发布（publish）'一个信号，其他任务可以向信号中心'订阅（subscribe）'这个信号，从而知道什么时候自己可以开始执行，这就叫做发布订阅者模式（publish-subscribe pattern）
```
class EmmitEvent{
    constructor(){
        this.subs = Object.create(null);
    }
    $on(attr,fn){
        this.subs[attr] = this.subs[attr] || [];
        this.subs[attr].push(fn)
    }
    $emit(attr){
        this.subs[attr] && this.subs[attr].forEach((v) => v())
    }
}
let vm = new EmmitEvent();
vm.$on('click',() => {
    console.log('click1')
});
vm.$on('click',() => {
    console.log('click2')
});
vm.$emit('click')
```
#### 观察者模式
观察者(订阅者)--watcher:有一个update()方法，当事件发生时，具体要做的事情；
目标(发布者)--dep:subs数组，存储所有的观察者；addSubs()添加观察者；notify()当事件发生时，调用所有观察者的update()方法；
没有事件中心；
```
class Dep{
    constructor(){
        this.subs = [];
    }
    addSubs(subs){
        // subs有update方法才是观察者
        if(subs && subs.update){
            this.subs.push(subs)
        }
    }
    notify(){
        this.subs.forEach((v) => v.update())
    }
}

class Watch{
    update(){
        console.log('update')
    }
}

let dep = new Dep();
let watcher = new Watch();

dep.addSubs(watcher);

dep.notify();
```
#### 发布订阅者模式和观察者模式总结
观察者模式是由具体目标调度，比如事件触发，dep就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖关系的；
发布订阅者模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在；

#### 实现自己的vue框架
vue:把data中的成员注入到vue实例，并且把data中的数据转换成getter和setter;
observer:能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知DEP;

功能：
1，接受初始化的参数；
2，把data中的参数注入vue实例，并转换为getter和setter;
3,调用observer监听数据的变化；
4，调用compiler解析指令/差值表达式；

observer:
1,负责把data选项中的属性转换成响应式数据；
2,data中的某个属性也是对象，把该属性转换成响应式数据;
3,数据变化发送通知；

compiler:
1,负责编译模板，解析指令/差值表达式；
2,负责页面的首次渲染；
3,当数据改变时从新渲染页面。