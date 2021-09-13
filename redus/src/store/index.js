import {createStore, applyMiddleware} from 'redux';
import reducer from './readucer';
import logger from './logger';
import test from './test'

export const store = createStore(reducer, applyMiddleware(logger,test))
