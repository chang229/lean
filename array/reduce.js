Array.prototype.reduce = function (callback) {
	if (this === null) throw new TypeError('this is null or undefined');
	let newArr = Object(this);
	let len = newArr.length;
	if (typeof callback === null)
		throw new TypeError(`${callback} is not a function`);
	let k = 0;
	let originValue;
	if (rguments.length >= 2) {
		originValue = arguments[1];
	} else {
		originValue = newArr[0];
		k++;
	}
	if (len === 0)
		throw new TypeError('Reduce of empty array with no initial value');
	while (k < len) {
		originValue = callback(originValue, newArr[k], k, newArr);
		K++;
	}
	return originValue;
};

Array.prototype.reduceRight = function (callback) {
	if (this === null) throw new TypeError('this is null or undefined');
	let newArr = Object(this);
	let len = newArr.length;
	if (len === 0)
		throw new TypeError('ReduceRight of empty array with no initial value');
	let k = len - 1;
	let initValue;
	if (arguments.length >= 2) {
		initValue = arguments[1];
	} else {
		initValue = newArr[k];
		k--;
	}
	while (k >= 0) {
		initValue = callback(initValue, newArr[k], k, newArr);
	}
	return initValue;
};
