class Vue{
    constructor(options){
        // 通过属性保存选项的数据
        this.$options = options || {},
        this.$data = options.data || {},
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        // 把data中的属性转换为getter和setter,并注入到vue实例中
        this._proxyData(this.$data);
        // 调用Observer对象，监听数据变化
        new Observer(this.$data);
    }
    _proxyData(data){
        // 遍历data中的所有属性并添加getter和setter
        Object.keys(data).forEach((key) => {
            // 把data中的属性注入到vue实例中
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newVue){
                    if(newVue === data[key]) return;
                    data[key] = newVue;
                }
            })
        })
    }
}