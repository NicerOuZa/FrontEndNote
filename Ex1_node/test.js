var http = require("http")
var server = http.createServer()
var urlModule = require('url')

server.on("request", function (req, res) {
    const {pathname:url, query} = urlModule.parse(req.url, true)
    if (url === "/get"){
        console.log(query)
        res.end(query.name)
    } 
})

//4，绑定端口号，启动服务器
server.listen(3000, function () {
    console.log("server success")
    console.log("port：3000")
})