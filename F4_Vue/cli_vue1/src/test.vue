<template>
  <div @click="gg">
    <slot name="one" v-if="true"></slot>
  </div>
</template>

<script>
export default {
  created () {
    console.log('created', this.chileMsg)
  },
  data () {
    return {
      isActive: false,
      chileMsg: 'testChild'
    }
  },
  methods: {
    gg: function () {
      console.log('gg')
      this.$parent.test = this.chileMsg
    }
  },
  props: ['name', 'type']
}
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
