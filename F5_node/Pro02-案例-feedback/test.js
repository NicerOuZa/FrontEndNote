const http = require("http");
const fs = require("fs");
const Url = require("url");

http
  .createServer(function(req, res) {
    res.writeHead(200, {
      "Content-Type": "text/txt;charset=utf-8"
    });
    let urlObj = Url.parse(req.url, true);
    let pathName = urlObj.pathname;
    if (pathName === "/") {
      res.end(JSON.stringify({ name: "zt", age: 18 }));
    } else if (pathName.indexOf("/comment") === 0) {
      res.end(JSON.stringify({ name: "zt", age: 18 }));
    } else if (pathName.indexOf("/user") === 0) {
      res.end(JSON.stringify({ query: urlObj.query }));
    } else if (pathName.indexOf("/favicon.ico") === 0) {
      res.end(JSON.stringify({ name: "zt", age: 18 }));
    } else {
      fs.readFile("./pages/404.html", function(err, data) {
        res.end(data);
      });
    }
  })
  .listen(5000, function() {
    console.log("服务器启动成功！");
    console.log("端口号：5000");
  });
