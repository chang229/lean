const Compiler = require('./compiler');
const NodeEnvironmentPlugin = require('./node/nodeEnvironmentPlugin');
const WebpackOptionsApply = require('./WebpackOptionsApply');

const webpack = (options) => {
	// 实例化compiler对象，compiler对象上有一个run方法
	let compiler = new Compiler(options.context);
	// 将配置参数挂载到compiler对象身上
	compiler.options = options;

	// 初始化NodeEnvironmentPlugin(让compiler具有文件的读写能力)
	new NodeEnvironmentPlugin().apply(compiler);

	// 挂载所有plugins插件到compiler对象上，添加一些钩子函数监听
	if (options.plugin && Array.isArray(options.plugin)) {
		for (let plugin of options.plugin) {
			plugin.apply(compiler);
		}
	}

	// 挂载所有webpack内置的插件（入口）
	new WebpackOptionsApply().process(options, compiler);

	// 返回compiler对象
	return compiler;
};

module.exports = webpack;
