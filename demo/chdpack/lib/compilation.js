const path = require('path');
const ejs = require('ejs');
const NormalModuleFactory = require('./NormalModuleFactory')
const Parser = require('./parser')
const { Tapable, SyncHook } = require('tapable')
const async = require('neo-async');
const Chunk = require('./chunk');

const normalModuleFactory = new NormalModuleFactory();
const parser = new Parser();

class Compilation extends Tapable{
    constructor(compiler){
        super()
        this.compiler = compiler;
        this.context = compiler.context;
        this.options = compiler.options;
        // 让compilation具备文件的读写能力
        this.inputFileSystem = compiler.inputFileSystem;
        this.outputFileSystem = compiler.outputFileSystem;
        this.entries = [];// 存放所有入口模块的数组
        this.modules = [];//存放所有模块的数据
        this.chunks = [];//存放当前次打包过程中所产出的chunk
        this.assets = [];
        this.files = [];
        this.hooks = {
            succeedModule:new SyncHook(['module']),
            seal:new SyncHook(),
            beforeChunks:new SyncHook(),
            afterChunks:new SyncHook()
        }
    }
    /**
     * 完成模块编译操作
     * context 当前项目的根
     * entry 当前的入口的相对路径
     * name  chunkName  main
     * callback  回调
     */
    addEntry(context,entry,name,callback){
        this._addModuleChain(context,entry,name,(err,module) => {
            callback(err,module)
        })
    }

    _addModuleChain(context,entry,name,callback){
        this.createModule({
            name,
            context,
            rawRequest:entry,
            resource:path.posix.join(context,entry),
            moduleId:'./' + path.posix.relative(context,path.posix.join(context,entry)),
            parser,
        },(entryModule) => {
            this.entries.push(entryModule)
        },callback)
    }
    /**
     * 定义一个创建模块的方法，达到复用的目的
     *data 创建模块时所需要的一些属性值
     *doAddEntry 可选参数，在加载入口模块时，将入口模块的ID写入this.entries
     * */ 
    createModule(data,doAddEntry,callback){
        let module = normalModuleFactory.create(data)

        const afterBuild = (err,module) =>{
            // 在afterBuild当中我们就需要判断一下，当前次module加载完成只会是否需要处理依赖加载
            if(module.dependencies.length > 0){
                this.processDependencies(module,(err) => {
                    callback(err,module);
                })
            }else{
                callback(err,module);
            }

            // this.buildModule(entryModule,afterBuild)

            // // 当我们完成了本次的build操作之后将module进行保存
            // this.entries.push(entryModule)
            // this.modules.push(entryModule)
        }

        this.buildModule(module,afterBuild);
        // 当我们完成了本次的build操作之后将module进行保存
        doAddEntry && doAddEntry(module);
        this.modules.push(module);
    }
    /**
     * 完成具体的build行为
     * module 当前需要被编译的模块
    */
    buildModule(module,callback){
        module.build(this,(err) => {
            // 如果代码走到这一步就意味着当前module的编译完成了
            this.hooks.succeedModule.call(module);
            callback(err,module);
        })
    }

    processDependencies(module,callback){
        // 当前的函数核心功能就是实现一个被依赖模块的递归加载
        // 加载模块的思想都是创建一个模块，然后想办法将被加载模块的内容拿出来
        // 当前我们不知道module 需要依赖几个模块，此时我们需要想办法让所有的被依赖的模块都加载完成之后再执行callback [neo-async]
        let dependencies = module.dependencies;

        async.forEach(dependencies,(dependency,done) => {
            this.createModule({
                parser,
                name:dependency.name,
                context:dependency.context,
                rawRequest:dependency.rawRequest,
                moduleId:dependency.moduleId,
                resource:dependency.resource
            },null,done)
        },callback)
    }

    seal(callback){
        this.hooks.seal.call()
        this.hooks.beforeChunks.call()

        // 当前所有的入口模块都存放在了 compilation 对象的 entries数组里
        // 所谓封装chunk 指的就是依据某个入口，然后找到它的所有依赖，将他们的源代码放在一起，之后再做合并

        for( let entryModule of this.entries){
            // 核心：创建模块加载已有模块的内容，同时记录模块信息
            const chunk = new Chunk(entryModule)
            // 保持chunk信息
            this.chunks.push(chunk)
            // 给chunk属性赋值
            chunk.modules = this.modules.filter(module => module.name === chunk.name)
        }
        // chunk流程梳理之后就进入到chunk代码处理环境（模板文件 + 模块中的源代码 =》chunk.js）
        this.hooks.afterChunks.call(this.chunks);
        // 生成代码内容
        this.createChunkAssets();

        callback()
    }

    createChunkAssets(){
        for(let i = 0; i < this.chunks.length; i++){
            const chunk = this.chunks[i];
            const fileName = chunk.name + '.js';
            chunk.files.push(fileName);

            // 生成具体的chunk内容
            // 获取模板文件的路径
            let tempPath = path.posix.join(__dirname,'temp/main.ejs')
            // 读取模块文件中的内容
            let tempCode = this.inputFileSystem.readFileSync(tempPath,'utf-8')
            // 获取渲染函数
            let tempRender = ejs.compile(tempCode);
            // 按ejs的语法渲染数据
            let source = tempRender({
                entryModuleId:chunk.entryModule.moduleId,
                modules:chunk.modules
            })
            // 输出文件
            this.emitAssets(fileName,source)
        }
    }

    emitAssets(fileName,source){
        this.assets[fileName] = source;
        this.files.push(fileName);
    }
}

module.exports = Compilation;