# 一，安装配置

# 二，基本的JS的API

### 1，读写文件的api

```javascript
//读文件
var fs = require('fs');
fs.readFile('README.md',function(error,data) {
    console.log(data.toString());
});
```

