const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

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
    // 监视构建 clientManifest，调用 update 更新 Renderer
    return onReady;
}