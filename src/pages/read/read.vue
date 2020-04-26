<template>
  <div>
    <h3>因小程序规定，个人类型小程序无法打开外链，暂时无法访问</h3>
  </div>
</template>

<script>
export default {
  onShow() {
    this.url = ''
  },
  mounted() {
    let _url = 'http://www.youbaobao.xyz/book/#/ebook'
    const  query  = this.$route.query
    if(query.fileName) {
      _url = `${_url}/${query.fileName}`
      if(query.opf) {
        _url = _url = `${_url}?opf=${query.opf}`
      }
      if (query.navigation && query.opf) {
        _url = `${_url}&navigation=${query.navigation}`
      } else if (query.navigation) {
        _url = `${_url}?navigation=${query.navigation}`
      }
      this.url = _url
    }
    this.url = this.url.replace(/http/,'https')
    console.log(this.url)

  },
  data() {
    return {
      url: ''
    }
  }
}

</script>
<style scoped>
</style>