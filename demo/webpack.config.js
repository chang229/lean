const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve('dist'),
	},
	mode: 'development',
	context: process.cwd(), //当前命令行所在的路径
};
