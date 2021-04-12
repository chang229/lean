const fs = require('fs');

class NodeEnvironmentPlugin {
	constructor(options) {
		this.options = options || {};
	}
	// 为compiler对象添加文件的读写能力
	apply(compiler) {
		compiler.inputFileSystem = fs;
		compiler.outputFileSystem = fs;
	}
}

module.exports = NodeEnvironmentPlugin;
