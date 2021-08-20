import diff from './diff'

export default function render(virtualDOM, root,oldDom){
    diff(virtualDOM, root, oldDom)
}