
let path = require('path')
module.exports = {
    // 模式 默认两种  production， development
    mode:'development',
    //入口
    entry: './src/index.js',
    output: {
        // 打包后的文件名
        filename: 'bundle.js',
        // 路径必须是一个绝对路径 
        //   使用path模块下的resolve方法将相对路径解析成绝对路径
        path: path.resolve('./dist')
        
    }
}