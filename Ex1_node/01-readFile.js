var fs = require('fs');
/**
 * 第一个参数：文件路径
 * 第二个参数：回调函数
 *      error:传递错误信息的对象
 *      data：存储读取的文件信息的对象
 */
fs.readFile('test.txt',function(error,data) {
    if (error) {
        console.log("读取文件失败！");
        console.log(error);
    }else{
        console.log("读取文件信息成功！");
        console.log(data.toString());
    }
});
