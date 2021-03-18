class MyPromise {
	constructor(exector) {
		try {
			exector(this.resolve, this.rejected);
		} catch (e) {
			this.rejected(e);
		}
	}

	status = 'pending';
	value = '';
	reason = '';
	successCallback = [];
	errorCallback = [];
	resolve = (value) => {
		if (this.status === 'pending') {
			this.status = 'fulfilled';
			this.value = value;
			while (this.successCallback.length) this.successCallback.shift()();
		}
	};
	rejected = (reason) => {
		if (this.status === 'pending') {
			this.status = 'rejected';
			this.reason = reason;
			while (this.errorCallback.length) this.errorCallback.shift()();
		}
	};
	then(successCallback, errorCallback) {
		let promise2 = new MyPromise((resolve, rejected) => {
			if (this.status === 'fulfilled') {
				setTimeout(() => {
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
				});
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
					});
				});
			}
		});
		return promise2;
	}
	resolvePromise(promise2, x, resolve, rejected) {
		if (promise2 === x) {
			return rejected(new TypeError('promise对象循环调用'));
		}
		if (x instanceof MyPromise) {
			return x.then(resolve, rejected);
		}
		return resolve(x);
	}
	finall(callback) {
		return this.then(
			(value) => MyPromise.resolve(callback()).then(() => value),
			(reason) =>
				MyPromise.resolve(callback()).then(undefined, () => {
					throw reason;
				})
		);
	}
	catch(callback) {
		return this.then(undefined, callback);
	}
	static resolve(value) {
		if (value instanceof MyPromise) return value;
		return new Promise((resolve, rejected) => resolve(value));
	}
	static rejected(reason) {
		return new Promise((resolve, rejected) => rejected(reason));
	}
	static all(array) {
		let result = [];
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
				if (v instanceof MyPromise) {
					v.then(
						(value) => addResult(i, value),
						(error) => rejected(error)
					);
				} else {
					addResult(i, v);
				}
			});
		});
	}
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
	// rejected('404');
	resolve(200);
	setTimeout(() => {
		resolve(100);
		rejected('error');
	}, 2000);
});
let promise2 = new MyPromise((resolve, rejected) => {
	resolve('promise2');
});
promise
	.then((res) => console.log(res))
	.finall(() => {
		console.log('123');
	});
// MyPromise.race(['p1', promise2, 'p2']).then((res) => console.log(res));
// MyPromise.rejected(promise2).then(
// 	(res) => console.log(res),
// 	(err) => console.log(err)
// );
// promise
// 	.then(
// 		(res) => {
// 			console.log(res);
// 			return promise2;
// 		},
// 		(err) => console.log(err)
// 	)
// 	.then((res) => console.log(res));
