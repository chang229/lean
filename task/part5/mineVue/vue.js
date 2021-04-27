class Vue {
	constructor(options) {
		// 缓存参数信息
		this.$options = options || {};
		// 缓存options中的data
		this.$data = options.data || {};
		// 缓存options中的method
		this.method = options.method;
		// 将data中的属性转换为get/set，并挂载到vue实例上
		this._proxyData(this.$data);
		// 挂载el
		this.$el =
			typeof options.el === 'string'
				? document.querySelector(options.el)
				: options.el;
		// Observer监听数据得变化
		new Observer(this.$data);
		// compiler解析指令和插值表达式
		new Compiler(this);
	}
	_proxyData(data) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get() {
					return data[key];
				},
				set(newValue) {
					if (newValue === data[key]) return;
					data[key] = newValue;
				},
			});
		});
	}
}
