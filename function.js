function add(a, b, c) {
	return a + b + c;
}

function curry(fn) {
	return function curryed(...args) {
		if (args.length < fn.length) {
			return function () {
				return curryed(...args.concat(Array.from(arguments)));
			};
		}
		return fn(...args);
	};
}

let curryed = curry(add);
console.log(curryed(1, 2, 3));
console.log(curryed(1)(2, 3));
console.log(curryed(1)(2, 3));
console.log(curryed(1)(2)(3));
