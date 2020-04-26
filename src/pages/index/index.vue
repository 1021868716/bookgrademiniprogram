<template>
  <div class="home">
    <SearchBar @onClick="onSearchBarClick" 
               :hotSearch="hotSearch"
               disabled = true />
    <HomeCard :data="homeCard"
              @onClick="onHomeBookClick"/>
    <HomeBanner imgUrl="http://www.youbaobao.xyz/book/res/bg.jpg"
                title="Hello"
                subTitle="欢迎推荐自己喜欢的图书并给他打分"
                @onClick="onBannerClick"/>
    <div class="homebook">
      <HomeBook title="为你推荐" 
                :row="1"
                :col="3"
                :data="recommend"
                mode="col"
                btnText='换一批'
                @onMoreClick="recommendChange('recommend')"
                @onBookClick="onBookClick"/>
    </div>
    <div class="homebook">
      <HomeBook title="免费阅读" 
                :row="2"
                :col="2"
                :data="freeRead"
                mode="row"
                btnText='换一批'
                @onMoreClick="recommendChange('freeRead')"
                @onBookClick="onBookClick"/>
    </div>
    <div class="homebook">
      <HomeBook title="当前最热" 
                :row="1"
                :col="4"
                :data="hotBook"
                mode="col"
                btnText='换一批'
                :showBtn = false
                @onMoreClick="recommendChange('hotBook')"
                @onBookClick="onBookClick"/>
    </div>
    <div class="homebook">
      <HomeBook title="分类" 
                :row="2"
                :col="2"
                :data="category"
                mode="category"
                btnText='查看全部'
                @onMoreClick="onCategoryMoreClick"
                @onBookClick="onBookClick"/>
    </div>
    <auth v-if="!isAuth" 
          @getUserInfo="init"/>
  </div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import HomeCard from '@/components/home/Homecard'
import HomeBanner from '@/components/home/HomeBanner'
import HomeBook from '@/components/home/HomeBook'
import { getHomeData, recommend , freeRead , hotBook, register} from '@/api/index'
import { getSetting ,getUserInfo ,setStorageSync ,getStorageSync ,getUserOpenId } from '@/api/wechat'
import auth from '@/base/auth'

export default{
  mounted() {
    if(!getStorageSync('shelf')){
      setStorageSync('shelf',[])
    }
  },
  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    auth
  },
  data() {
    return {
      hotSearch: '',
      shelf: [],
      banner: {},
      recommend: [],
      hotBook: [],
      freeRead: [],
      category: [],
      homeCard: {},
      isAuth: this.getSetting(),
      openId: getStorageSync('openId')
    }
  },
  methods: {
    getHomeData(openId=this.openId) {
      getHomeData({openId}).then(res => {
        const {
          data: {
            hotSearch,
            shelf,
            banner,
            recommend,
            freeRead,
            hotBook,
            category,
            shelfCount
          }
        } = res.data
        this.hotSearch = hotSearch.keyword
        this.banner = banner
        this.recommend = recommend
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.category = category
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo: {
            avatar: getStorageSync('userInfo').avatarUrl,
            nickname: getStorageSync('userInfo').nickName
          },
        }
      }).catch(err => {
        console.log('err: '+err)
      })
    },
    onSearchBarClick() {
      // 点击搜索框子组件，子组件通知触发，然后跳转到搜索页面
      this.$router.push({
        path:'/pages/search/main',
        query: {
          hotSearch: this.hotSearch
        }
        })
    },
    onBannerClick() {
      // 点击banner，子组件通知父组件触发回调
    },
    onBookClick() {
      // 点击书籍
    },
    recommendChange(key) {
      switch(key) {
        case 'recommend':
          recommend().then(res=>{
            this.recommend = res.data.data
          })
          break;
        case 'freeRead':
          freeRead().then(res=>{
            this.freeRead = res.data.data
          })
          break;
        case 'hotBook':
          hotBook().then(res=>{
            this.hotBook = res.data.data
          })
          break;
       }
    },
    onCategoryMoreClick() {
      this.$router.push({
        path: '/pages/categoryList/main',
      })
    },
    getUserInfo() {
      const onOpenIdComplete = function(openId, userInfo){
        this.getHomeData(openId), // 获取首页数据并向服务器传入openid
        register(openId, userInfo) // 用户注册
      }
      // 获取用户信息并存入缓存
      getUserInfo(
        (userInfo)=>{
          // 向缓存中存入
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId === 0) {
            // 请求openId
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          } else {
            onOpenIdComplete(openId, userInfo)
          }
        },
        ()=>{
          console.log('failed...')
        })
    },
    getSetting() {
      // 判断是否具有用户权限
      getSetting(
        'userInfo',
        ()=>{
          this.isAuth = true
          this.getHomeData()
          this.getUserInfo()
        },
        ()=>{
          this.isAuth = false
        })
    },
    init() {
        this.getSetting()
    },
    onHomeBookClick(book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .homebook {
    // 自定义组件是不能直接写class的
    margin-top: 23px;
  }
</style>
