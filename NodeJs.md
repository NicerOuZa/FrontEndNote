# 一，安装配置

# 二，基本的JS的API

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

