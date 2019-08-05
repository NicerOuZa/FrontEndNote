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

### 3，可选参数对象-解构赋值

```js
function test({sum1, sum2, sum3 = 1, sum4 = 2}) {
    console.log((`sum1-- ${sum1}`))
    console.log((`sum2-- ${sum2}`))
    console.log((`sum3-- ${sum3}`))
    console.log((`sum4-- ${sum4}`))
    return sum1 + sum2
}
// sum1和sum2是必须传入实参，sum3和sum4可选传入实参，如果没有传入实参就使用默认值
test({sum1:1,sum2:2,sum3:3})
```

### 5，JS中的Promise

https://www.cnblogs.com/sweeeper/p/8442613.html

https://blog.csdn.net/qq_37860963/article/details/81539118



### 4，JS单线程异步实现原理

https://blog.csdn.net/li123128/article/details/80650256

https://www.jianshu.com/p/f478f15c1671

http://www.ruanyifeng.com/blog/2014/10/event-loop.html

### 5，Object.defineProperty() 的使用

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty


# JS格式化

### eslint的使用

一、vs中安装eslint插件

二、npm 全局安装 eslint   sudo npm i -g eslint``

三、vs终端运行 eslint --init 来生成配置文件

四、在vscode的setting中设置

```yaml
   "eslint.autoFixOnSave": true,
```



# ES6新特性

[阮一峰ES6教程](http://es6.ruanyifeng.com/)



