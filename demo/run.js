// const webpack = require('webpack');
const webpack = require('./chdpack');
const config = require('./webpack.config');

let compiler = webpack(config);

compiler.run(function (err, stats) {
	console.log(err);
	console.log(stats.toJson());
});
