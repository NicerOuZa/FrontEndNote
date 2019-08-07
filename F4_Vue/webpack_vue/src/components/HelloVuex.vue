<!--  -->
<template>
  <div>
    <div>{{ $store.state.count }}</div>
    <div>{{ msg1.name }}</div>
    <div>{{ msg1.info.id }}</div>
    <!-- <button @click='clickHandler'>add</button> -->
    <button @click='clickHandler'>修改资料</button>
  </div>
</template>

<script>
export default {
  name: "HelloVuex",
  data () {
    return {
      msg1: {
        name: 'zt',
        info: {
          id :10
        }
      }
    }
  },
  methods: {
    clickHandler(){
      // this.$store.commit('add')
      this.msg1.info.id = 99
    }
  }
};
</script>

<style scoped>
</style>