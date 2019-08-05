<template>
  <div>
    <h1>我是 register</h1>
  </div>
</template>



<script>
export default {
  data() {
    return {
      msg: 123
    };
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      console.log("调用了show -r ");
    }
  }
};
</script>


<style>
</style>