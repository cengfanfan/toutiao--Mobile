<template>
  <div class="articleContainer">
      <van-list @load="getSearchResultShow" v-model="loading"
  :finished="finished"
  finished-text="没有更多了">
            <!-- <van-cell :title="itm.title" value="内容" v-for="(itm,idx) in searchResult" :key="idx"/> -->
            <van-cell v-for="item in 20" :key="item"></van-cell>
      </van-list>

  </div>
</template>

<script>
import { getSearchResult } from '@/api/article'
export default {
  name: 'articlePage',
  data () {
    return {
      searchResult: [],
      page: 1,
      per_page: 20,
      loading: false,
      finished: false
    }
  },
  props: {
    q: {
      type: String,
      require: true
    }
  },
  methods: {
    async getSearchResultShow () {
      // 1. 请求获取数据
      const res = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // 2. 将数据添加到列表中
      this.searchResult.push(res.data.data.results)
      console.log(res)

      // 3. 设置加载状态结束
      this.loading = false
      // 4. 判断数据是否加载完毕
      if (res.data.data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
