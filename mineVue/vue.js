class Vue {
	constructor(options) {
		this.$options = options || {};
		this.$data = options.data || {};
		this.$el =
			typeof options.el === 'string'
				? document.querySelector(options.el)
				: options.el;
		this._proxyData(this.$data);
		new Observer(this.$data);
		new Compile(this);
	}
	_proxyData(data) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get() {
					return data[key];
				},
				set(value) {
					if (data[key] === value) return;
					data[key] = value;
				},
			});
		});
	}
}
