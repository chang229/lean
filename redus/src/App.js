import { connect } from 'react-redux';
import * as actions from './store/action';
import { bindActionCreators } from 'redux';
import Modal from './Modal';


function App(props) {
  return (
    <div className="App">
        <button onClick={() => props.add(2)}>+</button>
        <span>{props.count}</span>
        <button onClick={() => props.cut(2)}>-</button>
        <Modal />
    </div>
  );
}

const mapStatetoProps = (state) => ({
    count:state.counter.count
})

const mapDispatchtoProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
