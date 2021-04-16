const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: '[name]-[contenthash:5].js',
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
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
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
		// new MiniCssExtractPlugin({
		// 	filename: 'css/[name]-[contenthash:5].css',
		// }),
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
