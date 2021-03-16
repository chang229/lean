/*
  1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
  2. Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
    pending -> fulfilled
    pending -> rejected
    一旦状态确定就不可更改
  3. resolve和reject函数是用来更改状态的
    resolve: fulfilled
    reject: rejected
  4. then方法内部做的事情就判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then方法是被定义在原型对象中的
  5. then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
  6. 同一个promise对象下面的then方法是可以被调用多次的
  7. then方法是可以被链式调用的, 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值
*/
class MyPromise {
	// promise接收一个构造函数，并且立即执行
	constructor(exector) {
		// 立即程序构造函数，捕获执行过程总会发生的错误
		try {
			exector(this.resolve, this.rejected);
		} catch (e) {
			this.rejected(e);
		}
	}
	// promise状态，默认pending
	status = 'pending';
	// 成功的返回数据
	value = '';
	// 错误的原因
	reason = '';
	// 成功的回调函数
	successCallback = [];
	// 失败的回调函数
	errorCallback = [];
	// promise成功的回调函数
	resolve = (value) => {
		// 判断当前promise状态是pending才能继续往下执行，否则不执行
		if (this.status === 'pending') {
			// 将promise的状态置为fulfilled
			this.status = 'fulfilled';
			this.value = value;
			// 调用成功的回调函数
			while (this.successCallback.length) this.successCallback.shift()();
		}
	};
	// promise失败的回调函数
	rejected = (reason) => {
		if (this.status === 'pending') {
			this.status = 'rejected';
			this.reason = reason;
			while (this.errorCallback.length) this.errorCallback.shift()();
		}
	};
	// promise的then方法返回一个全新的promise对象
	then(successCallback, errorCallback) {
		// 判断是否有回调函数，没有的话设置默认回调函数，保证不传参数也可以正常调用
		successCallback = successCallback ? successCallback : (value) => value;
		errorCallback = errorCallback
			? errorCallback
			: (reason) => {
					throw reason;
			  };
		let x = undefined;
		let promise2 = new MyPromise((resolve, rejected) => {
			if (this.status === 'fulfilled') {
				setTimeout(() => {
					// 捕获回调函数中可能会发生的错误
					try {
						x = successCallback(this.value);
						this.resolvePromise(promise2, x, resolve, rejected);
					} catch (e) {
						rejected(e);
					}
				}, 0);
			}
			if (this.status === 'rejected') {
				setTimeout(() => {
					try {
						x = errorCallback(this.reason);
						this.resolvePromise(promise2, x, resolve, rejected);
					} catch (e) {
						rejected(e);
					}
				}, 0);
			}
			if (this.status === 'pending') {
				this.successCallback.push(() => {
					setTimeout(() => {
						// 捕获回调函数中可能会发生的错误
						try {
							x = successCallback(this.value);
							this.resolvePromise(promise2, x, resolve, rejected);
						} catch (e) {
							rejected(e);
						}
					}, 0);
				});
				this.errorCallback.push(() => {
					setTimeout(() => {
						try {
							x = errorCallback(this.reason);
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
	// promise的finall方法无论成功或失败都执行并且返回一个新的promise
	finall(callBack) {
		return this.then(
			(res) => {
				return MyPromise.resolve(callBack(res)).then(() => res);
			},
			(err) => {
				return MyPromise.resolve(callBack(err)).then(() => {
					throw err;
				});
			}
		);
	}
	//promise的错误捕获事件，并且返回一个新的promise
	catch(callback) {
		return this.then(undefined, (err) => callback(err));
	}
	// 判断promise2是不是和x相同，相同报错，promise不能循环引用
	// 判断x是promise对象，则调用promise的then方法
	// x是普通值则直接返回
	resolvePromise(promise2, x, resolve, rejected) {
		if (promise2 === x) {
			return rejected(new TypeError('promise对象被循环调用'));
		}
		if (x instanceof MyPromise) {
			return x.then(resolve, rejected);
		}
		return resolve(x);
	}
	// 静态方法resolve
	static resolve(value) {
		// 如果value是promise对象，则直接原样返回
		if (value instanceof MyPromise) return value;
		// 如果value是普通值，则把它包装程promise
		return new MyPromise((resolve, rejected) => {
			resolve(value);
		});
	}
	//静态方法rejected
	static rejected(value) {
		// 直接返回一个promise并执行失败的回调
		return new MyPromise((resolve, rejected) => {
			rejected(value);
		});
	}
	// 静态方法all,等待所以结果都返回，返回一个新的promise对象
	static all(array) {
		let result = []; //结果对象
		let index = 0;
		return new MyPromise((resolve, rejected) => {
			function addResult(key, value) {
				result[key] = value;
				index++;
				if (index === array.length) {
					resolve(result);
				}
			}
			array.forEach((v, i) => {
				// 如果是promise则等待它执行完
				if (v instanceof MyPromise) {
					v.then(
						(res) => addResult(i, res),
						(reason) => rejected(reason)
					);
				} else {
					// 如果是普通值就直接添加到结果列表
					addResult(i, v);
				}
			});
		});
	}
	// 静态方法 race 只返回第一个成功的结果
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
		// resolve(2);
		rejected('error');
	}, 2000);
});
promise
	.then((res) => console.log(res))
	.catch((err) => {
		console.log(err);
	});
// MyPromise.race([promise]).then(
// 	(res) => {
// 		console.log(res);
// 	},
// 	(err) => console.log(err)
// );
// promise
// 	.then(undefined, (res) => {
// 		console.log(res);
// 		return new MyPromise((resolve, rejected) => {
// 			resolve(200);
// 		});
// 	})
// 	.then((res) => console.log(res));
