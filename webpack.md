# 一，安装和配置

### 1，安装

```js
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save -dev webpack
//安装webpack-cli
npm install --save -dev webpack-cli
```

### 2，配置

#### 1，无配置

```js
-打包（支持js的模块化）
npx webpack
```

#### 2，手动配置webpack

默认配置文件的名字  `webpack.config.js`

```js
// 直接使用npx webpack会寻找默认名字的配置文件
npx webpack
// 使用 --config 指定对应的配置文件
npx webpack --config webpack.config.my.js
//通过设置 package.json 中的脚本来执行命令
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
   npm i webpack-dev-server -s -d
   ```

2. 启动`webpack-dev-server`

   ```js
   npx webpack-dev-server
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
   npm i html-webpack-plugin -D -s
   ```

2. 配置插件

   ```js
   -----webpack.config.js-----
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

   