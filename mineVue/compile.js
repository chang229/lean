class Compile {
	constructor(vm) {
		this.vm = vm;
		this.el = vm.$el;
		this.compile(this.el);
	}
	compile(el) {
		let childNodes = Array.from(el.childNodes);
		childNodes.forEach((node) => {
			if (this.isTextNode(node)) {
				this.compileText(node);
			}
			if (this.isElementNode(node)) {
				this.compileElement(node);
			}
			if (node.childNodes && node.childNodes.length > 0) {
				this.compile(node);
			}
		});
	}
	compileElement(node) {
		let attributes = Array.from(node.attributes);
		attributes.forEach((attr) => {
			let attrName = attr.name;
			if (this.isDirective(attrName)) {
				attrName = attrName.substr(2);
				let attrValue = attr.value;
				this.update(node, attrValue, attrName);
			}
		});
	}
	update(node, key, attrName) {
		let updateFn = this[attrName + 'Update'];
		updateFn && updateFn.call(this, node, this.vm[key], key);
	}
	// v-text
	textUpdate(node, value, key) {
		node.textContent = value;
		new Watcher(this.vm, key, (newValue) => {
			node.textContent = newValue;
		});
	}
	// v-model
	modelUpdate(node, value, key) {
		node.value = value;
		new Watcher(this.vm, key, (newValue) => {
			node.value = newValue;
		});
		node.addEventListener('input', () => {
			this.vm[key] = node.value;
		});
	}
	compileText(node) {
		let reg = /\{\{(.+?)\}\}/;
		let value = node.textContent;
		if (reg.test(value)) {
			let key = RegExp.$1.trim();
			node.textContent = value.replace(reg, this.vm[key]);
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = newValue;
			});
		}
	}
	isDirective(attrName) {
		return attrName.startsWith('v-');
	}
	isTextNode(node) {
		return node.nodeType === 3;
	}
	isElementNode(node) {
		return node.nodeType === 1;
	}
}
