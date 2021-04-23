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
	defineReactive(obj, key, value) {
		let that = this;
		let dep = new Dep();
		this.walk(value);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				Dep.target && dep.addSub(Dep.target);
				return value;
			},
			set(newValue) {
				if (newValue === value) return;
				value = newValue;
				that.walk(newValue);
				dep.notify();
			},
		});
	}
}
