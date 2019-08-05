const http = require('http')
const fs = require('fs')
const Url = require('url')

Url.parse('http://localhost:5000/comment?name=zt&id=1')
Url.parse('http://localhost:5000/comment?name=zt&id=1', true)


http
	.createServer(function (req, res) {
		res.writeHead(200, {
			'Content-Type': 'text/txt;charset=utf-8'
		})
		let urlObj = Url.parse(req.url, true)
		let pathName = urlObj.pathname

		if (pathName === '/') {
			fs.readFile('./pages/index.html', function (err, data) {
				if (err) {
					res.end('404 Not Found')
				}
				res.end(data)
			})
		} else if (pathName.indexOf('/comment') === 0) {

			res.write('表单请求到的数据：')
			res.end(JSON.stringify(urlObj.query))
		} else if (pathName.indexOf('/public/') === 0) {
			// 约定静态资源放在 public 文件夹里
			// 通过出口 pathName 开头为 '/public/' 来读取静态资源然后返回给浏览器


			// 这里要在 pathName 前面加上 '.' 即 ./public/xxx 表示当前目录
			//      如果不加，即 /public/xxx 表示的是磁盘根目录
			fs.readFile('.' + pathName, function (err, data) {
				// 把文件数据发送给客户端
				res.end(data)
			})
		} else if (pathName.indexOf('/favicon.ico') === 0) {
			fs.readFile('./public/img/favicon.ico', function (err, data) {
				// 把文件数据发送给客户端
				res.end(data)
			})
		} else {
			fs.readFile('./pages/404.html', function (err, data) {
				res.end(data)
			})
		}

	})
	.listen(5000, function () {
		console.log('服务器启动成功！')
		console.log('端口号：5000')
	})