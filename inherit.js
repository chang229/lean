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
		successCallback = successCallback ? successCallback : (value) => value;
		errorCallback = errorCallback
			? errorCallback
			: (reason) => {
					throw reason;
			  };
		let promise2 = new MyPromise((resolve, rejected) => {
			if (this.status === 'fulfilled') {
				setTimeout(() => {
					try {
						let x = successCallback(this.value);
						this.resolvePromise(promise2, x, resolve, rejected);
					} catch (e) {
						rejected(e);
					}
				});
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
					});
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
			return rejected(new TypeError('promise对象被循环引用了'));
		}
		if (x instanceof MyPromise) {
			return x.then(resolve, rejected);
		}
		return resolve(x);
	}
	finall(callback) {
		return this.then(
			(res) => MyPromise.race(callback()).then(() => res),
			(err) =>
				MyPromise.race(callback()).then(() => {
					throw err;
				})
		);
	}
	catch(callback) {
		return this.then(undefined, callback);
	}
	static resolve(value) {
		if (value instanceof MyPromise) return value;
		return new MyPromise((resolve, rejected) => resolve(value));
	}
	static reject(reason) {
		return new MyPromise((resolve, rejected) => rejected(reason));
	}
	static all(array) {
		let result = [];
		let index = 0;
		return new MyPromise((resolve, rejected) => {
			function addResult(key, value) {
				result[key] = value;
				index++;
				if (index === array.length) resolve(result);
			}
			array.forEach((v, i) => {
				if (v instanceof MyPromise) {
					v.then(
						(res) => addResult(i, res),
						(err) => rejected(err)
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
						(error) => rejected(error)
					);
				} else {
					resolve(v);
				}
			});
		});
	}
}

// let promise = new MyPromise((resolve, rejected) => {
// 	setTimeout(() => {
// 		resolve(100);
// 	}, 2000);
// });
let promise2 = new MyPromise((resolve, rejected) => {
	rejected(404);
});

promise2.catch((err) => console.log(err));
