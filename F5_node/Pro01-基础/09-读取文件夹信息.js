var http = require("http")
var fs = require("fs")
var server = http.createServer()
var DirPath = "D:/Code/z_Github/FontEndNote/F5_node"
server.on("request", function (request, response) {
    var dirPath = request.url
    fs.readdir(DirPath + dirPath, function (error, files) {

        if (error) {
            return response.end("errorMsg: " + error)
        }

        response.end(files[0])
    })
})

server.listen(3000, function () {
    console.log("服务器启动成功！")
    console.log("端口号：" + 3000)
})