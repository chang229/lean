const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'[name]-[contenthash:5].js',
        path:path.resolve('dist'),
    },
    mode:'development',
    // devtool:'cheap-module-evel-source-map',
    module:{
        rules:[
            {
                test: /\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                use:{
                        loader:'url-loader',
                        options:{
                            limit:10240
                        }
                    }
            },
            {
                test:/\.(ttf|eot|svg|woff|woff2)$/,
                use:'file-loader'
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title:'index',
            template: './public/index.html',
            url: './',  //需要这里传参
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.posix.join(
                        path.resolve(__dirname, "public").replace(/\\/g, "/"),
                        "**/*"
                    ),
                    globOptions: {
                        ignore:['*.html']
                    }
                }
            ],
        })
    ]
}