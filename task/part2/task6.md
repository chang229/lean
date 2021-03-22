#### 6.简述 Symbol 类型的用途

1.Symbol 是一种新的基础数据类型, 用于创建独一无二的值，可做唯一 key 用于缓存等场景

```
//防止对象属性名称冲突
let mySymbol = Symbol();
// 用作对象属性名
let a = {};
a[mySymbol] = 'Hello!';
```

2.用于创建类的私有变量,利用 symbol 属性不能被枚举的特性声明作为私有属性

```
const password = Symbol()

class Login {
  constructor(username, password) {
    this.username = username
    this[password] = password
  }

  checkPassword(pwd) {
      return this[password] === pwd
  }
}

const login = new Login('admin', '123456')
login.PASSWORD //获取不到
```

3.用来重置对象的属性，比如 Symbol.toStringTag

```
const obj = {
    [Symbol.toStringTag]:'Xobject'
};
console.log(obj.toString());// [object Xobject]
```

4.可实现 Symbol.iterator 迭代器， 让普通对象变为可迭代对象

```
const obj = {
    life:['吃饭','睡觉','打豆豆'],
    learn:['js','css','html'],
    work:['work'],
    [Symbol.iterable]:function * (){
        const all = [...this.life,...this.learn,...thiis.work];
        for(const item of all){
            yield item;
        }
    }
}
```

5.使用 Symbol.for(‘xxx’)获取全局的 symbol 值
