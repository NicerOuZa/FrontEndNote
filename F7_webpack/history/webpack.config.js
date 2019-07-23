let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  //开发时服务器的配置
  devServer: {
    // 设置端口号
    port: 3000,
    // 设置是否显示进度条
    progress: true,
    // 设置进入那个文件夹
    contentBase: "./dist"
  },
  // 模式 默认两种  production， development
  mode: "development",
  //入口
  entry: "./src/index.js",
  output: {
    // 打包后的文件名
    // 给生成的文件的文件名追加hash值来时每次生成的js名字不一样来解决调试时浏览器缓存问题
    // hash:8 指定生成8位
    filename: "bundle.[hash:8].js",
    // 路径必须是一个绝对路径
    //   使用path模块下的resolve方法将相对路径解析成绝对路径
    path: path.resolve("./dist")
  },

  // 用数组放着所有webpack的插件
  plugins: [
    new HtmlWebpackPlugin({
      // 指定html的模板
      template: "./src/index.html",
      // 指定打包后的名字
      filename: "index.html",
      // 指定打包后的最小化的状态
      minify: {
        // 删除html中的双引号
        removeAttributeQuotes: true
      },
      // 生成 hash戳
      hash: true
    })
  ],

  // 模块
  module: {
    //规则
    // 引入 cssloader -- 负责解析@import语法
    // style-loader -- 把css插入head的标签中
    // loader用法：
    //      字符串只用一个loader
    //      多个loader需要用数组
    // loader默认从后向前执行
    // 单个loader可以是一个字符串也可以写成对象形式
    rules: [
      {
        test: /\.css$/,
        use: [
          //  style-loader -- 把css插入head的标签中
          {
            loader: "style-loader",
            options: {
              // 将引入的css插入到html最上面（降低插入的css的优先级）
              insertAt: "top"
            }
          },
          //   cssloader -- 负责解析@import语法
          "css-loader"
        ]
      },
      // 处理less文件  (其他css预处理器sass等也可以处理)
      {
        test: /\.less$/,
        use: [
          //  style-loader -- 把css插入head的标签中
          {
            loader: "style-loader",
            options: {
              // 将引入的css插入到html最上面（降低插入的css的优先级）
              insertAt: "top"
            }
          },
          //  cssloader -- 负责解析@import语法
          "css-loader",
          // 	把less转成css
          // 需要安装 less和less-loader（less-loader调用）
          // 		npm i less less-loader -d -s
          "less-loader"
        ]
      }
    ]
  }
};
