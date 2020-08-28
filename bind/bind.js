Function.prototype.bind = function (target) {
	if (typeof this !== 'function') {
		throw new TypeError('Bind must be called on a function');
	}
	let self = this;

	let args = [].slice.call(arguments, 1);

	let temp = function () {};

	let f = function () {
		let _arg = [].slice.call(arguments, 0);
		target = target || window;
		return self.apply(
			this instanceof temp ? this : target,
			args.concat(_arg)
		);
	};
	temp.prototype = self.prototype;
	f.prototype = new temp();
	return f;
};

const bar = function () {
	console.log(this.name, arguments);
};

bar.prototype.name = 'bar';

const foo = {
	name: 'foo',
};

const bound = bar.bind(foo, 22, 33, 44);
new bound(); // bar, [22, 33, 44]
console.log('999');
bound(); // foo, [22, 33, 44]
console.log('888');
