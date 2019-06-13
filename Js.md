# Array 对象

### 对象方法

#### 1，map

#### 2，join

# window 对象

### 对象方法

#### 1，setTimeout

function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number

### 1，setInterval

function setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number





# 知识点

### 1，js 的构造方法的实例对象会集成构造方法的 prototype

```javascript
function Person(){
    this.name = "zz"
    this.age = 19
}
// 给Person的prototype添加一个函数
Person.prototype.testFun = function(){
    alert(1)
}
// 创建Person的实例
let person1 = new Person()
// perso1可以直接使用testFun函数
person1.testFun()
```

### 2，[js中this指向及继承](https://juejin.im/post/5cfd9d30f265da1b94213d28)

# ES6新特性

[阮一峰ES6教程](http://es6.ruanyifeng.com/)