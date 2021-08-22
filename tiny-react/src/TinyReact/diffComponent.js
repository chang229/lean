import mountElement from './mountElement'
import updateComponent from './updateComponent'

export default function diffComponent(virtualDOM, oldComponent, oldDom, root){
    // 判断是不是同一个组件
    if(isSomeComponent(virtualDOM,oldComponent)){
        updateComponent(virtualDOM, oldComponent, oldDom, root)
    }else{
        mountElement(virtualDOM, root, oldDom)
    }
}

function isSomeComponent(virtualDOM,oldComponent){
    return oldComponent && virtualDOM.type === oldComponent.constructor
}