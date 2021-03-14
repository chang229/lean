// 如何理解js异步编程
// 异步模式指的是javascript代码不会等待前面的代码执行完毕才开始执行。将执行的代码放入到调用栈中执行，如果是同步的直接执行，如果是异步的则放入消息队列中等待执行，等到所有的同步代码执行完毕，EventLoop它会监听调用栈和消息队列中的任务，当调用栈中所有的任务结束以后，它会从消息队列中依次取出回调函数压入到调用栈，开始执行，直到整个循环结束

// EventLoop
// 主线程从消息队列中读取事件，这个过程是循环不断的，所以整个的这种运行机制称为EventLoop（事件循环），EventLoop是javascript的执行机制

// 消息队列
// 消息队列是暂时存放异步任务的地方，异步代码会存放到消息队列中，等到同步代码执行完毕以后，EventLoop会从消息队列中依次取出异步任务放到调用栈中再次执行。

// 宏任务和微任务
// 宏任务:当前调用栈中执行的代码成为宏任务，包括：主代码块 ，定时器
// 微任务：宏任务执行完,在下一个宏任务开始之前需要执行的任务,可以理解为回调函数，微任务包括：promise,MutationObserver还有node中的process.nextTick
// 运行机制：
// 在执行栈中执行一个宏任务
// 执行过程中遇到微任务，将微任务添加到消息队列中
// 当前宏任务执行完毕,立即执行微任务队列中的任务
// 微任务执行完毕后，把下一个宏任务放到消息队列中，通过eventloop放到调用栈中执行。
