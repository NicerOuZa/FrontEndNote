var http = require("http")
var fs = require("fs")
var server = http.createServer()
var DirPath = "D:/Code/z_Github/FontEndNote/Ex1_node"
server.on("request", function (request, response) {
    var filePath = request.url
    fs.readFile(DirPath + filePath, function (error, data) {

        if (error) {
            return response.end("errorMsg: " + error);
        }

        response.end(data)

    })
})

server.listen(3000, function () {
    console.log("服务器启动成功！")
    console.log("端口号：" + 3000)
})