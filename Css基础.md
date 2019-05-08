
### 颜色渐变


+ background-image: linear-gradient();	线性渐变   （渐变要当做背景图片处理）
+ background-image: radial-gradient();    径向渐变
+ -webkit-background-clip: text;    让背景只覆盖在文字上面





### 过渡

调整过渡速度的贝塞尔曲线（ cubic-bezier(*n*,*n*,*n*,*n*) ）可以利用[工具网站](http://cubic-bezier.com/) （`要翻墙` ） 查看其效果

**检测过渡完成的事件绑定**

```javascript
// 注意有几个属性发生过渡就触发几次事件，是以属性为单位而不是以元素为单位
var testNode = document.querySelector("#box1");
testNode.addEventListener("transitionend",function () {
    console.log("过渡完成");
});    
```









禁止系统默认滚动条

```css
html,body{
    height: 100%;
    overflow: hidden;
}
```

