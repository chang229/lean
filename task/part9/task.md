# 1,请简述 React 16 版本中初始渲染的流程

1. jsx 转换成 react 元素
    babel-react 会将jsx 调用 React.createElement
    React.createElement 会 jsx 转换成 react element （react element 就是 一个用来描述react 元素的对象。）
2. render （协调层）此阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作。
    首先为每一个react 元素构建 fiber 对象 (workInProgress Fiber 树）创建 此 fiber 对象对应的 DOM 对象，为 fiber 对象添加 effectTag 属性（用来记录当前 Fiber 要执行的 DOM 操作），然后在render 结束后， fiber 会被保存到 fiberroot 中。

代码层步骤：
- 将子树渲染到容器中 (初始化 Fiber 数据结构: 创建 fiberRoot 及 rootFiber)
- 判断是否为服务器端渲染 如果不是服务器端渲染，清空 container 容器中的节点
- 通过实例化 ReactDOMBlockingRoot 类创建 LegacyRoot，创建 LegacyRoot 的 Fiber 数据结构
- 创建 container，创建根节点对应的 fiber 对象
- 获取 container 的第一个子元素的实例对象
- 计算任务的过期时间，再根据任务过期时间创建 Update 任务，将任务(Update)存放于任务队列(updateQueue)中。- 判断任务是否为同步 调用同步任务入口。
- 构建 workInProgress Fiber 树
3. commit 阶段 （渲染层）
先获取到render 的结果， 在 fiberroot 中的 新构建的 workInProgress Fiber 树
根据 fiber 中的 effectTag 属性进行相应的 DOM 操作



# 2,为什么 React 16 版本中 render 阶段放弃了使用递归

React 16 之前的版本比对更新 VirtualDOM 的过程是采用循环加递归实现的，这种比对方式有一个问题，就是一旦任务开始进行就无法中断，如果应用中组件数量庞大，主线程被长期占用，直到整棵 VirtualDOM 树比对更新完成之后主线程才能被释放，主线程才能执行其他任务。这就会导致一些用户交互，动画等任务无法立即得到执行，页面就会产生卡顿, 非常的影响用户体验;

核心问题：递归无法中断，执行重任务耗时长。 JavaScript 又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差。

React16采用fiber架构， 利用浏览器空闲时间执行任务，拒绝长时间占用主线程；放弃递归只采用循环，因为循环可以被中断；任务拆分，将任务拆分成一个个的小任务；

在 Fiber 方案中，为了实现任务的终止再继续，DOM比对算法被分成了两部分：

1. 构建 Fiber        (可中断)
2. 提交 Commit   (不可中断)

DOM 初始渲染: virtualDOM -> Fiber -> Fiber[] -> DOM

DOM 更新操作: newFiber vs oldFiber -> Fiber[] -> DOM


# 3,请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

commit 阶段可以分为三个子阶段：

- before mutation 阶段（执行 DOM 操作前）：调用类组件的 getSnapshotBeforeUpdate 生命周期函数
- mutation 阶段（执行 DOM 操作）：根据 effectTag 执行 DOM 操作，将workingProgress Fiber树变成current Fiber树
- layout 阶段（执行 DOM 操作后）：调用生命周期函数和钩子函数


# 4,请简述 workInProgress Fiber 树存在的意义是什么

​在React中最多会同时存在两棵Fiber树，当前显示在页面是current Fiber树，在内存中构建的Fiber树称为workInProgress Fiber树，workingProgress Fiber这棵树是在内存中构建的，构建完成才统一替换，这样不会产生不完全的真实dom。一旦更新完成，react会直接将current树替换成workingProgress Fiber树，以便快速完成DOM的更新，也是react提升性能的一部分。