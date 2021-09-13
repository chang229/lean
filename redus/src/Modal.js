import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './store/action';

function Modal(props){
    const style = {
        width:200,
        height:200,
        position:'absolute',
        top:'50%',
        left:'50%',
        marginTop:-100,
        marginLeft:-100,
        background:'skyblue',
        display:props.show ? 'block' : 'none',
    }
    return (
        <div>
            <button onClick={() => props.showModal(true)}>显示</button>
            <button onClick={() => props.showModal(false)}>隐藏</button>
            <div style={style}></div>
        </div>
    )
}

const mapStatetoProps = (state) => ({
    show:state.modal.show
})

const mapActionsToProps = (dispatch) => bindActionCreators(actions,dispatch);

export default connect(mapStatetoProps, mapActionsToProps)(Modal);