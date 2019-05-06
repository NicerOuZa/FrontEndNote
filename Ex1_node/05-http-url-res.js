var port = 8080;
var product = [{
    name: '苹果 x',
    price: 5000
}, {
    name: '菠萝 x',
    price: 6000
}];


var http = require("http");
var server = http.createServer();
server.on("request", function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    response.write("请求路径是：" + request.url);
    var url = request.url;

    if (url === "/") {
        response.end("index page");
    } else if (url === "/login") {
        response.end("login page");
    } else if (url === "/product") {
        response.end(JSON.stringify(product));
    }
});

server.listen(port, function () {
    console.log("服务器启动成功！");
    console.log("端口号：" + port);
});