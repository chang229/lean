class Promise {
	constructor(extrect) {
		this.state = 'pending';
		this.value = '';
		this.reason = '';
		this.onFuilledCallbacks = [];
		this.onRejectedCallbacks = [];
		let resolve = (value) => {
			if (this.state === 'pending') {
				this.state = 'fulFilled';
				this.value = value;
				this.onFuilledCallbacks.forEach((fn) => fn());
			}
		};
		let reject = (reason) => {
			if (this.state === 'pending') {
				this.state = 'rejected';
				this.reason = reason;
				this.onRejectedCallbacks.forEach((fn) => fn());
			}
		};
		try {
			extrect(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}
	then(onFuilled, onRejected) {
		if (this.state === 'fulFilled') {
			onFuilled(this.value);
		}
		if (this.state === 'rejected') {
			onRejected(this.reason);
		}
		if (this.state === 'pending') {
			this.onFuilledCallbacks.push(() => onFuilled(this.value));
			this.onRejectedCallbacks.push(() => onRejected(this.reason));
		}
	}
}

let p = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success');
	}, 1000);
	// resolve('success');
	// reject('error');
});

p.then(
	(res) => {
		console.log(res);
	},
	(err) => {
		console.log(err);
	}
);
