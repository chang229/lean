import isFunctionComponent from './isFunctionComponent'
import mountElement from './mountElement'
import isFunction from './isFunction'

export default function mountComponent(virtualDOM, root, oldDom){
    let nextElement = null;
    let component = null;
    // 判断是函数组件还是类组件
    if(isFunctionComponent(virtualDOM)){
        // 函数组件
        nextElement = buildComponent(virtualDOM)
    }else{
        // 类组件
        nextElement = buildClassComponent(virtualDOM)
        component = nextElement.component
    }

    if(isFunction(nextElement)){
        mountComponent(nextElement,root,oldDom)
    }else{
        mountElement(nextElement,root,oldDom)
    }

    if(component){
        component.componentDidMount()
        if(component.props && component.props.ref){
            component.props.ref(component)
        }
    }
}

function buildComponent(virtualDom){
    return virtualDom.type(virtualDom.props || {})
}

function buildClassComponent(virtualDom){
    let component = new virtualDom.type(virtualDom.props);
    let element = component.render()
    element.component = component
    console.log(element)
    return element
}