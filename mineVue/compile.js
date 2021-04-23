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
			if (this.isDirective(attr)) {
				let attrName = attr.substr(2);
				this.update(node, attrName, this.vm[attrName]);
			}
		});
	}
	update(node, key, value) {
		let updateFn = this[key + 'Update'];
		updateFn && updateFn.call(this, node, key, value);
	}
	// v-text
	textUpdate(node, key, value) {
		node.textContent = value;
		new Watcher(this.vm, key, (newValue) => {
			node.textContent = newValue;
		});
	}
	// v-model
	modelUpdate(node, key, value) {
		node.value = value;
		node.addEventListener('input', () => {
			this.vm[key] = node.value;
		});
		new Watcher(this.vm, key, (newValue) => {
			node.value = newValue;
		});
	}
	compileText(node) {
		let reg = /\{\{(.+?)\}\}/;
		let value = node.textContent;
		if (reg.test(value)) {
			let key = Regexp.$1.trim();
			node.textContent = value.replace(reg, this.vm[key]);
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = value.replace(reg, newValue);
			});
		}
	}
	isDirective(attrName) {
		return attrName.startsWidth('v-');
	}
	isTextNode(node) {
		return node.nodeType === 3;
	}
	isElementNode(node) {
		return node.nodeType === 1;
	}
}
