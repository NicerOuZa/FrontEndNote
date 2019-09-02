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

### 4，JS中的Promise

[JS - Promise使用详解](https://www.cnblogs.com/sweeeper/p/8442613.html)

[理解JS Promise](https://blog.csdn.net/qq_37860963/article/details/81539118)

### 5，async / await 的用法

getJSON函数返回一个promise，这个promise成功resolve时会返回一个 JSON 对象。我们只是调用这个函数，打印返回的JSON对象，然后返回"done"。

使用Promise是这样的:[·](http://caibaojian.com/asyncawait.html)

```js
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })

makeRequest()
```

使用Async/Await是这样的:

```js
//code from http://caibaojian.com/asyncawait.html
const makeRequest = async () => {
  var data = await getJSON()
  console.log(data)
  return "done"
}

makeRequest()
```

它们有一些细微不同:

- 函数前面多了一个aync关键字。await关键字只能用在aync定义的函数内。async函数会隐式地返回一个promise，该promise的reosolve值就是函数return的值。(示例中reosolve值就是字符串"done")
- 第1点暗示我们不能在最外层代码中使用await，因为不在async函数内。

### 6，JS单线程异步实现原理

[什么叫异步](https://blog.csdn.net/li123128/article/details/80650256)

[JS是单线程运行机制](https://www.jianshu.com/p/f478f15c1671)

[Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

### 7，Object.defineProperty() 的使用

[MDN Object.defineProperty()]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### 8，对象展开运算符

对象展开运算符用 `...` 来表示，可以对数组和对象进行快速解构

```js
let a = [1,2,3];
let b = [0, ...a, 4]; // 等价于[0,1,2,3,4]
 
let obj = { a: 1, b: 2 };
let obj2 = { ...obj, c: 3 }; // 等价于{ a:1, b:2, c:3 }
let obj3 = { ...obj, a: 3 }; // 等价于{ a:3, b:2 }
```



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



