export default function createElement(type, props, ...children){
    let childredElements = [].concat(...children);
    childredElements = childredElements.reduce((result,child) => {
        if(typeof child !== 'boolean' && child !== null){
            if(typeof child === 'object'){
                result.push(child)
            }else{
                result.push(createElement('text', {textContent:child}))
            }
        }
        return result;
    },[])
    return {
        type,
        props:Object.assign({children:childredElements},props),
        children:childredElements
    }
}