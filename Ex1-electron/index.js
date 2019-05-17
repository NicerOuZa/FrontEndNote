// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.





var fs = require("fs")
var App = {
    template: `<div>
                    <h1>我是App</h1>
                    <div id = "box1"
                    ref = "content"
                    @drop.prevent = "dropFile($event)">{{msg}}</div>   
               </div>         
    `,
    mounted() {
        var content = this.$refs.content
        //
        content.ondragenter = content.ondragover = content.ondragleave = function () {
            return false
        }
    },
    data() {
        return {
            msg:''
        }
    },
    methods: {
        dropFile: function (event) {
            console.log(event.dataTransfer.files[0].path);
            var me = this
            fs.readFile(event.dataTransfer.files[0].path,"utf-8",(error,data)=>{
                console.log(me)
                me.msg = data
            })
        },
    },
}
var vm = new Vue({
    el: "#app",
    data() {
        return {
            textareaMsg: ''
        }
    },

    methods: {
        btn1Click: function () {

            this.textareaMsg = "sadasd"
            fs.readFile("./package.json", (error, data) => {
                this.textareaMsg = data
            })
        },
        dropFile: function (event) {
            console.log(event.dataTransfer.files[0]);
        },
    },
    components: {
        App
    },
    template: `<App></App>`
})