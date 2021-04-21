class Watcher{
    constructor(vm,key,cb){
        this.vm = vm;
        // data中的属性名称
        this.key = key;
        // 回调函数
        this.cb = cb;
        // 把watcher对象记录到Dep类的静态属性target
        Dep.target = this;
        // 触发get方法，在get方法中会调用addSub;
        this.oldValue = vm[key];
        // 添加完之后清空Dep的target属性
        Dep.target = null;
    }
    // 当数据发送变化时更新视图
    update(){
        let newValue = this.vm[this.key];
        if(newValue === this.oldValue) return;
        this.cb(newValue);
    }
}