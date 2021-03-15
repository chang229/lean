//代码题一, 使用promise改进异步代码
setTimeout(() => {
	var a = 'hello';
	setTimeout(() => {
		var b = 'lagou';
		setTimeout(() => {
			var c = 'I ❤ U';
			console.log(a + b + c);
		}, 10);
	}, 10);
}, 10);
// 改造如下
let promise = function (value) {
	return new Promise((resolve, rejected) => {
		setTimeout(() => {
			resolve(value);
		}, 10);
	});
};
promise('hello')
	.then((res) => {
		return promise(res + 'lagou');
	})
	.then((res) => {
		return promise(res + 'I ❤ U');
	})
	.then((res) => {
		console.log(res);
	});
