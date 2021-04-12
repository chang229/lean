const SingleEntryPlugin = require('./SingleEntryPlugin');

const itemToPlugin = function (context, entry, name) {
	return new SingleEntryPlugin(context, entry, name);
};

class EntryOptionPlugin {
	apply(compiler) {
		// 为compiler的entryOption钩子添加监听函数
		compiler.hooks.entryOption.tap(
			'EntryOptionPlugin',
			(context, entry) => {
				itemToPlugin(context, entry, 'main').apply(compiler);
			}
		);
	}
}

module.exports = EntryOptionPlugin;
