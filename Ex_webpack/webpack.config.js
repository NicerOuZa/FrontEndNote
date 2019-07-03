let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

let MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
          // 解析css之前来
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 使用 MiniCssExtractPlugin的loader
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
};
