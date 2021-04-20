class Observer {
	constructor(data) {
		this.walk(data);
	}

	walk(data) {
		// 判断data是不是对象，不是对象就什么都不做
		if (!data || typeof data !== 'object') return;
		// 遍历data对象的所有属性
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key]);
		});
	}
    // 第三个参数要穿value是因为如果此处直接取obj[key]就会发生对象的循环调用，造成堆栈溢出
    // 此处会形成闭包，所有value的值并不会被垃圾回收机制处理掉
	defineReactive(obj, key, value) {
        let that = this;
        // 如果value是对象，则把value内部的属性也转换成响应式数据
        this.walk(value);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				return value;
			},
			set(newValue) {
				if (newValue === value) return;
				value = newValue;
                // 如果newValue是对象，则把newValue内部的属性转换成响应式数据
                that.walk(newValue);
				// 发送通知
			},
		});
	}
}
