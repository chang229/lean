#### vue项目说明文档
该项目使用webpack5+ 和 webpack-cli4+ 实现项目的整体打包构建

启动项目：yarn serve  webpack4 + webpack4 使用webpack serve的方式启动开发服务器
项目打包：yarn build  使用cross-env模块定义变量，再把原来的 webpack 命令添加在后面，从而启动 build 时，NODE_ENV 就会被传入

代码检查：yarn lint

#### webpack配置说明
webpack.common.js  webpack公用配置
webpack.dev.js     开发环境的webpack配置
webpack.prod.js    项目打包的webpack配置


webpack.common.js

entry:配置项目的打包入口；

outPut:{
    filename:将js文件整体输出到dist目录下的js文件夹下，并添加文件hash值，防止浏览器缓存
    path:定义打包输入目录为dist
    assetModuleFilename:拷贝img文件到统一的images文件夹下
}

module:{};配置各个资源文件所需要的loader加载器
·对于js文件使用babel-loader处理ES6+的新语法，并排除掉node_modules文件夹下的文件；
·对于vue文件使用vue-loader进行处理；
·对于图片文件和字体文件，webpack5中已废弃了url-loader,配置时使用`type: 'asset/resource'`,；
·对于css文件和less文件做了开发环境和生成环境的区分，开发环境下使用style-loader实现css的HMR,生成环境下使用MiniCssExtractPlugin.loader将css文件通过link标签在页面中引入，避免html文件过大；

plugins:[]
·调用VueLoaderPlugin 处理vue文件
·调用HtmlWebpackPlugin 生成html文件，并配置文件压缩



webpack.dev.js
·使用webpack-merge模块将webpack.common.js中的公用配置与开发环境的配置进行合并

mode:'development'；mode属性配置为开发环境

devtool:开发环境下开启source-map，便于开发环境下快速定位错误代码

devServer:开发服务器配置

target：webpack5对target进行了调整，原先默认为web，但是现在会更具开发者配置的browserslist而发生变化,此出要指定为`web`否则HMR不会生效

plugins：调用HotModuleReplacementPlugin开启HMR



webpack.prod.js
·使用webpack-merge模块将webpack.common.js中的公用配置与生成环境的配置进行合并

mode: 'production',设置环境为生产环境

plugins:[]
·调用CleanWebpackPlugin 每次打包之前先清除掉之前的打包目录
·调用MiniCssExtractPlugin 将css文件统一输出到dist下的css文件夹
·调用CopyWebpackPlugin 将public目录下的文件copy到dist目录并排除掉index.html模板文件
·调用DefinePlugin 为项目注入process.env.NODE_ENV变量并指定为production 在处理css文件和less文件时使用MiniCssExtractPlugin.loader将css文件通过link标签在页面中引入

optimization：
·minimizer  对打包后的css和js进行压缩
·splitChunks 设置`chunks:all`自动提取所有公共模块到单独 bundle
·usedExports:true  设置模块只导出被使用的成员
·concatenateModules:true,  尽可能合并每一个模块到一个函数中，可以减少代码体积，提供运行效率(scope Hoisting作用域提升)
·minimize:true,  压缩输出结果