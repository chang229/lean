class Watcher{
    constructor(vm,key,cb){
        this.vm = vm;
        // data中的属性名称
        this.key = key;
        // 回调函数负责更新视图
        this.cb = cb;
        // 把watcher对象记录到Dep类的静态属性target
        Dep.target = this;
        // 触发getter方法在get中会调用Dep.addSub方法
        this.oldVal = vm[key];
        //将watcher添加到dep中之后，清空Dep.target防止多次添加
        Dep.target = null;
    }
    // 当数据发送变化时更新视图
    update(){
        let newVal = this.vm[this.key];
        if(newVal === this.oldVal) return;
        this.cb(newVal);
    }
}