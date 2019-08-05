let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  // 模式 默认两种  production， development
  mode: "development",
  //入口
  entry: "./src/main.js",
  output: {
    // 打包后的文件名
    // 给生成的文件的文件名追加hash值来时每次生成的js名字不一样来解决调试时浏览器缓存问题
    // hash:8 指定生成8位
    filename: "bundle.[hash:8].js",
    // 路径必须是一个绝对路径
    //   使用path模块下的resolve方法将相对路径解析成绝对路径
    path: path.resolve("./dist")
  },
  resolve: {
    extensions: [".vue", ".js"],
    alias: { '@': path.resolve("src") }
  },
  // 用数组放着所有webpack的插件
  plugins: [
    new HtmlWebpackPlugin({
      // 指定html的模板
      template: "./index.html",
      // 指定打包后的名字
      filename: "index.html",
      // 指定打包后的最小化的状态
      minify: {
        // 删除html中的双引号
        removeAttributeQuotes: true,
        // 折叠成一行
        collapseWhitespace: true
      },
      // 生成 hash戳
      hash: true
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //  style-loader -- 把css插入head的标签中
          {
            loader: "style-loader",
            options: {
              insertAt: "top"
            }
          },

          "css-loader"
        ]
      },
      {
        test: /\.scss$/,

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
          "sass-loader"
        ]
      },
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
          // 需要安装 less 和less-loader（less-loader调用）
          // 		npm i less less-loader -D
          "less-loader"
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              // 引入 babel/preset-env 把es6转成es5
              "@babel/preset-env"
            ],
            // 引入插件@babel/plugin-proposal-class-properties把es7转为es5
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      // 处理图片和字体文件
      {
        test: /\.(jpg|png|gif|bmp|jpeg|ttf|eot|svg|woff|woff2)$/,
        use: "url-loader"
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  }
};
