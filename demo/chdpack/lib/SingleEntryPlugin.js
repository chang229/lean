class SingleEntryPlugin {
	constructor(context, entry, name) {
		this.context = context;
		this.entry = entry;
		this.name = name;
	}

	apply(compiler) {
		// 为compiler的make钩子添加监听函数
		compiler.hooks.make.tapAsync(
			'SingleEntryPlugin',
			(compilation, callback) => {
				const { context, entry, name } = this;
				console.log('make执行了');
				compilation.addEntry(context, entry, name, callback);
			}
		);
	}
}

module.exports = SingleEntryPlugin;
