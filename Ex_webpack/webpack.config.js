let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let Uglifyjs = require('uglifyjs-webpack-plugin')

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: "./dist"
  },

  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve("./dist")
  },


  optimization: {
    minimizer:[
      new Uglifyjs({
        // 设置一下参数
        cache: true, //是否缓存
        parallel: true, // 是否并发打包
        sourceMap: true // sourcemap就是为了解决上述代码定位的问题，简单理解，就是构建了处理前的代码和处理后的代码之间的桥梁。主要是方便开发人员的错误定位
      }),
      new OptimizeCss()
    ]
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
    }),
    new MiniCssExtractPlugin({
      // 设置抽离出的css文件的名字
      filename: "main.css"
    })
  ],

  // 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 使用 MiniCssExtractPlugin的loader
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 解析css之前来添加浏览器前缀
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 使用 MiniCssExtractPlugin的loader
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 解析css之前来添加浏览器前缀
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
};
