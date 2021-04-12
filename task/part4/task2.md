#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

不通的作用：
loader 是一个函数，用于处理资源文件，最终返回一段标准的 js 字符串
；webpack 原生只能解析 js 文件，如果有其它文件，就要用到 loader,loader 的作用就是让 webpack 拥有了加载非 js 文件的能力；loader 负责资源文件从输入到输出的转换，webpack 中对于同一个资源可以依次使用多个 loader；

plugin 用于增强 webpack 的自动化能力，plugin 解决其它的自动化工作，实现前端工程化的工作，例如压缩代码，清除 dist 目录，拷贝静态文件到输出目录。

不通的用法：
loader 在 module.rules 中配置，它作为模块的解析规则存在，类型未数组，每一项都是一个数组，描述了对于什么类型的文件，使用什么 loader 及相应的参数

plugin 在 plugins 数组中配置，每一项都是 plugin 的实例，参数通过构造函数传入

loader 开发思路：
通过 module.exports 导出一个函数；
该函数接收一个 source 参数，source 就是要处理的资源文件；
在函数体内对 source 进行相应的处理
最后通过 return 返回最终处理后的结果，必须是一段标准的 js 字符串
例如：实现一个处理 md 文件的 loader

```
const marked = require('marked');

module.exports = source => {
    const html = marked(source);
    return `export default ${JSON.stringify(html)}`
}
```

plugin 实现思路
plugin 是通过在生命周期的钩子中挂载函数实现扩展；
plugin 插件导出的都是一个类；
plugin 是一个带有 apply 方法的 class 类；
在 apply 方法内通过 webpack 提供的 api 获取资源文件做相应处理；
最终将处理完的资源文件通过 webpack 提供的方法返回；
例如：实现一个 plugin,用于 webpack 打包后删除文件中的注释信息

```
class Myplugin{
    apply(compiler){
        //通过构造函数挂载事件
        compiler.hooks.emit.tap('MyPlugin',compilation => {
            for(const name in compilation.assets){
                if(name.endsWith('.js')){
                    const contents = compilation.assets[name].source();
                    const withoutComments = contents.replace(/\/\*\*+\*\//g,'');
                    compilation.assets[name] = {
                        source:() => withoutComments,
                        size:() => withoutComments.length //webpack规定必须返回一个size属性
                    }
                }
            }
        })
    }
}
```
