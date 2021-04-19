let _Vue = null;

class VueRouter {
	constructor(options) {
		// 保存传入的options
		this.options = options;
		// 保存当前的路由模式，默认是hash模式
		this.mode = options.mode || 'hash';
		//创建routerMap对象用于保存路径和组件的映射关系
		this.routerMap = {};
		// 创建一个响应式的data对象，data对象中的current属性就是当前的路径名称
		this.data = _Vue.observable({
			current:
				options.mode === 'hash'
					? window.location.hash('#', '')
					: window.location.pathname,
		});
	}

	static install(Vue) {
		// 判断当前插件是否已被注册
		if (VueRouter.install.installed) return;
		VueRouter.install.installed = true;
		// 全局保存传入的Vue构造函数
		_Vue = Vue;
		// 使用mixin函数把在创建Vue实例时传入的router对象挂载到Vue实例上
		_Vue.mixin({
			beforeCreate() {
				if (this.$options.router) {
					_Vue.prototype.$router = this.$options.router;
					this.$options.router.init();
				}
			},
		});
	}

	init() {
		this.createRouterMap();
		this.initComponents(_Vue);
		this.initEvent();
	}

	// createRouterMap方法：遍历所有的路由配置，形成键值对的形式存入routerMap对象
	createRouterMap() {
		this.options.routes.forEach((router) => {
			this.routerMap[router.path] = router.component;
		});
	}

	// initComponents方法用于创建router-link和router-view组件
	initComponents(Vue) {
		// 保存当前的VueRouter实例
		let _this = this;
		// 创建router-link组件
		Vue.component('router-link', {
			props: {
				to: String,
			},
			render(h) {
				return h(
					'a',
					{
						attrs: {
							href:
								_this.mode === 'hash' ? '#' + this.to : this.to,
						},
						on: {
							click: this.handleClick,
						},
					},
					[this.$slots.default]
				);
			},
			methods: {
				handleClick(e) {
					_this.data.current = this.to;
					if (_this.mode !== 'hash') {
						history.pushState({}, '', this.to);
						e.preventDefault();
					}
				},
			},
		});
		//创建router-view组件
		Vue.component('router-view', {
			render(h) {
				let component = _this.routerMap[_this.data.current];
				return h(component);
			},
		});
	}

	// initEvent方法，添加浏览器事件监听，当路由改变时修改this.data.current的值，更新组件渲染
	initEvent() {
		if (this.mode === 'hash') {
			window.addEventListener('hashchange', () => {
				this.data.current = window.location.hash.replace('#', '');
			});
		} else {
			window.addEventListener('popstate', () => {
				this.data.current = window.location.pathname;
			});
		}
	}
}

export default VueRouter;
