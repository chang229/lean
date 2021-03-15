// 1.使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');

let maybe = Maybe.of([5, 6, 1]);
let ex1 = (value) => {
	return fp.map((v) => {
		return fp.add(v, 1);
	}, value);
};
console.log(maybe.map(ex1)); //Maybe { _value: [ 6, 7, 2 ] }

// 2,实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
let ex2 = (array) => {
	return fp.first(array);
};
console.log(xs.map(ex2)); //Container { _value: 'do' }

// 3,实现一个函数ex3，使用safeProp和fp.first找到user的名字和首字母
let safeProp = fp.curry(function (x, o) {
	return Maybe.of(o[x]);
});
let user = { id: 2, name: 'Albert' };
let ex3 = (value) => {
	let maybe = safeProp('name', value);
	return maybe.map(fp.first);
};
console.log(ex3(user)); //Maybe { _value: 'A' }

// 使用Maybe重新ex4,不要有if语句
let ex4 = function (n) {
	return Maybe.of(n).map(parseInt);
};
console.log(ex4(0));
