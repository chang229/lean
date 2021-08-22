import createDOMElement from './createDOMElement';
import unmountnode from './unmountnode';

export default function mountNativeElement(virtualDOM, root, oldDom){
    let element = createDOMElement(virtualDOM)

    // 将转换之后的DOM对象放置在页面中
    if (oldDom) {
        root.insertBefore(element, oldDOM)
    } else {
        root.appendChild(element)
    }

    if(oldDom){
        unmountnode(oldDom)
    }

    // 获取类组件实例对象
    let component = virtualDOM.component
    // 如果类组件实例对象存在
    if (component) {
        // 将DOM对象存储在类组件实例对象中
        component.setDom(element)
    }
}