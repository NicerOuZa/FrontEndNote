# 一，搭建项目

**首先需要环境node和git环境，项目需要 npm（一般用cnpm，npm太慢）进行下载安装**

### 1，使用官方的`quick-start` 

+ 输入git命令： `git clone https://github.com/electron/electron-quick-start.git` 安装官方的`quick-start`项目
+ 进入到项目内部： `cd electron-quick-start`
+ 输入命令：`npm install`   来安装electron所需要的依赖
+ 输入命令:`npm start`  来启动项目  （）

### 2，通过election手动创建项目

+ 新建文件夹 `election-demo`（项目文件夹）

+ 进入 `election-demo` 新建一个`index.html` 和`main.js`

+ 使用命令：`npm init` 新建一个`package.json`文件

  + 注意 package.json 配置的 main 必须是主进程 main.js
  + script 下的 start 需改成 "start" : "electron ."

+ 使用命令`Electron`的依赖：`npm install --save -dev electron`

+ 书写主进程 `main.js` 的基本代码

    ```javascript
    // 引入electron模块
    var electron = require("electron")
    
    
    // 创建 electron 的引用
    var app = electron.app
    
    // 创建 electron BrowserWindow 的引用
    var BrowserWindow = electron.BrowserWindow
    
    // 变量 保存 对应用的窗口的引用
    var mainWindow = null
    
    app.on("ready", () => {
      // 创建 BrowserWindow 的实例，赋值给win打开窗口
      mainWindow = new BrowserWindow({
        // 默认打开的宽度和高度
        width: 400,
        height: 400,
        // ★ 注意这里要把 nodeIntegration 设置为 true 在改页面的渲染进程中才能使用 node.js 的 API
        webPreferences: {
          nodeIntegration: true
        }
      })
    
      // 把 index.html 加载到窗口里面
      mainWindow.loadFile("./index.html")
    
      // 关闭窗口的时候 把mainWindow销毁
      mainWindow.on("closed", () => {
        mainWindow = null
      })
    })
    ```

+ 使用命令`npm start`来启动项目



# 二，electron基础

### 1，electron的运行流程

> electron 运行package.json 的main脚本的进程被称为主进程。在主进程中运行的脚本通过创建 web 页面来展示用户界面。一个electron应用总是有且只有一个主进程
>
> 由于electron使用了 chromium 来展示 web 页面，随意 chromium 的多进程架构也被使用到。每一个 electron 中的 web 页面运行在它自己的渲染进程中。
>
> 主进程使用 BrowerWindow 实例创建页面。每个 BrowerWindow 实例都在自己的渲染进程里运行里运行页面。当一个 BrowerWindow 实例被销毁后，响应的渲染进程也会被终止。



# API的使用

### 1，使用`loadUrl`来加载文件

```javascript
  // 使用 loadURL 来加载页面
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // 用 path来拼接路径  使用path之前需要加载path模块  var path = require("path")
  mainWindow.loadURL(path.join("file:",__dirname,"index.html"))
  // __dirname electron提供的一个全局变量，其内容是当前文件夹的绝对路径
  console.log(`${__dirname}`);

```

### 2，把 `nodeIntegration`设置为 true 来让渲染进程中能够使用 node 的 API 

> electron 在5.0之前是默认开启 nodeIntegration 

```javascript
mainWindow = new BrowserWindow({
    width: 400,
    height: 400,

    // ★ 注意这里要把 nodeIntegration 设置为 true 在改页面的渲染进程中才能使用 node.js 的 API
    webPreferences: {
      nodeIntegration: true
    }
  })
```



### 3，默认打开 渲染进程中的调试工具

```javascript
// 创建 BrowserWindow 的实例
  mainWindow = new BrowserWindow({})
// 调用 BrowserWindow 对象中的这个 API 来默认开启调试工具 
  mainWindow.webContents.openDevTools()
```













