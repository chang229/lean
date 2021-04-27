const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	optimization: {
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin(),
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
});
