Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        };
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});


Vue.component("DivTest", {
    template: "<div>我是一个自定义的div（全局）</div>"
});

// // 1,先给父组件中绑定自定义的属性
// // 2,在子组件中使用props接收父组件的数据
// // 3,可以在子组件中任意使用
// Vue.component("Child",{
//     props:["childData"],
//     template: "<div>我是子组件---{{childData}}</div>"
// });

// Vue.component("Parent",{
//     data:function () {
//         return {
//             msg:'这是父组件的数据'
//         };
//     },
//     template: "<div>我是父组件<Child :childData='msg'/></div>"
// });




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
            this.$emit("childHandler", this.chileMsg);
        }
    },
});

Vue.component("Parent", {
    template: "<div>我是父组件---{{msgFromChile}}<Child :childData='msg' @childHandler='childHandler'/></div>",
    data: function () {
        return {
            msg: '这是父组件的数据',
            msgFromChile: ""
        };
    },
    methods: {
        childHandler: function (val) {
            this.msgFromChile = val;
        }
    }
});


