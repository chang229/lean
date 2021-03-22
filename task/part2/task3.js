// 3.结合ES6新语法，用最简单的方式找出数组中的最小值
var arr = [12, 34, 32, 89, 4];

// 1.使用展开运算符
let minNum = Math.min(...arr);
console.log(minNum);

// 2.使用剩余参数
let minFn = (args) => Math.min(...args);
console.log(minFn(arr));
