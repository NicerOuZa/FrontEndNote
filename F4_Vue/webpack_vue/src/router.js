import VueRouter from "vue-router";

// 引入组件
import account from "./pages/main/Account.vue";
import goodslist from "./pages/main/GoodsList.vue";
import login from "./pages/subcom/Login.vue";
import register from "./pages/subcom/Register.vue";

// 创建一个路由对象
// 导出路由模块
const router = new VueRouter({
  routes: [
    {
      path: "/account",
      name: "account",
      component: account,
      meta: { title: "账户" },
      children: [
        {
          path: "login",
          component: login,
          meta: { title: "登录" }
        },
        {
          path: "register",
          component: register,
          meta: { title: "注册" }
        }
      ]
    },
    {
      path: "/goodslist",
      component: goodslist,
      meta: { title: "商品" }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.path === "/") {
    document.title = "主页";
  }
  next();
});

export default router;
