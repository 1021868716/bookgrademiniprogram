<template>
  <div class="auth-bg">
    <div class="auth">
        <div class="auth-info">
          <div class="auth-img">
            <ImageView src="../../static/image/placeholder.jpg" mode='scaleToFill'/>
          </div>
        <div class="sub-title">请登陆</div>
        <div class="title">为你喜欢的书评分</div>
      </div>
      <button class="auth-btn"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo">
        用户授权
      </button>
    </div>
  </div>
</template>

<script>
import ImageView from '@/base/ImageView'
export default {
    components: {
      ImageView
    },
    methods: {
      getUserInfo() {
        this.$emit('getUserInfo')
      }
    }
}
</script>

<style lang="scss" scoped>
.auth-bg {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #999;
    z-index: 999;
    .auth {
      position: relative;
      margin: 100px auto;
      width: 270px;
      height: 248px;
      background-color: #f5f5f5;
      border-radius: 18px;
      .auth-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 22.5px;
        .auth-img {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 20px;
        }
        .sub-title {
          font-size: 13px;
          color: #999;
          line-height: 18.5px;
          margin-top: 18px;
        }
        .title {
          font-size: 16px;
          font-weight: 400px;
          color: #333;
          line-height: 22.5px;
          margin-top: 3.5px;
          margin-bottom: 20px;
        }
      }
      .auth-btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        border-radius: 0 0 18px 18px; 
        //background: lightseagreen;
        color: lightseagreen;
        font-size: 15px;
      }
    }
}
</style>