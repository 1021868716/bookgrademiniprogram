<template>
  <div>
	<searchBar
	 :focus="searchFocus"
	 @onChange="onChange"
	 @onClear="onClear"
	 :hotSearch="hotSearchKeyword"
	 @onConfirm="onConfirm"
	 ref="searchBar"/>
    <TagGroup
		header-text="热门搜索"
		btn-text="换一批"
		:value="hotSearchArray"
		@onBtnClick="changeHotSearch"
		@onTagClick="showBookDetail"
		v-if="hotSearchArray.length > 0 && !showList"/>
		<!-- 没有搜索列表时展示热门搜索推荐 -->
	<TagGroup
		header-text="历史搜索"
		btn-text="清空"
		:value="historySearch"
		@onBtnClick="clearHistorySearch"
		@onTagClick="searchKeyWorld"
		v-if="historySearch.length > 0 && !showList"/>
	<SearchList
		:data="searchList"
		v-if="showList"/>
	<van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import SearchList from '@/components/search/SearchList'
import SearchBar from '@/components/home/SearchBar'
import TagGroup from '@/base/TagGroup'
import { getStorageSync } from '@/api/wechat'
import { search,hotSearch } from '@/api/index'
import { setStorageSync, geiStorageSync} from '@/api/wechat'
import Dialog from 'vant-weapp/dist/dialog/dialog'
export default {
  components: {
	SearchList,
	SearchBar,
	TagGroup
  },
  computed: {
    data(){
      return {
        item:this.item, list:this.list
      }
	},
	showList() {
		// 返回是否展示搜索列表
		const key = Object.keys(this.searchList)
		return key.length > 0
	},
	hotSearchArray() {
		const _hotSearch = []
		this.hotSearch.forEach(obj=>{
			_hotSearch.push(obj.title)
		})
		return _hotSearch
	}
  },
  data() {
    return {
		hotSearch: [],
		historySearch: [],
		hotSearchKeyword: '',
		searchList: {},
		searchFocus: true,
		openId: '',
		page: 1 ,// 默认一次搜索加载1页20条数据
	}
  },
  mounted() {
	  this.openId = getStorageSync('openId')
	  hotSearch().then(res=>{
		  this.hotSearch = res.data.data
	  })
	  // 路由跳转时带了个query过来
	  this.hotSearchKeyword = this.$route.query.hotSearch
	  this.historySearch = getStorageSync('historySearch') || []
  },
  onReachBottom() {
	// 页面滚动到底部的生命周期
	if(this.showList) {
	  this.page++
	  const searchWord = this.$refs.searchBar.getValue()
	  search({
		keyword: searchWord,
		openId: this.openId,
		page: this.page
	  }).then(res => {
		const { book } = res.data.data
		if( book && book.length > 0 ) {
		  this.searchList.book.push(...book)
		} else {
		  this.page = 1
		  Dialog.confirm({
        	title: '到底了',
        	message: '没有更多数据了',
        	confirmButtonText: '是',
        	cancelButtonText: '否'
      		}).then(() => {
        	// 点击是触发回调
      		}).catch(() => {
        	// 点击否触发回调
      	  })
		}
	  })
	}
  },
  methods: {
	onConfirm(keyword) {
	  // 在虚拟上点击确认的时候,子元素通知父元素触发这个事件
	  if(!keyword || keyword.trim().length === 0){
		keyword = this.hotSearchKeyword
	  } 
	  this.onSearch(keyword)
	  // 如果这个关键词不存在历史搜索内，就写入历史搜索
	  if(!this.historySearch.includes(keyword)) {
		this.historySearch.push(keyword)
		setStorageSync('historySearch', this.historySearch)
	  }
	  this.searchFocus = false
	},
	onClear() {
		this.page = 1
		this.searchList = {}
	},
	showBookDetail(text, index) {
	  this.$refs.searchBar.setValue(text)
	  this.searchFocus = false
	  this.onSearch(text)
	},
	changeHotSearch() {
	  hotSearch().then(res=>{
		this.hotSearch = res.data.data
	  })
	},
	clearHistorySearch() {
	  this.historySearch = [],
	  setStorageSync('historySearch',[])
	},
	searchKeyWorld(text) {
	  this.$refs.searchBar.setValue(text)
	  this.searchFocus = false
	  this.onSearch(text)
	},
	onChange(keyword) {
		this.page = 1
		if(!keyword || keyword.trim().length === 0){
			this.searchList = {}
			return ''
		}else{
			this.onSearch(keyword)
		}
	},
	onSearch(keyword) {
		search({
			keyword,
			openId: this.openId,
			page: this.page
		}).then(res=>{
			this.searchList = res.data.data
		})
	}
  }
}
</script>
<style scoped>
</style>