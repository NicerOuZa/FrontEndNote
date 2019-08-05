var http = require("http")
var fs = require("fs")
var server = http.createServer()
server.on("request", function (request, response) {
    var url = request.url

    if (url === "/") {
        response.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
        })
        fs.readFile("./resource/index.html", function (error, data) {
            console.log(data)
            response.end(data)
        })
    } else if (url === "/a1") {
        response.writeHead(200, {
            "Content-Type": "image/jpeg"
        })
        fs.readFile("./resource/main.png", function (error, data) {
            response.end(data)
        })
    }
})

server.listen(3000, function () {
    console.log("服务器启动成功！")
    console.log("端口号：" + 3000)
})