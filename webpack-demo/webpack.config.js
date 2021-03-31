const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'none',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, 'dist'),
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.png$/,
				use: {
					loader: 'url-loader',
					options: { limit: 102400 },
				},
			},
			{
				test: /\.md$/,
				use: './mackdown-loader.js',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'index page',
			mate: {
				viewport: 'width=device-width, initial-scale=1.0',
			},
			template: './index.html',
		}),
		new HtmlWebpackPlugin({
			title: 'about page',
			filename: 'about.html',
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'public' }],
		}),
	],
};
