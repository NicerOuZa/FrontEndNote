
### 1，颜色渐变


+ background-image: linear-gradient();	线性渐变   （渐变要当做背景图片处理）
+ background-image: radial-gradient();    径向渐变
+ -webkit-background-clip: text;    让背景只覆盖在文字上面





### 2，过渡

+ 调整过渡速度的贝塞尔曲线（ cubic-bezier(*n*,*n*,*n*,*n*) ）可以利用[工具网站](http://cubic-bezier.com/) （`要翻墙` ） 查看其效果

+ **检测过渡完成的事件绑定**

    ```javascript
    // 注意有几个属性发生过渡就触发几次事件，是以属性为单位而不是以元素为单位
    var testNode = document.querySelector("#box1");
    testNode.addEventListener("transitionend",function () {
        console.log("过渡完成");
    });    
    ```

+ 注意`transition`在首次渲染还没有结束的情况下是不会被触发的

  + ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>演示案例</title>
        <style>
            #box1 {
                width: 100px;
                height: 100px;
                background-color: red;
                /* 这里设置过渡效果 */
                transition: 2s;    
            }
        </style>
    </head>
    
    <body>
        <div id="box1"></div>
        <script>
            var testNode = document.querySelector("#box1");
            // 这改变元素的宽度，但是这里是不会被触发过渡效果的，代码解析到这里，DOM元素已经有了结构，可以获取但是还没有被渲染在页面上，此时改变宽度时不会触发过渡效果的。
            testNode.style.width = "300px";
        </script>
        <script>
            window.onload = function () {
                // 将代码放入 onload 中是有效的。
                // onload 就是等待页面渲染完成才触发的
                var testNode = document.querySelector("#box1");
                testNode.style.width = "300px";
            }
        </script>
    </body>
    </html>
    ```





### 3，css要注意异步思想

解析css代码会在渲染效果之前。



### 常用css效果

禁止系统默认滚动条

```css
html,body{
    height: 100%;
    overflow: hidden;
}
```





