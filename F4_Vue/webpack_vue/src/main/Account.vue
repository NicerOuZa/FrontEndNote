<template>
  <div>
    <h1>我是Account</h1>
    <router-link to="/account/login">login</router-link>
    <router-link to="/account/register">register</router-link>
    <router-view></router-view>
  </div>
</template>



<script>
export default {
  data() {
    return {
      msg: 123
    };
  },
  methods: {
    show() {
      console.log("调用了show");
    }
  }
};
</script>


<style scoped lang = 'scss'>
    h1{
        background-color: antiquewhite
    }
    body{
        div{
            color: purple
        }
    }
</style>
