const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-source-map',
	devServer: {
		hot: true,
		port: '8888',
		open: true,
	},
	target: 'web',
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
