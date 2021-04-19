let _Vue = null;

class VueRouter {
	constructor(options) {
		// 保存传入的参数信息
		this.options = options;
		// 保存传入的路由模式,默认是hash模式
		this.mode = options.mode || 'hash';
		// 创建routerMap对象用于保存路径和模块的映射关系
		this.routerMap = {};
		// 创建data对象，data中的current属性是当前的路径名称，它是一个响应式的数据
		this.data = _Vue.observable({
			current:
				this.mode === 'hash'
					? window.location.hash.replace('#', '')
					: window.location.pathname,
		});
	}
	// install是一个静态方法
	static install(Vue) {
		// 先判断当前插件是否已挂载
		if (VueRouter.install.installed) return;
		VueRouter.install.installed = true;
		// 在全局变量中保存Vue构造函数
		_Vue = Vue;
		// 使用mixin把在创建Vue实例时传入的router对象挂载到Vue实例上
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

	createRouterMap() {
		// 遍历所有的路由配置，并形成键值对的形式存入routerMap对象
		this.options.routes.forEach((router) => {
			this.routerMap[router.path] = router.component;
		});
	}
	// 创建router-link 和 router-view 组件
	initComponents(Vue) {
		// 将当前router实例保存到_this;
		const _this = this;
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
							click: this.handelClick,
						},
					},
					[this.$slots.default]
				);
			},
			methods: {
				handelClick(e) {
					// router-link组件点击事件
					// 阻止a标签的默认行为，阻止向服务器发送请求
					// 将router.data.current中保存的当前路径变为a标签中href的路径
					this.$router.data.current = this.to;
					if (_this.mode !== 'hash') {
						// 将当前路由加入history列表
						history.pushState({}, '', this.to);
						e.preventDefault();
					}
				},
			},
		});
		// 创建router-view组件
		Vue.component('router-view', {
			render(h) {
				let component = _this.routerMap[_this.data.current];
				return h(component);
			},
		});
	}

	initEvent() {
		// 添加浏览器路由事件监听，当路由改变时修改this.data.current的值，去更新组件渲染
		if (this.mode === 'hash') {
			// hahs模式下监听hashchange事件
			window.addEventListener('hashchange', () => {
				this.data.current = window.location.hash.replace('#', '');
			});
		} else {
			// history模式下监听popstate事件
			window.addEventListener('popstate', () => {
				this.data.current = window.location.pathname;
			});
		}
	}
}

export default VueRouter;
