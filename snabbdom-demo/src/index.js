import { init } from 'snabbdom/build/package/init';
import { h } from 'snabbdom/build/package/h';

const path = init([]);

// h函数第一个参数是标签加选择器
// 第二个参数是文本内容
let vNode = h('div#container','hello world');

let app = document.querySelector('#app');
// path函数第一次参数是oldVnode，也可以是一个dom
// 第二个参数是一个vnode
let oldVnode = path(app,vNode);

vNode = h('div#dom','hello snabbdom');

path(oldVnode,vNode)
