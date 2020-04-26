<template>
  <div>
      <DetailBook :book="book"/>
      <DetailStat 
        :readers="book.readers"
        :readerNum="book.readerNum"
        :rankNum="book.rankNum"
        :rankAvg="book.rankAvg"
        />
      <DetailRate
        :rate-value="book.rateVlue"
        @onRateChange="onRateChange"/>
      <DetailContents 
       :contents="contents" 
       @readBook="readBook"/>
       <div @click="bottomClick">
         <DetailBottom
          :isInShelf="isInShelf"/>
       </div>
        <van-toast id="van-toast" />
  </div>
</template>

<script>
import DetailBook from './DetaillBook'
import DetailStat from './DetailStat'
import DetailRate from './DetailRate'
import DetailContents from './DetailContents'
import DetailBottom from './DetailBottom'
import { bookDetail, bookRankSave, bookContents, bookIsInShelf, bookShelfSave, bookShelfRemove } from '@/api/index'
import { getStorageSync, setStorageSync } from '@/api/wechat'
import Toast from 'vant-weapp/dist/toast/toast';

export default {
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents,
    DetailBottom
  },
  data() {
      return {
          book: {},
          contents:[],
          isInShelf: false
      }
  },
  onShow() {
    this.getBookDetail()
    this.getBookContents()
    this.getBookIsInShelf()
  },
  methods: {
    bottomClick() {
      const book = this.$route.query
      let arr = getStorageSync('shelf')
      if (this.isInShelf) {
        for(let i = 0;i<arr.length;i++){
          if(arr[i].fileName == book.fileName){
            arr.splice(i,1);
          }
        }
        setStorageSync('shelf',arr)
        this.isInShelf = false
      } else {
        arr.push(book)
        setStorageSync('shelf',arr)
        this.isInShelf = true
      }
    },
    readBook(href){
      // 个人小程序无法打开外链，无法跳转第三方网站阅读
      // const query = {
      //     fileName: this.book.fileName,
      //     opf: this.book.opf
      //   }
      //   if (href) {
      //     const index = href.indexOf('/')
      //     if (index >= 0) {
      //       query.navigation = href.slice(index + 1)
      //     } else {
      //       query.navigation = href
      //     }
      //   }
      //   console.log(query)
      //   if (this.book && this.book.fileName) {
      //     this.$router.push({
      //       path: '/pages/read/main',
      //       query
      //     })
      //   }
      Toast('暂时未收集书籍资源，敬请期待')
    },
    getBookIsInShelf() {
      this.isInShelf = false
      const book = this.$route.query
      let arr = getStorageSync('shelf')
     for(let i = 0;i<arr.length;i++){
          if(arr[i].fileName == book.fileName){
            this.isInShelf = true
          }
     }
    },
    onRateChange(value) {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      bookRankSave({ openId, fileName, rank: value }).then(() => {
        Toast('评分成功')
      })
    },
    getBookDetail() {
      // 获取书信息
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (openId && fileName) {
        bookDetail({ openId, fileName }).then(response => {
          this.book = response.data.data
        })
      }
    },
    getBookContents() {
      const { fileName } = this.$route.query
      if (fileName) {
        bookContents({ fileName }).then(response => {
          this.contents = response.data.data
        })
      }
    }
  }
}

</script>
<style scoped>
</style>