<template>
  <div>
    <h1>我是App</h1>
    <button @click="test">test</button>
    <Steps :current="1">
      <Step title="已完成" content="这里是该步骤的描述信息"></Step>
      <Step title="进行中" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>
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