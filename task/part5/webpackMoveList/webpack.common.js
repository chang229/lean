const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/[name]-[contenthash:5].js',
		path: path.resolve('dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			minify: {
                removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				removeAttributeQuotes: true,
			},
		}),
		new MiniCssExtractPlugin(),
	],
};
