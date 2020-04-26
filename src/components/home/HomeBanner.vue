<template>
  <div class="home-banner" @click="onClick">
      <div class="bg-img" :style="{backgroundImage: bgImage}">
          <div class="title">{{title}}</div>
          <div class="text">{{subTitle}}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    imgUrl: String
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  },
  computed: {
    bgImage() {
      return 'url(' + this.imgUrl + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
.home-banner {
  margin-top: 20px;
  padding: 0 20px;
    .bg-img {
      height: 125px;
      border-radius: 10px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        margin-top: 10px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
      }
      .text {
        margin-top: 10px;
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
      }
    }
  }
</style>