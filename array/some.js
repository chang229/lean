Array.prototype.some = function (callback, thisArg) {
	if (this === null) throw new TypeError('this is null or not defined');
	let newArr = Object(this);
	let len = newArr.length;
	if (typeof callback !== 'function')
		throw new TypeError(`${callback} is not a function`);
	let thatArg = arguments.length >= 2 ? arguments[1] : void 0;
	let k = 0;
	while (k < len) {
		if (callback.call(thatArg, newArr[k], k, newArr)) {
			return true;
		}
		k++;
	}
	return false;
};
