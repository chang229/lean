#### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```
let vm = new Vue({
    el: '#el'
    data: {
        o: 'object',
        dog: {}
    },
    method: {
        clickHandler () {
            // 该 name 属性是否是响应式的
            this.dog.name = 'Trump'
        }
    }
})
```

-   1.通过这种方法为 dog 新增的成员不是响应式的；
-   2.要将新成员变成响应式的应该给 dog 属性赋值一个新对象，并且该新对象应该包含原有的所有属性；

```
let vm = new Vue({
    el: '#el'
    data: {
        o: 'object',
        dog: {}
    },
    method: {
        clickHandler () {
            let newDog = Object.assing({},this.dog,{name:'Trump'});
            // 为dog属性重新赋值一个新对象，此时dog的新成员是响应式的
            this.dog = newDog;
        }
    }
})
```

-   3.原理
    在对属性设置新增的时候，vue 内部会判断新的值是否是对象，如果是对象，就会调用内部的 defineReactive 方法，将它的属性转换成响应式数据
