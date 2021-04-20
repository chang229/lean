// import Observer from './observer';

class Vue {
	constructor(options) {
		// 通过属性保存选项中的数据
		this.$options = options || {};
		this.$data = options.data || {};
		this.$el =
			typeof options.el === 'string'
				? document.querySelector(options.el)
				: options.el;
		// 把data中的成员转换成getter/setter,注入到vue实例中
		this._proxyData(this.$data);
		// 调用Observer对象 监听数据得变化
		new Observer(this.$data);
		// 调用Compiler对象，解析指令和插值表达式
        new Compiler(this)
	}

	_proxyData(data) {
		// 遍历data中的所有属性
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get() {
					return data[key];
				},
				set(value) {
					if (value === data[key]) return;
					data[key] = value;
				},
			});
		});
	}
}
