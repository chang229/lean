import isFunction from './isFunction'
import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, root, oldDom){
    if(isFunction(virtualDOM)){
        // 组件渲染
        mountComponent(virtualDOM, root, oldDom)
    }else{
        // 原始DOM渲染
        mountNativeElement(virtualDOM, root, oldDom)
    }
}