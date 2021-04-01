const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');

class Myplugin {
	apply(compiler) {
		console.log('Myplugin 启动');

		compiler.hooks.emit.tap('Myplugin', (compilation) => {
			for (const name in compilation.assets) {
				if (name.endsWith('.js')) {
					const contents = compilation.assets[name].source();
					const withoutContents = contents.replace(
						/\/\*\*+\*\//g,
						''
					);
					compilation.assets[name] = {
						source: () => withoutContents,
						size: () => withoutContents.length,
					};
				}
			}
		});
	}
}

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
	devServer: {
		hot: true,
		contentBase: './public',
		proxy: {
			'/api': {
				// http://localhost:8080/api/user => https://api.github.com/api/user
				target: 'https://api.github.com',
				// http://localhost:8080/api/user => https://api.github.com/user
				pathRewrite: {
					'^api': '',
				},
				// 不能使用localhost:8080作为请求github的主机名
				changeoriginal: true,
			},
		},
	},
	plugins: [
		// new CleanWebpackPlugin(),
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
		new webpack.HotModuleReplacementPlugin(),
		// new CopyWebpackPlugin({
		// 	patterns: [{ from: 'public' }],
		// }),
		// new Myplugin()
	],
};
