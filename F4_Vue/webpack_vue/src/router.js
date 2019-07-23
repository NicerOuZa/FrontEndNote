import VueRouter from 'vue-router'

// 引入组件
import account from './main/Account.vue'
import goodslist from './main/GoodsList.vue'
import login from './subcom/Login.vue'
import register from './subcom/Register.vue'


// 创建一个路由对象
// 导出路由模块
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


