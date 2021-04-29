const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'js/[name]-[contenthash:5].js',
		path: path.resolve('dist'),
		assetModuleFilename: 'images/[hash][ext][query]',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.less$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
			{
				test: /\.(jpg|png|jpeg|gif)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			title: 'index',
			template: './public/index.html',
			url: './', //需要这里传参
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			},
		}),
	],
};
