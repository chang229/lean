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

	defineReactive(obj, key, value) {
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				return value;
			},
			set(newValue) {
				if (newValue === value) return;
				value = newValue;
				// 发送通知
			},
		});
	}
}
