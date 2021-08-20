import mountElement from './mountElement'

export default function createDOMElement(virtualDOM){
    let element = null;
    if(virtualDOM.type === 'text'){
        element = document.createTextNode(virtualDOM.props.textContent)
    }else{
        element = document.createElement(virtualDOM.type)
    }
    virtualDOM.children.forEach((v) => {
        mountElement(v,element)
    })
    return element;
}