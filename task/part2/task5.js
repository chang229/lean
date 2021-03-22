//5.请说出下列代码最终输出的结果，并解释为什么？
var a = 10;
var obj = {
	a: 20,
	fn() {
		setTimeout(() => {
			console.log(this.a);
		});
	},
};

obj.fn();

// 输出结果：20
// 因为是 obj 调用的 fn 函数 所以 this 指向 obj, this.a 即为 obj.a, 并且箭头函数中的 this 指向声明时所在的作用域上下文的 this 这里是 obj。
