//1.请说出下列代码的最终执行结果，并解释为什么？
var a = [];
for (var i = 0; i < 10; i++) {
	a[i] = function () {
		console.log(i);
	};
}
a[6]();

// 输出结果是10
// 因为通过var声明了一个全局的变量i,通过for循环,循环 10 次，数组a中保存10个函数,而且当循环结束以后，全局变量i的值已经变为了10,这个时候无论调用数组中的哪一个,打印结果都是10。

// 可以改为下面两种：
// 1.使用闭包
for (var i = 0; i < 10; i++) {
	a[i] = (function (j) {
		return function () {
			console.log(j);
		};
	})(i);
}
a[6](); // 6

// 2,使用ES6的let声明创建块级作用域
for (let i = 0; i < 10; i++) {
	a[i] = function () {
		console.log(i);
	};
}
a[6]();
