<template>
  <div>
      <shelfUserInfo :userInfo="userInfo" :readDay="readDay" :num="num" />
      <shelfList :shelfList="shelfList"/>
  </div>
</template>

<script>
import shelfUserInfo from './shelfUserInfo'
import shelfList from './shelfList'
import { getStorageSync } from '@/api/wechat'
import { userDay, bookDetail } from '@/api/index'
export default {
  mounted() {
      this.userInfo = getStorageSync('userInfo')
      const openId = getStorageSync('openId')
      userDay({openId}).then(res=>{
          console.log(res.data.data.day)
          this.readDay = res.data.data.day
      })
      let arr = getStorageSync('shelf')
      this.num = arr.length
      this.shelfList = []
      arr.forEach((item)=>{
          bookDetail({openId,fileName:item.fileName}).then(res => {
              this.shelfList.push(res.data.data)
          })
      })
  },
  components: {
    shelfUserInfo,
    shelfList
  },
  data() {
      return {
          userInfo: {},
          readDay: 1,
          num:0,
          shelfList: []
      }
  }
}

</script>
<style scoped>
</style>