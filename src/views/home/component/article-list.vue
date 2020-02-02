<template>
  <div class="article_contener">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getArticlesByChannelShow">
          <van-cell v-for="(item,idx) in articlelist" :key="idx" :title="item.title"/>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // list: [],
      articlelist: [],
      timestamp: null,
      isLoading: false
    }
  },
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  methods: {
    async getArticlesByChannelShow () {
      // 请求获取数据
      console.log(this.channels)
      const data = {
        channel_id: this.channels.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      }
      const res = await getArticlesByChannel(data)
      const results = res.data.data.results
      console.log(results)
      // 把数据添加到列表中
      this.articlelist.push(...results)
      // 停止本次的loading
      this.loading = false
      // 判断数据是否加载结束
      if (results.length) {
        this.timestamp = res.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      console.log('刷新成功')
      // 1.请求数据
      const data = {
        channel_id: this.channels.id,
        timestamp: Date.now(),
        with_top: 1
      }
      const res = await getArticlesByChannel(data)
      const results = res.data.data.results
      // 2.将数据放到列表顶部
      this.articlelist.unshift(...results)
      // 3.关闭下拉刷新的loading
      this.isLoading = false
      this.$toast(`更新了${results.length}条数据`)
    }
  },
  created () {
    // this.getArticlesByChannelShow()
  }
}
</script>

<style>

</style>
