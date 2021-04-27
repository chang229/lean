class Watcher {
	constructor(vm, key, cb) {
		this.vm = vm;
		this.key = key;
		this.cb = cb;
		Dep.target = this;
		this.oldValue = vm[key];
		Dep.target = null;
	}
	update() {
		console.log('update');
		let newValue = this.vm[this.key];
		console.log(newValue);
		if (newValue === this.oldValue) return;
		console.log('8989');
		this.cb(newValue);
	}
}
