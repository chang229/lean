Array.prototype.forEach = function (callback, thisArg) {
	if (this === null) throw new TypeError('this is null or not defined');
	let newArr = Object(this);
	let len = newArr.length;
	if (typeof callback !== 'function')
		throw new TypeError(`${callback} is not a function`);
	let thatArg = arguments.length >= 2 ? arguments[1] : void 0;
	let k = 0;

	while (k < len) {
		if (k in newArr) {
			callback.call(thatArg, newArr[k], k, newArr);
		}
		k++;
	}
	return void 0;
};
