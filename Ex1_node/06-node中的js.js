/**
 * require 方法有两个作用
 *      1，就是加载文件并执行里面的代码
 *      2，拿到被加载文件模块导出的接口对象（即require的返回值是对应文件模块的exports对象）
 * 每一个文件模块都提供了一个对象exports
 *      exports默认是一个空对象
 *      在exports中传入值就可以实现文件模块之间的通信
 */
var ret = require("./Test.js");

function asd(params) {
    var a = 1;
}
console.log(ret);