// const { SyncHook } = require('tapable');
const SyncHook = require('./syncHook/syncHook')

let hook = new SyncHook(['name', 'age']);

hook.tap('fn1', function (name, age) {
	console.log('fn1', name, age);
});

hook.tap('fn2', function (name, age) {
	console.log('fn2', name, age);
});

hook.call('lagou', 20);
