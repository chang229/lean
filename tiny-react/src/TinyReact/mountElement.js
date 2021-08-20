import mountNativeElement from './mountNativeElement'

export default function mountElement(virtualDOM, root){
    // 区分组件和原始DOM
    mountNativeElement(virtualDOM, root)
}