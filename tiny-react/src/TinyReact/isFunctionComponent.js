import isFunction from "./isFunction";

export default function isFunctionComponent(virtualDOM){
    let type = virtualDOM.type;
    return type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
}