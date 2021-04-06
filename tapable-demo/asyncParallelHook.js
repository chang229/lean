const { AsyncParallelHook } = require('tapable');

let hook = new AsyncParallelHook(['name']);

// 对于异步钩子的使用，在添加监听时会存在三种方式：tap,tapAsync ,tapPromise
// hook.tap('fn1',function(name){
//     console.log('fn1',name)
// })

// hook.tap('fn2',function(name){
//     console.log('fn2',name)
// })

// hook.callAsync('chd',function(){
//     console.log('最后执行')
// })

// console.time('time')

// hook.tapAsync('fn1',function(name,callback){
//     setTimeout(() => {
//         console.log('fn1',name)
//         callback()
//     },1000)
// })

// hook.tapAsync('fn2',function(name,callback){
//     setTimeout(() => {
//         console.log('fn2',name)
//         callback()
//     },2000)
// })

// hook.callAsync('chd',function(){
//     console.log('最后执行');
//     console.timeEnd('time')
// })
console.time('time')
hook.tapPromise('fn1',function(name){
    return new Promise((resolve,rejected) => {
        setTimeout(() => {
            console.log('fn1',name);
            resolve()
        },1000)
    })
})

hook.tapPromise('fn2',function(name){
    return new Promise((resolve,rejected) => {
        setTimeout(() => {
            console.log('fn2',name);
            resolve()
        },2000)
    })
})

hook.promise('chd').then(() => {
    console.log('最后执行');
    console.timeEnd('time')
})