<template>
  <transition name="fade">
    <div class="wrapper" v-show="value" @click="$emit('input', false)">
      <img :src="images" alt="">
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean
    }
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #0e0e0e;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 100vh;
  }
}
</style>
