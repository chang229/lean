// 2.请输出下列代码的最终执行结果，并解释为什么？
var tmp = 123;
if (true) {
	console.log(temp);
	let temp;
}
// 执行结果是报错：Cannot access 'temp' before initialization
// 因为通过let声明创建了一个块级作用域,块级作用域中的变量只能在声明以后才能使用,否则报错。这里 console.log打印的是块级作用域中的tmp,应该在声明之后使用
