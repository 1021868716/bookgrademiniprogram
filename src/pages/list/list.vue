<template>
  <div>
    <SearchTable :data="data"/>
    <van-toast id="van-toast" />
  </div>

</template>

<script>
  import SearchTable from '@/components/search/SearchTable'
  import { searchList } from '@/api/index'
  import Toast from 'vant-weapp/dist/toast/toast';
  export default {
    components: { SearchTable },
    data() {
      return {
        data: [],
        page: 1
      }
    },
    methods: {
      getSearchList() {
        const { key, text } = this.$route.query
        const params = {}
        if (key && text) {
          params[key] = text
        }
        params.page = this.page
        searchList(params).then(response => {
          const { data } = response.data
          if (data.length > 0) {
            this.data.push(...data)
          } else {
            Toast('没有更多数据了')
          }
        })
      }
    },
    mounted() {
      this.page = 1
      this.getSearchList()
    },
    onReachBottom() {
      this.page++
      this.getSearchList()
    },
    onShow() {
    this.data = [],
    this.page = 1
  }
  }
</script>

<style lang="scss" scoped>
</style>
