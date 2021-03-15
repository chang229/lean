//代码题二 基于以下代码完成四个练习
const fp = require('lodash/fp');
const cars = [
	{
		name: 'Ferrari FF',
		horsepower: 660,
		dollar_value: 700000,
		in_stock: true,
	},
	{
		name: 'Spyker C12 Zagato',
		horsepower: 650,
		dollar_value: 648000,
		in_stock: false,
	},
	{
		name: 'Jaguar XKR-S',
		horsepower: 550,
		dollar_value: 132000,
		in_stock: false,
	},
	{
		name: 'Audi R8',
		horsepower: 525,
		dollar_value: 114200,
		in_stock: false,
	},
	{
		name: 'Aston Martin One-77',
		horsepower: 750,
		dollar_value: 1850000,
		in_stock: true,
	},
	{
		name: 'Pagani Huayra',
		horsepower: 700,
		dollar_value: 1300000,
		in_stock: false,
	},
];
// 3.1使用fp.flowRight重新实现下面这个函数
// let isLastInStock = function (cars) {
// 	let last_car = fp.last(cars);
// 	return fp.prop('in_stock', last_car);
// };
//3.1函数改造如下
const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(isLastInStock(cars)); // false

//3.2使用fp.flowRight(),fp.prop()和fp.first()获取第一个car的name
const isFirstName = fp.flowRight(fp.prop('name'), fp.first);
console.log(isFirstName(cars)); //Ferrari FF

// 3.3使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
let _average = function (xs) {
	return fp.reduce(fp.add, 0, xs) / xs.length;
};
// let averageDollarValue = function (cars) {
// 	let dollar_values = fp.map(function (car) {
// 		return car.dollar_value;
// 	}, cars);
// 	return _average(dollar_values);
// };
// 3.3 averageDollarValue函数重构如下
let averageDollarValue = fp.flowRight(
	_average,
	fp.map((car) => car.dollar_value)
);
console.log(averageDollarValue(cars)); //790700

// 练习4 使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串
let _underscore = fp.replace(/\W+/g, '_');
let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(fp.toLower, _underscore)));
console.log(sanitizeNames(['Hello World'])); // [hello_world]
