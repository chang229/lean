class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        // 判断data是否是对象
        if(!data || typeof data !== 'object') return;
        // 遍历data,添加响应式数据
        Object.keys(data).forEach((v) => {
            this.defineReactive(data,v,data[v])
        })
    }
    defineReactive(obj,key,val){
        let _this = this;
        // dep负责收集依赖，并发送通知
        let dep = new Dep();
        // 如果val是对象，把val内部的数据转换为响应式数据
        this.walk(val);
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val;
            },
            set(newVue){
                if(newVue === val)return;
                val = newVue;
                _this.walk(newVue)
                // 发送通知
                dep.notify();
            }
        })
    }
}