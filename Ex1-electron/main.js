// const {
//   app,
//   BrowserWindow
// } = require('electron')

// // 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// // 垃圾回收的时候，window对象将会自动的关闭
// let win

// function createWindow() {
//   // 创建浏览器窗口。
//   win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   // 然后加载应用的 index.html。
//   win.loadFile('index.html')

//   // 打开开发者工具
//   win.webContents.openDevTools()

//   // 当 window 被关闭，这个事件会被触发。
//   win.on('closed', () => {
//     // 取消引用 window 对象，如果你的应用支持多窗口的话，
//     // 通常会把多个 window 对象存放在一个数组里面，
//     // 与此同时，你应该删除相应的元素。
//     win = null
//   })
// }

// // Electron 会在初始化后并准备
// // 创建浏览器窗口时，调用这个函数。
// // 部分 API 在 ready 事件触发后才能使用。
// app.on('ready', createWindow)

// // 当全部窗口关闭时退出。
// app.on('window-all-closed', () => {
//   // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
//   // 否则绝大部分应用及其菜单栏会保持激活。
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   // 在macOS上，当单击dock图标并且没有其他窗口打开时，
//   // 通常在应用程序中重新创建一个窗口。
//   if (win === null) {
//     createWindow()
//   }
// })

// // 在这个文件中，你可以续写应用剩下主进程代码。
// // 也可以拆分成几个文件，然后用 require 导入。



// 引入electron模块
var electron = require("electron")
var path = require("path")

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
    width: 800,
    height: 800,

    // ★ 注意这里要把 nodeIntegration 设置为 true 在改页面的渲染进程中才能使用 node.js 的 API
    webPreferences: {
      nodeIntegration: true
    }
  })


  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(path.join("file:", __dirname, "index.html"))

  // __dirname electron提供的一个全局变量，其内容是当前文件夹的绝对路径
  console.log(`${__dirname}`);



  // 关闭窗口的时候 把mainWindow销毁
  mainWindow.on("closed", () => {
    mainWindow = null
  })
})