import { init } from 'snabbdom/build/package/init';
import { h } from 'snabbdom/build/package/h';
// 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';
// 注册模块
let path = init([styleModule,eventListenersModule]);
// 使用模块
let vnode = h('div#container',[
    h('h1',{style:{backgroundColor:'red'}},'hello world'),
    h('p',{on:{click:handleClick}},'这是一个p标签')
])

function handleClick(){
    console.log('888')
}

let app = document.querySelector('#app');

path(app,vnode)