<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchClick">
      <input class="search-bar-input" 
             :focus="focus"
             :placeholder="hostSearch" 
             :disabled="disabled"
             :maxlength="maxlength"
             v-model="searchWord"
             confirm-type="confirmType"
             @input="onChange"
             @confirm="onConfirm"/>
      <span v-show="searchWord.length>0">
        <span class="iconfont .icon-icon-test16 clear" @click="onClearClick"></span>
      </span>
      <span class="iconfont .icon-icon-test4 search" @click="onSearchClick"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWord: ''
    }
  },
  watch:{
    searchWord() {
      if(!this.searchWord){
        this.$emit('onClear')
      }
    }
  },
  props: {
    focus: {
        type: Boolean,
        default: false
      },
    disabled: {
      // 小程序中input的disabled属性表示input是否可被禁用交互，默认false
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 20
    },
    hostSearch: {
      type: String,
      default: '搜索'
    },
    confirmType: {
      // 控制手机虚拟键盘右下角按钮显示的文字
      type: String,
      default: 'search'
    }
  },
  methods: {
    onSearchClick() {
      // 通知父组件搜索框被点击了，并执行父组件的onClick事件
      this.$emit('onClick')
    },
    onClearClick() {
      this.searchWord = ''
      // 通知父元素搜索框清空了
      this.$emit('onClear')
    },
    onChange() {
      // 通知父组件，input值改变后input内的现有的值
      // v-model双向绑定，自动检测修改
      this.$emit('onChange', this.getValue())
    },
    onConfirm() {
      // 点击虚拟键盘右下角后触发回调
      // 将input内的值通知父组件
      this.$emit('onConfirm', this.getValue())
    },
    setValue(v) {
      // 修改搜索框中的值
      this.searchWord = v
    },
    getValue() {
      // 获取搜索框中的值
      return this.searchWord
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar{
  padding: 15px 15.5px;
  .search-bar-wrapper{
    height: 40px;
    box-sizing: border-box;
    // 使用ie盒模型保证高度为40px
    display: flex;
    align-items: center;
    background-color: #F5F7F9;
    border-radius: 20px;
    padding: 12px 17px;
    .search-bar-input{
      flex: 1;
      margin: 0 8px;
      color: #333;
      font-size: 15px;
    }
    .search, .clear{
      display: flex;
      align-items: center;
      height: 100%;
      padding: 5px;
    }
  }
}
</style>