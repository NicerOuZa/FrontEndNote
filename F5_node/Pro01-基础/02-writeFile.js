var fs = require('fs')
/**
 * 第一个参数：文件路径
 * 第二个参数：要写入的文件内容
 * 第三个参数：回调函数
 *      error：传递错误信息的对象
 */
fs.writeFile("test>.txt","我是node.js",function (error) {
    if (error !== null) {
        console.log("文件写入失败！")
        console.log(error)
    }else{
        console.log("文件写入成功！")
    }
})
