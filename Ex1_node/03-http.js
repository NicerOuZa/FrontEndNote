/**
 * 使用node构建一个web服务器
 *      在node中专门提供一个核心模块：http
 */

//1，加载 http 核心模块
var http = require("http")

//2，使用 http.createServer() 方法创建一个Web服务器
//          返回一个Server实例
var server = http.createServer()

//3，server提供服务： 对数据的服务
//      发请求
//      接收请求
//      处理请求
//      发送响应
//      注册 request 请求事件XMLHttpRequest
//          当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数（即回调函数）
server.on("request", function () {
    console.log("收到请求")
})

//4，绑定端口号，启动服务器
server.listen(3000, function () {
    console.log("服务器启动成功！")
    console.log("端口号：3000")
})