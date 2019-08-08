# 一，Vue基础

### MVVM与MVC

![MVVM与MVC](img\Snipaste_2019-04-30_16-13-40.png)



![2](img\Snipaste_2019-04-30_16-19-05.png)

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



# 二，Vue的指令系统

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
- vue中的事件通过传入`$event`来获得event对象
  - `<h2 v-text="msg1" @click="clickHandler($event)"></h2>`

### 4，v-bind的使用

- v-bind   它是vue中，提供的用于绑定属性的指令
- -  <input type="button"       value="按钮" **v-bind:title = "mytitle"**>

  - - v-bind后面的mytitle会被解析成变量

  - <input       type="button" value="按钮" **v-bind:title       = "mytitle + '我是谁****'****"**>

  - - 这里mytitle变量后面还可以在加上字符串，因为v-bind后面的内容会被解析成js表达式，所以按照js表达式的规范书写的都是合理的。

  -  <input type="button"       value="按钮" **:title = "mytitle"**>

    - 省略掉v-bind只留  “:” 也是合法的，编译时会自动识别为v-bind
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

    

### 8，[自定义指令](https://vuejs.bootcss.com/v2/guide/custom-directive.html)

自定义**全局**的指令

```js
        // 使用 Vue.directive() 定义全局的指令
        //      参数1：指令的名称（注意定义的时候不用加 v- 前缀，但是在调用的时候要加 v- 前缀）
        //      参数2：是一个对象，在这个对象身上，有一些指令相关的函数，这些函数可以在特定的阶段，执行相关的操作   

        // 注册一个全局自定义指令 `v-focus`
        Vue.directive('focus', {
            // 在每个函数中的参数： 
            //      第一个参数 el：指令所绑定的元素，可以用来直接操作 DOM
            //      第二个参数 binding： 一个对象，包含各种属性
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
            bind: function (el, binding) {
                // 注意bind方法在执行的时候，由于元素还没有插入到DOM中，这时候会有一些元素的方法不能执行（如el.focus）
                // 设置元素的style与元素是否插入到DOM无关，所以能够执行
                // style（样式），只要通过指令绑定给了元素，不管这个元素有没有被插入到页面中，这个元素肯定有了一个内联的样式
                // 将来元素肯定会显示到页面中，这时候，浏览器的渲染引擎必然会解析样式，应用给这个元素
                el.style.color = binding.value
                console.log(binding);
            },
            // 被绑定元素插入DOM时调用 (仅保证父节点存在，但不一定已被插入文档中）
            inserted: function (el) {
                // 和 JS 行为有关的操作最好在inserted方法中执行，防止行为不生效   
                el.focus()
            },
            // 当 VNode 更新的时候，会执行updated，（可能会触发多次）
            updated: function () {

            }
        })
```

自定义**私有**的指令

```js
const app = new Vue({
            el:"#app",
            data() {
                return {
                    msg1: ""
                }
            },
            // 自定义私有指令
            directives:{
                "focus" :{
                    bind:function(){},
                    inserted:function(){},
                    updated:function(){}
                }
            }
        })
```

指令函数的简写

> 在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```js
//当不传入一个对象而是只是一个方法时，这个方法等同于把代码写到了bind和update中了
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```



#  三，Vue组件

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
                cm1
            },
            //父组件可以直接调用子组件
            template:'<cm1></cm1>' 
        });
```

 ### 2，全局组件的使用

```javascript
//第一个参数是组件的名字，第二个参数是组件对象
Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        };
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});
```

### 3，动态组件

使用 Vue 提供的内置组件 `<component>` 的 is 特性来切换组件

```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括

- 已注册组件的名字，或
- 一个组件的选项对象



### 4，组件之间通信

#### [Prop的使用](https://vuejs.bootcss.com/v2/guide/components-props.html)

#### [自定义事件](https://vuejs.bootcss.com/v2/guide/components-custom-events.html)

**父组件向子组件传值**

```javascript
// 1,先给父组件中绑定自定义的属性
// 2,在子组件中使用props接收父组件的数据
// 3,可以在子组件中任意使用
Vue.component("Child",{
    props:["childData"],
    template: "<div>我是子组件---{{childData}}</div>"
});

Vue.component("Parent",{
    data:function () {
        return {
            msg:'这是父组件的数据'
        };
    },
    template: "<div>我是父组件<Child :childData='msg'/></div>"
});
```

**子组件向父组件传值**

```javascript
// 1,在父组件中绑定自定义的事件
// 2,在子组件中 触发原生的事件 在函数中使用$emit触发自定义的childHandler
// 3,把想要传递的值放到$emit的第二个参数中，父组件中的事件函数的第一个参数用来接收传递过来的值
Vue.component("Child", {
    template: "<div @click='clickHandler'>我是子组件---{{childData}}</div>",
    props: ["childData"],
    data: function () {
        return {
            chileMsg: "这是子控件的消息"
        };
    },
    methods: {
        clickHandler: function () {
            //$emit()  参数一：自定义的事件名，参数二：传递的消息
            this.$emit("childHandler",this.chileMsg);
        }
    },
});

Vue.component("Parent", {
    template: `<div>我是父组件---{{msgFromChile}}
				<Child :childData='msg' @childHandler='childHandler'/>
			  </div>`,
    data: function () {
        return {
            msg: '这是父组件的数据',
            msgFromChile:""
        };
    },
    methods: {
        childHandler: function (val) {
            this.msgFromChile = val;
        }
    }
});
```

**使用`$attrs`多重组件之间父组件向后代的后代组件传值**

```js
// 利用 $attrs 对象在多个组件之间通信
// 	  $attrs 对象会存储父组件传递过来的所有值
	    Vue.component("C", {
            template: "<div>{{$attrs.msgC}}</div>"
        });
        Vue.component("B", {
            template: "<C v-bind='$attrs'></C>"
        });

        Vue.component("A", {
            template: `<div>
                            <B v-bind='$attrs' />
                            <div>{{$attrs.msgA}}</div>
                        </div>                
                      `
        });
        var vm = new Vue({
            el: "#app",
            data() {
                return {
                    msga:"给A的数据",
                    msgc:"给B的数据"
                }
            },
            template: `<A :msgA='msga' :msgC='msgc'></A>`
        });
```

**使用`$listeners`多重组件之间后代的后代组件向父组件传值**

```javascript
// 利用 $listeners 把注册最开始注册的@click='cClickHandler'向下传递
Vue.component("C", {
            template: "<div @click='cClickHandler'>我是C</div>",
            methods: {
                cClickHandler: function () {
                    this.$emit("cHandler", "我是c中的数据")
                }
            },
        });
        Vue.component("B", {
            template: "<C v-on='$listeners'></C>"
        });

        Vue.component("A", {
            template: "<B v-on='$listeners'/>"
        });
        var vm = new Vue({
            el: "#app",
            data() {
                return {
                    msga: "给A的数据",
                    msgc: "给B的数据"
                }
            },
            methods: {
                getCData: function (val) {
                    alert(val)
                }
            },
            template: `<A @cHandler='getCData'></A>`
        });
```

**中央事件总线**

```javascript
// 创建一个Vue对象作为中央事件总线
        var bus = new Vue()

        Vue.component("A", {
            template: `<div>
                           <div>我是A</div>
                           <input type='text' v-model='msg' @input='passData(msg)' />
                       </div>`,
            data() {
                return {
                    msg: '',
                    msgFromB: ''
                }
            },
            methods: {
                passData: function (val) {
                    // 当有输入操作时触发 B 中给bus设置的自定义事件
                    bus.$emit('globalEvent', val)
                }
            },
        })
        Vue.component("B", {
            template: `<div>
                            <div>我是B</div>
                            <div>{{msgFromA}}</div>
                       </div>`,

            data() {
                return {
                    msgFromA: ''
                }
            },

            created() {
                // B创建后给bus注 册自定义事件
                bus.$on("globalEvent", (val) => {
                    this.msgFromA = val
                })
            },
        });


        var vm = new Vue({
            el: "#app",

            template: `<div>
                            <A></A>
                            <B></B>
                       </div>
            
                       `
        });
```

**通过provider来进行通信**

> 父组件中通过 provide 来提供变量，然后在子组件中通过 inject来注入变量。不论子组件有多深，只要调用了inject 那么就可以注入 provider 中的数据。而不是局限于只能从当前父组件的 prop 属性来获取数据，只要在父组件的生命周期内，子组件都可以调用

```javascript
Vue.component("B", {
            template: `<div>
                            <div>我是B</div>
                            <div>{{msg}}</div>
                       </div>`,
            data() {
                return {
                    msg: ''
                }
            },
            inject:["toChild"],

            created() {
                this.msg = this.toChild
            },
        });


        var vm = new Vue({
            el: "#app",
            provide:{
                toChild:"给子组件的信息"
            },
            template: `<div>
                            <B></B>
                       </div>
                       `
        });
```

**通过`$parent`进行子组件向父组件通信**

```javascript
Vue.component("A", {
            template: `<div>
                           <div>我是A</div>
                           <input type='text' v-model='msg' @input='changeParentMsg' />
                       </div>`,
            data() {
                return {
                    msg: '',
                }
            },
            methods: {
                changeParentMsg:function(){
                    // 子组件通过调用 $parent 可以直接拿到父组件 data 中的数据
                    this.$parent.msg = this.msg
                }
            },
            

        })
        var vm = new Vue({
            el: "#app",
            data() {
                return {
                    msg:""
                }
            },
            template: `<div>
                            <div>我是父组件：{{msg}}</div>
                            <A></A>
                       </div>
                       `
        });
```







### 5，[插槽（slot）的使用](https://vuejs.bootcss.com/v2/guide/components-slots.html)

**插槽（slot） 是vue的一个内置的全局组件， 作为承载分发内容的出口**

```javascript
<div id="app">
        <div>
            <!--使用插槽可以直接在代码块中传值 -->
            <Vbtn type="success">登录</Vbtn>
            <!-- 没有传值的话将会使用slot中的默认值 -->
            <Vbtn type="primary"></Vbtn>
        </div>
    </div>



    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="./Js/test-component.js"></script>
    <script type="text/javascript">
        Vue.component("Vbtn", {
            template: "<button class='default' :class='type'><slot>自定义按钮</slot></button>",
            props: ["type", "val"]
        });

        var vm = new Vue({
            el: '#app',
            data() {
                return {}
            },
            //父组件可以直接调用子组件
            template: ''
        });
    </script>
    
```

**具名插槽的使用**

```html
 <!-- 用slot标签来指定插槽的名字,名字指定的是谁就插到那个插槽上 -->
    <div id="app">
        <ul>
            <Myli>
                <h2 slot="two">我是第一个slot</h2>
                <h3 slot="three">我是第二个slot</h3>
            </Myli>
        </ul>
    </div>

    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="./Js/test-component.js"></script>
    <script type="text/javascript">
        Vue.component("Myli",{
            // 有多个插槽时，可以给插槽设置name属性
            template: "<li><slot name='two'></slot><slot name='three'></slot></li>"
        });
        var vm = new Vue({
            el: '#app',
            data() {
                return {}
            },
            //父组件可以直接调用子组件
            template: ''
        });
    </script>
```



### 6，组件的生命周期

![](img/lifecycle.png)

```html
<div id="app">
        <!-- vue内置组件 keep-alive  -->
        <!-- 能在组件切换（可以是创建和销毁）过程中将组件的状态保存在内存中，防止重复渲染DOM -->
        <keep-alive>
                <Test v-if="isTrue"></Test>
        </keep-alive>
        <button @click="destroyDOM">destroy</button>
    </div>

    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        /*
        生命周期方法：
        	组件创建阶段的声明周期方法
                beforeCreate
                created
                beforeMount
                mounted
            组件运行阶段的生命周期方法
                beforeUpdate
                updated
            组件进入销毁阶段
                beforeDestroy
                destroyed
            activated
            deactivated
            errorCaptured
         */
        Vue.component("Test", {
            template: "<div><div>{{msg}}</div><button @click='changeHandler'>改变</button></div>",
            data() {
                return {
                    msg: "hello world"
                }
            },
            methods: {
                changeHandler: function () {
                    this.msg = this.msg + "hhh";
                }
            },
            // 组件创建之前
            // data和methods都还没有初始化
            beforeCreate() {
                console.log(this.msg);
            },

            // 组件创建之后
            /* 
                在created方法中可以操作后端数据
                应用：发起 ajax 请求
                这里data和methods都已经被初始化好了
                如果调用methods中的方法，或者操作data中的数据，最早在created中
            */
            created() {
                console.log(this.msg);
            },

            // 在挂载数据到dom之前
            // 模板已经在内存中编辑完成，但是尚未把模板渲染到页面上
            beforeMount() {
                console.log(document.getElementById("app"));
            },

            // 在挂载数据到dom之后
            // 内存中的模板，已经真实的挂载到了页面上，用户已经可以看到渲染好的页面了
            // 如果要通过某些插件操作DOM节点，最早要在mounted中进行       
            mounted() {
                console.log(document.getElementById("app"));
            },
            // 更新DOM之前，应用：可以获取原始的DOM
            beforeUpdate() {
                console.log(document.getElementById("app").innerHTML);
            },
            // 更新DOM之后,  应用：可以最新的DOM
            updated() {
                console.log(document.getElementById("app").innerHTML);
            },
            // 组件销毁前调用 （有 keep-alive时不会被调用）
            // keep-alive 会把组件状态保存并没有将组件真正销毁，所以不会调用此方法
            beforeDestroy() {
                console.log("beforeDestroy");
            },
            // 组件销毁后调用 （有 keep-alive时不会被调用）
            destroyed() {
                console.log("destroyed");
            },
            // 组件被激活调用（配合 keep-alive）
            activated() {
                console.log("组件被激活了");
            },
             // 组件被停用调用（配合 keep-alive）
            deactivated() {
                console.log("组件被停用了");
            },
        });
        var vm = new Vue({
            el: "#app",
            data() {
                return {
                    isTrue:true 
                }
            },
            methods: {
                destroyDOM: function () {
                    this.isTrue = !this.isTrue;
                }
            },
        });
    </script>
```



# 四，[过滤器（filter）](https://vuejs.bootcss.com/v2/guide/filters.html)

 <h3>过滤器作用：为页面中的数据进行添油加醋的功能</h3>
### 1，局部过滤器的使用

```html
<div id="app">
        <input type="text" v-model="price" />
        <!-- 使用myCurrent过滤器，price的值将作为第一个参数传递到过滤器方法 -->
        <h3>{{price | myCurrent}}</h3>
    </div>
    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="./Js/test-component.js"></script>
    <script type="text/javascript">
        /**
         * 1,声明过滤器
         * 2，{{数据 | 过滤器名字}}
         */
        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    price: 0
                }
            },
            filters: {
                myCurrent: function (value) {
                    return "￥" + value;
                }
            },
            template: ''
        });
    </script>
```

### 2，全局过滤器的使用

```html
<div id="app">
        <input type="text" v-model="msg" />
        <!-- 使用myCurrent过滤器 -->
        <h3>{{msg | myReverse}}</h3>
        <!-- 可以给过滤器传参，参数传递到过滤器的第二个形参之后，第一个形参被msg占据着 -->
        <h3>{{msg | myReverse("我是临时参数")}}</h3>
    </div>
    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="./Js/test-component.js"></script>
    <script type="text/javascript">
        /**
         * 1,用 Vue.filter()声明全局过滤器，参数一：过滤器名字  参数二：过滤器方法
         * 2，{{数据 | 过滤器名字}}
         */

         Vue.filter("myReverse", function (value,arg) {
             //将字符串进行反转
             return value.split('').reverse().join("")+"----"+arg;
         })
        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    msg:''
                }
            },
            template: ''
        });
    </script>
```

# 五，Vue监听器（watch）

<h3>监视属性： 通过vm对象的$watch() 或 watch配置来监听指定的属性，当属性变化时，回调函数自动调用。</h3>
- watch监听的是单个属性
  - 基本数据类型  简单监视
  - 复杂数据类型  深度监视

```html
<div id="app">
        <input type="text" v-model="msg" />
        <input type="text" v-model="stus.name" />
    </div>
    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="./Js/test-component.js"></script>
    <script type="text/javascript">
        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    msg: '',
                    stus: {
                        name: "jack"
                    }
                }
            },
            watch: {
                // 这里监听字符串 msg
                // 当 msg 改变的时候调用监听方法
                // 监听方法中第一个参数是改变后的值（新值），第二个参数是改变前的值（旧值）
                msg: function (newV, oldV) {
                    console.log(newV);
                    console.log(oldV);
                },

                /**
                 * stus是一般对象时，是监听不了的  
                 *      字符串改变时，地址是跟着变化的，所以能监听
                 *      监听器监听的是对象的地址变化，改变对象的中的属性时，对象的的地址是没有变化的，从而不能监听
                 */
                stus: function () {
                    console.log("stus改变了？");
                },

                // 监听复杂数据类型（object，array等）  要用到深度监视
                stus:{
                    deep:true, //深度监视
                    handler:function(newV,oldV){
                        console.log(newV.name);
                        console.log(oldV.name);
                    }
                }
            },
            template: ''
        });
    </script>
```

#  六，计算属性

- 计算属性：computed

- - 在computed属性对象中定义计算属性的方法，在页面中使用 方法名 来显示计算结果

  - 通过  getter/setter  实现对属性数据的显示和监视，计算属性存在缓存，多次读取指执行一次getter计算。

  - 使用set时，要传入形参value

  - - value就是set所监视对象的最新属性值

```html
 <div id="app">
        <input type="text" v-model="firstName" />
        <input type="text" v-model="lastName" />
        <input type="text" v-model="fullName" />
    </div>
    <script type="text/javascript" src="./node_modules/vue/dist/vue.js"></script>
    <script type="text/javascript" src="./Js/test-component.js"></script>
    <script type="text/javascript">
        var vm = new Vue({
            el: '#app',
            data() {
                return {
                    firstName: '',
                    lastName: ''
                }
            },
            computed: {
                fullName: {
                    get: function () {
                        return this.firstName + " " + this.lastName;
                    },
                    set: function (value) {
                        var strs = value.split(" ");
                        this.firstName = strs[0];
                        this.lastName = strs[1];
                    }
                },
                //计算属性默认只有getter
                test: function(){
                    return this.firstName + " " + this.lastName;
                }
            },
            template: ''
        });
```



# 七，Vue 操作 DOM

### 1，vue获取原生`DOM`对象的方法

```javascript
	Vue.component("B", {
            template: `<div class="subB">
                            <div>我是B</div>
                       </div>`,
        })


        Vue.component("A", {
            // 给标签绑定 ref 属性
            template: `<div>
                        <div ref='box1'>我是A</div>
                        <B   ref='bCom'></B>
                       </div>`,

            // 获取不到DOM对象
            created() {
                console.log(this.$refs.box1);
            },
            // 获取不到DOM对象
            beforeMount() {
                console.log(this.$refs.box1);
            },
            // DOM 对象只能在 mounted 之后的生命周期函数中获取
            mounted() {
                // 获取给标签绑定 ref="xxx" 属性，使用 this.$refs.xxx 来获取原生的 DOM 对象
                console.log(this.$refs.box1);
                // 如果给组件绑定 ref 属性，那么this.$refs.xxx获取的是当前组件的对象（不是原生DOM对象）
                console.log(this.$refs.bCom);
            },
        })

        var vm = new Vue({
            el: "#app",

            data() {
                return {
                    msg: "",
                    msgFromA: (() => {
                        return "asdsad"
                    })()
                }
            },
            template: `<div>
                            <A></A>
                       </div>
                    `,
        });
```

### 2, 给DOM添加事件的特殊情况

```javascript
Vue.component("A", {
            // 给标签绑定 ref 属性
            template: `<div>
                        <div ref='box1'>我是A</div>
                        <input type='text' v-show='isShow' ref='tInput'/>
                       </div>`,
            data() {
                return {
                    isShow:false
                }
            },
            mounted() {
                this.isShow = true
                /**
                 * 注意这里获取的直接使用 tInput 对象不是更新完数据（上面this.isShow更新为true）的 tInput对象
                 *     因为此时还在mounted函数内，数据更新后的生命周期函数还没被调用
                 */
                this.$refs.tInput.focus()


                /**
                 * $nextTick() 是在DOM更新循环之后执行的回调函数，
                 *   在修改数据之后向 $nextTick() 传入回调函数，并在回调函数中获取更新之后的DOM
                 */
                this.$nextTick(function(){
                    console.log(this);
                    this.$refs.tInput.focus()
                })
            },
        })

        var vm = new Vue({
            el: "#app",

            data() {
                return {
                    msg: "",
                    msgFromA: (() => {
                        return "asdsad"
                    })()
                }
            },
            template: `<div>
                            <A></A>
                       </div>
                    `,
        });
```



#  八，[Vue 路由 （Vue-Router）](https://router.vuejs.org/zh/)

**[什么是路由](https://www.cnblogs.com/yuqing6/p/6731980.html)**

> 路由实现：
>
> > （1），传统开发方式 url 改变后，立即发生请求响应整个页面，可能出现资源过多，让页面出现白屏
> >
> > （2），SPA （Single Page Application） 单页面应用
> > 		    		锚点值改变后不会立即发送请求，而是在某个合适的时机发送(Ajax)请求，页面局部渲染
> >					优点：页面不立即跳转，用户体验好
> > ​					



### 1，原生 js 实现路由

```javascript
<a href="#/login">登陆</a>
    <a href="#/register">注册</a>
    <div id="app"></div>
    <script>
        var app = document.querySelector("#app")
        window.onhashchange = function () {
            console.log(location.hash)
            switch (location.hash) {
                case "#/login":
                    app.innerHTML = "<h1>我是登陆界面</h1>"
                    break;
                case "#/register":
                    app.innerHTML = "<h1>我是注册界面</h1>"
                    break;
                default:
                    break;
            }
        }
    </script>
```



### 2，vue 路由的基本使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- 1,引入 vue 模块 -->
    <script src="../node_modules/vue/dist/vue.js"></script>
    <!-- 2,引入 vue-router模块 -->
    <script src="../node_modules/vue-router/dist/vue-router.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="app"></div>
    <script>
        // 3,让 Vue 使用该 vue-router 模块
        //      这个在页面中可写可不写，默认页面是已经引入的
        Vue.use(VueRouter)


        var Login = {
            template:`<div><h1>我是登录界面</h1></div>`
        }
        var Register = {
            template:`<div><h1>我是注册界面</h1></div>`
        }
        // 4,创建router对象
        var myRouter = new VueRouter({
            // 5,配置路由对象
            routes:[
                // 路由匹配的规则
                {path:"/login",component:Login},
                {path:"/register",component:Register}
            ]
        })


        /** 
           在 vue-router 模块中提供了两个全局组件   router-link 和 router-view
                router-link：相当于 a 标签，其中的 to 属性相当于 href，
                    即 <a href=''></a> 相当于 <router-link to=''></router-link>
                router-view: 路由匹配的组件的出口，路由匹配到的组件将渲染在这里
         */
        var App = {
            template:`
                        <div>
                            <router-link to='/login'>登陆页面</router-link>
                            <router-link to='/register'>注册页面</router-link>
                            <router-view></router-view>
                        </div>
                    `,
        }
        var vm = new Vue({
            el: "#app",
            components: {
                App
            },
            // 6, 把 vue-router 交给 vue 实例化对象管理
            router: myRouter,
            template: `<App></App>`
        })
    </script>
</body>

</html>
```

### 3，[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html)

```javascript
 var myRouter = new VueRouter({
     // 5,配置路由对象
     routes:[
         // 给路由对象的 name 属性赋值
         {path:"/login", name:"login",component:Login},
         {path:"/register",name:"register",component:Register}
     ]
 })

 var App = {
     // 要把 to 属性加上 v-bind 
     // 	传入含有name属相的对象给  :to 
     template:`
            <div>
            <router-link :to='{name:"login"}'>登陆页面</router-link>
            <router-link :to='{name:"register"}'>注册页面</router-link>
            <router-view></router-view>
            </div>
			`,
 }
```

### 4，路由参数

```html
<div id="app"></div>

     <!-- 1,引入 vue 模块 -->
     <script src="../node_modules/vue/dist/vue.js"></script>
     <!-- 2,引入 vue-router模块 -->
     <script src="../node_modules/vue-router/dist/vue-router.js"></script>
      <script>
        //   地址栏上  两种路由范式
        // （1），xxxx.html#/user/1 params  动态路由参数
        // （2），oooo.html#/user?userId=1
          var UserParams = {
              template: `<div><h1>我是UserParams</h1></div>`
          }
          var UserQuery = {
              template: `<div><h1>我是UserQuery</h1></div>`
          }
          // 4,创建router对象
          var myRouter = new VueRouter({
              // 5,配置路由对象
              routes: [
                  // 路由匹配的规则
                  {
                    //   动态路由参数  以冒号开头
                      path: "/user/:id",
                      name: "userP",
                      component: UserParams
                  },
                  {
                      path: "/user",
                      name: "userQ",
                      component: UserQuery
                  }
              ]
          })
          var App = {
            // 第一种传参  params
            // 第二种传参  query
              template: `
                        <div>
                            <router-link :to='{name:"userP",params:{id:10}}'>用户1</router-link>
                            <router-link :to='{name:"userQ",query:{userId:2}}'>用户2</router-link>
                            <router-view></router-view>
                        </div>
                    `,
          }
          var vm = new Vue({
              el: "#app",
              components: {
                  App
              },
              // 6, 把 vue-router 交给 vue 实例化对象管理
              router: myRouter,
              template: `<App></App>`
          })
      </script>
```

### 5，子控件获取路由参数

`$route`是当前的**路由对象 (route object)**

**路由对象 (route object)** 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的**路由记录 (route records)**。

```js
var UserParams = {
    template: `<div><h1>我是UserParams</h1></div>`,
    created() {
        // 由于子控件继承父控件
        // 可以直接通过 this 从子控件中获取到 router 对象和当前的 route 对象
        console.log(this.$router);
        // $route 中包含参数对象（query和params）
        console.log(this.$route);
    },
}
var UserQuery = {
    template: `<div><h1>我是UserQuery</h1></div>`,
    created() {
        // 同上
        console.log(this.$router);
        console.log(this.$route);
    },
}
```

### 6，[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app"></div>



    <template id="App">
        <div>
            <router-link :to='{name:"home"}'>首页</router-link>
            <router-view></router-view>
        </div>
    </template>
    <template id="home">
        <div>
            <b>我是首页</b><br>
            <router-link to="/home/song">歌曲</router-link>
            <router-link to="/home/movie">电影</router-link>
            <router-link to="/home/game">游戏</router-link>
            <router-view></router-view>
        </div>
    </template>
    <template id="song">
        <div>歌曲页面</div>
    </template>
    <template id="movie">
        <div>电影页面</div>
    </template>
    <template id="game">
        <div>游戏页面</div>
    </template>
    <!-- 1,引入 vue 模块 -->
    <script src="../node_modules/vue/dist/vue.js"></script>
    <!-- 2,引入 vue-router模块 -->
    <script src="../node_modules/vue-router/dist/vue-router.js"></script>
    <script>
        var Home = {
            template: "#home",
        }
        var Song = {
            template: "#song",
        }
        var Movie = {
            template: "#movie",
        }
        var Game = {
            template: "#game",
        }
        var myRouter = new VueRouter({ 
            routes: [
                {
                    path: "/home",
                    name: "home",
                    component: Home,
                    // 使用 children 定义 home 的子集路由
                    children: [{
                            // 注意这里的path前面不能有 '/' ，若有则是代表从根路径匹配
                            path: "song",
                            component: Song
                        },
                        {
                            path: "movie",
                            component: Movie
                        },
                        {
                            path: "game",
                            component: Game
                        }
                    ]
                },
            ]
        })
        var App = {
            template: "#App",
        }
        var vm = new Vue({
            el: "#app",
            components: {
                App
            },
            router: myRouter,
            template: `<App></App>`
        })
    </script>
</body>

</html>
```

### 7，[动态路由匹配](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app"></div>

    <template id="App">
        <div>
            <router-link :to='{name:"timeline"}'>首页</router-link>
            <router-link :to='{name:"pins"}'>沸点</router-link>
            <router-view></router-view>
        </div>
    </template>

    <template id="timeline">
        <div>
            <b>我是首页</b><br>
            <div id="timeline">
                <!-- 
                    这里利用 路由参数 进行动态加载
                        注意：只改变路由参数时，对应的组件不会重新加载（created方法不会重新执行）
                                即当使用路由参数时，例如从 /user/foo 导航到/user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
                              复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
                 -->
                <router-link :to="{name:'comDesc',params:{id:'frontend'}}">前端</router-link>
                <router-link :to="{name:'comDesc',params:{id:'backend'}}">后端</router-link>
                <router-view></router-view>
            </div>
        </div>
    </template>

    <template id="comDesc">
        <div>{{msg}}</div>
    </template>
   
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/vue-router/dist/vue-router.js"></script>
    <script>
        var Timeline = {
            template: "#timeline",
        }
        
        var ComDesc = {
            template: "#comDesc",
            data() {
                return {
                    msg: "default"
                }
            },
            created() {
                // 这里在 路由参数 改变后不会重新执行 created 方法
            },
            watch: {
                // 利用 watch (监测变化) $route 对象来达到根据路由参数动态更新数据的目的
                $route: function (to, from) {
                    switch (to.params.id) {
                        case "frontend":
                            this.msg = "我是前端页面"
                            break;
                        case "backend":
                            this.msg = "我是后端页面"
                            break;
                        default:
                            this.msg = "default"
                            break;
                    }
                }
            }
        }
        var myRouter = new VueRouter({

            routes: [

                {
                    path: "/timeline",
                    name: "timeline",
                    component: Timeline,
                    children: [{
                        name: "comDesc",
                        path: "/timeline/:id",
                        component: ComDesc
                    }]
                }
            ]
        })
        var App = {
            template: "#App",
        }
        var vm = new Vue({
            el: "#app",
            components: {
                App
            },
            router: myRouter,
            template: `<App></App>`
        })
    </script>
</body>

</html>
```

### 8, keep-alive 的使用

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

> 在 2.2.0 及其更高版本中，`activated` 和 `deactivated` 将会在 `<keep-alive>`树内的所有嵌套组件中触发。

```html
<div>
    <router-link :to='{name:"timeline"}'>首页</router-link>
    <router-link :to='{name:"pins"}'>沸点</router-link>
    <!-- 
		一般情况下，路由切换的时候是伴随的组件的销毁与创建
		给组件加上 keep-alive 能在组件切换（可以是创建和销毁）过程中将组件的状态保存在内存中，防止重复渲染DOM
	-->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
```

**keep-alive 中的属性**

+ **include and exclude**

  + 条件(下面示例中的 a 和 b)是组件的`name`属性，即`include='a,b'`表示只对`name`为 a 和 b 的组件进行缓存，`exclude='a,b'`表示对除了`name`为 a 和 b 的组件进行缓存

  + `include` 和 `exclude` 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示

  ```html
  <!-- 逗号分隔字符串 -->
  <keep-alive include="a,b">
    <component :is="view"></component>
  </keep-alive>
  
  <!-- 正则表达式 (使用 `v-bind`) -->
  <keep-alive :include="/a|b/">
    <component :is="view"></component>
  </keep-alive>
  
  <!-- 数组 (使用 `v-bind`) -->
  <keep-alive :include="['a', 'b']">
    <component :is="view"></component>
  </keep-alive>
  ```

+ **max**

  最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉

  ```html
  <keep-alive :max="10">
    <component :is="view"></component>
  </keep-alive>
  ```

  

### 9，[编程式的导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="...">`         | `router.push(...)`    |
| `<router-link :to="..." replace>` | `router.replace(...)` |
| -----                             | `router.go(n)`        |



### 10，命名视图

```html
    <div id="app">
        <!-- 使用 header 组件 -->
        <router-view></router-view>
        <!-- 使用 leftbox 组件 -->
        <router-view name='left'></router-view>
        <!-- 使用 mainbox 组件 -->
        <router-view name='main'></router-view>
    </div>

    <script>
        var header = {
            template: "<div>我是header</div>",
        }
        var leftbox = {
            template: "<div>我是leftbox</div>",
        }
        var mainbox = {
            template: "<div>我是mainbox</div>",
        }
        var myRouter = new VueRouter({
            routes: [{
                path: "/",
                // 使用components定义多个命名组件
                //      router-view 路由默认使用 header 组件
                //      router-view 匹配到对应名字（这里left和main）的组件则使用命名组件
                components: {
                    'default': header,
                    'left': leftbox,
                    'main': mainbox,
                }
            }]
        })
        var App = {
            template: "#App",
        }
        var vm = new Vue({
            el: "#app",
            components: {
                App
            },
            router: myRouter,
        })
    </script>
```



### 11，[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

1. 全局前置守卫

   ```js
   const router = new VueRouter({ ... })
   
   router.beforeEach((to, from, next) => {
     // ...
   })
   ```

2. 全局解析守卫

   ```js
   const router = new VueRouter({ ... })
                                 
   router.beforeResolve((to, from, next) => {
     /* must call `next` */
   })
   ```

3. 全局后置钩子

   ```js
   const router = new VueRouter({ ... })
   
   router.afterEach((to, from) => {
     // ...
   })
   ```

4. 路由独享的守卫

   ```js
   const router = new VueRouter({
     routes: [
       {
         path: '/foo',
         component: Foo,
         beforeEnter: (to, from, next) => {
           // ...
         }
       }
     ]
   })
   ```

5. 组件内的守卫

   ```js
   const Foo = {
     template: `...`,
     beforeRouteEnter (to, from, next) {
       // 在渲染该组件的对应路由被 confirm 前调用
       // 不！能！获取组件实例 `this`
       // 因为当守卫执行前，组件实例还没被创建
       // 不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
         next(vm => {
       	// 通过 `vm` 访问组件实例
     		})
     },
     beforeRouteUpdate (to, from, next) {
       // 在当前路由改变，但是该组件被复用时调用
       // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
       // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
       // 可以访问组件实例 `this`
     },
     beforeRouteLeave (to, from, next) {
       // 导航离开该组件的对应路由时调用
       // 可以访问组件实例 `this`
     }
   }
   
   
   ```

**完整的导航解析流程**

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

### 12，[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)

定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

那么如何访问这个 `meta` 字段呢？

首先，我们称呼 `routes` 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录

例如，根据上面的路由配置，`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。

一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

下面例子展示在全局导航守卫中检查元字段：

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

​	**利用路由元信息进行权限验证**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div>
            <router-link to='/home'>主页</router-link>
            <router-link to='/blog'>我的博客</router-link>
            <router-view></router-view>
        </div>
    </div>

    <template id="home">
        <div><b>我是首页</b></div>
    </template>


    <template id="blog">
        <div><b>我的博客</b></div>
    </template>

    <template id="login">
        <div>
            <b>我是登录界面</b>
            <button @click="loginHandler">登录</button>
        </div>
    </template>
    <script src="../node_modules/vue/dist/vue.js"></script>
    <script src="../node_modules/vue-router/dist/vue-router.js"></script>
    <script>
        var Home = {
            template: "#home",
        }

        var Blog = {
            template: "#blog",
        }
        Login
        var Login = {
            template: "#login",
            methods: {
                loginHandler: function () {
                    // 登录后跳转到 博客页面
                    //      给 localStorage传入user对象
                    localStorage.setItem("user", {})
                    // 利用 $router 进行导航 
                    //      使用$router导航称为编程式导航，相对于使用 router-link 称为声明式导航
                    //      $router.push$router.push 的使用和 next() 一样
                    this.$router.push({
                        name: "blog",
                        // path:"/login"
                    })
                }
            },
        }
        var myRouter = new VueRouter({

            routes: [{
                    path: "/",
                    redirect: "/home"
                },

                {
                    path: "/home",
                    name: "home",
                    component: Home,
                },
                {
                    path: "/blog",
                    name: "blog",
                    component: Blog,
                    // 给未来的路由 做权限控制
                    meta: {
                        // 证明用户访问改组件的时候需要登录
                        auto: true
                    }
                },
                {
                    path: "/login",
                    name: "login",
                    component: Login,
                },
            ]
        })
        // 给 路由对象 设置全局前置守卫
        //      给beforeEach 传入的回调函数会在每次路由改变的时候调用
        //      to，from 分别是 $route 更改后和更改前的对象 
        myRouter.beforeEach((to, from, next) => {
            console.log(to)
            console.log(from)

            if (to.meta.auto) {
                // 用户点了博客链接，改用户需要登录
                // 通过给 next 传入有 path 属性的对象来更改当前访问路由对象
                //      也可以通过命名路由来进行导航 即传入 name 属性
                if (localStorage.getItem("user")) {
                    // 有 user 对象直接放行
                    next()
                } else {
                    next({
                        path: "/login",
                        // name:"login"
                    })
                }

            } else {
                // 如果为 false 直接放行
                next()
            }

        })
        var vm = new Vue({
            el: "#app",
            router: myRouter,
        })
    </script>
</body>

</html>
```





### 13，路由的重定向

“重定向”的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

### 14，给匹配成功的`<router-link>`设置样式

当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 `.router-link-active`

active-class

- 类型: `string`

- 默认值: `"router-link-active"`

  设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 `linkActiveClass` 来全局配置。

  ```js
  var myRouter = new VueRouter({
      // 配置路由对象
      routes: [
          {
              path: "/user",
              name: "userQ",
              component: UserQuery
          }
      ],
      // 当 <router-link> 成功匹配会被设置名字为 myActive 的类，默认名为 router-link-active
      linkActiveClass: "myActive"
  })
  ```

  

### 15，给路由加动画

```html
<div>
    <router-link :to='{name:"userP",params:{id:10}}'>用户1</router-link>
    <router-link :to='{name:"userQ",query:{userId:2}}'>用户2</router-link>
    <!-- 给router-view加上transition即可 -->
    <transition>
        <router-view></router-view>
    </transition>
</div>
```





# 九，[Axios](https://www.kancloud.cn/yunye/axios/234845)

vue 2.0 后基本不再使用 vue-resource

**vue 官方推荐使用 Axios 在vue 中进行网络请求**

### 1).通过向 `axios` 传递相关配置来创建请求

**axios(config)**

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(res => {
  console.log(res.data);
});;
```

**axios(url[, config])**

```js
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

### 2).执行 `GET` 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 3).执行 `POST` 请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 4).请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])

在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定。

```js
// 使用 axios.post 时，可以传入三个参数，
/**
	三个参数：
		1.请求路径 url
		2.post的请求数据，即data{}
        3.为配置对象
*/
axios
  .post("/test3", { name: "mmnn" }, { baseURL: "http://localhost:8080" })
  .then(res => {
    console.log(res.data);
  });

// 对应 axios.get 
// 		第一个参数为请求地址 url
//		第二个参数为配置对象（没有第三个参数）
axios
  .get("/test3", { params: {id: 123}, baseURL: "http://localhost:8080"})
  .then(res => {
    console.log(res.data);
  });

```



### 5).执行多个并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

### 6).配置的默认值 / defaults

你可以指定将被用在各个请求的配置默认值

全局的 axios 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

```js
axios.defaults.baseURL = "http://localhost:8080";

// 设置请求根路径 baseURL 后，后面请求直接使用对应的请求地址即可
axios.get("/test1").then(res => {
  console.log(res.data)
});
```

### 7).创建 axios 实例

可以使用自定义配置新建一个 axios 实例

一般使用 axios 的默认实例就可以满足要求，但是有时候项目中有多个需要设置的 baseURL 等个性化的默认配置时，就需要多个 axios 来设置多个默认配置，需要哪个默认配置的就调用哪个 axios  对象

**axios.create([config])**

```js
var instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

instance.get("/test2").then(res => {
  console.log(res.data)
});
```

### 8).axios 拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你想在稍后移除拦截器，可以这样：

```js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以为自定义 axios 实例添加拦截器

```js
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

# 十，[Vue中的动画](https://vuejs.bootcss.com/v2/guide/transitions.html)



### [1，过渡的类名](https://vuejs.bootcss.com/v2/guide/transitions.html#过渡的类名)

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

![Transition Diagram](https://vuejs.bootcss.com/images/transition.png)

注意：对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。

### [2，CSS 动画](https://vuejs.bootcss.com/v2/guide/transitions.html#CSS-动画)

CSS 动画用法同 CSS 过渡，区别是在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除。

示例：(省略了兼容性前缀)

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#example-3',
  data: {
    show: true
  }
})
```



### [3，自定义过渡的类名](https://vuejs.bootcss.com/v2/guide/transitions.html#自定义过渡的类名)

我们可以通过以下特性来自定义过渡类名：

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

示例：

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#example-3',
  data: {
    show: true
  }
})
```



### [4，同时使用过渡和动画](https://vuejs.bootcss.com/v2/guide/transitions.html#同时使用过渡和动画)

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 `transitionend`或 `animationend` ，这取决于给元素应用的 CSS 规则。如果你使用其中任何一种，Vue 能自动识别类型并设置监听。

但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 `animation` 很快的被触发并完成了，而 `transition` 效果还没结束。在这种情况中，你就需要使用 `type` 特性并设置 `animation` 或 `transition` 来明确声明你需要 Vue 监听的类型。



### [5，显性的过渡持续时间](https://vuejs.bootcss.com/v2/guide/transitions.html#显性的过渡持续时间)

在很多情况下，Vue 可以自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。然而也可以不这样设定——比如，我们可以拥有一个精心编排的一系列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素有延迟的或更长的过渡效果。

在这种情况下你可以用 `<transition>` 组件上的 `duration` 属性定制一个显性的过渡持续时间 (以毫秒计)：

```html
<transition :duration="1000">...</transition>
```

你也可以定制进入和移出的持续时间：

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition
```

### [6，JavaScript 钩子](https://vuejs.bootcss.com/v2/guide/transitions.html#JavaScript-钩子)

这里的钩子函数可以理解为动画的生命周期函数

可以在属性中声明 JavaScript 钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
methods: {
    // --------
    // 进入中
    // --------

    // 第一个参数 el 是要执行动画的那个DOM元素
    beforeEnter: function (el) {
        // beforeEnter 表示动画入场之前，此时，动画尚未开始，可以在 beforeEnter 中设置元素开始动画之前的起始样式
        el.style.transform = "translate(0,0)"
    },

    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
        // el.offsetWidth 没有实际的作用，但是，如果不写，出不来动画的效果
        // 可以理解 el.offsetWidth 会强制刷新动画
        el.offsetWidth
        // enter 表示动画开始之后的样式，这里可以设置小球完成动画之后的结束状态
        el.style.transform = "translate(150px,450px)"
        el.style.transition = "all ls ease"

        // 这里的 done，其实就是 afterEnter 函数，也就是说 done 是 afterEnter 函数的引用
        done() 
    },
    afterEnter: function (el) {
        // 动画完成之后 ，会调用 afterEnter
        // ...
    },
    enterCancelled: function (el) {
        // ...
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function (el) {
        // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
        // ...
        done()
    },
    afterLeave: function (el) {
        // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
        // ...
    }
}
```

这些钩子函数可以结合 CSS `transitions/animations` 使用，也可以单独使用。

注意：

当只用 JavaScript 过渡的时候，**在 enter 和 leave 中必须使用 done进行回调**。否则，它们将被同步调用，过渡会立即完成。

推荐对于仅使用 JavaScript 过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

### 7，[初始渲染的过渡](https://vuejs.bootcss.com/v2/guide/transitions.html#初始渲染的过渡)

可以通过 `appear` 特性设置节点在初始渲染的过渡

```html
<transition appear>  
    <!-- ... -->
</transition>
```

这里默认和进入/离开过渡一样，同样也可以自定义 CSS 类名。

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

自定义 JavaScript 钩子：

```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

### [8，列表过渡](https://vuejs.bootcss.com/v2/guide/transitions.html#列表过渡)

怎么同时渲染整个列表，比如使用 `v-for` ？在这种场景中，使用 `<transition-group>` 组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` 特性更换为其他元素。
- [过渡模式](https://vuejs.bootcss.com/v2/guide/transitions.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素 **总是需要** 提供唯一的 `key` 属性值。



### 9，[列表的排序过渡](https://vuejs.bootcss.com/v2/guide/transitions.html#列表的排序过渡)

`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 **v-move 特性**，它会在元素的改变定位的过程中应用。像之前的类名一样，可以通过 `name` 属性来自定义前缀，也可以通过 `move-class` 属性手动设置。

`v-move` 对于设置过渡的切换时机和过渡曲线非常有用，你会看到如下的例子

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>

<div id="flip-list-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <transition-group name="flip-list" tag="ul">   <!-- 这里使用 tag="ul"将transition-group渲染成ul -->
    <li v-for="item in items" v-bind:key="item">
      {{ item }}
    </li>
  </transition-group>
</div>
```

```js
new Vue({
  el: '#flip-list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9]
  },
  methods: {
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})
```

```css
.flip-list-move {
  transition: transform 1s;
}
```

这个看起来很神奇，内部的实现，Vue 使用了一个叫 [FLIP](https://aerotwist.com/blog/flip-your-animations/) 简单的动画队列
使用 transforms 将元素从之前的位置平滑过渡新的位置。



### 10，[多个组件的过渡](https://vuejs.bootcss.com/v2/guide/transitions.html#多个组件的过渡)

多个组件的过渡简单很多 - 我们不需要使用 `key` 特性。相反，我们只需要使用[动态组件](https://vuejs.bootcss.com/v2/guide/components.html#动态组件)：

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

```js
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
```

```css
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
```

### 11，过渡模式

同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 **过渡模式**

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

用 `out-in` 重写之前的开关按钮过渡：

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```





# 十一，Vue结合webpack

## [Vue-Load](https://vue-loader.vuejs.org/)

### 1，render 函数的使用

```html
<body>
    <div id="app"></div>

    <script>
        var header = {
            template: "<div>我是header</div>",
        }

        var vm = new Vue({
            el: "#app",
            // 形参 creatElements 是一个方法
            // 调用 creatElements能够把指定的组件模板渲染为 html 结构
            render: function (creatElements) {
                // 这里 return 的结果，会替换页面中 el 指定的容器
                return creatElements(header)
            }
        })
    </script>
</body>
```

### 2，修改默认导入的vue文件的方式

```js
// 在 webpack 中尝试使用 Vue:

// 注意：在 webpack 中，使用 import Vue from 'vue' 导入的 Vue 构造函数功能不完整，
//  只提供了 runtime-only 的方式，并没有提供向网页那样的使用方式；
import Vue from 'vue'
/**
 * 包的查找规则
 *      1.找项目跟目录有没有 node_modules 的文件夹
 *      2.在 node_modules 中，根据包名，找到对应的 vue 文件夹
 *      3.在 vue 文件夹中，找到 package.json 包配置文件
 *      4.在 package.json 中，查找一个 main 属性（main属性指定了这个包在被加载时候的入口文件）
 *  */ 
// 由于 main 属性指向 vue.runtime.common.js 文件而不是 vue.js 所以上面的导入方式只提供了 runtime-only 的方式
```

**方式一：**

```js
// 想要导入 vue.js 需要手动指向其路径
import Vue from '../node_modules/vue/dist/vue.js'
```

**方式二：**

```js
---------------------webpack.config.js---------------------
module.exports = {
    resolve:{
        // 设置 Vue 被导入时候的包的路径
        //  再使用 import Vue from 'vue' 就会导入 vue.js 文件了
        alias:{
            "vue$": "vue/dist/vue.js"
        }
    }
}
```

### 3，*.vue 文件形式的组件的使用

1. 写一个`.vue`文件

   ```vue
   -----------------login.vue----------
   <template>
       <div>
           <h1>这是登录组件</h1>
       </div>
   </template>
   
   
   <script>
   export default {
       
   }
   </script>
   
   
   <style>
   
   </style>
   ```

2. 导入 vue 组件

   ```js
   // 导入 login 组件
   import login from './login.vue'
   ```

3. 安装 loder 配置 webpack.config.js 文件

   1. 安装 vue-loader 和 vue-template-compiler

      ```
      npm i vue-loader vue-template-compiler -D
      ```

   2. 配置 webpack.config.js 文件

      ```js
      const VueLoaderPlugin = require('vue-loader/lib/plugin')
      module.exports = {
          // 配置 vueloader 的插件
          plugins: [
              new VueLoaderPlugin()
          ],
          module: {
              // 配置 .vue 文件的 loader
              rules: [
                  { test: /\.vue$/, use: 'vue-loader' }
              ]
          }
      }
      ```
   
4. 使用 render 函数将组件渲染到页面上

   ```js
   import Vue from 'vue'
   import login from './login.vue'
   
   var vm = new Vue({
       el:'#app',
       // 把 login 组件渲染到 #app 上
       render(h) {
           return h(login)
       },
   })
   ```



### 4，*.vue 文件详解

```vue
<template>
    <div >
        <h1>这是登录组件---{{msg}}</h1>
    </div>
</template>

/**
    在 node 中 
        向外暴露成员的方式：module.exports = {} 和 exports
    在 ES6 中，也通过规范的形式，规定了ES6中如何导入和导出模块
        导入模块的方式：
            import 模块名称 from '模块标识符'   
            import '路径'
        导出（向外暴露成员）方式:：
            export default {} 和 export
 */
// 这里使用 ES6 暴露成员的方式来定义组件的数据和方法等
<script>
export default {
    data() {
        return {
            msg:123
        }
    },
    methods: {
        show(){
            console.log("调用了show");
        }
    },
}
</script>

// 注意：
//	1，一般style标签要加 scoped 属性，否则每个组件的样式都是全局样式，加上 scoped 后，样式只能作用于本组件
//	2，不加 lang 属性默认只支持 css 语法，指定 lang 属性为 scss 等可以支持扩展语法
<style scoped lang='scss'>
    /** 样式文件中使用 @import 来引用*/
    @import './base.scss';
    h1{
        background-color: antiquewhite
    }
</style>
```

可以在一个组件中同时使用有 scoped 和非 scoped 样式：

```html
<style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>
```

### 5，结合vue-router的使用

1. 引入`vue-router`的
   + 如果在一个模块化工程中使用它，必须通过`Vue.use()`明确地安装路由功能
	
	```js
	// 先安装 vue-router的包   npm i vue-router -S
	import Vue from 'vue'
	import VueRouter from 'vue-router'
	
	Vue.use(VueRouter)
	
	import App from './App.vue'
	// 引入组件
	import account from './main/Account.vue'
	import goodslist from './main/GoodsList.vue'
	
	
	
	// 创建一个路由对象
	var router = new VueRouter({
	    routes: [
	        { path: '/account', component: account},
	        { path: '/goodslist', component: goodslist},
	    ]
	})
	
	var vm = new Vue({
	    el: '#app',
	    // 把路由对象挂载到 Vue 对象上
	    router,
	    render(h) {
	        return h(App)
	    },
	})
	```
	
	```vue
	--------------App.vue------------------
	<template>
	    <div >
	        <h1>我是App</h1>
	        <router-link to='/account'>account</router-link>
	        <router-link to='/goodslist'>goodslist</router-link>
	        <router-view></router-view>
	    </div>
	</template>
	```
	
2. 抽离路由模块

   ```js
   -----------------main.js----------------
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   Vue.use(VueRouter)
   
   import App from './App.vue'
   
   // 引入 router.js 暴露的路由对象
   import {router} from './router'
   
   
   var vm = new Vue({
       el: '#app',
       // 把路由对象挂载到 Vue 对象上
       router,
       render(h) {
           return h(App)
       },
   })
   ```

   ```js
   --------------------router.js--------------------
   import VueRouter from 'vue-router'
   
   // 引入组件
   import account from './main/Account.vue'
   import goodslist from './main/GoodsList.vue'
   import login from './subcom/Login.vue'
   import register from './subcom/Register.vue'
   
   
   // 创建一个路由对象
   // 暴露导出路由模块
   export var router = new VueRouter({
       routes: [
           {
               path: '/account',
               component: account,
               children: [
                   { path: 'login', component: login },
                   { path: 'register', component: register }
               ]
           },
           { path: '/goodslist', component: goodslist },
       ]
   })
   ```

### 6，文件路径引用问题

配置 webpack.config.js 文件

```js

module.exports = {
  resolve: {
    /**
      通过给 extensions 添加后缀名，项目中引入文件可以省略后缀名
      如引入vue组件 ：import Account from "./main/Account.vue";
      在 extensions 添加了 .vue后就可以省略后缀名，即import Account from "./main/Account";
    */
    extensions: [".vue", ".js"],
    /**
      下面的 alias 给路径设置别名
      然后使用 
		- @src就可以指向到/src/ 
		- @component指向到/src/component/
	  使用别名
	  	import LifeCycle from "@pages/lifecycle/lifecycle"
		import stateProp from "@pages/stateProp/stateProp"
		import Home from "@pages/home/home"
    */
     alias: {
          "@src":path.resolve("src"),
          "@component":path.resolve("src/component"),
          "@pages":path.resolve("src/pages"),
          "@utils":path.resolve("src/utils"),
        },
  },
}
```



## [Vue-CLI](https://cli.vuejs.org/zh/)



# 十二，[Vuex](https://vuex.vuejs.org/zh/)

### 1，安装和基本使用

使用 Npm

```shell
npm install vuex --save
```

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 Vuex：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

创建一个 Vuex.Store 对象

```js
export const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
})
```

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store`

```js
import { store } from './store/main.store'

new Vue({
  el: "#app",
  router,
  store,
  render(h) {
    return h(App);
  }
});
```

### 2，State

使用`this.$store.state`获取 state 中的属性

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

**state 单一状态树**



### 3，Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

```js
store.commit('increment')
```

**提交载荷（Payload）**

即给 mutation 中的回调函数传入额外参数

你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```

```js
methods: {
  doneTodosCount () {
      this.$store.commit('increment', 100)
  }
}
```

**对象风格的提交方式**

提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

**Mutation 需遵守 Vue 的响应规则**

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 

- 或者以新对象替换老对象。例如，利用 stage-3 的[对象展开运算符](https://github.com/sebmarkbage/ecmascript-rest-spread)我们可以这样写：

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

+ 删除对象上的属性时，应该用`Vue.delete(obj, 'oldProp')`

### 4，Getter

类似 Vue 中的计算属性

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

**通过属性访问**

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

我们可以很容易地在任何组件中使用它：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

**通过方法访问**

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

### 5，Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

注册一个简单的 action：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

使用参数解构来简化代码：

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

**分发 Action**

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment')
// 组件中
this.$store.dispatch('xxx')
```

在 action 中可以使用异步操作

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

**组合 Action**

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 `async / await`，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

### 6，Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

**模块的局部状态**

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```





