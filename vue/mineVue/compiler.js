class Compiler{
    constructor(vm){
        this.el = vm.$el;
        this.vm = vm;
        this.compile(this.el);
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
    compileElement(node){
        let attributes = node.attributes;
        Array.from(attributes).forEach((attr) => {
            let attrName = attr.name;
            if(this.isDirective(attrName)){
                attrName = attrName.substr(2);
                let key = attr.value;
                this.updater(node,key,attrName);
            }
        })
    }
    updater(node,key,attr){
        let updateFn = this[attr + 'Updater'];
        updateFn && updateFn.call(this,node,this.vm[key],key)
    }
    // v-text指令处理方法
    textUpdater(node,value,key){
        node.textContent = value;
        new Watcher(this.vm,key,(newVal) => {
            node.textContent = newVal;
        })
    }
    // v-model指令处理方法
    modelUpdater(node,value,key){
        node.value = value;
        new Watcher(this.vm,key,(newVal) => {
            node.value = newVal;
        })
        node.addEventListener('input',() => {
            this.vm[key] = node.value;
        })
    }
    // 编译文本节点，处理差值表达式
    comoileText(node){
        let value = node.textContent;
        //匹配差值表达式
        let reg = /\{\{(.+?)\}\}/;
        if(reg.test(value)){
            // 提取k
            let k = RegExp.$1.trim();
            node.textContent = value.replace(reg,this.vm[k])
            // 创建watcher对象，当数据改变时更新视图
            new Watcher(this.vm,k,(newVal) => {
                node.textContent = value.replace(reg,newVal)
            })
        }
    }
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
        return node.nodeType === 3;
    }
}