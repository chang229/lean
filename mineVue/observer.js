class Observer {
	constructor(data) {
		this.walk(data);
	}
	walk(data) {
		if (!data || typeof data !== 'object') return;
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key]);
		});
	}
	// 这里传入第三个参数value是因为在get和set时直接取obj[key]会发生对象的循环调用
	defineReactive(obj, key, value) {
		// 如果传入的value是对象，则递归调用walk方法，继续将value中的属性转换为get/set
		this.walk(value);
		// 调用dep对象，收集依赖
		let dep = new Dep();
		let that = this;
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				// 收集依赖
				Dep.target && dep.addSub(Dep.target);
				return value;
			},
			set(newValue) {
				if (newValue === value) return;
				value = newValue;
				// 如果newValue是对象，则将它的属性也转换为get/set
				that.walk(newValue);
				// 发送通知，更新视图
				dep.notify();
			},
		});
	}
}
