import diff from "./diff"

export default class Component{
    constructor(props){
        this.props = props
    }
    setState(state){
        this.state = Object.assign({}, this.state, state)
        // 获取新的虚拟DOM
        let newVirtualDom = this.render()
        // 获取之前老的Dom
        let oldDom = this.getDom()
        // 调用diff方法对比，更新视图
        diff(newVirtualDom, oldDom.parentNode, oldDom)
    }

    setDom(dom){
        this._dom = dom
    }

    getDom(){
        return this._dom
    }

    updateProps(props) {
        this.props = props
    }

    // 生命周期函数
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, preState) {}
    componentWillUnmount() {}
}