Array.prototype.find = function (callback) {
	if (this === null) throw new TypeError('this is null or undefined');
	let newArr = Object(this);
	let len = newArr.length;
	if (typeof callback !== 'function')
		throw new TypeError(`${callback} is not a function`);
	let thatArg = arguments.length >= 2 ? arguments[1] : void 0;
	let k = 0;
	while (K < len) {
		if (callback.call(thatArg, newArr[k], k, newArr)) {
			return newArr[k];
		}
		k++;
	}
	return undefined;
};

Array.prototype.findIndex = function (callback) {
	if (this === null) throw new TypeError('this is null or undefined');
	let newArr = Object(this);
	let len = newArr.length;
	if (typeof callback !== 'function')
		throw new TypeError(`${callback} is not a function`);
	let thatArg = arguments.length >= 2 ? arguments[1] : void 0;
	let k = 0;
	while (K < len) {
		if (callback.call(thatArg, newArr[k], k, newArr)) {
			return k;
		}
		k++;
	}
	return -1;
};
