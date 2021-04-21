class Compiler {
	constructor(vm) {
		this.el = vm.$el;
		this.vm = vm;
		this.compile(this.el);
	}
	// 编译模板，处理文本节点和元素节点
	compile(el) {
		// 获取el下面的所有子节点
		let childNodes = Array.from(el.childNodes);
		childNodes.forEach((node) => {
			// 处理文本节点
			if (this.isTextNode(node)) {
				this.compileText(node);
			}
			// 处理元素节点
			if (this.isElementNode(node)) {
				this.compileElement(node);
			}
			// 判断node节点是否有子节点，如果有子节点，要递归调用compiler
			if (node.childNodes && node.childNodes.length) {
				this.compile(node);
			}
		});
	}
	// 编译元素节点，处理指令
	compileElement(node) {
		// console.dir(node.attributes);
		// 获取元素节点所以的属性
		let attributes = Array.from(node.attributes);
		// 遍历所有属性
		attributes.forEach((attr) => {
			// 判断属性是不是指令(是不是以v-开头)
			if (this.isDirective(attr.name)) {
				let attrName = attr.name.substr(2);
				let attrValue = attr.value;
				this.update(node, attrValue, attrName);
			}
		});
	}
	update(node, key, attrName) {
		let updateFn = this[attrName + 'Update'];
		updateFn && updateFn(node, this.vm[key]);
	}
	// 处理v-text指令
	textUpdate(node, value) {
		node.textContent = value;
	}
	// 处理v-model指令
	modelUpdate(node, value) {
		node.value = value;
	}
	// 编译文本节点，处理差值表达式
	compileText(node) {
		// 定义正则表达式，匹配差值表达式 {{  }}
		let reg = /\{\{(.+?)\}\}/;
		// 获取文本节点的内容
		let value = node.textContent;
		if (reg.test(value)) {
			let key = RegExp.$1.trim();
			node.textContent = value.replace(reg, this.vm[key]);
		}
	}
	// 判断元素属性是否是指令
	isDirective(attrName) {
		// 判断属性是否以v-开头，vue中的指令都是以v-开头的
		return attrName.startsWith('v-');
	}
	// 判断节点是否是文本节点
	isTextNode(node) {
		// node属性中的nodeType = 3是文本节点
		return node.nodeType === 3;
	}
	// 判断节点是否是元素节点
	isElementNode(node) {
		// node属性中的nodeType = 1是元素节点
		return node.nodeType === 1;
	}
}
