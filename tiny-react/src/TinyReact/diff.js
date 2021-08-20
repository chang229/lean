import mountElement from './mountElement'

export default function diff(virtualDOM, root,oldDom){
    if(!oldDom){
        mountElement(virtualDOM, root)
    }
}