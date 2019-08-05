<template>
  <div>
    {{name}}
    <slot name="one" v-if="true"></slot>
  </div>
</template>


<script>
export default {
  created() {
    console.log("created");
    this.$emit("change", this.chileMsg);
  },
  data() {
    return {
      isActive: false,
      chileMsg: "testChild"
    };
  },
  methods: {},
  props: {
    name: {
      type: String,
      default: 'zt'
    },
    type: String
  }
};
</script>

<style scoped>
div {
  width: 100px;
  height: 100px;
  background-color: pink;
}

.zt {
  width: 200px;
  color: red;
}
</style>


