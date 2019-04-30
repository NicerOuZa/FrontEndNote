# 一，vue基础

### MVVM与MVC

![MVVM与MVC](G:\SourceCode\z_Documents\GitHub\FontEndNote\img\Snipaste_2019-04-30_16-13-40.png)



![2](G:\SourceCode\z_Documents\GitHub\FontEndNote\img\Snipaste_2019-04-30_16-19-05.png)

### 1，vue创建基本构架

```javascript
var vm = new Vue({
    el: '#example',
    data:{

            },
    methods:{
                
            },
        
    watch:{
            msg:function (newval,oldval) {
                console.log("newval is:"+newval);
                console.log("oldval is:"+oldval);
            }
        },
    computed:{
            msg1:function () {
                return "computed-----"+this.msg;
            }
}); 
```

### 2，vue中的基本对象

- vue中的对象

- - el指定vue要实例的html元素
  - data中指定当前vue实例的数据
  - 在vue中的methods中定义当前vue实例所有可用的方法

### 3，vue传递值的方式

#### 1），通过属性传值

- ```html
  <h2 v-text = "msg"></h2>
  ```
  
  - 通过属性来传递数据
  - 这种方式是没有闪烁问题的
  - 但 v-text这种方式会完全覆盖元素中原本的内容（即使用v-text时还元素内写内容是没有意义的），但是插值表达式只会替换自己的这个占位符，不会把整个元素的内容清空

#### 2），通过插值表达式传递值

```html
//v-cloak可以解决闪烁问题
<p v-cloak>{{msg}}</p>
```

- 使用  v-cloak  能够解决插值表达式闪烁的问题

  - 给相应元素加上名为 v-cloak 属性(attribute)，  如：    <p v-cloak>{{msg}}</p>
  - 然后使用css的属性选择器：[v-cloak] {display: none; }
- 这样在网上比较慢的时候msg的值还没加载之前就不会之间显示"{{msg}}"，从而避免打开页面时由于加载问题的闪烁