const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: '[name]-[contenthash:8].main.js',
		path: path.join(__dirname, 'dist'),
		// publicPath: './',
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
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.png$/,
				use: {
					loader: 'url-loader',
					options: { limit: 102400 },
				},
			},
		],
	},
	devServer: {
		hot: true,
		contentBase: './public',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'index page',
			mate: {
				viewport: 'width=device-width, initial-scale=1.0',
			},
			template: './src/index.html',
            filename:'index.html',
            chunks:['index']
		}),
		new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            webpack_api:JSON.stringify("https://github.com")
        }),
        new MiniCssExtractPlugin({
            filename:'[name]-[contenthash:8].css'
        }),
		// new CopyWebpackPlugin({
		// 	patterns: [{ from: 'public' }],
		// }),
		// new Myplugin()
	],
    optimization:{
        splitChunks:{
            chunks:'all'
        },
        minimizer:[
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    }
};
