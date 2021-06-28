Array.prototype.map = function (callback) {
	if (this === null) throw new TypeError('this is null or undefined');
	let newArr = Object(this);
	let len = newArr.length;
	if (typeof callback !== 'function')
		throw new TypeError(`${callback} is not a function`);
	let thatArg = arguments.length >= 2 ? arguments[1] : void 0;
	let k = 0,
		result = [];
	while (k < len) {
		result[k] = callback.call(thatArg, newArr[k], k, newArr);
		k++;
	}
	return result;
};
