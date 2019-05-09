var port = 8080
var http = require("http")
var server = http.createServer()
/**
 * request 请求事件处理函数，需要接受两个参数：
 *      Request：请求对象
 *          请求对象可以用来获取客户端的一些请求信息   
 *      Response：响应对象
 *          响应对象可以用来给客户端发送响应消息
 *          response有一个方法：write可以用来给客户端发送响应数据
 *              write可以使用多次，但是最后一次必须要使用 end 来结束响应，否则客户端会一直等待
 */
server.on("request", function (request, response) {
    console.log("请求路径是：" + request.url)
    response.write("helloworld")
    response.end()

})

server.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("服务器启动成功！")
    console.log("端口号：" + port)
})