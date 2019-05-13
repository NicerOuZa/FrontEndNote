/**
 * require 方法有两个作用
 *      1，就是加载文件并执行里面的代码
 *      2，拿到被加载文件模块导出的接口对象（即require的返回值是对应文件模块的exports对象）
 * 每一个文件模块都提供了一个对象exports
 *      exports默认是一个空对象
 *      在exports中传入值就可以实现文件模块之间的通信
 */
var ret = require("./07-发送文件数据.js/index.js")

var http = require("http")
var server = http.createServer()
server.on("request", function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }) //设置response编码为utf-8

    console.log(request.socket.remotePort)
    response.end("login page")
})

server.listen(3000, function () {
    console.log("服务器启动成功！")
    console.log("端口号：" + 3000)
})