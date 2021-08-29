import createDOMElement from './createDOMElement';
import creatReactInstance from './creatReactInstance';
import {Component} from '../component';

export function taskSqueen() {
    let task = [];
    return {
        push:(item) => task.push(item),
        pop:() => task.shift(),
        isEmpty:() => task.length === 0
    }
}

export function arrified(arg){
    return Array.isArray(arg) ? arg : [arg]
}

export function createStateNode(fiber){
    if(fiber.tag === "host_component"){
        return createDOMElement(fiber)
    }else{
        return creatReactInstance(fiber)
    }
}

export function getTag(element){
    if(typeof element.type === 'string'){
        return 'host_component'
    }
    if(Object.getPrototypeOf(element.type) === Component){
        return 'class_component'
    }
    return 'function_component'
}