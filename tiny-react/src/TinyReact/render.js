import diff from './diff'

export default function render(virtualDOM, root, oldDom = root.firstChild){
    console.log(virtualDOM)
    diff(virtualDOM, root, oldDom)
}