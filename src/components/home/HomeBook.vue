<template>
  <div class="home-book">
    <div class="header" v-if="showTitle">{{title}}</div>
    <div class="content">
      <div class="row" v-for="(item , index) in bookData" :key="index">
        <div class="col" 
             v-for="(book , bookIndex) in item" 
             :key="bookIndex" 
             :style="{flex: '0 0 ' + (100/col)+'%'}">
          <div class="book-wrapper" 
               :style="{flexDirection: mode === 'col' ? 'column' : 'row'}" 
               @click="onBookClick(book)"
               v-if="mode === 'col' || mode === 'row'">
               <!-- 图书 -->
            <ImageView :src="book.cover"/>
            <div class="book-title-wrapper book-title-col" v-if="mode === 'col'">
              <!-- 竖向布局 -->
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else>
              <!-- 横向布局 -->
              <div class="book-title">{{book.title}}</div>
              <div class="book-author">{{book.author}}</div>
              <div class="book-category">{{book.categoryText}}</div>
            </div>
          </div>
          <div class="category-wrapper" v-else @click="onCategoryClick(book)">
            <!-- 分类 -->
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"/>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="showBtn">
      <van-button round custom-class="home-book-btn" @click="onMoreClick">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
import ImageView from '@/base/ImageView'
import { CATEGORY } from '@/utils/const'
import { categoryList } from '@/api/index'
export default {
  components:{
    ImageView
  },
  props: {
    title: String,
    data: {
      type: Array,
      default: []
    },
    btnText: {
      // 按钮文字
      type: String,
      default: ''
    },
    row: {
      // 父组件传入有几行数据
      type: Number,
      default: 1
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      // 按行显示还是按列显示
      type: String,
      default: 'row'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      // 是否显示背景
      type: Boolean,
      default: false
    }
  },
  computed: {
    bookData() {
      const { data, row, col } = this
      if (data && data.length > 0) {
        data.forEach(book => {
          book.text = CATEGORY[book.categoryText.toLowerCase()]
        })
        // 展示的总item个数并截取出来
        const number = row * col
        const _bookData = data.slice(0, number)
        const _bookDataRow = []
        let _row = 0
        while (_row < row) {
          // while循环截取数据，每次截取一行数据
          // bookDataRow就变为了二维数组，每一个item存储了一行的数据
          _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
          _row++
        }
        return _bookDataRow
      } else {
        return []
      }
    }
  },
  methods: {
    onMoreClick() {
      // 点击换一批
      this.$emit('onMoreClick')
    },
    onBookClick(book) {
      this.$emit('onBookClcik')
      this.$router.push({
              path: '/pages/detail/main',
              query: {
                  fileName: book.fileName
              }
          })
    },
    onCategoryClick(category){
      this.$router.push({
              path: '/pages/list/main',
              query: {
                key: 'categoryId',
                text: category.category,
                title: category.categoryText
              }
          })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-book {
    .header {
      padding: 13px 0 0 20.5px;
    }
    .content {
      padding: 0 12px;
      margin-top: 10.5px;
      .row {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 12px;
        .col {
          padding: 0 8px;
          box-sizing: border-box;
          .book-wrapper {
            display: flex;
            .book-title-wrapper{
              &.book-title-col {
                .book-title {
                  font-size: 12px;
                  color: #212731;
                  line-height: 16.5px;
                  max-height: 33px;
                  font-weight: 500px;
                  overflow: hidden;
                  word-break: break-word;
                }
              }
              &.book-title-row {
                flex: 0 0 50%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .book-title {
                  font-size: 14px;
                  color: #1f1f1f;
                  line-height: 18px;
                  max-height: 36px;
                  overflow: hidden;
                  word-break: break-word;
                }
                .book-author {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                  overflow: hidden;
                  word-break: break-word;
                }
                .book-category {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                  overflow: hidden;
                  word-break: break-word;
                }
              }
            }
          }
          .category-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #f8f9fb;
            border-radius: 10px;
            height: 96px;
            padding: 13px 0 14.5px 16px;
            box-sizing: border-box;   
            .category-text {
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #212832;
              font-size: 16px;
              line-height: 22.5px;
            }
            .category-num {
              color: #868686;
              font-size: 12px;
              line-height: 16.5px;
            }
            .category-img-wrapper {
              position: absolute;
              right: 0;
              bottom: 0;
              .category-img1 {
                position: absolute;
                right: 0;
                bottom: -5px;
                z-index: 100;
                width: 48px;
              }
              .category-img2 {
                position: absolute;
                right: 30px;
                bottom: -5px;
                z-index: 90;
                width: 36px;
              }
            }
          }
        }
      }
    }
    .footer {
      padding:12px 20px 20px;
    }
  }
</style>

<style lang="scss">
// 修改组件库必须单独创建style标签，在根上进行修改
.category-img1 {
  .image {
    border-radius: 0 0 10px 0
  }
}
.footer {
  .home-book-btn {
    width: 100%;
    color: #3696EF;
    font-size: 18px;
    line-height: 40px;
    border: 1px solid #EDEEEE;
  }
}
</style>