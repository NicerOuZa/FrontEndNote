<template>
  <div>
    <h1>我是App</h1>
    <test name="zt">
      <div slot="one">{{ msg }}</div>
    </test>
    <button>--{{ test }}</button>
    <!-- <router-link to="/account">账户1</router-link>
    <router-link to="/goodslist">商品</router-link> -->
    <!-- <button @click="toAccount">账户</button>
    <button @click="toGoodlist">商品</button>

    <router-view></router-view> -->
  </div>
</template>

<script>
import test from './test.vue'
// import Account from "./main/Account.vue";
export default {
  data () {
    return {
      isActive: false,
      msg: 'zhangtao',
      msg2: 'mnmn',
      test: ''
    }
  },
  methods: {
    childHandler: function (data) {
      // console.log('val:', val);
      // this.test = val
      console.log('fromChie')
    }
  },
  components: {
    test,
  }
}
</script>

<style scoped>
</style>
