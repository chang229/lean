import diff from "./diff"

export default function updateComponent(virtualDOM, oldComponent, oldDom, root){
    oldComponent.componentWillReceiveProps(virtualDOM.props)
    if(oldComponent.shouldComponentUpdate(virtualDOM.props)){

        oldComponent.componentWillUpdate(virtualDOM.props)
        // 更新props
        oldComponent.updateProps(virtualDOM.props)
        // 获取最新的virtualDom
        let nextVirtualDom = oldComponent.render()
        // 保存组件实例对象
        nextVirtualDom.component = oldComponent
        // diff对比
        diff(nextVirtualDom, root, oldDom)
        // 更新完毕
        oldComponent.componentDidUpdate(oldComponent.props)
    }
}