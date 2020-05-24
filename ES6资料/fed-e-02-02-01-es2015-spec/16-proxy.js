// Proxy 对象

const person = {
  name: 'zce',
  age: 20
}

const personProxy = new Proxy(person, {
  // 监视属性读取
  get (target, property) {
    return property in target ? target[property] : 'default'
    // console.log(target, property)
    // return 100
  },
  // 监视属性设置
  set (target, property, value) {
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not an int`)
      }
    }

    target[property] = value
    // console.log(target, property, value)
  }
})

personProxy.age = 100

personProxy.gender = true

console.log(personProxy.name)
console.log(personProxy.xxx)
