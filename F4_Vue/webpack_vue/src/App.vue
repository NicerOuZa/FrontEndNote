<template>
  <div>
    <h1>我是App</h1>
    <re></re>
    <lo></lo>
  </div>
</template>



<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    test: function() {
      Toast({
        message: "提示",
        position: "bottom",
        duration: 1000,
        className: "myToast"
      });
    }
  }
};
</script>


<style>
.myToast {
  color: red;
}
</style>