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
        filename: 'bundle.js',
        // 路径必须是一个绝对路径 
        //   使用path模块下的resolve方法将相对路径解析成绝对路径
        path: path.resolve('./dist')
    }
}
```

