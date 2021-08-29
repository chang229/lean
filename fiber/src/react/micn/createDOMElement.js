import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM){
    let element = null;
    if(virtualDOM.type === 'text'){
        element = document.createTextNode(virtualDOM.props.textContent)
    }else{
        element = document.createElement(virtualDOM.type)
        updateNodeElement(element,virtualDOM)
    }

    return element;
}