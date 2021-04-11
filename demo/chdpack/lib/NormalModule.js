const path = require('path')
const types = require('@babel/types');
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

class NormalModule {
    constructor(data){
        this.context = data.context;
        this.name = data.name;
        this.moduleId = data.moduleId;
        this.rawRequest = data.rawRequest;
        this.parser = data.parser; // todo 等待完成
        this.resource = data.resource;
        this._source // 存放某个模块的源代码
        this._ast   //存放某个模块源代码对应的ast
        this.dependencies = [];//定义一个空数组用于保存被依赖加载的模块信息
    }

    build(compilation,callback){
        /**
         * 从文件中读取到将来需要被加载的module内容
         * 如果当前不是js模块则需要loader进行处理，最终返回js模块
         * 上述操作完成之后就可以将js代码转为ast语法树
         * 当前js模块内部可能又引用了很多其他的模块，因此我们需要递归完成
         * 前面的完成之后，我们只需要重复执行即可
         * */ 
        this.doBuild(compilation,(err) => {
            this._ast = this.parser.parser(this._source);
            // 这里的_ast就是当前module的语法树，我们可以对它进行修改，最后再将ast转回成code代码
            traverse(this._ast,{
                CallExpression:(nodePath) => {
                    let node = nodePath.node;
                    // 定位require所在的节点
                    if(node.callee.name === 'require'){
                        //获取原始路径
                        let modulePath = node.arguments[0].value //'./title'
                        //取出当前被加载模块的模块名称
                        let moduleName = modulePath.split(path.posix.sep).pop() // 'title'
                        // 当前打包器只处理js文件,处理文件后缀，有.js就不处理，没有就添加
                        let extName = moduleName.indexOf('.') === -1 ? '.js' : '';
                        moduleName += extName;
                        // 最终我们想要读取当前js里的内容，所有我们需要这个文件的绝对路径
                        let depResource = path.posix.join(path.posix.dirname(this.resource),moduleName)
                        // 将当前模块的ID定义ok
                        let depModuleId = './' + path.posix.relative(this.context,depResource) // ./src/title.js

                        console.log(depModuleId)

                        // 记录当前被依赖模块的信息，方便后面递归加载
                        this.dependencies.push({
                            name:this.name,
                            context:this.context,
                            rawRequest:moduleName,
                            moduleId:depModuleId,
                            resource:depResource
                        })
                        // 替换内容
                        node.callee.name = '__webpack_require__';
                        node.arguments = [types.stringLiteral(depModuleId)]
                    }
                }
            })

            // 上述的操作是利用ast按要求做了代码修改 下面的内容就是利用 。。。 将修改后的ast转回成可执行的代码code
            let { code } = generator(this._ast);
            this._source = code;
            callback(err)
        })
    }

    doBuild(compilation,callback){
        this.getSource(compilation,(err,source) => {
            this._source = source;
            callback();
        })
    }

    getSource(compilation,callback){
        compilation.inputFileSystem.readFile(this.resource,'utf-8',callback)
    }
}

module.exports = NormalModule