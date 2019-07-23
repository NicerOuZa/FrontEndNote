# 一，安装和配置

### 1，安装

```js
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save --only=dev webpack
//安装webpack-cli
npm install --save --only=dev webpack-cli
```

### 2，配置

#### 1，无配置

```js
-打包（支持js的模块化）
npx webpack
```

#### 2，手动配置webpack

默认配置文件的名字  `webpack.config.js`

```
// 一，直接使用npx webpack会寻找默认名字的配置文件
npx webpack

// 二，使用 --config 指定对应的配置文件
npx webpack --config webpack.config.my.js

// 三，通过设置 package.json 中的脚本来执行命令
// 	1,在package.json的scripts中配置一条命令build
	"scripts": {
    	"build": "webpack --webpack.config.my.js"
  	},
//	2,在命令行执行build命令
	npm run build
```



```js
-----webpack.config.js-----
let path = require('path')
module.exports = {
    // 模式 默认两种  production， development
    mode:'development',
    //入口
    entry: './src/index.js',
    output: {
        // 打包后的文件名
        // 给生成的文件的文件名追加hash值来时每次生成的js名字不一样来解决调试时浏览器缓存问题
        // hash:8 指定生成8位
        filename: 'bundle.[hash:8].js',
        // 路径必须是一个绝对路径 
        //   使用path模块下的resolve方法将相对路径解析成绝对路径
        path: path.resolve('./dist')
    }
}
```

### 3，开启静态服务

1. 安装`webpack-dev-server`

   ```js
   npm i webpack-dev-server -D
   ```

2. 启动`webpack-dev-server`

   ```js
   // 一.直接使用命令行启动
   npx webpack-dev-server
   // 二.通过设置 package.json 中的脚本来执行命令
   ----------package.json--------
     "scripts": {
         // 1,在package.json的scripts中配置一条命令dev
         //   	--open 可以让浏览器
       "dev": "webpack-dev-server --open"
     },
    //	2,在命令行执行 dev 命令
       npm run dev
   ```

**配置`webpack-dev-server`**

```js
-----webpack.config.js-----
module.exports = {
    //开发时服务器的配置
    devServer:{
        // 设置端口号
        port: 3000,
        // 设置是否显示进度条
        progress: true,
        // 设置进入那个文件夹
        contentBase: './dist'
    },
}
```



### 4，Html插件的使用

1. 安装

   ```js
   npm i html-webpack-plugin -D
   ```

2. 配置插件

   ```js
   -----webpack.config.js-----
   // 引入插件
   let HtmlWebpackPlugin = require("html-webpack-plugin");
   module.exports = {
   	// 用数组放着所有webpack的插件
       plugins: [
           new HtmlWebpackPlugin({
               // 指定html的模板
               template: './src/index.html',
               // 指定打包后的名字
               filename: "index.html",
               // 指定打包后的最小化的状态
               minify: {
                   // 删除html中的双引号
                  removeAttributeQuotes: true,
                  // 折叠成一行
                  collapseWhitespace: true,
               },
               // 生成 hash戳
               hash: true
           })
       ]
}
   ```
   
   



### 5，样式处理

#### 1，将 css 样式模块加入到  style 中

1. 在 js 中引入 css 的模块

```js
require('./index.css')
```

2. 在 css 文件引入其他 css 文件

```css
@import './a.css';
body{ background-color: pink }
```

3. 安装 css-loader 和 style-loader

```js
npm i css-loader style-loader -D -S
```

4. 配置 webpack.config.js

```js
module.exports = {
    // 模块
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
          // 需要安装 less 和less-loader（less-loader调用）
          // 		npm i less less-loader -d -s
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
        {
            loader: "style-loader",
            options: {
            insertAt: "top"
            }
	    },
    	//  cssloader -- 负责解析@import语法
    	"css-loader",
    	// 	把scss转成css
    	// 需要安装 node-sass和sass-loader（less-loader调用）
    	// 		npm i sass-loader -D -S
        //		npm i node-sass -D -S
    	"sass-loader"
		]
        }
    ]
  }
}
```



#### 2，将css从html抽离出来

1. 安装抽离css的插件

```js
npm i mini-css-extract-plugin -d -s
```

2. 配置 webpack.config.js

```js
// 引入插件对象
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 用数组放着所有webpack的插件
  plugins: [
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
```

#### 3，自动给css加浏览器前缀

1. 安装 postcss-loader

```js
npm i postcss-loader autoprefixer -d -s
```

2. 配置 postcss.config.js 

```js
module.exports = {
    plugins:[require('autoprefixer')]
}
```

3. 配置 webpack.config.js

```js
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 解析css之前来添加浏览器前缀
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
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

```

#### 4，压缩抽离的 css 文件

1. 安装插件 optimize-css-assets-webpack-plugin

```
npm i optimize-css-assets-webpack-plugin -d -s
```

2. 压缩优化了 css 原来的 js 就不能压缩了，需要使用 uglifyjs-webpack-plugin 插件来优化js

```
npm i uglifyjs-webpack-plugin -s -d
```

3. 配置 webpack.config.js

```js
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let Uglifyjs = require('uglifyjs-webpack-plugin')

module.exports = {

  optimization: {
    minimizer:[
      // 设置 js 压缩
      new Uglifyjs({
        // 设置一下参数
        cache: true, //是否缓存
        parallel: true, // 是否并发打包
        sourceMap: true // sourcemap就是为了解决上述代码定位的问题，简单理解，就是构建了处理前的代码和处理后的代码之间的桥梁。主要是方便开发人员的错误定位
      }),
      // 压缩 css 文件
      new OptimizeCss()
    ]
  },
};
```



### 6，把es6转成es5

1. 安装 babel-loader

```js
npm i babel-loader @babel/core @babel/preset-env -D
// 解析es7的语法的插件
npm i @babel/plugin-proposal-class-properties -D
```

2. 配置 webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 引入 babel/preset-env 把es6转成es5
              '@babel/preset-env'
            ],
            // 引入插件@babel/plugin-proposal-class-properties把es7转为es5
            plugins:[
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }, 
    ]
  }
};
```



### 7，处理图片字体等 url 路径

1. 安装 url-loader 和 file-loader

   ```
   npm i url-loader file-loader -D
   ```

2. 配置 webpack.config.js

   ```js
   module.exports = {
     module: {
       rules: [
         {
           // 处理各种图片和字体文件
           test: /\.(jpg|png|gif|bmp|jpeg|ttf|eot|svg|woff|woff2)$/,
           // 不传入 limit 时，默认都会把图片解析成base64的格式
           // 传入 limit为1024 后，图片只有小于1024b才会被解析成base64
           // name属性作用为设置打包后图片的名称
           // 		[hash:8] 代表8位的哈希值
           //		[name] 代表源文件名称
           // 		[ext] 代表源文件后缀
           use: 'url-loader?limit=1024&name=[hash:8]-[name].[ext]'
         }, 
       ]
     }
   };
   ```

### 8，引入 node_modules 中的资源

```js
-------------index.js---------------------
import './css/index.scss'
// 引入 node_modules 中的文件时不需要添加 ./node_modules
//      其会自动去 node_modules 中寻找
import 'bootstrap/dist/css/bootstrap.css'
console.log("index.js");
```

