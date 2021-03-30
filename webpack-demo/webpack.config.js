const path = require('path');

module.exports = {
	entry: './src/index.js',
    mode:'none',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, 'dist'),
        publicPath:'dist/'
	},
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.png$/,
                use:{
                    loader:'url-loader',
                    options:{limit:102400}
                }
            },
            {
                test:/\.md$/,
                use:'./mackdown-loader.js'
            }
        ]
    }
};
