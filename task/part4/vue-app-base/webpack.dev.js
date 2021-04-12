const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common,{
    mode:'development',
    devtool:'cheap-module-evel-source-map',
    devserve:{
        hot:true,
        open:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})


