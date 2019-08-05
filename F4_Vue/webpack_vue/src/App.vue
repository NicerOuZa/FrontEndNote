<template>
  <div>
    <h1>我是App</h1>
    <test @change="childHandler">
      <div slot="one">{{ msg }}</div>
    </test>
    <button>--{{ test }}</button>
    <hello-vuex/>
    <!-- <router-link to="/account">账户1</router-link>
    <router-link to="/goodslist">商品</router-link> -->
    <!-- <button @click="toAccount">账户</button>
    <button @click="toGoodlist">商品</button>
    
    <router-view></router-view> -->
  </div>
</template>

<script>
import test from "@/pages/test";
import Account from "@/pages/main/Account"
import HelloVuex from "@/components/HelloVuex"

export default {
  created () {
  },
  data() {
    return {
      isActive: false,
      msg: "msg1",
      msg2: "mnmn",
      test: ""
    };
  },
  methods: {
    // msg3:'met',
    toAccount() {
      console.log(this.msg3);
      this.$router.push({
        // name: "blog"
        path: "/account"
      });
    },
    toGoodlist() {
      console.log("goodslist");
      this.$router.push({
        // name: "blog"
        path: "/goodlist"
      });
    },
    childHandler: function(data) {
      console.log('val:', data);
      this.test = data
      console.log("fromChie")
    }
  },
  components: {
    test,
    Account,
    HelloVuex
  }
};
</script>

<style scoped>
</style>
