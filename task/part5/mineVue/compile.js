class Compiler {
	constructor(vm) {
		this.vm = vm;
		this.el = vm.$el;
		this.compile(this.el);
	}
	compile(el) {
		let childNodes = Array.from(el.childNodes);
		childNodes.forEach((node) => {
			// 如果是文本节点
			if (this.isTextNode(node)) {
				this.compileText(node);
			}
			// 如果是元素节点
			if (this.isElementNode(node)) {
				this.compilElement(node);
			}
			// 如果子节点下面还有子节点，则递归调用compile继续解析
			if (node.childNodes && node.childNodes.length > 0) {
				this.compile(node);
			}
		});
	}
	compilElement(node) {
		// 获取元素节点的所有属性信息
		let attributes = Array.from(node.attributes);
		attributes.forEach((attr) => {
			let attrName = attr.name;
			if (this.isDirective(attrName)) {
				let attrValue = attr.value;
				let updateKey = attrName.substr(2);
				this.update(node, updateKey, attrValue);
			}
			if (this.idAddEvent(attrName)) {
				let attrValue = attr.value;
				this.onUpdate(node, attrName, attrValue);
			}
		});
	}
	update(node, key, value) {
		let updateFn = this[key + 'Update'];
		updateFn && updateFn.call(this, node, value);
	}
	// 处理v-text指令
	textUpdate(node, key) {
		node.textContent = this.vm[key];
		new Watcher(this.vm, key, (newValue) => {
			node.textContent = newValue;
		});
	}
	// 处理v-model指令
	modelUpdate(node, key) {
		node.value = this.vm[key];
		new Watcher(this.vm, key, (newValue) => {
			node.value = newValue;
		});
		node.addEventListener('input', () => {
			this.vm[key] = node.value;
		});
	}
	// 处理v-html指令
	htmlUpdate(node, key) {
		node.innerHTML = this.vm[key];
		new Watcher(this.vm, key, (newValue) => {
			node.innerHTML = newValue;
		});
	}
	// 处理v-on指令
	onUpdate(node, attrName, value) {
		let eventType = '';
		attrName = attrName.replace('v-on:', '');
		attrName = attrName.replace('@', '');
		let eventArr = attrName.split('.');
		eventType = eventArr.shift();
		console.log(eventArr);
		node.addEventListener(
			eventType,
			(e) => {
				window[value]();
				if (eventArr.indexOf('stop')) {
					e.stopPropagation();
				}
				if (eventArr.indexOf('prevent')) {
					e.preventDefault();
				}
			},
			true
		);
	}
	// 处理文本节点
	compileText(node) {
		// 定义 匹配插值表达式
		let reg = /\{\{(.+?)\}\}/;
		// 获取文本节点的内容
		let content = node.textContent;
		if (reg.test(content)) {
			// 获取插值表达式中的键值
			let key = RegExp.$1.trim();
			node.textContent = this.vm[key];
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = newValue;
			});
		}
	}
	// 判断属性是不是vue指令
	isDirective(attrName) {
		return attrName.startsWith('v-');
	}
	// 判断属性是不是添加事件
	idAddEvent(attrName) {
		return attrName.startsWith('v-on') || attrName.startsWith('@');
	}
	// 判断是否是文本节点
	isTextNode(node) {
		return node.nodeType === 3;
	}
	// 判断是否是元素节点
	isElementNode(node) {
		return node.nodeType === 1;
	}
}
