const path = require('path');
// 导入处理history模式的模块
const history = require('connect-history-api-fallback');
//导入express
const express = require('express');

const app = express();
// 注册处理histore模块的中间件
app.use(history());
// 处理静态资源的中间件，网站跟目录 ../dist
app.use(express.static(path.join(__dirname, '../dist')));

// 开启服务器，端口8888
app.listen(8888, () => {
	console.log('服务器开启 端口：8888');
});
