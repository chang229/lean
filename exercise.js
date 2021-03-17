class MyPromise {
	// promise对象传入一个构造函数，并且立即执行
	constructor(exector) {
		// 捕获构造函数运行过程中发生的错误信息
		try {
			exector(this.resolve, this.rejected);
		} catch (e) {
			this.rejected(e);
		}
	}
	// promise状态默认是pending
	status = 'pending';
	// promise成功的返回值
	value = '';
	// promise失败的错误信息
	reason = '';
	// promise的then方法传入的成功的回调函数列表
	successCallback = [];
	// promise的then方法传入的失败的回调函数列表
	errorCallbcak = [];
	// promise的resolve方法
	resolve = (value) => {
		// 判断promise的状态是pending才能继续向下执行，promise的状态一但改变就不能再变
		if (this.status === 'pending') {
			// 将promise的状态变为成功态
			this.status = 'fulfilled';
			// 报错promise的成功返回的数据
			this.value = value;
			// 将成功回调列表中的函数依次取出并执行
			while (this.successCallback.length) this.successCallback.shift()();
		}
	};
	// promise的rejected方法
	rejected = (reason) => {
		// 判断promise的状态是pending才能继续向下执行，promise的状态一但改变就不能再变
		if (this.status === 'pending') {
			// 将promise的状态变为失败的状态
			this.status = 'rejected';
			// 报错promise的失败信息
			this.reason = reason;
			// 将失败回调列表中的函数依次取出并执行
			while (this.errorCallbcak.length) this.errorCallbcak.shift()();
		}
	};
	// promise的then方法,返回一个新的promise对象，实现链式调用
	then(successCallback, errorCallback) {
		// 如果没有传入回调函数，则设置默认回调函数，包装then可以链式调用
		successCallback = successCallback ? successCallback : (value) => value;
		errorCallback = errorCallback
			? errorCallback
			: (reason) => {
					throw reason;
			  };
		let promise2 = new MyPromise((resolve, rejected) => {
			if (this.status === 'fulfilled') {
				// 将回调函数放入异步队列中可以访问到promise2
				setTimeout(() => {
					// 捕获回调函数会发生的错误
					try {
						let x = successCallback(this.value);
						this.resolvePromise(promise2, x, resolve, rejected);
					} catch (e) {
						rejected(e);
					}
				}, 0);
			}
			if (this.status === 'rejected') {
				setTimeout(() => {
					try {
						let x = errorCallback(this.reason);
						this.resolvePromise(promise2, x, resolve, rejected);
					} catch (e) {
						rejected(e);
					}
				}, 0);
			}
			if (this.status === 'pending') {
				this.successCallback.push(() => {
					setTimeout(() => {
						// 捕获回调函数会发生的错误
						try {
							let x = successCallback(this.value);
							this.resolvePromise(promise2, x, resolve, rejected);
						} catch (e) {
							rejected(e);
						}
					}, 0);
				});
				this.errorCallbcak.push(() => {
					setTimeout(() => {
						try {
							let x = errorCallback(this.reason);
							this.resolvePromise(promise2, x, resolve, rejected);
						} catch (e) {
							rejected(e);
						}
					}, 0);
				});
			}
		});
		return promise2;
	}
	resolvePromise(promise2, x, resolve, rejected) {
		//如果x和promise2是同一个promise对象，则抛出错误
		if (promise2 === x) {
			return rejected(new TypeError('promise对被循环引用'));
		}
		// 如果x是promise对象，则执行它
		if (x instanceof MyPromise) {
			return x.then(resolve, rejected);
		}
		// 如果x是普通数值，就直接返回他
		return resolve(x);
	}
	// promise的finall方法不管成功或失败都会执行,并返回一个新的promise实现链式调用
	finall(callback) {
		return this.then(
			(value) => MyPromise.resolve(callback()).then(() => value),
			(reason) =>
				MyPromise.resolve(callback()).then(() => {
					throw reason;
				})
		);
	}
	// promise的catch方法捕获promise的失败信息，并执行错误的回调方法
	catch(callback) {
		return this.then(undefined, callback);
	}
	//promise的resolve方法，该方法是一个静态方法
	static resolve(value) {
		// 如果value是一个promise则直接返回
		if (value instanceof MyPromise) return value;
		// 如果是一个普通值，则把它包装成一个promise并返回
		return new MyPromise((resolve) => resolve(value));
	}
	// promise的rejected方法，该方法是一个静态方法
	static rejected(value) {
		return new MyPromise((undefined, rejected) => rejected(value));
	}
	// promise的all方法，该方法接收一个数组，等到所有异步调用返回之后再返回一个相同顺序的数组返回值
	static all(array) {
		let result = []; //返回的结果数组
		let index = 0; //执行完的个数
		return new MyPromise((resolve, rejected) => {
			array.forEach((v, i) => {
				function addResult(k, v) {
					result[k] = v;
					index++;
					if (index === array.length) {
						resolve(result);
					}
				}
				// 如果是promise对象，则执行它，等到它返回结果再添加到结果数组中
				if (v instanceof MyPromise) {
					v.then(
						(res) => addResult(i, res),
						(reason) => rejected(reason)
					);
				} else {
					// 普通数值，则直接添加到结果数组中
					addResult(i, v);
				}
			});
		});
	}
	// promise的race方法，只要其中一个返回了就立马返回
	static race(array) {
		return new MyPromise((resolve, rejected) => {
			array.forEach((v) => {
				if (v instanceof MyPromise) {
					v.then(
						(res) => resolve(res),
						(err) => rejected(err)
					);
				} else {
					resolve(v);
				}
			});
		});
	}
}

let promise = new MyPromise((resolve, rejected) => {
	setTimeout(() => {
		// rejected('error');
		resolve(100);
	}, 1000);
});
let promise2 = new MyPromise((resolve, rejected) => {
	setTimeout(() => {
		// rejected('error');
		resolve(200);
	}, 2000);
});
MyPromise.race([promise, promise2]).then((res) => console.log(res));
// MyPromise.resolve(promise).then((res) => console.log(res));
// promise
// 	.then(
// 		(res) => {
// 			console.log(res);
// 			return 200;
// 		},
// 		(err) => {
// 			console.log(err);
// 			return 300;
// 		}
// 	)
// 	.then(
// 		(res) => console.log(res),
// 		(err) => console.log(err)
// 	);
