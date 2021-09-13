import { combineReducers } from "redux";
import countReducer from "./countReducer";
import modalReducer from './modalReducer';

export default combineReducers({
    counter: countReducer,
    modal: modalReducer,
})