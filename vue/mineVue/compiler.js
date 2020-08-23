class Compiler{
    constructor(vm){
        this.el = vm.$el;
        this.vm = vm;
    }
    // 编译模板，处理文本节点和元素节点
    compile(el){
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach((node) => {
            // 判断子节点是元素节点还是文本节点，然后调用相应的方法做处理
            if(this.isTextNode(node)){
                this.comoileText(node)
            }else if(this.isElementNode(node)){
                this.compileElement(node)
            }
            // 如果node有子节点则递归调用compile方法处理node的子节点
            if(node.childNodes && node.childNodes.length > 0){
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement(node){}
    // 编译文本节点，处理差值表达式
    comoileText(node){}
    // 判断节点属性是否是vue指令
    isDirective(attr){
        return attr.startsWith('v-')
    }
    // 判断是否是元素节点
    isElementNode(node){
        return node.nodeType === 1;
    }
    // 判断是否是文本节点
    isTextNode(node){
        return node.odeType === 3;
    }
}