const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[contenthash:5].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public/*',
					to: '[name][ext]',
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ['**/*.html'],
					},
				},
			],
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	optimization: {
		minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
		usedExports: true,
		concatenateModules: true,
		minimize: true,
		splitChunks: {
			chunks: 'all',
		},
	},
});
