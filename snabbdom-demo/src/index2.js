import { init } from 'snabbdom/build/package/init';
import { h } from 'snabbdom/build/package/h';

let path = init([]);

let vnode = h('div#container',[
    h('h1','hello world'),
    h('p','这是一个p标签')
])

let app = document.querySelector('#app');

let oldVnode = path(app,vnode);

setTimeout(() => {
    // vnode = h('div#container',[
    //     h('h1','hello snabbdom'),
    //     h('p','suabbdom')
    // ])
    // path(oldVnode,vnode)
    path(oldVnode,h('!'))
},2000)