// 组合继承
// function Person(value) {
// 	this.val = value;
// }

// Person.prototype.say = function () {
// 	console.log(this.val);
// };

// function Student(value) {
// 	Person.call(this, value);
// }

// Student.prototype = new Person();

// let s = new Student('som');
// s.say();
// console.log(s instanceof Person);

//类的继承
class Person {
	constructor(value) {
		this.val = value;
	}

	say() {
		console.log(this.val);
	}
}

class Student extends Person {
	constructor(value) {
		super(value);
		// this.val = value;
	}
}

let s = new Student('2424');
s.say();
console.log(s instanceof Person);
