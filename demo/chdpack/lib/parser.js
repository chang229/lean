const { Tapable } = require('tapable')
const babylon = require('babylon')

class Parser extends Tapable{
    parser(source){
        return babylon.parse(source,{
            sourceType:'module',
            plugins:['dynamicImport'] //当前插件可以支持import()动态导入
        })
    }
}

module.exports = Parser