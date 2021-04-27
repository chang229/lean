#### 2、请简述 Diff 算法的执行过程

Diff 策略：

-   web 页面中 DOM 节点跨层级的操作特别少，可以忽略不计，所有 diff 只比较同层节点，不会跨层级比较，避免了对 DOM 树进行逐层搜索变量;

-   同一层级的一组节点，可以通过唯一的 key 进行区分;

基于上述两点策略，虚拟 DOM 的 diff 算法的复杂的从 O(n^3)降到了 O(n);

执行过程：

-   在对开始和结束节点比较的时候，总共有四种情况

1.oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)

2.oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)

3.oldStartVnode / newEndVnode (旧开始节点 / 新结束节点)

4.oldEndVnode / newStartVnode (旧结束节点 / 新开始节点)

-   开始和结束节点
    如果新旧开始节点是 sameVnode(key 和 sel 相同)

    1.调用 patchVnode()对比和更新节点;

    2.把旧开始和新开始索引往后移动：oldStartIdx ++ newStartIdx ++;

-   旧开始节点 / 新结束节点

1.调用 patchVnode()对比和更新节点；

2.把 oldStartVnode 对应的 DOM 元素，移动到右边，更新索引

-   旧结束节点 / 新开始节点

1.调用 patchVnode()对比和更新节点；

2.把 oldEndVnode 对应的 DOM 元素，移动到左边，更新索引；

-   非上述四种情况

1.遍历新节点，使用 newStartNode 的 key 在老节点数组中找相同节点；

2.如果没有找到，说明 newStartNode 是新节点；创建新节点对应的 DOM 元素，插入到 DOM 树中；

3.如果找到了：
（1）判断新节点和找到的老节点的 sel 选择器是否相同；
（2）如果不同，说明节点被修改了，重新创建对应的 DOM 元素，插入 DOM 树中；
（3）如果相同，把 elmToMove 对应的 DOM 元素，移动到左边；

-   循环结束

1.当老节点的所有子节点先遍历完（oldStartIdx > oldEndIdx）,循环结束

2.新节点的所有子节点先遍历完（newStartIdx > newEndIdx）,循环结束

3.如果老节点的数组先遍历完（oldStartIdx > oldEndIdx）,说明新节点有剩余，把剩余节点批量插入到右边

4.如果新节点的数组先遍历完（newStartIdx > newEndIdx）,说明老节点有剩余，把剩余节点批量删除

#####

1.首先定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引。

2.接下来是一个 while 循环，在这过程中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢。while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

while 循环中会遇到四种情况：

情形一：当新老 VNode 节点的 start 是同一节点时，直接 patchVnode 即可，同时新老 VNode 节点的开始索引都加 1。

情形二：当新老 VNode 节点的 end 是同一节点时，直接 patchVnode 即可，同时新老 VNode 节点的结束索引都减 1。

情形三：当老 VNode 节点的 start 和新 VNode 节点的 end 是同一节点时，这说明这次数据更新后 oldStartVnode 已经跑到了 oldEndVnode 后面去了。这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldEndVnode 的后面，同时老 VNode 节点开始索引加 1，新 VNode 节点的结束索引减 1。

情形四：当老 VNode 节点的 end 和新 VNode 节点的 start 是同一节点时，这说明这次数据更新后 oldEndVnode 跑到了 oldStartVnode 的前面去了。这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldStartVnode 的前面，同时老 VNode 节点结束索引减 1，新 VNode 节点的开始索引加 1。

3.while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

情形一：如果在循环中，oldStartIdx 大于 oldEndIdx 了，那就表示 oldChildren 比 newChildren 先循环完毕，那么 newChildren 里面剩余的节点都是需要新增的节点，把[newStartIdx, newEndIdx]之间的所有节点都插入到 DOM 中

情形二：如果在循环中，newStartIdx 大于 newEndIdx 了，那就表示 newChildren 比 oldChildren 先循环完毕，那么 oldChildren 里面剩余的节点都是需要删除的节点，把[oldStartIdx, oldEndIdx]之间的所有节点都删除
