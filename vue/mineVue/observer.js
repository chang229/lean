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
        this.walk(val);
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                return val;
            },
            set(newVue){
                if(newVue === val)return;
                val = newVue;
                _this.walk(newVue)
            }
        })
    }
}