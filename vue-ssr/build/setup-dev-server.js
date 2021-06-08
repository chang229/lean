const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')

const resolve = file => path.resolve(__dirname,file);

module.exports = (serve,callback) => {
    let ready;
    const onReady = new Promise(r => ready = r);
    let serverBundle,template,clientManifest;
    const update = () => {
        if(serverBundle && template && clientManifest){
            // 构建完毕，通知 server 可以 render 渲染了
            ready();
            callback(serverBundle,template,clientManifest)
        }
    }
    // 监视构建 template，调用 update 更新 Renderer
    const templatePath = path.resolve(__dirname,'../index.html');
    template = fs.readFileSync(templatePath,'utf-8');
    update();
    chokidar.watch(templatePath).on('change',() => {
        template = fs.readFileSync(templatePath,'utf-8');
        update();
    })
    // 监视构建 serverBundle，调用 update 更新 Renderer
    const serverConfig = require('./webpack.server.config.js');
    const serverCompiler = webpack(serverConfig);
    const serverMiddleware = webpackDevMiddleware(serverCompiler,{
        // logLevel:'slient' // 关闭默认日志
    })
    serverCompiler.hooks.done.tap('server',() => {
        serverBundle = JSON.parse(
            serverMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'),'utf-8')
        )
        update()
    })
    // 监视构建 clientManifest，调用 update 更新 Renderer
    const clientConfig = require('./webpack.client.config.js');
    const clientCompiler = webpack(clientConfig);
    const clientMiddleware = webpackDevMiddleware(clientCompiler,{
        // logLevel:'slient' // 关闭默认日志
    })
    clientCompiler.hooks.done.tap('client',() => {
        clientManifest = JSON.parse(
            clientMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'),'utf-8')
        )
        update()
    })
    // 重要，将clientMiddleware挂载到express服务中，提供对其内存中的数据的访问
    serve.use(clientMiddleware);

    return onReady;
}