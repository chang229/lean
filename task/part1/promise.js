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
	// constructor传入一个构造函数，立即执行
	constructor(exector) {
		// 添加错误捕获，反正构造过程中报错
		try {
			exector(this.resolve, this.rejected);
		} catch (e) {
			this.rejected(e);
		}
	}
	//promise的状态管理器，默认是pending状态，可以由pengding转为fulfilled或者rejected
	status = 'pending';
	//成功的回调函数，由于peomise的then方法可以重复执行，所以成功的回调可能有多个
	successCallback = [];
	// 失败的回调函数
	errorCallback = [];
	// promise成功的返回值
	value = '';
	// promise失败的错误信息
	reason = '';
	//promise成功的方法使用箭头函数，可以范围当前peomise对象
	resolve = (value) => {
		// 如果当前的状态是pending则执行成功的回调，否则不执行
		if (this.status === 'pending') {
			// 将promise的状态值为fulfilled
			this.status = 'fulfilled';
			// 保持成功的回调值
			this.value = value;
			// 将成功回调列表中的函数取出依次执行
			while (this.successCallback.length) this.successCallback.shift()();
		}
	};
	//promise失败的方法
	rejected = (reason) => {
		// 如果当前的状态是pending则执行失败的回调，否则不执行
		if (this.status === 'pending') {
			// 将promise的状态值为rejected
			this.status = 'rejected';
			// 保持失败的错误信息
			this.reason = reason;
			// 将失败回调列表中的函数取出依次执行
			while (this.errorCallback.length) this.errorCallback.shift()();
		}
	};
	//promise的then方法接受一个successCallback和一个errorCallback方法
	then(successCallback, errorCallback) {
		//判断是否传入回调函数，没有传入则设置默认回调函数
		successCallback = successCallback ? successCallback : (value) => value;
		errorCallback = errorCallback
			? errorCallback
			: (reason) => {
					throw reason;
			  };
		// then方法返回一个全新的promise对象;
		let promise2 = new Promise((resolve, rejected) => {
			if (this.status === 'fulfilled') {
				//将函数体放入异步调用中，可以拿到promise2对象，否则是拿不到的
				setTimeout(() => {
					// 在回调函数中添加错误捕获，防止回调函数保持
					try {
						let x = successCallback(this.value);
						this.resolvePromise(promise2, x, resolve, rejected);
					} catch (e) {
						rejected(e);
					}
				}, 0);
			}
			if (this.status === 'rejected') {
				//将函数体放入异步调用中，可以拿到promise2对象，否则是拿不到的
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
						try {
							let x = successCallback(this.value);
							this.resolvePromise(promise2, x, resolve, rejected);
						} catch (e) {
							rejected(e);
						}
					}, 0);
				});
				this.errorCallback.push(() => {
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
	//处理then的返回值
	// 判断 x 的值是普通值还是promise对象
	// 如果是普通值 直接调用resolve
	// 如果是promise对象 查看promsie对象返回的结果
	// 再根据promise对象返回的结果 决定调用resolve 还是调用reject
	resolvePromise(promise2, x, resolve, rejected) {
		if (promise2 === x) {
			return rejected(new TypeError('promise对象被循环调用'));
		}
		if (x instanceof MyPromise) {
			return x.then(resolve, rejected);
		}
		return resolve(x);
	}
	// promise的finall方法无论成功或失败都会执行，且返回一个promise
	finall(callback) {
		return this.then(
			(value) => {
				return MyPromise.resolve(callback()).then(() => value);
			},
			(reason) => {
				return MyPromise.resolve(callback()).then(() => {
					throw reason;
				});
			}
		);
	}
	// promise的catch方法，捕获错误，返回一个promise
	catch(errorCallback) {
		return this.then(undefined, (reason) => errorCallback(reason));
	}
	// 静态方法resolve
	static resolve(value) {
		// 如果value是一个promise对象，则直接返回
		if (value instanceof MyPromise) return value;
		// 如果value是一个普通值则保证成为一个promise并返回
		return new MyPromise((resolve) => resolve(value));
	}
	// 静态方法rejected
	static rejected(reason) {
		// 直接返回一个promise并执行失败的回调
		return new MyPromise((resolve, rejected) => rejected(reason));
	}
	// 静态方法 all
	static all(array) {
		let result = []; //声明返回的结果数组
		let index = 0;
		return new MyPromise((resolve, rejected) => {
			// 声明一个添加到结果列表的函数
			function addResult(key, value) {
				// 将结果与数组位置意义对应
				result[key] = value;
				//每次添加结果后将index加1，记录添加次数
				index++;
				//当index的值和传入array数组的长度一致时，表明数组中的所有方法都执行结束，然后就可以返回结果数组了
				if (index === array.length) {
					resolve(result);
				}
			}
			// 遍历数组中的每一项
			array.forEach((v, i) => {
				// 如果是promise对象，则执行它并将执行结果传入结果数组
				if (v instanceof MyPromise) {
					v.then(
						(res) => addResult(i, res),
						(reason) => {
							rejected(reason);
						}
					);
				} else {
					// 如果是普通值，则直接加入结果数组中
					addResult(i, v);
				}
			});
		});
	}
	// 静态方法race
	static race(array) {
		// 其中一个成功就直接返回成功
		return new Promise((resolve, rejected) => {
			array.forEach((v) => {
				if (v instanceof MyPromise) {
					v.then(
						(res) => {
							resolve(res);
						},
						(reason) => {
							rejected(reason);
						}
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
		rejected('error');
	}, 100);
});

MyPromise.race([promise]).then(
	(res) => console.log(res),
	(err) => console.log(err)
);
