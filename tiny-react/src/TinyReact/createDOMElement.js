import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM){
    let element = null;
    if(virtualDOM.type === 'text'){
        element = document.createTextNode(virtualDOM.props.textContent)
    }else{
        element = document.createElement(virtualDOM.type)
        updateNodeElement(element,virtualDOM)
    }
    
    // 将当前的virtualDOM保存到element对象上，diff时要用
    element._virtualDOM = virtualDOM

    // console.log(8888,virtualDOM)

    virtualDOM.children && virtualDOM.children.forEach((v) => {
        mountElement(v,element)
    })

    if(virtualDOM.props && virtualDOM.props.ref){
        virtualDOM.props.ref(element)
    }

    return element;
}