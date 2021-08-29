import React,{render, Component} from './react'

const jsx = (
    <div>
        <p>hello world</p>
        <p>hi react</p>
    </div>
)

// render(jsx,document.getElementById('root'))

class Greatung extends Component{
    render(){
        return (
            <div>{this.props.title}哈哈哈哈</div>
        )
    }
}

render(<Greatung title="ceshi" />,document.getElementById('root'))

function Fncomponent(props){
    return (
        <div>{props.title}函数组件</div>
    )
}

// render(<Fncomponent title="厕所" />,document.getElementById('root'))