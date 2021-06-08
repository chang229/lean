const Vue = require('vue');
const fs = require('fs');
const express = require('express');
const setupDevServer = require('./build/setup-dev-server');
const { createBundleRenderer, createRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production';

const serve = express();

serve.use('/dist',express.static('./dist'));

let renderer,onReady;
if(isProd){
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const template = fs.readFileSync('./index.html','utf-8');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createBundleRenderer(serverBundle,{
        template,
        clientManifest
    });
}else{
    onReady = setupDevServer(serve,(serverBundle,template,clientManifest) => {
        render = createBundleRenderer(serverBundle,{
            template,
            clientManifest
        })
    })
}


let render = (req,res) => {
    renderer.renderToString({
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
}

serve.get('/', isProd ? render : async (req,res) => { await onReady;render(req,res)})

serve.listen(3000,() => {
    console.log('serve in running...')
})

