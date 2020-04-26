<template>
  <div class="image-view" :style="{ height }">
    <img :src='src'
         :style="{height:height}"
         :mode='mode'
         :lazy-load='lazy-load'
         :class="round?'round image': 'image'"
         @load="onLoad"
         @error="onError"
         v-show="!isLoading && !error"/>
         
    <img src="../../static/image/placeholder.jpg"
         :style="{height:height}"
         :mode='mode'
         :lazy-load='lazy-load'
         :class="round?'round image': 'image'"
         v-show="isLoading || error"/>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      // 图片加载模式,widthFix现在为自适应模式
      // scaleToFill为固定宽高模式
      type: String,
      default: 'widthFix'
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    round: {
      // 是否为圆形图片
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    }
  },
  watch: {
    src(newValue, oldValue) {
      if(newValue && newValue.length>0 && newValue != oldValue){
        this.isLoading = true
        this.error = false
      }
    }
  },
  data() {
    return {
      // 当isLoading或者err时都加载占位图
      isLoading: true,
      error: false
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    },
    onLoad() {
      // 图片加载成功后的回调
      this.isLoading = false
      this.error = false
    },
    onError() {
      // 图片加载错误执行的回调
      this.error = true
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-view {
    width: 100%;
    .image {
      width: 100%;
      &.round {
        border-radius: 50%;
      }
    }
  }
</style>