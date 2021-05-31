class Mypromise {
	constructor(exector) {
		try {
			exector(this.resolve, this.rejected);
		} catch (e) {
			this.rejected(e);
		}
	}
	// promise状态
	status = 'pending';
	// promise成功的返回值
	value = '';
	// promise失败的返回值
	reason = '';
	// 成功的回调函数
	successCallback = [];
	// 失败的回调函数
	errorCallback = [];

	resolve = (value) => {
		if (this.status === 'pending') {
			this.status = 'fulfilled';
			this.value = value;
			this.successCallback.forEach((v) => v());
		}
	};

	rejected = (reason) => {
		if (this.status === 'pending') {
			this.status = 'rejected';
			this.reason = reason;
			this.errorCallback.forEach((v) => v());
		}
	};

	then(successCallback, errorCallback) {
		successCallback = successCallback ? successCallback : (value) => value;
		errorCallback = errorCallback
			? errorCallback
			: (reason) => {
					throw reason;
			  };
		let promise2 = new Mypromise((resolve, rejected) => {
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

	resolvePromise(promise2, x, resolve, rejected) {
		if (promise2 === x) {
			throw new Erroe('promise对象被循环引用');
		}
		if (x instanceof Mypromise) {
			return x.then(resolve, rejected);
		}
		return resolve(x);
	}
}
