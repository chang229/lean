import TinyReact from "./TinyReact"

const root = document.getElementById('root');

const virtualDOM = (
    <div className="container">
      <h1 className="xxx">你好 Tiny React</h1>
      <h2 data-test="test">(编码必杀技)</h2>
      <div>
        嵌套1 <div>嵌套 1.1</div>
      </div>
      <h3>(观察: 这个将会被改变)</h3>
      {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
      {2 == 2 && <div>2</div>}
      <span>这是一段内容</span>
      <button onClick={() => alert("你好")}>点击我</button>
      <h3>这个将会被删除</h3>
      2, 3
      <input type="text" value="13" />
    </div>
  )
  
  const modifyDOM = (
    <div className="container">
      <h1>你好 世界</h1>
      <h2 data-test="test123">(编码必杀技)</h2>
      <div>
        嵌套1 <div>嵌套 1.1</div>
      </div>
      <h3>(观察: 这个将会被改变)</h3>
      {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
      {2 == 2 && <div>2</div>}
      <span>这是一段被修改的内容</span>
      <button onClick={() => alert("你好！！！！")}>点击我</button>
      <input type="text" />
    </div>
  )
  
//   TinyReact.render(virtualDOM, root)
  
//   setTimeout(() => {
//       console.log('render again')
//     TinyReact.render(modifyDOM, root)
//   }, 2000)

class Demo extends TinyReact.Component{
    render(){
        return <p>demo</p>
    }
}
function Header(props){
    return (
            <div>
                <h1>{props.title}</h1>
            </div>
        )
}

class Alert extends TinyReact.Component{
    constructor(props){
        super(props)
        this.state = {
            title:'alert title'
        }
        this.changeTitle = this.changeTitle.bind(this)
    }
    changeTitle () {
        console.log(this.input)
        console.log(this.demo)
        this.setState({
            title:'hello world'
        })
    }
    componentDidMount(){
        console.log('componentDidMount')
    }
    render(){
        console.log(this.state)
        return <div>
            <input type="text" ref={input => this.input = input} />
            <p>{this.props.name}</p>
            <p>{this.props.age}</p>
            <p>{this.state.title}</p>
            <Demo ref={demo => this.demo = demo} />
            <button onClick={this.changeTitle}>change title</button>
        </div>
    }
}
// TinyReact.render(<Alert name="nami" age="11" /> , root);

// setTimeout(() => {
//     TinyReact.render(<Alert name="chopper" age="22" />, root)
// }, 2000)

// console.log(virtualDOM)

class KeyDemo extends TinyReact.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [
          {
            id: 1,
            name: "张三"
          },
          {
            id: 2,
            name: "李四"
          },
          {
            id: 3,
            name: "王五"
          },
          {
            id: 4,
            name: "赵六"
          }
        ]
      }
      this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
      const newState = JSON.parse(JSON.stringify(this.state))
      newState.persons.push(newState.persons.shift())
      // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
    //   newState.persons.pop()
      this.setState(newState)
    }
    render() {
        let lis = this.state.persons.map(person => (
            <li>
                {person.name}
            </li>
            ))
        return (
            <div>
            <ul>
                {[...lis]}
            </ul>
            <button onClick={this.handleClick}>按钮</button>
            </div>
        )
    }
}
  
TinyReact.render(<KeyDemo />, root)
