Function.prototype.mycall = function (content, ...args) {
	content = content || window;
	const fn = Symbol('fn');
	content[fn] = this;
	content[fn](...args);
	delete content[fn];
};
let obj1 = {
	name: 'jom',
	home: 'china',
};
function goHome() {
	console.log(this.name, this.home);
}
goHome.call(obj1);
Function.prototype.myBind = function (content, ...args) {
	return (...reset) => this.call(content, ...args, ...reset);
};

function sayName() {
	console.log(this.name);
}

let obj = {
	name: 'obj',
};

let fn = sayName.myBind(obj);
fn();
