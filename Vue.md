# 一，vue基础

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
- vue中的事件通过传入`$event`来获得event对象
  - `<h2 v-text="msg1" @click="clickHandler($event)"></h2>`

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

### 3，组件之间通信

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







### 4，插槽（slot）的使用

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



### 5，组件的生命周期

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
            beforeCreate
            created
            beforeMount
            mounted
            beforeUpdate
            updated
            activated
            deactivated
            beforeDestroy
            destroyed
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
            beforeCreate() {
                console.log(this.msg);
            },

            // 组件创建之后
            /* 
                在created方法中可以操作后端数据
                应用：发起 ajax 请求    
            */
            created() {
                console.log(this.msg);
            },

            // 在挂载数据到dom之前
            beforeMount() {
                console.log(document.getElementById("app"));
            },

            // 在挂载数据到dom之后
            mounted() {
                console.log(document.getElementById("app"));
            },
            // 更新DOM之前,  应用：可以获取原始的DOM
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



# 四，过滤器（filter）

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

# 五，vue监听器（watch）

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



# 七，vue

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



 









