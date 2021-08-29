export default function updateNodeElement(element, virtualDOM, oldVirtualDom={}){
    let props = virtualDOM.props || {}
    let oldProps = oldVirtualDom.props || {}
    for(let k in props){
        if(props[k] !== oldProps[k]){
            if(k.slice(0,2) === 'on'){
                // 注册事件
                let type = k.toLowerCase().slice(2);
                element.addEventListener(type,props[k])
                // 如果之前有事件，则移除
                if(oldProps[k]){
                    element.removeEventListener(type,oldProps[k])
                }
            }else if(k === 'value' || k === 'checked'){
                element[k] = props[k]
            }else if(k !== 'children'){
                if(k === 'className'){
                    element.setAttribute('class',props[k])
                }else{
                    element.setAttribute(k,props[k])
                }
            }
        }
    }
    // 如果有删除的属性，在这里处理
    for(let k in oldProps){
        if(!props[k]){
            if(k.slice(0,2) === 'on'){
                let type = k.toLowerCase().slice(2);
                element.removeEventListener(type,oldProps[k])
            }else if(k !== 'children'){
                if(k === 'className'){
                    element.removeAttribute('class')
                }else{
                    element.removeAttribute(k)
                }
            }
        }
    }
}