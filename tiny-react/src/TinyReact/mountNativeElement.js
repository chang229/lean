import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDOM, root){
    let element = createDOMElement(virtualDOM)

    root.appendChild(element)
}