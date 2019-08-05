# 一，安装配置

# 二，基本的JS的API

### 模块化编程

```javascript
/**
 * require的作用就是加载模块
 *  在node中模块有三种
 *      具名的核心模块，如fs,http
 *      用户自己编写的文件模块（就是写的js文件）
 */
// 这样就可以执行 Test.js 文件中的代码了（.js后缀可以省略）
require("./Test.js");
```

+ 模块作用域：

  + node没有全局作用域，node中一个文件就是一个作用域（即文件作用域），一个文件不能直接调用另一个文件中的变量和方法
  + 默认模块与模块之间是封闭的

+ 模块之间的通信：

  + ```javascript
    /**
     * require 方法有两个作用
     *      1，就是加载文件并执行里面的代码
     *      2，拿到被加载文件模块导出的接口对象（即require的返回值是对应文件模块的exports对象）
     * 每一个文件模块都提供了一个对象module.exports
     *      module.exports默认是一个空对象
     *      在module.exports中传入值就可以实现文件模块之间的通信
     *	    exports 是 module.exports 的引用（所以直接给exports赋值不管用，只能给exports添加属性）
     */
      var ret1 = require("./Test1.js")
      // 可以省略 '.js' 后缀
      var ret2 = require("./Test2")
      console.log(ret1); // {foot1: 1, foot2: 2}
      console.log(ret2); // {foot1: 1, foot2: 2}
      ----------------------------------Test1.js中的内容----------------------------------
      console.log("test被加载了");
      exports.foot1 = 1;
      exports.foot2 = 2; 
      ----------------------------------Test2.js中的内容----------------------------------
    	module.exports = {
          foot1:1,
          foot2:2
        }
    ```
  





### 核心模块

Node为 JavaScript 提供了很多的服务器级别的API，这些API绝大多数都被封装到了一个具名核心模块中
例如文件操作的  `fs` 核心模块，http服务构建的`http`模块，`path`路径操作模块，`os`操作系统信息木块······

*核心模块都用require获取*

```javascript
var fs = require("fs")
var http = require("http")
```



### 1，读写文件的api

```javascript
//读文件
var fs = require('fs');
/**
 * 第一个参数：文件路径
 * 第二个参数：回调函数
 *      error:传递错误信息的对象
 *      data：存储读取的文件信息的对象
 */
fs.readFile('test.txt',function(error,data) {
    if (error) {
        console.log("读取文件失败！");
        console.log(error);
    }else{
        console.log("读取文件信息成功！")
        console.log(data.toString());
    }
});
-----------------------------------------------------------------
//写文件
var fs = require('fs');
/**
 * 第一个参数：文件路径
 * 第二个参数：要写入的文件内容
 * 第三个参数：回调函数
 *      error：传递错误信息的对象
 */
fs.writeFile("test>.txt","我是node.js",function (error) {
    if (error !== null) {
        console.log("文件写入失败！");
        console.log(error);
    }else{
        console.log("文件写入成功！");
    }
});


---------------------------------------------------------------
//读取文件夹
    // 读取文件夹 F5_node 
    // files 是一个由 F5_node 里面的文件名组成的数组
fs.readdir("D:/Code/F5_node", function (error, files) {
    if (error) {
        return response.end("errorMsg: " + error)
    }
    response.end(files)
})
```

### 2，最简单的http服务

```javascript
/**
 * 使用node构建一个web服务器
 *      在node中专门提供一个核心模块：http
 */

 //1，加载 http 核心模块
var http = require("http");

//2，使用 http.createServer() 方法创建一个Web服务器
//          返回一个Server实例
var server = http.createServer();

//3，server提供服务： 对数据的服务
//      发请求
//      接收请求
//      处理请求
//      发送响应
//      注册 request 请求事件
//          当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数（即回调函数）
server.on("request",function () {
    console.log("收到请求");
});

//4，绑定端口号，启动服务器
server.listen(3000,function () {
    console.log("服务器启动成功！");
    console.log("端口号：3000");
});
```

### 3, node服务器响应

```javascript
 var http = require("http");
 var server = http.createServer();
/**
 * request 请求事件处理函数，需要接受两个参数：
 *      Request：请求对象
 *          请求对象可以用来获取客户端的一些请求信息   
 *      Response：响应对象
 *          响应对象可以用来给客户端发送响应消息
 *          response有一个方法：write可以用来给客户端发送响应数据
 *              write可以使用多次，但是最后一次必须要使用 end 来结束响应，否则客户端会一直等待
 */
 server.on("request",function (request,response) {
     response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
     console.log("请求路径是："+request.url);
     response.write("helloworld");
     response.end();
     //直接end的同时也可以发送数据
     response.end("我是一个响应数据");
    
 });
 
 server.listen(3000,function () {
     console.log("服务器启动成功！");
     console.log("端口号：3000");
 });
```

### 4，设置响应数据的Content-Type和编码格式   

[查询对应文件类型的Content-Type](http://tool.oschina.net/commons)

```javascript
server.on("request", function (request, response) {
    //设置response编码为utf-8
    // 	Content-type 指定渲染文本的方式和编码格式
    // 			text/html 会渲染成html文本   text/plain 会渲染成普通文本   image/jpeg 图片格式  ···
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); 
    
    response.end("hello world");
});
----------------------------------------------------------------
// 比如发送图片前，可以指定Content-Type为image/jpeg
response.writeHead(200, {
    'Content-Type': 'image/jpeg'
});
fs.readFile("./resource/main.png", function (error, data) {
    response.end(data);
});
```



### 5，处理静态资源

**html在浏览器加载静态资源的路径问题**

```html
    <div>
        <!-- 在路径前面直接写 '/' 在浏览器中代表根路径 -->
        <!-- 如果是服务器加载，就是服务器根路径，即 'http://localhost:8080/public/img/a1.png' -->
        <!-- 如果是文件加载，就是盘符根路径 ， 即 'file:///D:/public/img/a1.png'-->
        <img src="/public/img/a1.png" alt="没有找到">
    </div>
```

**使用nodejs加载页面的静态资源的处理方案**

```js
const http = require('http')
const fs = require('fs')

http
    .createServer(function (req, res) {
        const url = req.url
        if (url === '/') {
            fs.readFile('./pages/index.html', function (err, data) {
                if (err) {
                    res.end('404 Not Found')
                }
                res.end(data)
            })
        } else if (url.indexOf("/public/") === 0) {
            // 约定静态资源放在 public 文件夹里
            // 通过出口 url 开头为 '/public/' 来读取静态资源然后返回给浏览器


            // 这里要在 url 前面加上 '.' 即 ./public/xxx 表示当前目录
            //      如果不加，即 /public/xxx 表示的是磁盘根目录
            fs.readFile('.' + url, function (err, data) {
                // 把文件数据发送给客户端
                res.end(data)
            })

        }

    })
    .listen(5000, function () {
        console.log("服务器启动成功！")
        console.log("端口号：5000")
    })
```

### 6，解析 url 

```js
// 引入 url 包
const Url = require('url')

console.log(Url.parse("http://localhost:5000/comment?name=zt&id=1"));
/**
  Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:5000',
  port: '5000',
  hostname: 'localhost',
  hash: null,
  search: '?name=zt&id=1',
  query: 'name=zt&id=1',
  pathname: '/comment',
  path: '/comment?name=zt&id=1',
  href: 'http://localhost:5000/comment?name=zt&id=1'
}
 */

// 传入第二给参数 true 后，会把 query 解析成对象
console.log(Url.parse("http://localhost:5000/comment?name=zt&id=1",true));
/**
  Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:5000',
  port: '5000',
  hostname: 'localhost',
  hash: null,
  search: '?name=zt&id=1',
  query: [Object: null prototype] { name: 'zt', id: '1' },
  pathname: '/comment',
  path: '/comment?name=zt&id=1',
  href: 'http://localhost:5000/comment?name=zt&id=1'
}
 */
```

### 7，重定向

重定向就是将网页自动转向重定向，即：

- **301永久性重定向**：在磁盘中进行存储，永久进行重定向
  - 301重定向是永久的重定向，搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址。
- **302临时性重定向**
  - 302重定向是暂时的重定向，搜索引擎会抓取新的内容而保存旧的网址。由于效劳器前往302代码，搜索引擎以为新的网址只是暂时的

```js
const http = require('http')

http
    .createServer(function (req, res) {
        
        let urlObj = Url.parse(req.url, true)
        pathName = urlObj.pathname

        if (pathName === '/') {
            fs.readFile('./pages/test.html', function (err, data) {
                if (err) {
                    res.end('404 Not Found')
                }
                res.end(data)
            })
        }else if(pathName.indexOf('/test1') === 0){
            // 把 '/test1' 重定向到 '/'
            // 		先把 statusCode 设置为 302
            //		再用 setHeader 重定向到 '/'
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        }

    })
    .listen(5000, function () {
        console.log("服务器启动成功！")
        console.log("端口号：5000")
    })
```





