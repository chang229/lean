Function.prototype.mycall = function (thisArg) {
	if (typeof this !== 'function') {
		throw new TypeError('this is not a function');
	}
	const fn = Symbol('fn');

	const args = [].splice.call(arguments, 1);

	thisArg = thisArg || window;

	thisArg[fn] = this;

	const result = thisArg[fn](...args);

	delete thisArg[fn];

	return result;
};

Function.prototype.myapply = function (thisArg) {
	if (typeof this !== 'function') {
		throw new TypeError('this is not a function');
	}

	let args = arguments[1];
	thisArg = thisArg || window;

	let fn = Symbol('fn');

	thisArg[fn] = this;

	let result = thisArg[fn](...args);

	delete thisArg[fn];

	return result;
};

const bar = function () {
	console.log(this.name);
	console.log(arguments);
};

bar.prototype.name = 'bar';

const foo = {
	name: 'foo',
};

bar.mycall(foo, 1, 2, 3); // foo [1, 2, 3]
bar.myapply(foo, [1, 2, 3]); // foo [1, 2, 3]
