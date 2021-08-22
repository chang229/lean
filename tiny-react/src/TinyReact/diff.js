import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import createDOMElement from './createDOMElement'
import unmountnode from './unmountnode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, root, oldDom){
    let oldVirtualDom = oldDom && oldDom._virtualDOM;
    let oldComponent = oldVirtualDom && oldVirtualDom.component;
    if(!oldDom){
        mountElement(virtualDOM, root)
    }else if(virtualDOM.type !== oldVirtualDom.type && typeof virtualDOM.type !== 'function'){
        let newElement = createDOMElement(virtualDOM)
        oldDom.parentNode.replaceChild(newElement,oldDom)
    }else if(typeof virtualDOM.type === 'function'){
        // 如果是组件则diff组件
        diffComponent(virtualDOM, oldComponent, oldDom, root )
    }else if (oldVirtualDom && virtualDOM.type === oldVirtualDom.type){
        if(virtualDOM.type === 'text'){
            // 更新文本节点
            updateTextNode(virtualDOM, oldVirtualDom, oldDom)
        }else{
            // 更新元素节点的属性
            updateNodeElement(oldDom, virtualDOM, oldVirtualDom)
        }

        // 将拥有key属性的节点放在一个对象中
        let keyElement = {};
        for(let i = 0, len = oldDom.childNodes.lengh; i < len; i++){
            let element = oldDom.childNodes[i];
            // 判断是否是元素节点
            if(element.nodeType === 1){
                let key = element.getAttribute('key')
                if(key){
                    keyElement[key] = element
                }
            }
        }
        // 判断是否有带key的元素
        let hasNodeKey = Object.keys(keyElement).length === 0;
        if(hasNodeKey){
            // 对比子节点
            virtualDOM.children.forEach((child,i) => {
                diff(child, oldDom, oldDom.childNodes[i])
            })
        }else{
            // 循环virtualDOM的子元素 获取子元素的key
            virtualDOM.children.forEach((child,i) => {
                let key = child.props.key
                if(key){
                    let domElement = keyedElements[key]
                    if (domElement) {
                        // 3. 看看当前位置的元素是不是我们期望的元素
                        if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
                            oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
                        }
                    }else{
                        // 新增元素
                        mountElement(child, oldDOM, oldDOM.childNodes[i])
                    }
                }
            })
        }

        // 删除节点
        let oldChildnodes = oldDom.childNodes;
        if(oldChildnodes.length > virtualDOM.children.length){
            if(hasNodeKey){
                for(let i = oldChildnodes.length - 1; i > virtualDOM.children.length - 1; i--){
                    unmountnode(oldChildnodes[i])
                }
            }else{
                // 通过key属性删除节点
                for (let i = 0; i < oldChildnodes.length; i++) {
                    let oldChild = oldChildnodes[i]
                    let oldChildKey = oldChild._virtualDOM.props.key
                    let found = false
                    for (let n = 0; n < virtualDOM.children.length; n++) {
                        if (oldChildKey === virtualDOM.children[n].props.key) {
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        unmountNode(oldChild)
                    }
                }
            }
        }
    }
}