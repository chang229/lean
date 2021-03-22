// 7.说说什么是浅拷贝，什么是深拷贝？
// 浅拷贝只复制对象的第一层，深层次对象级别的复制只复制引用,即：如果原对象的值发生了改变，那么浅拷贝中对应的值也会改变,两个对象引用的是同一个内存空间，一个改变都改变;
// 深拷贝是每一层的数据都会复制出来，原对象的值改变，并不会影响复制的值;深拷贝就是两个对象，原对象还是用原来的存储空间;新对象自己开辟新空间，两个是互相独立的,互不影响;

// 浅拷贝方法实现
// 方法1
function easyClone(obj) {
	let newObj = {};
	for (let k in obj) {
		newObj[k] = obj[k];
	}
	return nrewObj;
}
// 方法二，使用ES6实现
let obj = { name: 'zcc' };
let newObj = Object.assign({}, obj);
console.log(newObj);

// 通过递归实现深拷贝
function clone(Obj) {
	var buf;
	if (Obj instanceof Array) {
		buf = []; //创建一个空的数组
		var i = Obj.length;
		while (i--) {
			buf[i] = clone(Obj[i]);
		}
		return buf;
	} else if (Obj instanceof Object) {
		buf = {}; //创建一个空对象
		for (var k in Obj) {
			//为这个对象添加新的属性
			buf[k] = clone(Obj[k]);
		}
		return buf;
	} else {
		return Obj;
	}
}
