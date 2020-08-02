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