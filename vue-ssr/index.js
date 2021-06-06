const Vue = require('vue');
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
    template:fs.readFileSync('./index.html','utf-8')
});
const express = require('express');

const serve = express();

serve.get('/',(req,res) => {
    const app = new Vue({
        template:`
            <div id="app">{{ message }}</div>
        `,
        data:{
            message:'你好，世界'
        }
    })
    
    renderer.renderToString(app,{
        title:'indexpage',
        mate:'<mate name="description" content="index" />'
    },(err,html) => {
        if(err){
            res.status(500).end(err);
            return;
        };
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(html)
    })
})

serve.listen(3000,() => {
    console.log('serve in running...')
})

