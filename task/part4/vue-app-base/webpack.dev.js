const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-source-map',
	devServer: {
		hotOnly: true,
		open: true,
		port: '1234',
		inline: true,
		contentBase: './public',
	},
	target: 'web',
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
