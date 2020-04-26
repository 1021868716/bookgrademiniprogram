<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wrapper">
          <ImageView :src="avatar" round height="100%" mode="scaltToFill"/>
        </div>
        <div class="nickname">{{nickname}}</div>
        <div class="shelf-text">好书又更新啦</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div class="book-img-wrapper" 
               v-for="(item , index) in bookList" 
               :key="index"
               @click="onBookClick(item)">
            <ImageView :src="item.cover"/>
          </div>
        </div>
        <div class="shelf-wrapper" @click="gotoShelf">
          <div class="shelf">书<br>架</div>
          <div class="iconfont .icon-icon-test15"></div>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">分享</div>
    </div>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import ImageView from '../../base/ImageView'
import Dialog from 'vant-weapp/dist/dialog/dialog'

export default {
  components: {
    ImageView
  },
  props: {
    data: Object,
    hasSign: {
      // 今天是否签到
      type: Boolean,
      default: false
    },
    signDay: {
      // 签到天数
      type: Number,
      default: 0
    }
  },
  computed: {  
    avatar() {
      return (this.data && this.data.userInfo && this.data.userInfo.avatar) || ''
    },
    nickname() {
      return (this.data && this.data.userInfo && this.data.userInfo.nickname) || ''
    },
    bookList() {
      return (this.data && this.data.bookList) || []
    }
  },
  methods: {
    gotoShelf() {
      // 点击跳转到书架
      this.$router.push('/pages/shelf/main')
    },
    onBookClick(item) {
      // 点击书本卡片
      this.$emit('onClick',item)
    },
    sign() {
      // 签到
    },
    onFeedBackClick() {
      // 反馈
      Dialog.confirm({
        title: '分享',
        message: '该功能还在开发中',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        // 点击是触发回调
      }).catch(() => {
        // 点击否触发回调
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-card{
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 22px 20px 0;
    .home-card-inner{
      position: relative;
      padding: 21.5px 20px 20px 20px;
      box-sizing: border-box;
      .user-info {
        display: flex;
        align-items: center;
        .avatar-wrapper {
          height: 20px;
          width: 20px;
        }
        .nickname, .shelf-text{
          font-size: 12px;
          color: white;
        }
        .nickname {
          margin: 0 8.5px;
        }
        .shelf-text {
          opacity: 0.7;
        }
        .round-item {
          width: 4px;
          height: 4px;
          background-color: #a2a2a2;
          border-radius: 50%;
          margin: 0 8px;
        }
      }
      .book-info {
        display: flex;
        margin-top: 16.5px;
        .book-wrapper {
          flex: 1;
          display: flex;
          justify-content: space-around;
          .book-img-wrapper{
            width: 72px;
            height: 101px;
          }
        }
        .shelf-wrapper {
          display: flex;
          align-items: center;
          .shelf, .iconfont{
            width: 11px;
            font-size: 11px;
            color: #fff;
            opacity: 0.8;

          }
        } 
      }
      .feedback-wrapper {
        border-radius: 100px 0 0 100px;
        height: 23.5px;
        line-height: 23.5px;
        width: 44.5px;
        color: white;
        font-size: 11px;
        background: #707070;
        position: absolute;
        right: 0;
        top: 19.5px;
        text-align: center;
      }
    }
  }
</style>