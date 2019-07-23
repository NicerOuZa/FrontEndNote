# 一，ts的安装和使用

### 1，基本使用

1. 安装：

```
npm install -g typescript
```

2. 生成`tsconfig.json`

```js
tsc --init
```

3. 配置`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",                         
    "module": "commonjs",   
    /* 配置 ts 转 js 的文件路径 */
    "outDir": "./js",                        
   
    "strict": true,                        
    "esModuleInterop": true                   
  }
}

```

4. 启动自动监视功能

   vscode 里启用 `终端 -> 运行任务 -> tsc:监视-tsconfig.json`





# [二，ts 语法](https://www.tslang.cn/docs/handbook/basic-types.html)

