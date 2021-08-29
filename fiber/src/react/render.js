import {taskSqueen, arrified, createStateNode, getTag} from './micn';

let taskSqueens = taskSqueen();
// 定义自任务对象，实际就是一个fiber对象
let subTask = null;
let pendingCommit = null;

const commitAllWork = (fiber) => {
    console.log(fiber)
    fiber.effects.forEach((item) => {
        if(item.effectTags === "placement"){
            let parentFiber = item.parent;
            while(parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component'){
                parentFiber = parentFiber.parent;
            }
            if(item.tag === 'host_component'){
                parentFiber.stateNode.appendChild(item.stateNode)
            }
        }
    })

    // 备份旧的fiber对象
    fiber.stateNode.__rootFiberContainer = fiber;
}

const getFirstTask = () => {
    // 从任务队列中获取任务
    let task = taskSqueens.pop();
    // 返回最外层节点的fiber对象
    return {
        props:task.props,
        stateNode:task.dom,
        tag:"host_root",
        effects:[],
        child:null,
        alternate:task.dom.__rootFiberContainer
    }
}

const reconcileChildren = (fiber,children) => {
    // children可能是对象也可能是数组
    // children是数组，则直接返回
    // children是对象，要将对象变成数组
    let childrenFiber = arrified(children)

    let index = 0;
    let childrenFiberlength = childrenFiber.length;
    let element = null;
    let newFiber = null;
    let proveFiber = null;

    while(index < childrenFiberlength){
        element = childrenFiber[index];
        newFiber = {
            type: element.type,
            props: element.props,
            tag: getTag(element),
            effects: [],
            effectTags: 'placement',
            parent: fiber
        }
        // 为fiber节点创建stateNode属性
        newFiber.stateNode = createStateNode(newFiber)
        if(index === 0){
            // index为0时
            // 为fiber添加子节点（第一个子节点）
            fiber.child = newFiber;
        }else{
            // index不为0时，
            // 为子节点添加下一个兄弟节点
            proveFiber.sibling = newFiber
        }

        proveFiber = newFiber
        index++;
    }

}

const executeTask = (fiber) => {
    // 构建子节点fiber对象
    if(fiber.tag === 'class_component'){
        reconcileChildren(fiber,fiber.stateNode.render())
    }else if(fiber.tag === 'function_component'){
        reconcileChildren(fiber,fiber.stateNode(fiber.props))
    }else{
        reconcileChildren(fiber,fiber.props.children)
    }
    if(fiber.child){
        return fiber.child
    }

    let currentExcutFiber = fiber;
    while(currentExcutFiber.parent){
        currentExcutFiber.parent.effects = currentExcutFiber.parent.effects.concat(
            currentExcutFiber.effects.concat([currentExcutFiber])
        )
        if(currentExcutFiber.sibling){
            return currentExcutFiber.sibling
        }
        currentExcutFiber = currentExcutFiber.parent;
    }

    pendingCommit = currentExcutFiber;
}

const workLoop = (IdleDeadline) => {
    // 如果没有自认为就去获取自认为
    if(!subTask){
        subTask = getFirstTask();
    }

    // 如果自任务存在并且浏览器有空闲事件
    // 就去执行任务
    // executeTask执行任务，并返回新任务
    while(subTask && IdleDeadline.timeRemaining() > 1){
        subTask = executeTask(subTask)
    }

    if(pendingCommit){
        commitAllWork(pendingCommit)
    }
}

const performTask = (IdleDeadline) => {
    // 执行任务
    workLoop(IdleDeadline);
    // 判断任务队列中是否还有任务
    // 如果还有任务就再次告诉浏览者在空闲时执行任务
    if(subTask && !taskSqueens.isEmpty()){
        requestIdleCallback(performTask)
    }
}

export function render(element,dom){
    // 想任务队列中添加任务
    // 添加的任务就是通过vdom对象够艰难fiber对象
    taskSqueens.push({
        dom,
        props:{children:element}
    })
    // 指定你浏览器在空闲是去执行任务
    requestIdleCallback(performTask)
}