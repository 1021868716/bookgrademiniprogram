<template>
  <div>
      <HomeBook 
        :row="category.length/2"
        :col="2"
        :data="category"
        mode="category"
        :show-btn="false"
        :show-title="false"
        @onBookClick="onBookClick"/>
  </div>
</template>

<script>
import HomeBook from "@/components/home/HomeBook"
import { categoryList } from "@/api/index"
export default {
    components: {
        HomeBook
    },
    data() {
        return {
            category: []
        }
    },
    mounted() {
        categoryList().then(res => {
            this.category = res.data.data
        })
    }
}

</script>
<style scoped>
</style>