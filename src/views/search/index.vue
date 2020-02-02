<template>
  <div class="searchContener">
      <!-- 头部 -->
      <van-nav-bar>
          <van-search slot="left" placeholder="请输入搜索关键词" v-model="searchValue"
          @input="getTitleBySearchShow"
          @focus="isArticleShow=false"
          @search="onSearch"
          />
          <van-button slot="right" @click="onCancel">取消</van-button>
      </van-nav-bar>
    <!-- 文章列表 -->
    <article-list v-if="isArticleShow" :q="searchValue"></article-list>
    <!-- 联想结果 -->
    <van-cell-group v-else-if="searchValue">
        <van-cell :title="itm" value="内容" v-for="(itm,idx) in title" :key="idx"/>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
        <van-cell title="历史记录">
            <van-icon name="delete" slot="right-icon"/>
        </van-cell>
        <van-cell title="历史" value="内容"/>
    </van-cell-group>

  </div>
</template>

<script>
import { getTitleBySearch } from '@/api/article'
import ArticleList from './component/article-list'
export default {
  components: {
    ArticleList

  },
  data () {
    return {
      searchValue: '',
      title: [],
      isArticleShow: true,
      //   isSearchShow: true,
      page: 1
      //   searchResult: [],
      //   HistoryList: []

    }
  },
  methods: {
    async getTitleBySearchShow () {
      this.isArticleShow = false
      const params = {
        q: this.searchValue
      }
      const res = await getTitleBySearch(params)
      window.console.log(res)
      this.title = res.data.data.options
    },
    onCancel () {
      this.isArticleShow = true
      this.searchValue = ''
    },
    onSearch () {
      this.isArticleShow = true
    }

  },
  created () {

  }

}
</script>

<style lang="less" scoped>
    .searchContener{
        height: 100vh;
        background-color: rgba(233, 232, 232, 0.89);
    }
   .van-search{
        padding: 0;
        margin-bottom: 6px;
        border-radius: 25px;
        width: 270px;
        ::v-deep.van-field__control{
            margin-top: 4px;
        }
    }
    .van-button{
        background-color:#3196fa;
        border: 0px;
        color: #fff
    }
</style>
