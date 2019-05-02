# 一，vue基础

### MVVM与MVC

![MVVM与MVC](G:\SourceCode\z_Documents\GitHub\FontEndNote\img\Snipaste_2019-04-30_16-13-40.png)



![2](G:\SourceCode\z_Documents\GitHub\FontEndNote\img\Snipaste_2019-04-30_16-19-05.png)

### 1，vue创建基本构架

```javascript
 <!-- 1.引包 -->
    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script>
        //创建实例化对象
        //如何template中定义了内容，那么优先加载template，如果没有就加载#app的模板
        //数据发生改变时，视图也发生改变，简言之，数据驱动视图
        var vm = new Vue({
            el: '#app', //目的地
            data: {
                msg1: '这是一个消息',
                msg2: '这是第二个消息'
            },
            methods: {

            },

            watch: {
                msg: function (newval, oldval) {
                    console.log("newval is:" + newval);
                    console.log("oldval is:" + oldval); 
                }
            },
            computed: {
                cmsg: function () {
                    return "computed-----" + this.msg;
                }
            },
            template: ''
        });
        console.log(vm.$el === document.getElementById('app')); //这两个是等价的
        console.log(vm.$data)
        //除了数据属性 vue 实例还暴露了一些有用的实例属性和方法。他们都有前缀 $
    </script>
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



# 二，vue的指令系统

### 1, 数据渲染（声明式渲染）

+ 插值表达式 ：  <p v-cloak>{{msg}}</p>
+ v-text   （相当于innerText）
+ v-html   （相当于innerHtml）

### 2,条件渲染

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
---
<script>
    var app3 = new Vue({
  		el: '#app-3',
  		data: {
    		seen: true
  		}
	})
</script>
```

v-show 和 v-if用法基本一样

- v-if和v-show     当属性值为true元素显示，为false时元素消失

- - v-if的特点：每次都会重新删除和创建操作
- v-show的特点：每次不会进行DOM的删除和创建操作  只是切换了元素的 display:none 样式
  - v-if有较高的切换性能消耗， v-show有较高的初始渲染消耗
- - 如果元素涉及到频繁的切换，最好不要使用v-if
    - 如果元素可能永远也不会被显示出来被用户看到，则推荐使用v-if, 这里是应为使用v-show即使不被显示出来元素实际上也被渲染了只是把display属性设置为none了
- v-if可以配合v-else-if和v-else使用

### 3，v-on的用法

- v-on   用来绑定事件的vue关键字

- -  <input type="button"       value="按钮" **v-on:click = "show"**>
  - 即   "v-on:  "  的缩写为   " @ "

### 4，v-bind的使用

- v-bind   它是vue中，提供的用于绑定属性的指令

- -  <input type="button"       value="按钮" **v-bind:title = "mytitle"**>

  - - v-bind后面的mytitle会被解析成变量

  - <input       type="button" value="按钮" **v-bind:title       = "mytitle + '我是谁****'****"**>

  - - 这里mytitle变量后面还可以在加上字符串，因为v-bind后面的内容会被解析成js表达式，所以按照js表达式的规范书写的都是合理的。

  -  <input type="button"       value="按钮" **:title = "mytitle"**>

  - - 省略掉v-bind只留  “:” 也是合法的，编译时会自动识别为v-bind
    - 即   "  v-bind:  "         的缩写为   " : "

### 5，css绑定渲染

- vue中的样式（class）绑定

- * | <h1 :class="['red', 'active' , {'italy' : isTrue}]"></h1> 

  - 1. 首先使用vue的数据绑定，class中的字符串会别解析为js代码格式，所以需要使用字符串数组来表示元素引用了哪些class。

  - 其中数组中实现对象形式时，对象的键将会被解析为要传入的class名称，isTrue会决定是否传入，isTrue为false不会传入，为true是传入

  - | <h1 class="{red:true, thin:true}"></h1>

  - 直接传入对象也可以，规则与在数组中的对象一样

### 6，循环渲染（v-for）

- v-for和key属性

- - 官方文档说明：[列表渲染](https://vuejs.bootcss.com/v2/guide/list.html)

  - 迭代数组

  - - <li v-for="(item, i) in list">索引：{{ i }} ---  姓名：{{itme.name}} ---  {{itme.age}}</li>

  - 迭代对象中的属性（即遍历对象中的键值对）

  - - |<div v-for="(val, key,  i) in userInfo">{{val}}----{{key}} ---- {{i}}</div>
    - 循环遍历对象（这里是userInfo）身上的属性
    - val是值，key是键，i是属性的索引

  - 迭代数字

  - - |<p v-for="count in 10">这是第 {{count}} 次循环</p>
    - in后面可以放 普通数组 ， 对象数组， 对象， 还可以放数组
    - 注意：如果使用v-for 迭代数字的话 ， 前面的count  的值是从1开始

  - 在组件中使用v-for时，key现在是必须的

  - - 组件就是在使用v-for的元素内嵌套了其他元素
    - 当Vue.js用v-for正在更新已渲染过的元素列表时，它默认用“就地复用”的侧类。如果数据项目的顺序发生改变，Vue将不是移动DOM元素来匹配数据项的顺序，而是简单复用此处的每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
    - 为了给Vue一个提示，**以便它能够跟踪每个节点的身份，从而重用和重新排列现有元素**，你需要为每项提供一个唯一的key属性
    - < v-for="item in list" :key="itme.id">

<input type = "checkbox">{{itme.id}}---{{itme.name}}</p>

- 注意：v-for循环的时候，key属性只能使用number或者string
- 注意：key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值
- 在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果v-for有问题时 必须在使用v-for的同事，指定 **唯一的** 字符串/数字类型的key

- **注意**：（详见：[数组更新检测](https://vuejs.bootcss.com/v2/guide/list.html#数组更新检测)）

- - vue只监视了数组指针的改变，没有监视数组指针指向的对象的改变

  - 但可以改变数组对象的一系列方法（如splice()等）vue却可以监视

  - - 原因：vue重写了数组中的一系列改变数组内部数据的方法（先调用原生，再更新界面）

### 7，双向数据绑定（v-model）

- v-model  实现数据的双向绑定

- - v-bind  只能实现数据的单向绑定，能M层自动绑定到V层，无法实现从数据的双向绑定

  - v-model指令，可以实现 表单元素 和Model中数据的双向绑定

  - 注意v-model只能运用在**表单元素**中 （input（radio，text，address，email…）select  chekbox， textarea）

    ```html
    //使用v-bind:value和 v-on:input可以实现双向绑定
    <div id="app">
            <input type="text" :value="msg" @input="valueChange"/>
            <h3>{{msg}}</h3>
        </div>
        <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
        <script type="text/javascript">
            //创建实例化对象
            var vm = new Vue({
                el: "#app",
                data() {
                    return {
                        msg: '指令系统',
                    }
                },
                methods: {
                    valueChange: function (e) {
                        console.log(e.target);
                        this.msg = e.target.value;
                    }
                },
            });
        </script>
    ```

    

#  三，vue组件

### 1，局部组件的简单使用

```javascript
// 局部入口组件声明
        var cm1 = {
            data() {
                return {
                }
            },
            methods: {
                testClick:function () {
                    console.log(this);
                }  
            },
            template: '<h1 @click="testClick">我是入口组件</h1>'
        };

        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    
                }
            },
            //挂载子组件
            components:{
                comment1:cm1
            },
            //父组件可以直接调用子组件
            template:'<comment1></comment1>' 
        });
```

