const Hook = require('./hook');

class HookCodeFactory{
    args({before,after} = {}){
        let allArgs = this.options.args;
        if(before) allArgs = [before].concat(allArgs);
        if(after) allArgs = allArgs.concat([after])
        // ['name','age'] => 'name,age'
        return this.options.args.join(',')
    }
    header(){
        return `'use strict';var _context;var _x = this._x;`;
    }
    content(){
        let code = `var _counter = ${this.options.taps.length};var _done = (function () {
            _callback();
          });`
          for (var i = 0; i < this.options.taps.length; i++) {
            code += `var _fn${i} = _x[${i}];_fn${i}(name, age, (function () {
              if (--_counter === 0) _done();
            }));`
          }
        return code;
    }
    // 先准备后续需要使用到的数据
    setup(instance,options){
        this.options = options;//这里的操作在源码中是通过init方法实现的，而我们当前是直接挂载在了this身上
        instance._x = options.taps.map((v) => v.fn) // this._x = [f1,f2,...]
    }
    // 核心就是创建一段可执行的代码体然后返回
    create(){
        let fn;
        fn = new Function(
            this.args({after:'_callback'}),
            this.header() + this.content()
        )
        return fn;
    }
}

let factory = new HookCodeFactory();

class AsyncParallelHook extends Hook{
    constructor(args){
        super(args)
    }
    // options 是 {taps:[{},{}],args:[name,age]}
    compile(options){
        factory.setup(this,options);
        return factory.create(options)
    }
}

module.exports = AsyncParallelHook